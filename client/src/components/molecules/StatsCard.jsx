import Card from "../atoms/Card";

const StatsCard = ({ title, value, helper, tone = "indigo" }) => {
  const tones = {
    indigo: "bg-indigo-50 text-indigo-700",
    green: "bg-emerald-50 text-emerald-700",
    amber: "bg-amber-50 text-amber-700",
    red: "bg-red-50 text-red-700",
  };

  return (
    <Card>
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-sm font-medium text-slate-500">{title}</p>
          <p className="mt-2 text-3xl font-bold text-slate-950">{value}</p>
        </div>
        <span
          className={`rounded-lg px-3 py-2 text-sm font-bold ${tones[tone]}`}
        >
          {helper}
        </span>
      </div>
    </Card>
  );
};

export default StatsCard;
