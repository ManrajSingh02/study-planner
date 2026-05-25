import { useContext } from "react";
import { Link } from "react-router";
import Button from "../components/atoms/Button/Button";
import { ThemeContext } from "../context/ThemeContext";

const Landing = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <main className="min-h-screen bg-slate-50 transition-colors [html.dark_&]:bg-slate-950">
      <div className="mx-auto flex max-w-7xl justify-end px-4 pt-4">
        <Button
          variant="secondary"
          onClick={toggleTheme}
          className="[html.dark_&]:border-slate-700 [html.dark_&]:bg-slate-900 [html.dark_&]:text-slate-100 [html.dark_&]:hover:bg-slate-800"
        >
          {theme === "dark" ? "Light" : "Dark"}
        </Button>
      </div>

      <section className="mx-auto grid min-h-[88vh] max-w-7xl items-center gap-10 px-4 py-10 lg:grid-cols-[1.1fr_0.9fr]">
        <div>
          <p className="text-sm font-bold uppercase tracking-wide text-indigo-600 [html.dark_&]:text-indigo-400">
            StudyMate
          </p>
          <h1 className="mt-4 text-4xl font-black leading-tight text-slate-950 [html.dark_&]:text-slate-50 md:text-6xl">
            Plan studies, manage deadlines, and track progress in one clean
            place.
          </h1>
          <p className="mt-5 max-w-2xl text-lg text-slate-600 [html.dark_&]:text-slate-300">
            A student-friendly workspace for daily tasks, subjects, priorities,
            upcoming deadlines, notes, and productivity goals.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link to="/register">
              <Button className="px-5 py-3">Create account</Button>
            </Link>
            <Link to="/login">
              <Button
                variant="secondary"
                className="px-5 py-3 [html.dark_&]:border-slate-700 [html.dark_&]:bg-slate-900 [html.dark_&]:text-slate-100 [html.dark_&]:hover:bg-slate-800"
              >
                Log in
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Landing;
