import { useEffect, useState } from 'react'

const resolveApiBaseUrl = () => {
  const codespaceName = import.meta.env.VITE_CODESPACE_NAME
  if (codespaceName) {
    return `https://${codespaceName}-8000.app.github.dev/api`
  }
  return 'http://localhost:8000/api'
}

const normalizeItems = (payload) => {
  if (Array.isArray(payload)) {
    return payload
  }

  if (!payload || typeof payload !== 'object') {
    return []
  }

  if (Array.isArray(payload.items)) {
    return payload.items
  }

  if (Array.isArray(payload.data)) {
    return payload.data
  }

  if (payload.results && Array.isArray(payload.results)) {
    return payload.results
  }

  if (payload.data && Array.isArray(payload.data.items)) {
    return payload.data.items
  }

  return []
}

function Users() {
  const [users, setUsers] = useState([])
  const [error, setError] = useState('')

  useEffect(() => {
    const loadUsers = async () => {
      try {
        const response = await fetch(`${resolveApiBaseUrl()}/users/`)
        if (!response.ok) {
          throw new Error(`Users request failed: ${response.status}`)
        }
        const payload = await response.json()
        setUsers(normalizeItems(payload))
      } catch (requestError) {
        setError(requestError instanceof Error ? requestError.message : 'Unable to load users')
      }
    }

    void loadUsers()
  }, [])

  return (
    <section>
      <h2 className="h4">Users</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      <ul className="list-group">
        {users.map((user) => (
          <li key={user._id ?? user.id ?? user.email} className="list-group-item">
            <div className="fw-semibold">{user.name}</div>
            <div className="small text-muted">{user.email}</div>
          </li>
        ))}
      </ul>
    </section>
  )
}

export default Users
