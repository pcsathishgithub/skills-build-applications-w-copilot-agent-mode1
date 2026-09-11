import { useEffect, useState } from 'react'
import { fetchCollection } from '../api.js'

function Activities() {
  const [activities, setActivities] = useState([])
  const [error, setError] = useState('')

  useEffect(() => {
    fetchCollection('activities').then(setActivities).catch((loadError) => setError(loadError.message))
  }, [])

  return (
    <section className="page-section">
      <div className="page-heading">
        <div><p className="eyebrow">Movement log</p><h1>Activities</h1><p className="page-intro">The latest work your team has put in.</p></div>
        <span className="count-badge">{activities.length} logged</span>
      </div>
      {error ? <p className="alert alert-danger">{error}</p> : <div className="data-table-wrap"><table className="data-table"><thead><tr><th>Member</th><th>Activity</th><th>Duration</th><th>Calories</th><th>Completed</th></tr></thead><tbody>{activities.map((activity) => <tr key={activity._id}><td><strong>{activity.user?.name || 'Unknown member'}</strong><small>{activity.team?.name || 'Independent'}</small></td><td><span className="type-pill">{activity.type}</span></td><td>{activity.durationMinutes} min</td><td>{activity.calories} kcal</td><td>{new Date(activity.completedAt).toLocaleDateString()}</td></tr>)}</tbody></table>{activities.length === 0 && <p className="empty-state">No activities logged yet.</p>}</div>}
    </section>
  )
}

export default Activities
