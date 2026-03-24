import { useState } from 'react'
import { Routes, Route, NavLink } from 'react-router-dom'
import Dashboard from './pages/Dashboard.jsx'
import Subjects from './pages/Subjects.jsx'
import { resetAll } from './storage.js'

function ConfirmReset({ onConfirm, onCancel }) {
  const [loading, setLoading] = useState(false)
  const handleReset = () => {
    setLoading(true)
    onConfirm()
    setLoading(false)
  }
  return (
    <div className="confirm-overlay">
      <div className="confirm-box">
        <h3>Reset all progress?</h3>
        <p>This will permanently delete all your topic completions, tests, and PYQ records. This cannot be undone.</p>
        <div className="confirm-actions">
          <button className="btn-ghost" onClick={onCancel} style={{ padding: '9px 18px', borderRadius: '8px', fontSize: '14px' }}>Cancel</button>
          <button className="btn-danger" onClick={handleReset} disabled={loading}>
            {loading ? 'Resetting...' : 'Yes, reset'}
          </button>
        </div>
      </div>
    </div>
  )
}

export default function App() {
  const [showResetConfirm, setShowResetConfirm] = useState(false)
  const [refreshKey, setRefreshKey] = useState(0)

  const handleReset = () => {
    resetAll()
    setRefreshKey(k => k + 1)
    setShowResetConfirm(false)
  }

  return (
    <>
      <div className="cosmic-bg" />
      <div className="app-layout">
        <aside className="sidebar">
          <div className="sidebar-logo">
            <span className="logo-icon">🚀</span>
            <span className="logo-text">GATE Orbit</span>
          </div>
          <nav className="sidebar-nav">
            <NavLink to="/" end className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}>
              <span className="nav-icon">📊</span>
              Dashboard
            </NavLink>
            <NavLink to="/subjects" className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}>
              <span className="nav-icon">📚</span>
              Subjects
            </NavLink>
          </nav>
          <div className="sidebar-bottom">
            <button className="reset-btn" onClick={() => setShowResetConfirm(true)}>
              🗑 Reset Journey
            </button>
          </div>
        </aside>

        <main className="main-content">
          <Routes>
            <Route path="/" element={<Dashboard refreshKey={refreshKey} />} />
            <Route path="/subjects" element={<Subjects refreshKey={refreshKey} onUpdate={() => setRefreshKey(k => k + 1)} />} />
          </Routes>
        </main>
      </div>

      {showResetConfirm && (
        <ConfirmReset
          onConfirm={handleReset}
          onCancel={() => setShowResetConfirm(false)}
        />
      )}
    </>
  )
}
