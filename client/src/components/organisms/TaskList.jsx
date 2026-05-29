import { useState } from "react";
import EmptyState from "../molecules/EmptyState.jsx";
import TaskCard from "../molecules/TaskCard.jsx";

const TaskList = ({
  tasks,
  onDelete,
  onToggle,
  onEdit,
  onDuplicate,
  onPin,
}) => {
  const [taskToDelete, setTaskToDelete] = useState(null);

  if (!tasks.length) {
    return (
      <EmptyState
        title="No matching tasks"
        message="Try a different search, filter, or add a new study task."
      />
    );
  }

  const confirmDelete = () => {
    if (taskToDelete) {
      onDelete(taskToDelete);
      setTaskToDelete(null);
    }
  };

  return (
    <>
      <div className="grid gap-4">
        {tasks.map((task) => (
          <TaskCard
            key={task.id}
            task={task}
            onDelete={() => setTaskToDelete(task.id)}
            onToggle={onToggle}
            onEdit={onEdit}
            onDuplicate={onDuplicate}
            onPin={onPin}
          />
        ))}
      </div>

      {taskToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
          <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-xl">
            <h3 className="text-lg font-bold text-slate-900">
              Delete Task
            </h3>

            <p className="mt-2 text-slate-600">
              Are you sure you want to delete this task?
              This action cannot be undone.
            </p>

            <div className="mt-6 flex justify-end gap-3">
              <button
                onClick={() => setTaskToDelete(null)}
                className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
              >
                Cancel
              </button>

              <button
                onClick={confirmDelete}
                className="rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default TaskList;