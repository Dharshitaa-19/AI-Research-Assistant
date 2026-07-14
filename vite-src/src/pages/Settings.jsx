import React, { useState } from 'react'
import { FiSave, FiSettings, FiKey, FiUser } from 'react-icons/fi'

function Settings({ darkMode, setDarkMode }) {
  const [name, setName] = useState('Dr. Sarah Jenkins');
  const [role, setRole] = useState('Lead AI Researcher');
  const [institution, setInstitution] = useState('Stanford University');
  const [apiKey, setApiKey] = useState(localStorage.getItem('rm_api_key') || '');
  const [saved, setSaved] = useState(false);

  const handleSave = (e) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="animate__animated animate__fadeIn">
      <div className="mb-4">
        <h2 className="fw-bold mb-1 text-dark-emphasis">Workspace Settings</h2>
        <p className="text-secondary small mb-0">Customize academic credentials, theme preferences, and Google Gemini API credentials.</p>
      </div>

      <div className="row g-4">
        {/* Left Side: General Profile Setting */}
        <div className="col-lg-7">
          <form onSubmit={handleSave} className="glass-card p-4 text-start">
            <h5 className="text-dark-emphasis fw-bold mb-4"><FiUser className="text-indigo me-1" /> Profile Credentials</h5>

            <div className="row g-3 mb-3">
              <div className="col-md-6">
                <label className="small text-secondary mb-1">Full Name</label>
                <input type="text" className="form-control bg-light-subtle border-secondary-subtle text-dark-emphasis" value={name} onChange={e => setName(e.target.value)} />
              </div>
              <div className="col-md-6">
                <label className="small text-secondary mb-1">Title / Designation</label>
                <input type="text" className="form-control bg-light-subtle border-secondary-subtle text-dark-emphasis" value={role} onChange={e => setRole(e.target.value)} />
              </div>
            </div>

            <div className="mb-4">
              <label className="small text-secondary mb-1">Academic Affiliation</label>
              <input type="text" className="form-control bg-light-subtle border-secondary-subtle text-dark-emphasis" value={institution} onChange={e => setInstitution(e.target.value)} />
            </div>

            <h5 className="text-dark-emphasis fw-bold mb-3 pt-2 border-top border-secondary-subtle"><FiKey className="text-indigo me-1" /> API Configuration</h5>
            
            <div className="mb-4">
              <label className="small text-secondary mb-1">Google Gemini API Key</label>
              <input 
                type="password" 
                className="form-control bg-light-subtle border-secondary-subtle text-dark-emphasis font-monospace" 
                value={apiKey} 
                onChange={e => setApiKey(e.target.value)}
                placeholder="AIzaSy..."
              />
              <span className="text-muted" style={{ fontSize: '10px' }}>
                Your API key is saved locally in browser state and configuration variables.
              </span>
            </div>

            <button 
              type="submit" 
              className="btn btn-indigo text-white px-4 py-2.5 rounded-3 d-flex align-items-center gap-2"
              style={{ background: 'linear-gradient(135deg, #6366f1, #a855f7)', border: 'none' }}
            >
              <FiSave />
              <span>{saved ? 'Settings Saved!' : 'Save Config'}</span>
            </button>
          </form>
        </div>

        {/* Right Side: Theme Controls */}
        <div className="col-lg-5">
          <div className="glass-card p-4 text-start">
            <h5 className="text-dark-emphasis fw-bold mb-3"><FiSettings className="text-indigo me-1" /> Interface Preferences</h5>

            <div className="mb-4">
              <label className="small text-secondary mb-1.5">Theme Setup</label>
              <div className="d-flex align-items-center gap-3">
                <button 
                  className={`btn btn-sm ${!darkMode ? 'btn-indigo text-white' : 'btn-outline-secondary'}`}
                  onClick={() => setDarkMode(false)}
                >
                  Light Theme
                </button>
                <button 
                  className={`btn btn-sm ${darkMode ? 'btn-indigo text-white' : 'btn-outline-secondary'}`}
                  onClick={() => setDarkMode(true)}
                >
                  Dark Theme
                </button>
              </div>
            </div>

            <div className="mb-3">
              <label className="small text-secondary mb-1">API Key Setup Guide</label>
              <ol className="text-secondary small ps-3 mb-0" style={{ lineHeight: '1.8' }}>
                <li>Visit <a href="https://aistudio.google.com" target="_blank" rel="noreferrer" className="text-indigo fw-semibold text-decoration-none">Google AI Studio</a>.</li>
                <li>Generate a free-tier Gemini API key.</li>
                <li>Paste it in the `.env` file or in the form input on the left.</li>
              </ol>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Settings
