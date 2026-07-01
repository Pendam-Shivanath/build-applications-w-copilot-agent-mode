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

function Leaderboard() {
  const [entries, setEntries] = useState([])
  const [error, setError] = useState('')

  useEffect(() => {
    const loadEntries = async () => {
      try {
        const response = await fetch(`${resolveApiBaseUrl()}/leaderboard/`)
        if (!response.ok) {
          throw new Error(`Leaderboard request failed: ${response.status}`)
        }
        const payload = await response.json()
        setEntries(normalizeItems(payload))
      } catch (requestError) {
        setError(requestError instanceof Error ? requestError.message : 'Unable to load leaderboard')
      }
    }

    void loadEntries()
  }, [])

  return (
    <section>
      <h2 className="h4">Leaderboard</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      <ol className="list-group list-group-numbered">
        {entries.map((entry) => (
          <li key={entry._id ?? entry.id ?? entry.rank} className="list-group-item d-flex justify-content-between align-items-center">
            <div>
              <div className="fw-semibold">{entry.team?.name ?? 'Team'}</div>
              <div className="small text-muted">Rank {entry.rank ?? '-'}</div>
            </div>
            <span className="badge text-bg-success rounded-pill">{entry.score ?? 0}</span>
          </li>
        ))}
      </ol>
    </section>
  )
}

export default Leaderboard
