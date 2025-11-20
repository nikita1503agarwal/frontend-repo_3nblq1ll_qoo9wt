import { useEffect, useMemo, useState } from 'react'
import TodoInput from './components/TodoInput'
import TodoList from './components/TodoList'

function App() {
  const baseUrl = useMemo(() => import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000', [])
  const [todos, setTodos] = useState([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('all')
  const [error, setError] = useState('')

  const fetchTodos = async () => {
    try {
      setLoading(true)
      setError('')
      const res = await fetch(`${baseUrl}/api/todos`)
      const data = await res.json()
      setTodos(Array.isArray(data) ? data : [])
    } catch (e) {
      setError('Unable to load tasks. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchTodos()
  }, [])

  const addTodo = async (payload) => {
    const res = await fetch(`${baseUrl}/api/todos`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })
    if (!res.ok) throw new Error('Failed to add')
    const newTodo = await res.json()
    setTodos((prev) => [newTodo, ...prev])
  }

  const toggleTodo = async (todo) => {
    const res = await fetch(`${baseUrl}/api/todos/${todo.id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ completed: !todo.completed }),
    })
    if (!res.ok) return
    const updated = await res.json()
    setTodos((prev) => prev.map((t) => (t.id === updated.id ? updated : t)))
  }

  const deleteTodo = async (todo) => {
    const res = await fetch(`${baseUrl}/api/todos/${todo.id}`, { method: 'DELETE' })
    if (res.status === 204 || res.ok) {
      setTodos((prev) => prev.filter((t) => t.id !== todo.id))
    }
  }

  const filtered = todos.filter((t) =>
    filter === 'all' ? true : filter === 'active' ? !t.completed : t.completed
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.05),transparent_50%)]"></div>

      <div className="relative min-h-screen flex items-center justify-center p-6">
        <div className="w-full max-w-2xl space-y-6">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-white">Todo List</h1>
            <p className="text-blue-200 mt-2">Simple, fast, and synced to the cloud</p>
          </div>

          <TodoInput onAdd={addTodo} />

          <div className="flex items-center justify-between">
            <div className="text-sm text-slate-300">{todos.length} total</div>
            <div className="flex gap-2">
              <button onClick={() => setFilter('all')} className={`px-3 py-1 rounded-lg text-sm border ${filter==='all' ? 'bg-blue-600 text-white border-blue-600' : 'border-slate-600 text-slate-300 hover:border-slate-500'}`}>All</button>
              <button onClick={() => setFilter('active')} className={`px-3 py-1 rounded-lg text-sm border ${filter==='active' ? 'bg-blue-600 text-white border-blue-600' : 'border-slate-600 text-slate-300 hover:border-slate-500'}`}>Active</button>
              <button onClick={() => setFilter('completed')} className={`px-3 py-1 rounded-lg text-sm border ${filter==='completed' ? 'bg-blue-600 text-white border-blue-600' : 'border-slate-600 text-slate-300 hover:border-slate-500'}`}>Completed</button>
            </div>
          </div>

          {error && (<div className="text-red-400 text-sm">{error}</div>)}

          {loading ? (
            <div className="text-slate-300">Loading...</div>
          ) : (
            <TodoList todos={filtered} onToggle={toggleTodo} onDelete={deleteTodo} />
          )}

          <div className="text-center text-blue-300/60 text-sm pt-4">
            Data persists automatically. Use the Test page to check connections.
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
