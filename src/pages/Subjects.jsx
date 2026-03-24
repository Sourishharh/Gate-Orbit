import { useState, useEffect } from 'react'
import { getSubjects, toggleTopic, toggleTest } from '../storage.js'

const SUBJECT_ICONS = {
  'engineering-math': '📐',
  'digital-logic': '💻',
  'computer-org': '🖥️',
  'programming-ds': '🔧',
  'algorithms': '⚡',
  'theory-of-computation': '🤖',
  'compiler-design': '🛠️',
  'operating-systems': '⚙️',
  'dbms': '🗄️',
  'computer-networks': '🌐',
}

function Modal({ type, subject, onYes, onNo, loading }) {
  const isTopicTest = type === 'topicWiseTest'
  return (
    <div className="modal-overlay">
      <div className="modal-box">
        <div className="modal-icon">{isTopicTest ? '⭐' : '📖'}</div>
        <h2>{isTopicTest ? 'Topic-wise Tests Done?' : 'PYQs Completed?'}</h2>
        <p>
          {isTopicTest
            ? <></>
            : <></>
          }
          {isTopicTest
            ? <>You've finished all topics for <strong>{subject.name}</strong>! Have you completed the topic-wise practice tests?</>
            : <>Great work on <strong>{subject.name}</strong>! Have you finished the Previous Year Questions (PYQs)?</>
          }
        </p>
        <div className="modal-actions">
          <button className="btn-ghost" onClick={onNo}>Not Yet</button>
          <button className="btn-primary" onClick={onYes} disabled={loading}>
            {loading ? 'Saving...' : 'Yes, Done!'}
          </button>
        </div>
      </div>
    </div>
  )
}

export default function Subjects({ refreshKey, onUpdate }) {
  const [subjects, setSubjects] = useState([])
  const [loading, setLoading] = useState(true)
  const [open, setOpen] = useState({})
  const [popup, setPopup] = useState(null)
  const [dismissed, setDismissed] = useState(new Set())
  const [mutating, setMutating] = useState(false)

  const loadSubjects = () => {
    setLoading(true)
    try {
      const d = getSubjects()
      setSubjects(d)
    } catch {
    }
    setLoading(false)
  }

  useEffect(() => { loadSubjects() }, [refreshKey])

  useEffect(() => {
    if (!subjects.length || popup) return
    for (const sub of subjects) {
      const allDone = sub.topics.length > 0 && sub.topics.every(t => t.completed)
      if (!allDone) continue
      const topicKey = `${sub.id}-topicWiseTest`
      const pyqKey = `${sub.id}-pyqCompleted`
      if (!sub.tests.topicWiseTest && !dismissed.has(topicKey)) {
        setPopup({ subject: sub, type: 'topicWiseTest' })
        return
      }
      if (!sub.tests.pyqCompleted && !dismissed.has(pyqKey)) {
        setPopup({ subject: sub, type: 'pyqCompleted' })
        return
      }
    }
  }, [subjects, dismissed, popup])

  const toggleAccordion = (id) => {
    setOpen(prev => ({ ...prev, [id]: !prev[id] }))
  }

  const handleToggleTopic = (subjectId, topicId) => {
    const updated = toggleTopic(subjectId, topicId)
    setSubjects(prev => prev.map(s => s.id === subjectId ? { ...updated } : s))
    onUpdate()
  }

  const handleToggleTest = (subjectId, testType) => {
    const updated = toggleTest(subjectId, testType)
    setSubjects(prev => prev.map(s => s.id === subjectId ? { ...updated } : s))
    onUpdate()
  }

  const handlePopupYes = () => {
    if (!popup) return
    setMutating(true)
    handleToggleTest(popup.subject.id, popup.type)
    setMutating(false)
    setPopup(null)
  }

  const handlePopupNo = () => {
    if (!popup) return
    setDismissed(prev => new Set(prev).add(`${popup.subject.id}-${popup.type}`))
    setPopup(null)
  }

  if (loading) return (
    <div className="loading">
      <div className="spinner" />
      Loading subjects...
    </div>
  )

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div className="subjects-header">
        <h1>Subject Modules</h1>
        <p>Expand each module to track topics, sectional tests, and past year questions.</p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {subjects.map(subject => {
          const isOpen = open[subject.id]
          const done = subject.topics.filter(t => t.completed).length
          const isComplete = subject.completionPercent === 100
          const icon = SUBJECT_ICONS[subject.id] || '📘'

          return (
            <div className="subject-card" key={subject.id}>
              <button className="subject-trigger" onClick={() => toggleAccordion(subject.id)}>
                <div className={`subject-icon${isComplete ? ' done' : ''}`}>
                  {isComplete ? '✅' : icon}
                </div>
                <div className="subject-info">
                  <div className="subject-name">{subject.name}</div>
                  <div className="subject-progress-row">
                    <div className="subject-progress-wrap">
                      <div className="progress-bar-wrap">
                        <div
                          className="progress-bar-fill"
                          style={{ width: `${subject.completionPercent}%` }}
                        />
                      </div>
                    </div>
                    <span className="subject-pct">
                      {Math.round(subject.completionPercent)}% ({done}/{subject.topics.length})
                    </span>
                  </div>
                </div>
                <span className={`chevron${isOpen ? ' open' : ''}`}>⌄</span>
              </button>

              <div className={`subject-body${isOpen ? ' open' : ''}`}>
                <div className="section-label">
                  Topics ({done}/{subject.topics.length})
                </div>
                <div className="topics-grid">
                  {subject.topics.map(topic => (
                    <div
                      key={topic.id}
                      className={`topic-item${topic.completed ? ' done' : ''}`}
                      onClick={() => handleToggleTopic(subject.id, topic.id)}
                    >
                      <div className={`topic-checkbox${topic.completed ? ' checked' : ''}`}>
                        {topic.completed && <span className="check">✓</span>}
                      </div>
                      <span className="topic-name">{topic.name}</span>
                    </div>
                  ))}
                </div>

                <div className="section-label">Checkpoints</div>
                <div className="tests-row">
                  {[
                    { id: 'topicWiseTest', label: 'Topic-wise Tests' },
                    { id: 'subjectWiseTest', label: 'Subject-wise Test' },
                    { id: 'pyqCompleted', label: 'PYQs Completed' },
                  ].map(test => (
                    <div
                      key={test.id}
                      className={`test-pill${subject.tests[test.id] ? ' done' : ''}`}
                      onClick={() => handleToggleTest(subject.id, test.id)}
                    >
                      <div className={`test-dot${subject.tests[test.id] ? ' checked' : ''}`}>
                        {subject.tests[test.id] && <div className="inner" />}
                      </div>
                      <span className="test-label">{test.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {popup && (
        <Modal
          type={popup.type}
          subject={popup.subject}
          onYes={handlePopupYes}
          onNo={handlePopupNo}
          loading={mutating}
        />
      )}
    </div>
  )
}
