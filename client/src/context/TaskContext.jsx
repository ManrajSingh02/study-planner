import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { AuthContext } from './AuthContext'
import { NotificationContext } from './NotificationContext'
import calculateProgress from '../utils/calculateProgress'
import { getTaskState } from '../utils/taskHelpers'

export const TaskContext = createContext()

const toDateInputValue = (date) => {
  if (!date) return ''
  return new Date(date).toISOString().slice(0, 10)
}

const mapTask = (task) => ({
  ...task,
  id: task._id || task.id,
  deadline: toDateInputValue(task.deadline),
  createdAt: task.createdAt || new Date().toISOString()
})

const mapCategory = (category) => ({
  ...category,
  id: category._id || category.id
})

export const TaskProvider = ({ children }) => {
  const { user, updateUser, apiUrl } = useContext(AuthContext)
  const { notify } = useContext(NotificationContext)
  const [tasks, setTasks] = useState([])
  const [categories, setCategories] = useState([])
  const [notes, setNotesState] = useState([
    'Review pinned tasks first.',
    'Keep tomorrow lighter than exam day.'
  ])
  const [goals, setGoalsState] = useState({
    dailyHours: 3,
    dailyTasks: 3
  })
  const [apiError, setApiError] = useState('')

  const request = async (path, options = {}) => {
    const response = await fetch(`${apiUrl}${path}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${user.token}`,
        ...options.headers
      }
    })

    const data = await response.json()

    if (!response.ok) {
      throw new Error(data.message || 'Request failed')
    }

    setApiError('')
    return data
  }

  useEffect(() => {
    if (!user?.token) {
      setTasks([])
      setCategories([])
      return
    }

    const loadData = async () => {
      try {
        const [taskData, categoryData] = await Promise.all([
          request('/tasks'),
          request('/categories')
        ])

        setTasks(taskData.map(mapTask))

        setCategories(categoryData.map(mapCategory))
      } catch (error) {
        setApiError(error.message)
        console.error(error.message)
      }
    }

    setNotesState(user.notes?.length ? user.notes : notes)
    setGoalsState(user.goals || goals)
    loadData()
  }, [user?.token])

  const addTask = (task) => {
    request('/tasks', {
      method: 'POST',
      body: JSON.stringify({
        title: task.title.trim(),
        description: task.description.trim(),
        subject: task.subject,
        deadline: task.deadline,
        priority: task.priority,
        completed: false,
        pinned: Boolean(task.pinned)
      })
    })
      .then((createdTask) => {
        setTasks((current) => [mapTask(createdTask), ...current])
        notify({
          title: 'Task added',
          message: `${createdTask.title} was added.`,
          tone: 'success'
        })
      })
      .catch((error) => {
        setApiError(error.message)
        console.error(error.message)
      })
  }

  const updateTask = (id, updates) => {
    setTasks((current) =>
      current.map((task) => (task.id === id ? { ...task, ...updates } : task))
    )

    request(`/tasks/${id}`, {
      method: 'PUT',
      body: JSON.stringify(updates)
    })
      .then((updatedTask) => {
        setTasks((current) =>
          current.map((task) => (task.id === id ? mapTask(updatedTask) : task))
        )
        notify({
          title: 'Changes saved',
          message: `${updatedTask.title} was updated.`,
          tone: 'success'
        })
      })
      .catch((error) => {
        setApiError(error.message)
        console.error(error.message)
      })
  }

  const deleteTask = (id) => {
    setTasks((current) => current.filter((task) => task.id !== id))

    request(`/tasks/${id}`, { method: 'DELETE' }).catch((error) => {
      setApiError(error.message)
      console.error(error.message)
    })
  }

  const toggleTask = (id) => {
    const task = tasks.find((item) => item.id === id)
    if (!task) return
    updateTask(id, { completed: !task.completed })
  }

  const duplicateTask = (id) => {
    const task = tasks.find((item) => item.id === id)
    if (!task) return

    addTask({
      ...task,
      title: `${task.title} copy`,
      completed: false,
      pinned: false
    })
  }

  const addCategory = (name) => {
    const normalizedName = name.trim()
    if (!normalizedName) return

    const exists = categories.some(
      (category) => category.name.toLowerCase() === normalizedName.toLowerCase()
    )

    if (exists) return

    request('/categories', {
      method: 'POST',
      body: JSON.stringify({
        name: normalizedName,
        goal: 2,
        color: 'bg-slate-500'
      })
    })
      .then((category) => setCategories((current) => [...current, mapCategory(category)]))
      .catch((error) => {
        setApiError(error.message)
        console.error(error.message)
      })
  }

  const deleteCategory = (id) => {
    setCategories((current) => current.filter((category) => category.id !== id))

    request(`/categories/${id}`, { method: 'DELETE' }).catch((error) => {
      setApiError(error.message)
      console.error(error.message)
    })
  }

  const setNotes = (nextNotes) => {
    const value = typeof nextNotes === 'function' ? nextNotes(notes) : nextNotes
    setNotesState(value)
    updateUser({ notes: value })
  }

  const setGoals = (nextGoals, options = {}) => {
    const { persist = true } = options
    const value = typeof nextGoals === 'function' ? nextGoals(goals) : nextGoals
    setGoalsState(value)

    if (persist) {
      updateUser({ goals: value })
    }
  }

  const progress = useMemo(() => calculateProgress(tasks, categories), [tasks, categories])

  const upcomingTasks = useMemo(() => {
    return tasks
      .filter((task) => !task.completed && getTaskState(task) !== 'Overdue')
      .sort((a, b) => new Date(a.deadline) - new Date(b.deadline))
      .slice(0, 5)
  }, [tasks])

  const overdueTasks = useMemo(() => {
    return tasks.filter((task) => getTaskState(task) === 'Overdue')
  }, [tasks])

  return (
    <TaskContext.Provider
      value={{
        tasks,
        categories,
        notes,
        goals,
        progress,
        upcomingTasks,
        overdueTasks,
        apiError,
        setNotes,
        setGoals,
        addTask,
        updateTask,
        deleteTask,
        toggleTask,
        duplicateTask,
        addCategory,
        deleteCategory
      }}
    >
      {children}
    </TaskContext.Provider>
  )
}
