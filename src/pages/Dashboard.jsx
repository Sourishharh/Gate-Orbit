import { useState, useEffect } from 'react'
import { getDashboard } from '../storage.js'

const CIRCUMFERENCE = 2 * Math.PI * 40

function RingProgress({ percent }) {
  const offset = CIRCUMFERENCE - (CIRCUMFERENCE * percent) / 100
  return (
    <div className="ring-wrap">
      <svg width="160" height="160" viewBox="0 0 100 100">
        <circle cx="50" cy="50" r="40" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="8" />
        <circle
          cx="50" cy="50" r="40" fill="none"
          stroke="url(#ringGrad)" strokeWidth="8" strokeLinecap="round"
          strokeDasharray={CIRCUMFERENCE}
          strokeDashoffset={offset}
          style={{ transition: 'stroke-dashoffset 1.2s ease' }}
        />
        <defs>
          <linearGradient id="ringGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#7c3aed" />
            <stop offset="100%" stopColor="#06b6d4" />
          </linearGradient>
        </defs>
      </svg>
      <div className="ring-text">
        <span className="ring-pct">{Math.round(percent)}%</span>
        <span className="ring-label">Orbit Status</span>
      </div>
    </div>
  )
}

function StatCard({ icon, label, value, color }) {
  return (
    <div className="stat-card">
      <div className="stat-card-glow" style={{ background: color }} />
      <div className="stat-card-icon">{icon}</div>
      <div className="stat-card-label">{label}</div>
      <div className="stat-card-value">{value}</div>
    </div>
  )
}

export default function Dashboard({ refreshKey }) {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)
    try {
      const d = getDashboard()
      setData(d)
    } catch {
    }
    setLoading(false)
  }, [refreshKey])

  if (loading) return (
    <div className="loading">
      <div className="spinner" />
      Loading dashboard...
    </div>
  )

  if (!data) return <div className="loading">Failed to load data.</div>

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div className="dashboard-header">
        <h1>Mission Control</h1>
        <p>✨ Great job! Keep going 🚀 Every topic is a star conquered.</p>
      </div>

      <div className="quote-banner">
        <span className="quote-icon">❝</span>
        <p>While others scroll, you solve—this is where ranks are made.</p>
        <span className="quote-icon">❞</span>
      </div>

      <div className="stats-grid">
        <div className="hero-stat-card">
          <RingProgress percent={data.totalCompletionPercent} />
          <h3>Overall Completion</h3>
          <p>You are {Math.round(data.totalCompletionPercent)}% closer to your GATE dream.</p>
        </div>

        <div className="stats-right">
          <StatCard
            icon="📗"
            label="Completed Subjects"
            value={`${data.completedSubjects} / ${data.completedSubjects + data.pendingSubjects}`}
            color="#3b82f6"
          />
          <StatCard
            icon="🎯"
            label="Topics Conquered"
            value={`${data.completedTopics} / ${data.totalTopics}`}
            color="#7c3aed"
          />
          <StatCard
            icon="🧠"
            label="Tests Mastered"
            value={data.totalTestsDone}
            color="#f97316"
          />
          <StatCard
            icon="🏆"
            label="PYQ Mastery"
            value={`${Math.round(data.pyqCompletionPercent)}%`}
            color="#10b981"
          />
        </div>
      </div>
    </div>
  )
}
