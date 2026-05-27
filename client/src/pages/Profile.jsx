import { useContext, useEffect, useState } from "react";
import Button from "../components/atoms/Button";
import Card from "../components/atoms/Card";
import Input from "../components/atoms/Input";
import DashboardLayout from "../components/DashboardLayout";
import { AuthContext } from "../context/AuthContext";
import { TaskContext } from "../context/TaskContext";

const Profile = () => {
  const { user, updateUser } = useContext(AuthContext);
  const { notes, setNotes, goals, setGoals } = useContext(TaskContext);

  const [name, setName] = useState(user?.name || "");
  const [goalDraft, setGoalDraft] = useState(goals);
  const [note, setNote] = useState("");

  useEffect(() => {
    setGoalDraft(goals);
  }, [goals]);

  const saveProfile = (event) => {
    event.preventDefault();
    setGoals(goalDraft, { persist: false });
    updateUser({ name, goals: goalDraft });
  };

  const addNote = (event) => {
    event.preventDefault();

    if (!note.trim()) return;

    setNotes((current) => [note.trim(), ...current]);
    setNote("");
  };

  const removeNote = (noteIndex) => {
    setNotes((current) => current.filter((_, index) => index !== noteIndex));
  };

  const increaseHours = () => {
    if (goalDraft.dailyHours < 18) {
      setGoalDraft({
        ...goalDraft,
        dailyHours: goalDraft.dailyHours + 1,
      });
    }
  };

  const decreaseHours = () => {
    if (goalDraft.dailyHours > 0) {
      setGoalDraft({
        ...goalDraft,
        dailyHours: goalDraft.dailyHours - 1,
      });
    }
  };

  const increaseTasks = () => {
    setGoalDraft({
      ...goalDraft,
      dailyTasks: goalDraft.dailyTasks + 1,
    });
  };

  const decreaseTasks = () => {
    if (goalDraft.dailyTasks > 0) {
      setGoalDraft({
        ...goalDraft,
        dailyTasks: goalDraft.dailyTasks - 1,
      });
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-black text-slate-950">Profile</h1>

          <p className="mt-1 text-slate-500">
            Set your daily goals and keep quick notes.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <Card>
            <h2 className="text-xl font-bold text-slate-950">Account</h2>

            <form onSubmit={saveProfile} className="mt-5 space-y-4">
              <Input
                label="Display name"
                value={name}
                onChange={(event) => setName(event.target.value)}
              />

              <Input label="Email" value={user?.email || ""} disabled />

              <Button type="submit">Save profile</Button>
            </form>
          </Card>

          <Card className="border border-slate-200 bg-white shadow-sm">
            <h2 className="text-2xl font-bold text-slate-900">Daily goals</h2>

            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <div className="rounded-xl border border-slate-200 p-4">
                <p className="text-sm font-medium text-slate-500">
                  Study hours
                </p>

                <div className="mt-4 flex items-center justify-between">
                  <button
                    type="button"
                    onClick={decreaseHours}
                    className="flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 bg-slate-100 text-xl font-bold text-slate-700 transition hover:bg-slate-200"
                  >
                    -
                  </button>

                  <span className="text-3xl font-bold text-slate-900">
                    {goalDraft.dailyHours}
                  </span>

                  <button
                    type="button"
                    onClick={increaseHours}
                    className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-600 text-xl font-bold text-white transition hover:bg-blue-500"
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="rounded-xl border border-slate-200 p-4">
                <p className="text-sm font-medium text-slate-500">
                  Tasks to finish
                </p>

                <div className="mt-4 flex items-center justify-between">
                  <button
                    type="button"
                    onClick={decreaseTasks}
                    className="flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 bg-slate-100 text-xl font-bold text-slate-700 transition hover:bg-slate-200"
                  >
                    -
                  </button>

                  <span className="text-3xl font-bold text-slate-900">
                    {goalDraft.dailyTasks}
                  </span>

                  <button
                    type="button"
                    onClick={increaseTasks}
                    className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-600 text-xl font-bold text-white transition hover:bg-blue-500"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
          </Card>
        </div>

        <Card>
          <h2 className="text-xl font-bold text-slate-950">Quick notes</h2>

          <form
            onSubmit={addNote}
            className="mt-4 flex flex-col gap-3 sm:flex-row"
          >
            <input
              value={note}
              onChange={(event) => setNote(event.target.value)}
              placeholder="Write a short study note"
              className="flex-1 rounded-lg border border-slate-200 px-4 py-3 text-sm outline-none"
            />

            <Button type="submit">Add note</Button>
          </form>

          <div className="mt-5 grid gap-3 md:grid-cols-2">
            {notes.map((item, index) => (
              <div
                key={`${item}-${index}`}
                className="flex items-start justify-between gap-3 rounded-lg bg-amber-50 p-4 text-sm font-medium text-amber-800"
              >
                <span>{item}</span>

                <button
                  type="button"
                  onClick={() => removeNote(index)}
                  className="text-xs font-bold text-amber-700 hover:text-red-600"
                  aria-label="Remove note"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Profile;
