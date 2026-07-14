import React, { useState } from 'react'
import { FiBookmark, FiPlus, FiTrash, FiExternalLink } from 'react-icons/fi'

function SavedResearch() {
  const [links, setLinks] = useState([
    { id: 1, title: "Self-Attention Formulation Reference", type: "Equation Study", url: "https://arxiv.org/abs/1706.03762" },
    { id: 2, title: "TruLens RAG Triad Documentation", type: "Evaluation Framework", url: "https://trulens.org" }
  ]);
  const [title, setTitle] = useState('');
  const [url, setUrl] = useState('');
  const [type, setType] = useState('Literature URL');

  const handleAddLink = () => {
    if (!title.trim()) return;
    const newL = {
      id: Date.now(),
      title,
      type,
      url: url || 'https://arxiv.org'
    };
    setLinks(prev => [...newL, ...prev]);
    setTitle('');
    setUrl('');
  };

  const handleDelete = (id) => {
    setLinks(prev => prev.filter(l => l.id !== id));
  };

  return (
    <div className="animate__animated animate__fadeIn">
      <div className="mb-4">
        <h2 className="fw-bold mb-1 text-dark-emphasis">Saved Research</h2>
        <p className="text-secondary small mb-0">Manage references, database bookmarks, and external writing links.</p>
      </div>

      <div className="row g-4">
        {/* Saved list */}
        <div className="col-lg-8">
          <div className="row g-3">
            {links.map(l => (
              <div key={l.id} className="col-md-6">
                <div className="glass-card p-4 text-start d-flex justify-content-between align-items-center">
                  <div>
                    <span className="badge bg-indigo-subtle text-indigo mb-2">{l.type}</span>
                    <h6 className="text-dark-emphasis fw-bold mb-1 text-truncate" style={{ maxWidth: '200px' }}>{l.title}</h6>
                    <a href={l.url} target="_blank" rel="noreferrer" className="text-indigo small text-decoration-none text-truncate d-flex align-items-center gap-1">
                      <span>{l.url.substring(0, 30)}...</span> <FiExternalLink size={12} />
                    </a>
                  </div>
                  <button className="btn btn-link text-danger p-0 border-0" onClick={() => handleDelete(l.id)}>
                    <FiTrash size={16} />
                  </button>
                </div>
              </div>
            ))}

            {links.length === 0 && (
              <div className="col-12 text-center py-5 text-muted">
                <FiBookmark size={40} className="mb-3" />
                <p className="small mb-0">No references saved in library context.</p>
              </div>
            )}
          </div>
        </div>

        {/* Form to add link */}
        <div className="col-lg-4">
          <div className="glass-card p-4 text-start">
            <h5 className="text-dark-emphasis fw-bold mb-3">Add Custom Link</h5>
            
            <div className="mb-3">
              <label className="small text-secondary mb-1">Title</label>
              <input type="text" className="form-control bg-light-subtle border-secondary-subtle text-dark-emphasis" value={title} onChange={e => setTitle(e.target.value)} placeholder="e.g. ArXiv paper link" />
            </div>

            <div className="mb-3">
              <label className="small text-secondary mb-1">URL</label>
              <input type="text" className="form-control bg-light-subtle border-secondary-subtle text-dark-emphasis" value={url} onChange={e => setUrl(e.target.value)} placeholder="https://..." />
            </div>

            <div className="mb-4">
              <label className="small text-secondary mb-1">Classification Type</label>
              <select className="form-select bg-light-subtle border-secondary-subtle text-dark-emphasis" value={type} onChange={e => setType(e.target.value)}>
                <option value="Literature URL">Literature URL</option>
                <option value="Evaluation Framework">Evaluation Framework</option>
                <option value="External Database">External Database</option>
                <option value="Note Outline">Note Outline</option>
              </select>
            </div>

            <button 
              className="btn btn-indigo text-white w-100 rounded-3 py-2.5 d-flex align-items-center justify-content-center gap-2"
              onClick={handleAddLink}
              style={{ background: 'linear-gradient(135deg, #6366f1, #a855f7)', border: 'none' }}
            >
              <FiPlus />
              <span>Save Reference</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SavedResearch
