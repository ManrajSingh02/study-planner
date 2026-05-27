const SearchBar = ({ value, onChange, placeholder = 'Search tasks...' }) => {
  return (
    <input
      type='search'
      value={value}
      onChange={(event) => onChange(event.target.value)}
      placeholder={placeholder}
      className='w-full rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100'
    />
  )
}

export default SearchBar
