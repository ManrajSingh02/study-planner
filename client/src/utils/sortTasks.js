import { priorityScore } from './taskHelpers'

const sortTasks = (tasks, sortBy) => {
  const pinnedFirst = [...tasks].sort((a, b) => Number(b.pinned) - Number(a.pinned))

  if (sortBy === 'Priority level') {
    return pinnedFirst.sort((a, b) => {
      if (a.pinned !== b.pinned) return Number(b.pinned) - Number(a.pinned)
      return priorityScore[b.priority] - priorityScore[a.priority]
    })
  }

  if (sortBy === 'Recently added') {
    return pinnedFirst.sort((a, b) => {
      if (a.pinned !== b.pinned) return Number(b.pinned) - Number(a.pinned)
      return new Date(b.createdAt) - new Date(a.createdAt)
    })
  }

  return pinnedFirst.sort((a, b) => {
    if (a.pinned !== b.pinned) return Number(b.pinned) - Number(a.pinned)
    return new Date(a.deadline || '9999-12-31') - new Date(b.deadline || '9999-12-31')
  })
}

export default sortTasks
