import { useContext, useState } from 'react'
import Button from '../components/atoms/Button/Button'
import Card from '../components/atoms/Card/Card'
import Input from '../components/atoms/Input/Input'
import DashboardLayout from '../layouts/DashboardLayout'
import { TaskContext } from '../context/TaskContext'

const Categories = () => {
  const { categories, progress, addCategory } = useContext(TaskContext)
  const [name, setName] = useState('')

  const handleAdd = (event) => {
    event.preventDefault()
    addCategory(name)
    setName('')
  }

  return (
    <DashboardLayout>
      <div className='space-y-6'>
        <div>
          <h1 className='text-3xl font-black text-slate-950'>Categories</h1>
          <p className='mt-1 text-slate-500'>Organize work by subject and track subject-wise progress.</p>
        </div>

        <Card>
          <form onSubmit={handleAdd} className='flex flex-col gap-3 sm:flex-row sm:items-end'>
            <div className='flex-1'>
              <Input label='New subject' value={name} onChange={(event) => setName(event.target.value)} placeholder='Example: Economics' />
            </div>
            <Button type='submit'>Add category</Button>
          </form>
        </Card>

        <div className='grid gap-4 md:grid-cols-2 xl:grid-cols-4'>
          {categories.map((category) => {
            const subject = progress.bySubject.find((item) => item.name === category.name)

            return (
              <Card key={category.id}>
                <div className={`h-2 rounded-full ${category.color}`} />
                <h2 className='mt-4 text-xl font-bold text-slate-950'>{category.name}</h2>
                <p className='mt-1 text-sm text-slate-500'>{subject?.completed || 0} of {subject?.total || 0} tasks complete</p>
                <div className='mt-4 rounded-lg bg-slate-100 p-3 text-sm font-semibold text-slate-700'>
                  {subject?.percent || 0}% complete
                </div>
              </Card>
            )
          })}
        </div>
      </div>
    </DashboardLayout>
  )
}

export default Categories
