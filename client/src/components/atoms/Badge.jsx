const Badge = ({ text, className = '' }) => {
  return (
    <span className={`inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-semibold ${className}`}>
      {text}
    </span>
  )
}

export default Badge
