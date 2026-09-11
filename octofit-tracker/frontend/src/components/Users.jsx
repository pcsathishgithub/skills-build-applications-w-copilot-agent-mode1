import { useEffect, useState } from 'react'
import { apiBaseUrl, fetchCollection } from '../api.js'

function Users() {
  const [users, setUsers] = useState([])
  const [error, setError] = useState('')

  useEffect(() => {
    fetchCollection(`${apiBaseUrl}/api/users/`).then(setUsers).catch((loadError) => setError(loadError.message))
  }, [])

  return <section className="page-section"><div className="page-heading"><div><p className="eyebrow">Your people</p><h1>Users</h1><p className="page-intro">Everyone contributing to the OctoFit rhythm.</p></div><span className="count-badge">{users.length} members</span></div>{error ? <p className="alert alert-danger">{error}</p> : <div className="people-grid">{users.map((user) => <article className="person-card" key={user._id}><span className="avatar large">{user.avatar || user.name?.slice(0, 2).toUpperCase()}</span><div><h2>{user.name}</h2><p>@{user.username}</p><small>{user.email}</small></div></article>)}{users.length === 0 && <p className="empty-state">No users found.</p>}</div>}</section>
}

export default Users
