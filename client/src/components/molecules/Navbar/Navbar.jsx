import { useContext } from 'react'
import { AuthContext } from '../../../context/AuthContext'
import { TaskContext } from '../../../context/TaskContext'
import { ThemeContext } from '../../../context/ThemeContext'
import Button from '../../atoms/Button/Button'

const Navbar = () => {
  const { user, logout } = useContext(AuthContext)
  const { overdueTasks } = useContext(TaskContext)
  const { theme, toggleTheme } = useContext(ThemeContext)

  return (
    <header className='sticky top-0 z-20 border-b border-slate-200 bg-white/95 px-4 py-3 backdrop-blur md:px-6'>
      <div className='flex flex-wrap items-center justify-between gap-3'>
        <div>
          <p className='text-xs font-semibold uppercase tracking-wide text-slate-400'>Study Planner</p>
          <h1 className='text-xl font-bold text-slate-950'>Welcome, {user?.name || 'Student'}</h1>
        </div>

        <div className='flex items-center gap-2'>
          {overdueTasks.length ? (
            <span className='rounded-lg bg-red-50 px-3 py-2 text-sm font-semibold text-red-700'>
              {overdueTasks.length} overdue
            </span>
          ) : null}
          <Button variant='secondary' onClick={toggleTheme}>
            {theme === 'dark' ? 'Light' : 'Dark'}
          </Button>
          <Button variant='ghost' onClick={logout}>
            Logout
          </Button>
        </div>
      </div>
    </header>
  )
}

export default Navbar
