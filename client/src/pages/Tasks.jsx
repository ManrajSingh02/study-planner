import { useContext, useEffect, useMemo, useState } from "react";
import { useLocation } from "react-router";
import Card from "../components/atoms/Card";
import FilterBar from "../components/molecules/FilterBar";
import TaskForm from "../components/molecules/TaskForm";
import TaskList from "../components/organisms/TaskList";
import DashboardLayout from "../components/DashboardLayout";
import { TaskContext } from "../context/TaskContext";
import filterTasks from "../utils/filterTasks";
import sortTasks from "../utils/sortTasks";

const Tasks = () => {
  const {
    tasks,
    categories,
    apiError,
    addTask,
    updateTask,
    deleteTask,
    toggleTask,
    duplicateTask,
  } = useContext(TaskContext);

  const location = useLocation();

  const [editingTask, setEditingTask] = useState(null);

  const [filters, setFilters] = useState({
    search: "",
    subject: "All",
    priority: "All",
    status: "All",
    deadline: "",
    sortBy: "Nearest deadline",
  });

  useEffect(() => {
    if (location.state?.subject) {
      setFilters((prev) => ({
        ...prev,
        subject: location.state.subject,
      }));
    }
  }, [location.state]);

  const filteredTasks = useMemo(() => {
    return sortTasks(
      filterTasks(tasks, filters),
      filters.sortBy,
    );
  }, [tasks, filters]);

  const handleSubmit = (task) => {
    if (editingTask) {
      updateTask(editingTask.id, task);
      setEditingTask(null);
      return;
    }

    addTask(task);
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-black text-slate-950">
            Tasks
          </h1>

          <p className="mt-1 text-slate-500">
            Add, edit, duplicate, pin, filter, and complete study tasks.
          </p>
        </div>

        {apiError ? (
          <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
            API error: {apiError}
          </div>
        ) : null}

        <div className="grid gap-6 xl:grid-cols-[380px_1fr]">
          <Card>
            <h2 className="text-xl font-bold text-slate-950">
              {editingTask ? "Edit task" : "Add task"}
            </h2>

            <div className="mt-5">
              <TaskForm
                categories={categories}
                onSubmit={handleSubmit}
                editingTask={editingTask}
                onCancel={() => setEditingTask(null)}
              />
            </div>
          </Card>

          <div className="space-y-4">
            <FilterBar
              filters={filters}
              onChange={setFilters}
              categories={categories}
            />

            <TaskList
              tasks={filteredTasks}
              onDelete={deleteTask}
              onToggle={toggleTask}
              onEdit={setEditingTask}
              onDuplicate={duplicateTask}
              onPin={(id, pinned) =>
                updateTask(id, { pinned })
              }
            />
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Tasks;