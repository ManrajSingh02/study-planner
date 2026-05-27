import Badge from "../atoms/Badge";
import Button from "../atoms/Button";
import Card from "../atoms/Card";
import PriorityBadge from "./PriorityBadge";
import formatDate from "../../utils/formatDate";
import {
  getDeadlineLabel,
  getTaskState,
  isDueSoon,
} from "../../utils/taskHelpers";

const TaskCard = ({ task, onDelete, onToggle, onEdit, onDuplicate, onPin }) => {
  const state = getTaskState(task);
  const stateColor =
    state === "Completed"
      ? "bg-emerald-100 text-emerald-700 border-emerald-200"
      : state === "Overdue"
        ? "bg-red-100 text-red-700 border-red-200"
        : "bg-amber-100 text-amber-700 border-amber-200";

  return (
    <Card
      className={`${isDueSoon(task) ? "border-amber-300 bg-amber-50/40" : ""}`}
    >
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            {task.pinned ? (
              <Badge
                text="Pinned"
                className="border-indigo-200 bg-indigo-50 text-indigo-700"
              />
            ) : null}
            <PriorityBadge priority={task.priority} />
            <Badge text={state} className={stateColor} />
          </div>
          <h3
            className={`mt-3 text-lg font-bold text-slate-950 ${task.completed ? "line-through opacity-60" : ""}`}
          >
            {task.title}
          </h3>
          <p className="mt-1 text-sm text-slate-500">{task.description}</p>
          <div className="mt-3 flex flex-wrap gap-2 text-sm text-slate-600">
            <span className="rounded-lg bg-slate-100 px-2.5 py-1">
              {task.subject}
            </span>
            <span className="rounded-lg bg-slate-100 px-2.5 py-1">
              {formatDate(task.deadline)}
            </span>
            <span className="rounded-lg bg-slate-100 px-2.5 py-1">
              {getDeadlineLabel(task)}
            </span>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 sm:justify-end">
          <Button variant="secondary" onClick={() => onToggle(task.id)}>
            {task.completed ? "Reopen" : "Complete"}
          </Button>
          <Button variant="secondary" onClick={() => onEdit(task)}>
            Edit
          </Button>
          <Button variant="secondary" onClick={() => onDuplicate(task.id)}>
            Duplicate
          </Button>
          <Button variant="ghost" onClick={() => onPin(task.id, !task.pinned)}>
            {task.pinned ? "Unpin" : "Pin"}
          </Button>
          <Button variant="danger" onClick={() => onDelete(task.id)}>
            Delete
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default TaskCard;
