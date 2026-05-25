import { getTaskState } from './taskHelpers'

const calculateProgress = (tasks, categories = []) => {
  const total = tasks.length
  const completed = tasks.filter((task) => task.completed).length
  const pending = tasks.filter((task) => getTaskState(task) === 'Pending').length
  const overdue = tasks.filter((task) => getTaskState(task) === 'Overdue').length
  const completionRate = total ? Math.round((completed / total) * 100) : 0

  const bySubject = categories.map((category) => {
    const subjectTasks = tasks.filter((task) => task.subject === category.name)
    const subjectCompleted = subjectTasks.filter((task) => task.completed).length

    return {
      ...category,
      total: subjectTasks.length,
      completed: subjectCompleted,
      percent: subjectTasks.length ? Math.round((subjectCompleted / subjectTasks.length) * 100) : 0
    }
  })

  return {
    total,
    completed,
    pending,
    overdue,
    completionRate,
    bySubject
  }
}

export default calculateProgress
