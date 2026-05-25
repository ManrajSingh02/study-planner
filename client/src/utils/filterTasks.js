import { getTaskState } from './taskHelpers'

const filterTasks = (tasks, filters) => {
  const query = filters.search.trim().toLowerCase()

  return tasks.filter((task) => {
    const matchesSearch =
      !query ||
      task.title.toLowerCase().includes(query) ||
      task.description.toLowerCase().includes(query) ||
      task.subject.toLowerCase().includes(query)
    const matchesSubject = filters.subject === 'All' || task.subject === filters.subject
    const matchesPriority = filters.priority === 'All' || task.priority === filters.priority
    const matchesStatus = filters.status === 'All' || getTaskState(task) === filters.status
    const matchesDeadline = !filters.deadline || task.deadline === filters.deadline

    return matchesSearch && matchesSubject && matchesPriority && matchesStatus && matchesDeadline
  })
}

export default filterTasks
