export const priorityColors = {
  High: 'bg-red-100 text-red-700 border-red-200',
  Medium: 'bg-amber-100 text-amber-700 border-amber-200',
  Low: 'bg-emerald-100 text-emerald-700 border-emerald-200'
}

export const appRoutes = [
  { label: 'Dashboard', path: '/dashboard' },
  { label: 'Tasks', path: '/tasks' },
  { label: 'Calendar', path: '/calendar' },
  { label: 'Categories', path: '/categories' },
  { label: 'Profile', path: '/profile' }
]

export const taskStatuses = ['All', 'Pending', 'Completed', 'Overdue']
export const priorities = ['All', 'High', 'Medium', 'Low']
export const sortOptions = ['Nearest deadline', 'Recently added', 'Priority level']
