export const validateTask = (task) => {
  const errors = {}

  if (!task.title.trim()) errors.title = 'Task title is required'
  if (!task.subject) errors.subject = 'Subject is required'
  if (!task.deadline) errors.deadline = 'Deadline is required'

  return errors
}

export const validateAuth = ({ email, password, name }, mode = 'login') => {
  const errors = {}

  if (mode === 'register' && !name.trim()) errors.name = 'Name is required'
  if (!email.trim()) errors.email = 'Email is required'
  if (!password.trim()) errors.password = 'Password is required'

  return errors
}
