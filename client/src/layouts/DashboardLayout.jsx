import Navbar from '../components/molecules/Navbar/Navbar'
import Sidebar from '../components/molecules/Sidebar/Sidebar'

const DashboardLayout = ({ children }) => {
  return (
    <div className='min-h-screen bg-slate-50 md:flex'>
      <Sidebar />
      <div className='min-w-0 flex-1'>
        <Navbar />
        <main className='mx-auto w-full max-w-7xl p-4 md:p-6'>{children}</main>
      </div>
    </div>
  )
}

export default DashboardLayout
