import { daysUntil } from './formatDate'

export const getTaskState = (task) => {
  if (task.completed) return 'Completed'
  if (task.deadline && daysUntil(task.deadline) < 0) return 'Overdue'
  return 'Pending'
}

export const getDeadlineLabel = (task) => {
  if (!task.deadline) return 'No deadline'

  const days = daysUntil(task.deadline)

  if (days < 0) return `${Math.abs(days)} day${Math.abs(days) === 1 ? '' : 's'} overdue`
  if (days === 0) return 'Due today'
  if (days === 1) return 'Due tomorrow'
  return `${days} days left`
}

export const isDueSoon = (task) => {
  const days = daysUntil(task.deadline)
  return !task.completed && days >= 0 && days <= 3
}

export const priorityScore = {
  High: 3,
  Medium: 2,
  Low: 1
}
