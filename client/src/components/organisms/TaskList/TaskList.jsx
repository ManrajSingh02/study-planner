import EmptyState from '../../molecules/EmptyState/EmptyState'
import TaskCard from '../../molecules/TaskCard/TaskCard'

const TaskList = ({ tasks, onDelete, onToggle, onEdit, onDuplicate, onPin }) => {
  if (!tasks.length) {
    return (
      <EmptyState
        title='No matching tasks'
        message='Try a different search, filter, or add a new study task.'
      />
    )
  }

  return (
    <div className='grid gap-4'>
      {tasks.map((task) => (
        <TaskCard
          key={task.id}
          task={task}
          onDelete={onDelete}
          onToggle={onToggle}
          onEdit={onEdit}
          onDuplicate={onDuplicate}
          onPin={onPin}
        />
      ))}
    </div>
  )
}

export default TaskList
