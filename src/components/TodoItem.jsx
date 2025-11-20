function TodoItem({ todo, onToggle, onDelete }) {
  return (
    <div className="flex items-start gap-3 bg-slate-800/40 border border-slate-700 rounded-lg p-3">
      <button
        onClick={() => onToggle(todo)}
        className={`mt-1 w-5 h-5 rounded border flex items-center justify-center transition-colors ${
          todo.completed ? 'bg-green-500 border-green-500' : 'bg-slate-900/70 border-slate-600'
        }`}
        aria-label={todo.completed ? 'Mark as incomplete' : 'Mark as complete'}
      >
        {todo.completed && (
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" className="w-3 h-3">
            <path d="M5 13l4 4L19 7" />
          </svg>
        )}
      </button>
      <div className="flex-1">
        <p className={`text-slate-100 ${todo.completed ? 'line-through opacity-60' : ''}`}>{todo.title}</p>
        {todo.notes && <p className="text-slate-400 text-sm mt-1">{todo.notes}</p>}
      </div>
      <button
        onClick={() => onDelete(todo)}
        className="text-slate-300 hover:text-red-400 transition-colors"
        aria-label="Delete"
        title="Delete"
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
          <path d="M3 6h18M9 6v12m6-12v12M5 6l1 14a2 2 0 002 2h8a2 2 0 002-2l1-14M10 6l1-2h2l1 2" />
        </svg>
      </button>
    </div>
  )
}

export default TodoItem
