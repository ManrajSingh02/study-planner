import { useEffect, useState } from "react";
import Button from "../atoms/Button";
import Input from "../atoms/Input";
import { validateTask } from "../../utils/validateForm";

const initialForm = {
  title: "",
  description: "",
  subject: "Math",
  deadline: "",
  priority: "Medium",
  pinned: false,
};

const TaskForm = ({ categories, onSubmit, editingTask, onCancel }) => {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (editingTask) {
      setForm({
        title: editingTask.title,
        description: editingTask.description,
        subject: editingTask.subject,
        deadline: editingTask.deadline,
        priority: editingTask.priority,
        pinned: editingTask.pinned,
      });
      setErrors({});
      return;
    }

    setForm(initialForm);
    setErrors({});
  }, [editingTask]);

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    setForm((current) => ({
      ...current,
      [name]: type === "checkbox" ? checked : value,
    }));
    setErrors((current) => ({ ...current, [name]: "" }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const nextErrors = validateTask(form);
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length) return;

    onSubmit(form);
    setForm(initialForm);
    setErrors({});
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        label="Task title"
        name="title"
        value={form.title}
        onChange={handleChange}
        placeholder="Example: Revise algebra chapter"
        error={errors.title}
      />

      <label className="flex flex-col gap-2 text-sm font-medium text-slate-700">
        Description
        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          rows="3"
          placeholder="Add details, pages, or study notes"
          className="resize-none rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-slate-900 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
        />
      </label>

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="flex flex-col gap-2 text-sm font-medium text-slate-700">
          Subject
          <select
            name="subject"
            value={form.subject}
            onChange={handleChange}
            className="rounded-lg border border-slate-200 bg-white px-3 py-2.5 outline-none"
          >
            {categories.map((category) => (
              <option key={category.id} value={category.name}>
                {category.name}
              </option>
            ))}
          </select>
          {errors.subject ? (
            <span className="text-xs text-red-500">{errors.subject}</span>
          ) : null}
        </label>

        <Input
          label="Deadline"
          name="deadline"
          type="date"
          value={form.deadline}
          onChange={handleChange}
          error={errors.deadline}
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="flex flex-col gap-2 text-sm font-medium text-slate-700">
          Priority
          <select
            name="priority"
            value={form.priority}
            onChange={handleChange}
            className="rounded-lg border border-slate-200 bg-white px-3 py-2.5 outline-none"
          >
            <option>High</option>
            <option>Medium</option>
            <option>Low</option>
          </select>
        </label>

        <label className="flex flex-col gap-2 text-sm font-medium text-slate-700">
          Pin task
          <span className="flex items-center gap-3 rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm font-medium text-slate-700">
            <input
              type="checkbox"
              name="pinned"
              checked={form.pinned}
              onChange={handleChange}
              className="h-4 w-4"
            />
            Pin this task
          </span>
        </label>
      </div>

      <div className="flex flex-wrap gap-2">
        <Button type="submit">
          {editingTask ? "Save changes" : "Add task"}
        </Button>
        {editingTask ? (
          <Button type="button" variant="secondary" onClick={onCancel}>
            Cancel
          </Button>
        ) : null}
      </div>
    </form>
  );
};

export default TaskForm;
