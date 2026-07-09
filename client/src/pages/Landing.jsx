import { useContext } from "react";
import { NavLink } from "react-router";
import Button from "../components/atoms/Button";
import { ThemeContext } from "../context/ThemeContext";

const features = [
  {
    title: "Task Planning",
    desc: "Organize assignments, projects, and study goals efficiently.",
    icon: "✅",
  },
  {
    title: "Smart Scheduling",
    desc: "Track classes, exams, and deadlines in one calendar.",
    icon: "📅",
  },
  {
    title: "Progress Tracking",
    desc: "Stay motivated with productivity and completion insights.",
    icon: "🎯",
  },
];

const Landing = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <main className="relative overflow-hidden bg-slate-50 transition-colors [html.dark_&]:bg-slate-950">
      <div className="absolute left-0 top-0 h-72 w-72 rounded-full bg-indigo-300/30 blur-3xl"></div>
      <div className="absolute bottom-0 right-0 h-72 w-72 rounded-full bg-purple-300/20 blur-3xl"></div>

      <div className="relative z-10 mx-auto flex max-w-7xl items-center justify-between px-4 py-5">
        <div className="flex items-center gap-3">
          <img
            src="/favicon.svg"
            alt="StudyMate"
            className="h-11 w-11 rounded-2xl shadow-lg shadow-indigo-500/20"
          />
          <h2 className="text-2xl font-black text-indigo-600 [html.dark_&]:text-indigo-400">
            StudyMate
          </h2>
        </div>

        <Button
          variant="secondary"
          onClick={toggleTheme}
          className="[html.dark_&]:border-slate-700 [html.dark_&]:bg-slate-900 [html.dark_&]:text-slate-100"
        >
          {theme === "dark" ? "Light" : "Dark"}
        </Button>
      </div>

      <section className="relative z-10 mx-auto grid min-h-[90vh] max-w-7xl items-center gap-14 px-4 py-10 lg:grid-cols-2">
        <div>
          <p className="inline-flex rounded-full bg-indigo-100 px-4 py-1 text-sm font-semibold text-indigo-700 [html.dark_&]:bg-indigo-500/10 [html.dark_&]:text-indigo-300">
            Student Productivity Platform
          </p>

          <h1 className="mt-6 text-5xl font-black leading-tight text-slate-900 [html.dark_&]:text-white md:text-6xl">
            Plan studies, manage deadlines, and track progress smarter.
          </h1>

          <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600 [html.dark_&]:text-slate-300">
            StudyMate helps students organize tasks, manage subjects, track
            goals, save notes, and stay productive with a clean and modern
            workspace.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <NavLink to="/register">
              <Button className="rounded-xl px-6 py-3 text-base shadow-lg shadow-indigo-500/30">
                Get Started
              </Button>
            </NavLink>

            <NavLink to="/login">
              <Button
                variant="secondary"
                className="rounded-xl px-6 py-3 text-base [html.dark_&]:border-slate-700 [html.dark_&]:bg-slate-900 [html.dark_&]:text-slate-100"
              >
                Login
              </Button>
            </NavLink>
          </div>

          <div className="mt-12 flex flex-wrap gap-8">
            <div>
              <h3 className="text-3xl font-black text-slate-900 [html.dark_&]:text-white">
                10K+
              </h3>
              <p className="text-slate-600 [html.dark_&]:text-slate-400">
                Tasks Managed
              </p>
            </div>

            <div>
              <h3 className="text-3xl font-black text-slate-900 [html.dark_&]:text-white">
                500+
              </h3>
              <p className="text-slate-600 [html.dark_&]:text-slate-400">
                Students
              </p>
            </div>

            <div>
              <h3 className="text-3xl font-black text-slate-900 [html.dark_&]:text-white">
                99%
              </h3>
              <p className="text-slate-600 [html.dark_&]:text-slate-400">
                Productivity Boost
              </p>
            </div>
          </div>
        </div>

        <div className="relative">
          <div className="rounded-3xl border border-white/20 bg-white/70 p-6 shadow-2xl backdrop-blur-xl [html.dark_&]:border-slate-800 [html.dark_&]:bg-slate-900/70">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-bold text-slate-900 [html.dark_&]:text-white">
                Today's Schedule
              </h3>

              <div className="rounded-full bg-indigo-100 p-3 text-xl [html.dark_&]:bg-indigo-500/10">
                ⏰
              </div>
            </div>

            <div className="mt-6 space-y-4">
              <div className="rounded-2xl bg-indigo-500 p-5 text-white shadow-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm opacity-80">Upcoming Exam</p>
                    <h4 className="mt-1 text-lg font-bold">Database Systems</h4>
                  </div>

                  <span className="text-2xl">📚</span>
                </div>

                <p className="mt-4 text-sm opacity-90">Tomorrow • 10:00 AM</p>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-white p-5 [html.dark_&]:border-slate-700 [html.dark_&]:bg-slate-900">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-semibold text-slate-900 [html.dark_&]:text-white">
                      Assignment Progress
                    </h4>

                    <p className="mt-1 text-sm text-slate-500">
                      7/10 completed
                    </p>
                  </div>

                  <div className="text-lg font-bold text-green-500">70%</div>
                </div>

                <div className="mt-4 h-3 overflow-hidden rounded-full bg-slate-200 [html.dark_&]:bg-slate-700">
                  <div className="h-full w-[70%] rounded-full bg-green-500"></div>
                </div>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-white p-5 [html.dark_&]:border-slate-700 [html.dark_&]:bg-slate-900">
                <h4 className="font-semibold text-slate-900 [html.dark_&]:text-white">
                  Study Streak
                </h4>

                <p className="mt-2 text-4xl font-black text-orange-500">
                  🔥 12 Days
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative z-10 mx-auto max-w-7xl px-4 pb-24">
        <div className="mb-14 text-center">
          <h2 className="text-4xl font-black text-slate-900 [html.dark_&]:text-white">
            Everything students need
          </h2>

          <p className="mt-4 text-lg text-slate-600 [html.dark_&]:text-slate-400">
            Powerful tools designed for better productivity and focus.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm transition hover:-translate-y-1 hover:shadow-xl [html.dark_&]:border-slate-800 [html.dark_&]:bg-slate-900"
            >
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-100 text-2xl [html.dark_&]:bg-indigo-500/10">
                {feature.icon}
              </div>

              <h3 className="mt-6 text-xl font-bold text-slate-900 [html.dark_&]:text-white">
                {feature.title}
              </h3>

              <p className="mt-3 leading-7 text-slate-600 [html.dark_&]:text-slate-400">
                {feature.desc}
              </p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
};

export default Landing;
