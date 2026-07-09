import { NavLink } from 'react-router'
import { appRoutes } from '../../constants'

const Sidebar = () => {
  return (
    <aside className='border-b border-slate-200 bg-white p-4 md:sticky md:top-0 md:h-screen md:w-64 md:shrink-0 md:border-b-0 md:border-r md:p-5'>
      <div className='mb-5 flex items-center gap-3'>
        <img
          src='/favicon.svg'
          alt='StudyMate'
          className='h-12 w-12 rounded-2xl shadow-md shadow-indigo-500/20'
        />
        <div>
          <h2 className='text-2xl font-black text-indigo-600'>StudyMate</h2>
          <p className='text-sm text-slate-500'>Academic command center</p>
        </div>
      </div>

      <nav className='flex gap-2 overflow-x-auto md:flex-col'>
        {appRoutes.map((route) => (
          <NavLink
            key={route.path}
            to={route.path}
            className={({ isActive }) =>
              `rounded-lg px-3 py-2 text-sm font-semibold transition ${
                isActive
                  ? 'bg-indigo-600 text-white'
                  : 'text-slate-600 hover:bg-slate-100 hover:text-slate-950'
              }`
            }
          >
            {route.label}
          </NavLink>
        ))}
      </nav>
    </aside>
  )
}

export default Sidebar
