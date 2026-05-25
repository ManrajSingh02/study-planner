import { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router'
import Button from '../components/atoms/Button/Button'
import Input from '../components/atoms/Input/Input'
import { AuthContext } from '../context/AuthContext'
import { validateAuth } from '../utils/validateForm'
import heroImage from '../assets/hero.png'

const Register = () => {
  const { register } = useContext(AuthContext)
  const navigate = useNavigate()
  const [form, setForm] = useState({ name: '', email: '', password: '' })
  const [errors, setErrors] = useState({})

  const handleSubmit = async (event) => {
    event.preventDefault()
    const nextErrors = validateAuth(form, 'register')
    setErrors(nextErrors)

    if (Object.keys(nextErrors).length) return

    try {
      await register(form)
      navigate('/dashboard')
    } catch (error) {
      setErrors({ email: error.message })
    }
  }

  return (
    <main className='grid min-h-screen bg-slate-950 text-white lg:grid-cols-[0.95fr_1.05fr]'>
      <section className='flex items-center justify-center bg-slate-50 p-4 text-slate-950 sm:p-8'>
        <div className='w-full max-w-md rounded-lg border border-slate-200 bg-white p-6 shadow-sm sm:p-8'>
          <p className='text-sm font-semibold uppercase tracking-wide text-indigo-600'>Start planning</p>
          <h1 className='mt-2 text-3xl font-black text-slate-950'>Create your study account</h1>
          <p className='mt-2 text-sm text-slate-500'>Save tasks, categories, goals, and notes in MongoDB.</p>

          <form onSubmit={handleSubmit} className='mt-6 space-y-4'>
            <Input
              label='Name'
              value={form.name}
              onChange={(event) => setForm({ ...form, name: event.target.value })}
              error={errors.name}
            />
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
            <Button type='submit' className='w-full'>Create account</Button>
          </form>

          <p className='mt-5 text-center text-sm text-slate-500'>
            Already registered? <Link to='/login' className='font-semibold text-indigo-600'>Log in</Link>
          </p>
        </div>
      </section>

      <section className='relative hidden overflow-hidden lg:block'>
        <img src={heroImage} alt='' className='h-full w-full object-cover opacity-80' />
        <div className='absolute inset-0 bg-slate-950/50' />
        <div className='absolute inset-x-10 bottom-10'>
          <p className='text-sm font-semibold uppercase tracking-wide text-indigo-200'>Student workflow</p>
          <h2 className='mt-3 max-w-xl text-5xl font-black leading-tight'>
            Turn scattered deadlines into a daily study plan.
          </h2>
          <div className='mt-8 max-w-xl rounded-lg border border-white/15 bg-white/10 p-5 backdrop-blur'>
            <p className='text-sm text-slate-100'>
              Add subjects, pin important tasks, track deadlines, and keep your next study session clear.
            </p>
          </div>
        </div>
      </section>
    </main>
  )
}

export default Register
