import Card from "../atoms/Card";

const EmptyState = ({
  title = "Nothing here yet",
  message = "Add an item to get started.",
}) => {
  return (
    <Card className="py-10 text-center">
      <h2 className="text-lg font-bold text-slate-900">{title}</h2>
      <p className="mt-2 text-sm text-slate-500">{message}</p>
    </Card>
  );
};

export default EmptyState;
