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

function Teams() {
  const [teams, setTeams] = useState([])
  const [error, setError] = useState('')

  useEffect(() => {
    const loadTeams = async () => {
      try {
        const response = await fetch(`${resolveApiBaseUrl()}/teams/`)
        if (!response.ok) {
          throw new Error(`Teams request failed: ${response.status}`)
        }
        const payload = await response.json()
        setTeams(normalizeItems(payload))
      } catch (requestError) {
        setError(requestError instanceof Error ? requestError.message : 'Unable to load teams')
      }
    }

    void loadTeams()
  }, [])

  return (
    <section>
      <h2 className="h4">Teams</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      <ul className="list-group">
        {teams.map((team) => (
          <li key={team._id ?? team.id ?? team.name} className="list-group-item d-flex justify-content-between align-items-center">
            <div>
              <div className="fw-semibold">{team.name}</div>
              <div className="small text-muted">{team.city}</div>
            </div>
            <span className="badge text-bg-primary rounded-pill">{team.points ?? 0} pts</span>
          </li>
        ))}
      </ul>
    </section>
  )
}

export default Teams
