import { Link } from "react-router";
import Button from "../components/atoms/Button";

const NotFound = () => {
  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-50 p-4 text-center">
      <div>
        <p className="text-sm font-bold uppercase tracking-wide text-indigo-600">
          Page not found
        </p>
        <h1 className="mt-3 text-5xl font-black text-slate-950">404</h1>
        <p className="mt-3 text-slate-500">
          This page is not part of your planner.
        </p>
        <Link to="/dashboard" className="mt-6 inline-block">
          <Button>Back to dashboard</Button>
        </Link>
      </div>
    </main>
  );
};

export default NotFound;
