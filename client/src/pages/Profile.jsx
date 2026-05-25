import { useContext, useState } from 'react'
import Button from '../components/atoms/Button/Button'
import Card from '../components/atoms/Card/Card'
import Input from '../components/atoms/Input/Input'
import DashboardLayout from '../layouts/DashboardLayout'
import { AuthContext } from '../context/AuthContext'
import { TaskContext } from '../context/TaskContext'

const Profile = () => {
  const { user, updateUser } = useContext(AuthContext)
  const { notes, setNotes, goals, setGoals } = useContext(TaskContext)
  const [name, setName] = useState(user?.name || '')
  const [note, setNote] = useState('')

  const saveProfile = (event) => {
    event.preventDefault()
    updateUser({ name })
  }

  const addNote = (event) => {
    event.preventDefault()
    if (!note.trim()) return
    setNotes((current) => [note.trim(), ...current])
    setNote('')
  }

  return (
    <DashboardLayout>
      <div className='space-y-6'>
        <div>
          <h1 className='text-3xl font-black text-slate-950'>Profile</h1>
          <p className='mt-1 text-slate-500'>Set your daily goals and keep quick notes.</p>
        </div>

        <div className='grid gap-6 lg:grid-cols-2'>
          <Card>
            <h2 className='text-xl font-bold text-slate-950'>Account</h2>
            <form onSubmit={saveProfile} className='mt-5 space-y-4'>
              <Input label='Display name' value={name} onChange={(event) => setName(event.target.value)} />
              <Input label='Email' value={user?.email || ''} disabled />
              <Button type='submit'>Save profile</Button>
            </form>
          </Card>

          <Card>
            <h2 className='text-xl font-bold text-slate-950'>Daily goals</h2>
            <div className='mt-5 grid gap-4 sm:grid-cols-2'>
              <Input
                label='Study hours'
                type='number'
                min='1'
                value={goals.dailyHours}
                onChange={(event) => setGoals({ ...goals, dailyHours: Number(event.target.value) })}
              />
              <Input
                label='Tasks to finish'
                type='number'
                min='1'
                value={goals.dailyTasks}
                onChange={(event) => setGoals({ ...goals, dailyTasks: Number(event.target.value) })}
              />
            </div>
          </Card>
        </div>

        <Card>
          <h2 className='text-xl font-bold text-slate-950'>Quick notes</h2>
          <form onSubmit={addNote} className='mt-4 flex flex-col gap-3 sm:flex-row'>
            <input
              value={note}
              onChange={(event) => setNote(event.target.value)}
              placeholder='Write a short study note'
              className='flex-1 rounded-lg border border-slate-200 px-4 py-3 text-sm outline-none'
            />
            <Button type='submit'>Add note</Button>
          </form>

          <div className='mt-5 grid gap-3 md:grid-cols-2'>
            {notes.map((item, index) => (
              <div key={`${item}-${index}`} className='rounded-lg bg-amber-50 p-4 text-sm font-medium text-amber-800'>
                {item}
              </div>
            ))}
          </div>
        </Card>
      </div>
    </DashboardLayout>
  )
}

export default Profile
