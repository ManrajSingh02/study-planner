import { useContext, useState } from 'react'
import { Link, Navigate, useNavigate } from 'react-router'
import Button from '../components/atoms/Button/Button'
import Input from '../components/atoms/Input/Input'
import { AuthContext } from '../context/AuthContext'
import { validateAuth } from '../utils/validateForm'
import heroImage from '../assets/hero.png'

const Login = () => {
  const { user, login } = useContext(AuthContext)
  const navigate = useNavigate()
  const [form, setForm] = useState({ email: '', password: '' })
  const [errors, setErrors] = useState({})

  if (user?.token) {
    return <Navigate to='/dashboard' replace />
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    const nextErrors = validateAuth(form)
    setErrors(nextErrors)

    if (Object.keys(nextErrors).length) return

    try {
      await login({ email: form.email, password: form.password })
      navigate('/dashboard')
    } catch (error) {
      setErrors({ password: error.message })
    }
  }

  return (
    <main className='grid min-h-screen bg-slate-950 text-white lg:grid-cols-[1.05fr_0.95fr]'>
      <section className='relative hidden overflow-hidden lg:block'>
        <img src={heroImage} alt='' className='h-full w-full object-cover opacity-80' />
        <div className='absolute inset-0 bg-slate-950/55' />
        <div className='absolute inset-x-10 bottom-10'>
          <p className='text-sm font-semibold uppercase tracking-wide text-indigo-200'>Study Planner</p>
          <h1 className='mt-3 max-w-lg text-5xl font-black leading-tight'>
            Pick up exactly where your study plan left off.
          </h1>
          <div className='mt-8 grid max-w-xl grid-cols-3 gap-3 text-sm'>
            <div className='rounded-lg border border-white/15 bg-white/10 p-4 backdrop-blur'>
              <strong className='block text-2xl'>01</strong>
              Plan
            </div>
            <div className='rounded-lg border border-white/15 bg-white/10 p-4 backdrop-blur'>
              <strong className='block text-2xl'>02</strong>
              Focus
            </div>
            <div className='rounded-lg border border-white/15 bg-white/10 p-4 backdrop-blur'>
              <strong className='block text-2xl'>03</strong>
              Finish
            </div>
          </div>
        </div>
      </section>

      <section className='flex items-center justify-center bg-slate-50 p-4 text-slate-950 sm:p-8'>
        <div className='w-full max-w-md rounded-lg border border-slate-200 bg-white p-6 shadow-sm sm:p-8'>
          <p className='text-sm font-semibold uppercase tracking-wide text-indigo-600'>Welcome back</p>
          <h1 className='mt-2 text-3xl font-black text-slate-950'>Log in to your planner</h1>
          <p className='mt-2 text-sm text-slate-500'>Review today&apos;s tasks, deadlines, and quick notes.</p>

          <form onSubmit={handleSubmit} className='mt-6 space-y-4'>
            <Input
              label='Email'
              type='email'
              value={form.email}
              onChange={(event) => setForm({ ...form, email: event.target.value })}
              error={errors.email}
            />
            <Input
              label='Password'
              type='password'
              value={form.password}
              onChange={(event) => setForm({ ...form, password: event.target.value })}
              error={errors.password}
            />
            <Button type='submit' className='w-full'>Log in</Button>
          </form>

          <p className='mt-5 text-center text-sm text-slate-500'>
            New here? <Link to='/register' className='font-semibold text-indigo-600'>Create an account</Link>
          </p>
        </div>
      </section>
    </main>
  )
}

export default Login
