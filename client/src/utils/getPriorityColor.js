import { priorityColors } from '../constants/colors'

const getPriorityColor = (priority) => {
  return priorityColors[priority] || 'bg-slate-100 text-slate-700 border-slate-200'
}

export default getPriorityColor
