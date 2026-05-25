export const defaultCategories = [
  { id: 1, name: 'Math', goal: 4, color: 'bg-blue-500' },
  { id: 2, name: 'Science', goal: 3, color: 'bg-emerald-500' },
  { id: 3, name: 'Programming', goal: 5, color: 'bg-violet-500' },
  { id: 4, name: 'English', goal: 2, color: 'bg-pink-500' }
]

export const defaultTasks = [
  {
    id: 1,
    title: 'Revise calculus formulas',
    description: 'Practice derivatives, limits, and five mixed problems.',
    subject: 'Math',
    deadline: '2026-05-22',
    priority: 'High',
    completed: false,
    pinned: true,
    createdAt: '2026-05-18T09:00:00.000Z'
  },
  {
    id: 2,
    title: 'Finish chemistry notes',
    description: 'Summarize acids, bases, and salts for quick revision.',
    subject: 'Science',
    deadline: '2026-05-25',
    priority: 'Medium',
    completed: false,
    pinned: false,
    createdAt: '2026-05-18T12:30:00.000Z'
  },
  {
    id: 3,
    title: 'Build React task component',
    description: 'Create reusable card states for pending and complete tasks.',
    subject: 'Programming',
    deadline: '2026-05-20',
    priority: 'High',
    completed: true,
    pinned: false,
    createdAt: '2026-05-17T15:00:00.000Z'
  },
  {
    id: 4,
    title: 'Read essay chapter',
    description: 'Mark important quotes and prepare a short summary.',
    subject: 'English',
    deadline: '2026-05-28',
    priority: 'Low',
    completed: false,
    pinned: false,
    createdAt: '2026-05-19T08:15:00.000Z'
  }
]
