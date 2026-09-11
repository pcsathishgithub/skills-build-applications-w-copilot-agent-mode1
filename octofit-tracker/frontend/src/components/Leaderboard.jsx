import { useEffect, useState } from 'react'
import { apiBaseUrl, fetchCollection } from '../api.js'

function Leaderboard() {
  const [entries, setEntries] = useState([])
  const [error, setError] = useState('')

  useEffect(() => {
    fetchCollection(`${apiBaseUrl}/api/leaderboard/`).then(setEntries).catch((loadError) => setError(loadError.message))
  }, [])

  return (
    <section className="page-section"><div className="page-heading"><div><p className="eyebrow">Weekly pulse</p><h1>Leaderboard</h1><p className="page-intro">A clear view of who is setting the pace.</p></div><span className="count-badge">{entries.length} ranked</span></div>{error ? <p className="alert alert-danger">{error}</p> : <div className="leaderboard-list">{entries.map((entry) => <article className={`leaderboard-row rank-${entry.rank}`} key={entry._id}><span className="rank">{String(entry.rank).padStart(2, '0')}</span><span className="avatar">{entry.user?.name?.slice(0, 2).toUpperCase() || 'OF'}</span><span className="leader-name"><strong>{entry.user?.name || 'Unknown member'}</strong><small>{entry.team?.name || 'No team'}</small></span><span className="points"><strong>{entry.points}</strong> pts</span></article>)}{entries.length === 0 && <p className="empty-state">No rankings available yet.</p>}</div>}</section>
  )
}

export default Leaderboard
