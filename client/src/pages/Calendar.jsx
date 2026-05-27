import { useContext, useState } from "react";
import Badge from "../components/atoms/Badge";
import Card from "../components/atoms/Card";
import DashboardLayout from "../components/DashboardLayout";
import { TaskContext } from "../context/TaskContext";
import { formatDate, toDateKey } from "../utils/formatDate";
import { getTaskState } from "../utils/taskHelpers";

const Calendar = () => {
  const { tasks } = useContext(TaskContext);
  const [selectedDay, setSelectedDay] = useState(null);
  const today = new Date();
  const days = Array.from({ length: 14 }, (_, index) => {
    const date = new Date(today);
    date.setDate(today.getDate() + index);
    return date;
  });

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-black text-slate-950">Calendar</h1>
          <p className="mt-1 text-slate-500">
            See deadlines and busy study days for the next two weeks.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {days.map((date) => {
            const key = toDateKey(date);
            const dayTasks = tasks.filter((task) => task.deadline === key);
            const visibleTasks = dayTasks.slice(0, 4);
            const hiddenTaskCount = dayTasks.length - visibleTasks.length;
            const overdue = dayTasks.filter(
              (task) => getTaskState(task) === "Overdue",
            ).length;

            return (
              <Card
                key={key}
                className={`min-h-[340px] ${dayTasks.length ? "border-indigo-200" : ""}`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-sm font-semibold text-slate-500">
                      {date.toLocaleDateString("en", { weekday: "short" })}
                    </p>
                    <h2 className="text-lg font-bold text-slate-950">
                      {formatDate(date)}
                    </h2>
                  </div>
                  <Badge
                    text={`${dayTasks.length} task${dayTasks.length === 1 ? "" : "s"}`}
                    className={
                      dayTasks.length
                        ? "border-indigo-200 bg-indigo-50 text-indigo-700"
                        : "border-slate-200 bg-slate-100 text-slate-500"
                    }
                  />
                </div>

                <div className="mt-4 space-y-2">
                  {dayTasks.length ? (
                    visibleTasks.map((task) => (
                      <div
                        key={task.id}
                        className="rounded-lg bg-slate-100 p-3"
                      >
                        <p className="font-semibold text-slate-900">
                          {task.title}
                        </p>
                        <p className="text-sm text-slate-500">
                          {task.subject} - {task.priority}
                        </p>
                      </div>
                    ))
                  ) : (
                    <p className="text-sm text-slate-400">No deadline</p>
                  )}
                </div>

                {hiddenTaskCount > 0 ? (
                  <button
                    type="button"
                    onClick={() => setSelectedDay({ date, tasks: dayTasks })}
                    className="mt-3 text-sm font-semibold text-indigo-600 hover:text-indigo-700"
                  >
                    View all {dayTasks.length} tasks
                  </button>
                ) : null}

                {overdue ? (
                  <p className="mt-3 text-sm font-semibold text-red-600">
                    {overdue} overdue
                  </p>
                ) : null}
              </Card>
            );
          })}
        </div>

        {selectedDay ? (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 p-4">
            <div className="w-full max-w-lg rounded-lg bg-white p-5 shadow-xl">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-sm font-semibold text-slate-500">
                    {selectedDay.date.toLocaleDateString("en", {
                      weekday: "short",
                    })}
                  </p>
                  <h2 className="text-xl font-bold text-slate-950">
                    {formatDate(selectedDay.date)}
                  </h2>
                </div>
                <button
                  type="button"
                  onClick={() => setSelectedDay(null)}
                  className="text-sm font-semibold text-slate-500 hover:text-slate-900"
                >
                  Close
                </button>
              </div>

              <div className="mt-5 max-h-[60vh] space-y-2 overflow-y-auto pr-1">
                {selectedDay.tasks.map((task) => (
                  <div key={task.id} className="rounded-lg bg-slate-100 p-3">
                    <p className="font-semibold text-slate-900">{task.title}</p>
                    <p className="text-sm text-slate-500">
                      {task.subject} - {task.priority}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </DashboardLayout>
  );
};

export default Calendar;
