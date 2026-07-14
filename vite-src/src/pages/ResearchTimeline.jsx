import React, { useState } from 'react'
import { FiCheckSquare, FiSquare, FiPlus, FiCalendar, FiFlag } from 'react-icons/fi'

function ResearchTimeline() {
  const [daily, setDaily] = useState([
    { id: 1, text: "Complete literature analysis comparisons", done: true },
    { id: 2, text: "Draft methodology section in proposal", done: false },
    { id: 3, text: "Verify LoRA local script performance indices", done: false }
  ]);

  const [milestones, setMilestones] = useState([
    { id: 1, title: "Proposal Draft Approval", date: "Jul 25", progress: 85 },
    { id: 2, title: "Dataset Generation", date: "Aug 10", progress: 40 },
    { id: 3, title: "Final Evaluation & Defense", date: "Sep 15", progress: 10 }
  ]);

  const [newGoal, setNewGoal] = useState('');

  const toggleGoal = (id) => {
    setDaily(prev => prev.map(g => g.id === id ? { ...g, done: !g.done } : g));
  };

  const handleAddGoal = () => {
    if (!newGoal.trim()) return;
    setDaily(prev => [
      ...prev,
      { id: Date.now(), text: newGoal, done: false }
    ]);
    setNewGoal('');
  };

  const updateProgress = (id, change) => {
    setMilestones(prev => prev.map(m => {
      if (m.id === id) {
        const nextProgress = Math.max(0, Math.min(100, m.progress + change));
        return { ...m, progress: nextProgress };
      }
      return m;
    }));
  };

  return (
    <div className="animate__animated animate__fadeIn">
      <div className="mb-4">
        <h2 className="fw-bold mb-1 text-dark-emphasis">Research Planner & Timeline</h2>
        <p className="text-secondary small mb-0">Track daily checklists and project milestones.</p>
      </div>

      <div className="row g-4">
        {/* Daily Tasks Checkbox List */}
        <div className="col-lg-6">
          <div className="glass-card p-4 text-start">
            <h5 className="text-dark-emphasis fw-bold mb-3"><FiCheckSquare className="text-indigo me-1" /> Daily Goals</h5>
            
            <div className="d-flex flex-column gap-3 mb-4">
              {daily.map(g => (
                <div key={g.id} className="d-flex align-items-center gap-3 cursor-pointer" onClick={() => toggleGoal(g.id)}>
                  <button className="btn btn-link p-0 text-secondary border-0">
                    {g.done ? <FiCheckSquare className="text-indigo" size={18} /> : <FiSquare size={18} />}
                  </button>
                  <span className={`small ${g.done ? 'text-decoration-line-through text-muted' : 'text-dark-emphasis'}`}>{g.text}</span>
                </div>
              ))}
            </div>

            <div className="input-group">
              <input 
                type="text" 
                className="form-control bg-light-subtle border-secondary-subtle text-dark-emphasis" 
                placeholder="New daily target..." 
                value={newGoal}
                onChange={e => setNewGoal(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleAddGoal()}
              />
              <button className="btn btn-indigo text-white px-3" onClick={handleAddGoal} style={{ background: 'linear-gradient(135deg, #6366f1, #a855f7)', border: 'none' }}><FiPlus /></button>
            </div>
          </div>
        </div>

        {/* Milestones slider list */}
        <div className="col-lg-6">
          <div className="glass-card p-4 text-start">
            <h5 className="text-dark-emphasis fw-bold mb-3"><FiFlag className="text-indigo me-1" /> Project Roadmap</h5>

            <div className="d-flex flex-column gap-4">
              {milestones.map(m => (
                <div key={m.id}>
                  <div className="d-flex justify-content-between text-dark-emphasis small mb-1.5 fw-semibold">
                    <span>{m.title}</span>
                    <span>{m.progress}%</span>
                  </div>
                  
                  <div className="progress bg-light mb-2" style={{ height: '8px' }}>
                    <div 
                      className="progress-bar" 
                      style={{ 
                        width: `${m.progress}%`, 
                        background: 'linear-gradient(90deg, #6366f1, #a855f7)',
                        transition: 'width 0.2s ease'
                      }}
                    ></div>
                  </div>

                  <div className="d-flex justify-content-between align-items-center">
                    <span className="text-muted small" style={{ fontSize: '11px' }}><FiCalendar className="me-1" />Target: {m.date}</span>
                    <div className="d-flex gap-1">
                      <button className="btn btn-outline-secondary btn-sm py-0.5 px-2 text-dark-emphasis" onClick={() => updateProgress(m.id, -10)}>-</button>
                      <button className="btn btn-outline-secondary btn-sm py-0.5 px-2 text-dark-emphasis" onClick={() => updateProgress(m.id, 10)}>+</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ResearchTimeline
