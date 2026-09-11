import { useState } from 'react'
import heroImg from './assets/hero.png'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import './App.css'

import { NavLink, Navigate, Route, Routes } from 'react-router-dom'
import Activities from './components/Activities.jsx'
import Leaderboard from './components/Leaderboard.jsx'
import Teams from './components/Teams.jsx'
import Users from './components/Users.jsx'
import Workouts from './components/Workouts.jsx'
import { apiBaseUrl } from './api.js'
import './App.css'

const navigation = [
  { to: '/activities', label: 'Activities', icon: '↗' },
  { to: '/leaderboard', label: 'Leaderboard', icon: '★' },
  { to: '/teams', label: 'Teams', icon: '◈' },
  { to: '/users', label: 'Users', icon: '○' },
  { to: '/workouts', label: 'Workouts', icon: '▦' },
]

function App() {
  return (
    <div className="app-shell">
      <header className="topbar">
        <NavLink className="brand" to="/activities">
          <span className="brand-mark">O</span>
          <span>
            <strong>OctoFit</strong>
            <small>team performance lab</small>
          </span>
        </NavLink>
        <div className="api-status">
          <span className="status-dot" /> API connected
          <code>{apiBaseUrl.replace('https://', '').replace('http://', '')}</code>
        </div>
      </header>

      <div className="app-body">
        <aside className="sidebar" aria-label="Primary navigation">
          <p className="eyebrow">Workspace</p>
          <nav>
            {navigation.map((item) => (
              <NavLink className="nav-link" key={item.to} to={item.to}>
                <span>{item.icon}</span>{item.label}
              </NavLink>
            ))}
          </nav>
          <div className="sidebar-note">
            <span className="eyebrow">Live data</span>
            <p>Synced from your OctoFit API.</p>
          </div>
        </aside>

        <main className="main-content">
          <Routes>
            <Route path="/activities" element={<Activities />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
            <Route path="/teams" element={<Teams />} />
            <Route path="/users" element={<Users />} />
            <Route path="/workouts" element={<Workouts />} />
            <Route path="*" element={<Navigate replace to="/activities" />} />
          </Routes>
        </main>
      </div>
    </div>
  )
}

export default App
