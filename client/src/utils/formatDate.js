export const toDateKey = (date) => {
  if (!date) return ''
  return new Date(date).toISOString().slice(0, 10)
}

export const formatDate = (date) => {
  if (!date) return 'No deadline'

  return new Intl.DateTimeFormat('en', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  }).format(new Date(date))
}

export const daysUntil = (date) => {
  const today = new Date()
  const target = new Date(date)
  today.setHours(0, 0, 0, 0)
  target.setHours(0, 0, 0, 0)

  return Math.ceil((target - today) / 86400000)
}

export default formatDate
