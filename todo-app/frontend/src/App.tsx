import { useState, useEffect } from 'react'

interface Todo {
  id: number
  title: string
  completed: boolean
  created_at: string
}

function App() {
  const [todos, setTodos] = useState<Todo[]>([])
  const [title, setTitle] = useState('')

  useEffect(() => {
    const loadTodos = async () => {
    const res = await fetch('http://localhost:3000/api/todos')
    const data = await res.json()
    setTodos(data)
  }
  loadTodos()
}, [])

// TODO一覧取得
  const fetchTodos = async () => {
    const res = await fetch('http://localhost:3000/api/todos')
    const data = await res.json()
    setTodos(data)
  }
  

  // TODO作成
  const createTodo = async () => {
    if (!title.trim()) return
    await fetch('http://localhost:3000/api/todos', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title }),
    })
    setTitle('')
    fetchTodos()
  }

  // TODO完了・未完了の切り替え
  const toggleTodo = async (id: number, completed: boolean) => {
    await fetch(`http://localhost:3000/api/todos/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ completed: !completed }),
    })
    fetchTodos()
  }

  // TODO削除
  const deleteTodo = async (id: number) => {
    await fetch(`http://localhost:3000/api/todos/${id}`, {
      method: 'DELETE',
    })
    fetchTodos()
  }

  return (
    <div style={{ maxWidth: '600px', margin: '40px auto', padding: '0 20px' }}>
      <h1>TODO アプリ</h1>

      {/* 入力フォーム */}
      <div style={{ display: 'flex', gap: '8px', marginBottom: '24px' }}>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && createTodo()}
          placeholder="TODOを入力..."
          style={{ flex: 1, padding: '8px', fontSize: '16px' }}
        />
        <button onClick={createTodo} style={{ padding: '8px 16px' }}>
          追加
        </button>
      </div>

      {/* TODOリスト */}
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {todos.map((todo) => (
          <li
            key={todo.id}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '12px 0',
              borderBottom: '1px solid #eee',
            }}
          >
            <input
              type="checkbox"
              checked={!!todo.completed}
              onChange={() => toggleTodo(todo.id, !!todo.completed)}
            />
            <span
              style={{
                flex: 1,
                textDecoration: todo.completed ? 'line-through' : 'none',
                color: todo.completed ? '#999' : 'inherit',
              }}
            >
              {todo.title}
            </span>
            <button onClick={() => deleteTodo(todo.id)}>削除</button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default App
