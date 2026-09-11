import { useEffect, useState } from 'react'
import { fetchCollection } from '../api.js'

function Workouts() {
  const [workouts, setWorkouts] = useState([])
  const [error, setError] = useState('')

  useEffect(() => {
    fetchCollection('workouts').then(setWorkouts).catch((loadError) => setError(loadError.message))
  }, [])

  return <section className="page-section"><div className="page-heading"><div><p className="eyebrow">Suggested sessions</p><h1>Workouts</h1><p className="page-intro">Practical sessions matched to the team's next move.</p></div><span className="count-badge">{workouts.length} sessions</span></div>{error ? <p className="alert alert-danger">{error}</p> : <div className="card-grid workout-grid">{workouts.map((workout) => <article className="feature-card workout-card" key={workout._id}><div className="workout-meta"><span className="type-pill">{workout.category}</span><span>{workout.durationMinutes} min</span></div><h2>{workout.title}</h2><p>{workout.description}</p><div className="card-footer"><span>{workout.difficulty}</span><span>{workout.equipment?.join(' / ') || 'No equipment'}</span></div></article>)}{workouts.length === 0 && <p className="empty-state">No workouts available.</p>}</div>}</section>
}

export default Workouts
