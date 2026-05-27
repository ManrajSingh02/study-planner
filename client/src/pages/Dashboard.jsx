import { useContext } from "react";
import Card from "../components/atoms/Card";
import StatsCard from "../components/molecules/StatsCard";
import DashboardLayout from "../components/DashboardLayout";
import { TaskContext } from "../context/TaskContext";
import formatDate from "../utils/formatDate";
import { getDeadlineLabel } from "../utils/taskHelpers";

const Dashboard = () => {
  const { tasks, progress, upcomingTasks, overdueTasks, notes, goals } =
    useContext(TaskContext);
  const todayTasks = tasks.filter(
    (task) => task.deadline === new Date().toISOString().slice(0, 10),
  );
  const recentTasks = [...tasks]
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 4);

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-black text-slate-950">Dashboard</h1>
          <p className="mt-1 text-slate-500">
            Your study progress, priorities, and deadlines at a glance.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          <StatsCard title="Total tasks" value={progress.total} helper="All" />
          <StatsCard
            title="Completed"
            value={progress.completed}
            helper={`${progress.completionRate}%`}
            tone="green"
          />
          <StatsCard
            title="Pending"
            value={progress.pending}
            helper="Open"
            tone="amber"
          />
          <StatsCard
            title="Overdue"
            value={progress.overdue}
            helper="Check"
            tone="red"
          />
        </div>

        <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <Card>
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-slate-950">
                  Study summary
                </h2>
                <p className="text-sm text-slate-500">
                  Goal: {goals.dailyTasks} tasks and {goals.dailyHours} study
                  hours
                </p>
              </div>
              <span className="text-3xl font-black text-indigo-600">
                {progress.completionRate}%
              </span>
            </div>
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {progress.bySubject.map((subject) => (
                <div
                  key={subject.id}
                  className="rounded-lg border border-slate-200 p-3"
                >
                  <div className="flex items-center justify-between gap-3 text-sm">
                    <span className="font-semibold text-slate-700">
                      {subject.name}
                    </span>
                    <span className="rounded-full bg-slate-100 px-3 py-1 text-slate-600">
                      {subject.completed}/{subject.total} done
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          <Card>
            <h2 className="text-xl font-bold text-slate-950">Today</h2>
            <div className="mt-4 space-y-3">
              {todayTasks.length ? (
                todayTasks.map((task) => (
                  <div key={task.id} className="rounded-lg bg-slate-100 p-3">
                    <p className="font-semibold text-slate-900">{task.title}</p>
                    <p className="text-sm text-slate-500">{task.subject}</p>
                  </div>
                ))
              ) : (
                <p className="rounded-lg bg-slate-100 p-4 text-sm text-slate-500">
                  No tasks due today. Nice breathing room.
                </p>
              )}
            </div>
          </Card>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          <Card>
            <h2 className="text-xl font-bold text-slate-950">
              Upcoming deadlines
            </h2>
            <div className="mt-4 space-y-3">
              {upcomingTasks.map((task) => (
                <div
                  key={task.id}
                  className="flex justify-between gap-3 rounded-lg border border-slate-200 p-3"
                >
                  <div>
                    <p className="font-semibold text-slate-900">{task.title}</p>
                    <p className="text-sm text-slate-500">
                      {formatDate(task.deadline)}
                    </p>
                  </div>
                  <span className="text-sm font-semibold text-indigo-600">
                    {getDeadlineLabel(task)}
                  </span>
                </div>
              ))}
            </div>
          </Card>

          <Card>
            <h2 className="text-xl font-bold text-slate-950">Recently added</h2>
            <div className="mt-4 space-y-3">
              {recentTasks.map((task) => (
                <div key={task.id} className="rounded-lg bg-slate-100 p-3">
                  <p className="font-semibold text-slate-900">{task.title}</p>
                  <p className="text-sm text-slate-500">{task.subject}</p>
                </div>
              ))}
            </div>
          </Card>

          <Card>
            <h2 className="text-xl font-bold text-slate-950">
              Productivity summary
            </h2>
            <div className="mt-4 space-y-3 text-sm text-slate-600">
              <p>
                Completed tasks this week: <strong>{progress.completed}</strong>
              </p>
              <p>
                Upcoming alerts: <strong>{upcomingTasks.length}</strong>
              </p>
              <p>
                Overdue tasks: <strong>{overdueTasks.length}</strong>
              </p>
              <div className="rounded-lg bg-indigo-50 p-3 text-indigo-700">
                {notes[0]}
              </div>
            </div>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
