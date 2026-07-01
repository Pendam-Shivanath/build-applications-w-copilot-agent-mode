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

function Activities() {
  const [activities, setActivities] = useState([])
  const [error, setError] = useState('')

  useEffect(() => {
    const loadActivities = async () => {
      try {
        const response = await fetch(`${resolveApiBaseUrl()}/activities/`)
        if (!response.ok) {
          throw new Error(`Activities request failed: ${response.status}`)
        }
        const payload = await response.json()
        setActivities(normalizeItems(payload))
      } catch (requestError) {
        setError(requestError instanceof Error ? requestError.message : 'Unable to load activities')
      }
    }

    void loadActivities()
  }, [])

  return (
    <section>
      <h2 className="h4">Activities</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      <ul className="list-group">
        {activities.map((activity) => (
          <li key={activity._id ?? activity.id} className="list-group-item">
            <div className="fw-semibold text-capitalize">{activity.type}</div>
            <div className="small text-muted">
              {activity.durationMinutes ?? 0} min, {activity.caloriesBurned ?? 0} calories
            </div>
          </li>
        ))}
      </ul>
    </section>
  )
}

export default Activities
