import SearchBar from '../SearchBar/SearchBar'
import { priorities, sortOptions, taskStatuses } from '../../../constants/status'

const FilterBar = ({ filters, onChange, categories }) => {
  const updateFilter = (name, value) => {
    onChange({ ...filters, [name]: value })
  }

  return (
    <div className='grid gap-3 rounded-lg border border-slate-200 bg-white p-4 shadow-sm lg:grid-cols-[1.4fr_repeat(4,1fr)]'>
      <SearchBar value={filters.search} onChange={(value) => updateFilter('search', value)} />

      <select
        value={filters.subject}
        onChange={(event) => updateFilter('subject', event.target.value)}
        className='rounded-lg border border-slate-200 px-3 py-3 text-sm outline-none'
      >
        <option>All</option>
        {categories.map((category) => (
          <option key={category.id}>{category.name}</option>
        ))}
      </select>

      <select
        value={filters.priority}
        onChange={(event) => updateFilter('priority', event.target.value)}
        className='rounded-lg border border-slate-200 px-3 py-3 text-sm outline-none'
      >
        {priorities.map((priority) => (
          <option key={priority}>{priority}</option>
        ))}
      </select>

      <select
        value={filters.status}
        onChange={(event) => updateFilter('status', event.target.value)}
        className='rounded-lg border border-slate-200 px-3 py-3 text-sm outline-none'
      >
        {taskStatuses.map((status) => (
          <option key={status}>{status}</option>
        ))}
      </select>

      <select
        value={filters.sortBy}
        onChange={(event) => updateFilter('sortBy', event.target.value)}
        className='rounded-lg border border-slate-200 px-3 py-3 text-sm outline-none'
      >
        {sortOptions.map((option) => (
          <option key={option}>{option}</option>
        ))}
      </select>
    </div>
  )
}

export default FilterBar
