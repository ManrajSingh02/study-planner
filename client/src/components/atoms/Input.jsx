const Input = ({
  label,
  error,
  required = false,
  className = "",
  ...props
}) => {
  return (
    <label className="flex flex-col gap-2 text-sm font-medium text-slate-700">
      <span>
        {label}
        {required && (
          <span className="ml-1 text-red-500">*</span>
        )}
      </span>

      <input
        {...props}
        className={`rounded-lg border ${
          error
            ? "border-red-500"
            : "border-slate-200"
        } bg-white px-3 py-2.5 text-slate-900 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 ${className}`}
      />

      {error ? (
        <span className="text-xs text-red-500">
          {error}
        </span>
      ) : null}
    </label>
  );
};

export default Input;
