import TodoItem from './TodoItem'

function TodoList({ todos, onToggle, onDelete }) {
  if (!todos.length) {
    return (
      <div className="text-center text-slate-400 py-6">
        No tasks yet. Add your first task above.
      </div>
    )
  }

  return (
    <div className="space-y-2">
      {todos.map((t) => (
        <TodoItem key={t.id} todo={t} onToggle={onToggle} onDelete={onDelete} />
      ))}
    </div>
  )
}

export default TodoList
