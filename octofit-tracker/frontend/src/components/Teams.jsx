import { useEffect, useState } from 'react'
import { apiBaseUrl, fetchCollection } from '../api.js'

function Teams() {
  const [teams, setTeams] = useState([])
  const [error, setError] = useState('')

  useEffect(() => {
    fetchCollection(`${apiBaseUrl}/api/teams/`).then(setTeams).catch((loadError) => setError(loadError.message))
  }, [])

  return <section className="page-section"><div className="page-heading"><div><p className="eyebrow">Collective effort</p><h1>Teams</h1><p className="page-intro">Groups turning consistency into momentum.</p></div><span className="count-badge">{teams.length} teams</span></div>{error ? <p className="alert alert-danger">{error}</p> : <div className="card-grid">{teams.map((team) => <article className="feature-card" key={team._id}><div className="card-topline"><span className="team-mark">{team.name?.slice(0, 1)}</span><span className="points-label">{team.totalPoints} pts</span></div><h2>{team.name}</h2><p>{team.description}</p><div className="member-stack"><span>{team.members?.length || 0} members</span>{team.members?.slice(0, 4).map((member) => <span className="avatar small" key={member._id}>{member.name?.slice(0, 2).toUpperCase()}</span>)}</div></article>)}{teams.length === 0 && <p className="empty-state">No teams created yet.</p>}</div>}</section>
}

export default Teams
