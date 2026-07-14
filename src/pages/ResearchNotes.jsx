import React, { useState, useMemo } from 'react'
import { FiPlus, FiTrash, FiPin, FiTag, FiSave, FiEdit3 } from 'react-icons/fi'

function ResearchNotes({ searchQuery }) {
  const [notes, setNotes] = useState([
    { id: 1, title: 'LoRA Rank Parameters', content: 'Rank r=8 seems optimal for syntax fine-tuning. Latency matches baseline closely.', color: '#e0e7ff', tags: 'PEFT, LoRA', date: 'Jul 12', pinned: true },
    { id: 2, title: 'RAG Latency Obstacles', content: 'Vector DB query latency adds 120ms overhead. Need to evaluate cache strategies.', color: '#ccfbf1', tags: 'RAG, Vector DB', date: 'Jul 14', pinned: false }
  ]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [color, setColor] = useState('#e0e7ff');
  const [tags, setTags] = useState('');
  const [selectedNote, setSelectedNote] = useState(null);

  const handleSaveNote = () => {
    if (!title.trim()) return;
    if (selectedNote) {
      // update
      setNotes(prev => prev.map(n => n.id === selectedNote.id ? { 
        ...n, title, content, color, tags, date: 'Today' 
      } : n));
    } else {
      // add
      const newN = {
        id: Date.now(),
        title,
        content,
        color,
        tags,
        date: 'Today',
        pinned: false
      };
      setNotes(prev => [newN, ...prev]);
    }
    resetForm();
  };

  const handleEdit = (n) => {
    setSelectedNote(n);
    setTitle(n.title);
    setContent(n.content);
    setColor(n.color);
    setTags(n.tags);
  };

  const handleDelete = (id) => {
    setNotes(prev => prev.filter(n => n.id !== id));
    if (selectedNote?.id === id) resetForm();
  };

  const togglePin = (id) => {
    setNotes(prev => prev.map(n => n.id === id ? { ...n, pinned: !n.pinned } : n));
  };

  const resetForm = () => {
    setSelectedNote(null);
    setTitle('');
    setContent('');
    setColor('#e0e7ff');
    setTags('');
  };

  const filteredNotes = useMemo(() => {
    const q = searchQuery.toLowerCase();
    return notes.filter(n => 
      n.title.toLowerCase().includes(q) || 
      n.content.toLowerCase().includes(q) || 
      n.tags.toLowerCase().includes(q)
    );
  }, [notes, searchQuery]);

  return (
    <div className="animate__animated animate__fadeIn">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2 className="fw-bold mb-1 text-dark-emphasis">Research Notes</h2>
          <p className="text-secondary small mb-0">Record ideas, draft outlines, and manage tagged bookmarks.</p>
        </div>
        <button className="btn btn-indigo text-white px-3" onClick={resetForm} style={{ background: 'linear-gradient(135deg, #6366f1, #a855f7)', border: 'none' }}>
          <FiPlus className="me-1" /> New Note
        </button>
      </div>

      <div className="row g-4">
        {/* Left Side: Notes list */}
        <div className="col-lg-5">
          <div className="d-flex flex-column gap-3">
            {filteredNotes.map(n => (
              <div 
                key={n.id} 
                className="glass-card p-4 text-start cursor-pointer border-start" 
                style={{ borderLeft: `6px solid ${n.color}`, background: 'var(--bg-primary)' }}
                onClick={() => handleEdit(n)}
              >
                <div className="d-flex justify-content-between align-items-start mb-2">
                  <h6 className="text-dark-emphasis fw-bold mb-0 text-truncate" style={{ maxWidth: '200px' }}>{n.title}</h6>
                  <div className="d-flex gap-2">
                    <button className="btn btn-link text-muted p-0" onClick={(e) => { e.stopPropagation(); togglePin(n.id); }}>
                      <FiPin color={n.pinned ? '#6366f1' : '#94a3b8'} fill={n.pinned ? '#6366f1' : 'none'} />
                    </button>
                    <button className="btn btn-link text-danger p-0" onClick={(e) => { e.stopPropagation(); handleDelete(n.id); }}>
                      <FiTrash />
                    </button>
                  </div>
                </div>
                <p className="text-secondary small mb-3 text-truncate">{n.content}</p>
                <div className="d-flex justify-content-between align-items-center small text-muted">
                  <span className="badge bg-light-subtle text-secondary rounded-pill"><FiTag className="me-1" />{n.tags}</span>
                  <span style={{ fontSize: '10px' }}>{n.date}</span>
                </div>
              </div>
            ))}

            {filteredNotes.length === 0 && (
              <div className="text-center py-5 text-muted">
                <FiEdit3 size={40} className="mb-3" />
                <p className="small mb-0">No research notes saved yet.</p>
              </div>
            )}
          </div>
        </div>

        {/* Right Side: Note Editor */}
        <div className="col-lg-7">
          <div className="glass-card p-4 text-start">
            <h5 className="text-dark-emphasis fw-bold mb-3">{selectedNote ? 'Edit note' : 'Create Note'}</h5>
            
            <div className="mb-3">
              <label className="small text-secondary mb-1">Title</label>
              <input type="text" className="form-control bg-light-subtle border-secondary-subtle text-dark-emphasis" value={title} onChange={e => setTitle(e.target.value)} placeholder="e.g. NeurIPS Outline draft" />
            </div>

            <div className="mb-3">
              <label className="small text-secondary mb-1">Content Details</label>
              <textarea className="form-control bg-light-subtle border-secondary-subtle text-dark-emphasis" rows="6" value={content} onChange={e => setContent(e.target.value)} placeholder="Write note ideas here..." />
            </div>

            <div className="row g-3 mb-4">
              <div className="col-6">
                <label className="small text-secondary mb-1">Tags (comma separated)</label>
                <input type="text" className="form-control bg-light-subtle border-secondary-subtle text-dark-emphasis" value={tags} onChange={e => setTags(e.target.value)} placeholder="e.g. NLP, Draft" />
              </div>
              <div className="col-6">
                <label className="small text-secondary mb-1">Card Color Theme</label>
                <select className="form-select bg-light-subtle border-secondary-subtle text-dark-emphasis" value={color} onChange={e => setColor(e.target.value)}>
                  <option value="#e0e7ff">Indigo Accent</option>
                  <option value="#ccfbf1">Teal Accent</option>
                  <option value="#fef3c7">Amber Accent</option>
                  <option value="#fce7f3">Rose Accent</option>
                </select>
              </div>
            </div>

            <button 
              className="btn btn-indigo text-white w-100 rounded-3 py-2.5 d-flex align-items-center justify-content-center gap-2"
              onClick={handleSaveNote}
              style={{ background: 'linear-gradient(135deg, #6366f1, #a855f7)', border: 'none' }}
            >
              <FiSave />
              <span>Save Note</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ResearchNotes
