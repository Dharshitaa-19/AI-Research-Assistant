import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { 
  FiMenu, FiSearch, FiBell, FiSun, FiMoon, FiUser, 
  FiSettings, FiLogOut, FiHelpCircle 
} from 'react-icons/fi'

function Topbar({ 
  darkMode, setDarkMode, 
  sidebarCollapsed, setSidebarCollapsed,
  mobileExpanded, setMobileExpanded,
  searchQuery, setSearchQuery
}) {
  const navigate = useNavigate();
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  // Mock Notifications list
  const [notifications, setNotifications] = useState([
    { id: 1, text: 'Gemini index parsing complete for PEFT draft', time: '10m ago', read: false },
    { id: 2, text: 'Suggested revision: Neural citation maps overlap', time: '2h ago', read: true }
  ]);

  const unreadCount = notifications.filter(n => !n.read).length;

  const toggleSidebar = () => {
    // On mobile, toggles drawer expand state. On desktop, toggles collapse state.
    if (window.innerWidth <= 991) {
      setMobileExpanded(!mobileExpanded);
    } else {
      setSidebarCollapsed(!sidebarCollapsed);
    }
  };

  const markAllRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  return (
    <nav className="topbar-container glass-panel">
      {/* Sidebar Toggle & Global Search */}
      <div className="d-flex align-items-center gap-3 col-6 col-md-5">
        <button 
          className="btn btn-link text-secondary p-0"
          onClick={toggleSidebar}
        >
          <FiMenu size={22} />
        </button>

        <div className="input-group d-none d-md-flex align-items-center bg-light-subtle rounded-3 px-2 border border-secondary-subtle">
          <FiSearch className="text-muted ms-2" />
          <input 
            type="text" 
            className="form-control bg-transparent border-0 text-dark-emphasis small py-2" 
            placeholder="Search papers, citations, notes..." 
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Action Buttons & Profile */}
      <div className="d-flex align-items-center gap-3">
        
        {/* Theme Toggle */}
        <button 
          className="btn btn-outline-secondary border-0 text-secondary p-2 rounded-circle"
          onClick={() => setDarkMode(!darkMode)}
          title="Toggle Light/Dark mode"
        >
          {darkMode ? <FiSun size={19} className="text-warning" /> : <FiMoon size={19} className="text-indigo" />}
        </button>

        {/* Notifications Dropdown */}
        <div className="position-relative">
          <button 
            className="btn btn-outline-secondary border-0 text-secondary p-2 rounded-circle position-relative"
            onClick={() => setShowNotifications(!showNotifications)}
            title="View notifications"
          >
            <FiBell size={19} />
            {unreadCount > 0 && (
              <span className="position-absolute top-1 start-3 translate-middle p-1.5 bg-danger border border-light rounded-circle"></span>
            )}
          </button>
          
          {showNotifications && (
            <div className="glass-panel position-absolute end-0 mt-3 p-3 rounded-4 shadow-lg" style={{ width: '300px', zIndex: 1050 }}>
              <div className="d-flex justify-content-between align-items-center mb-2 pb-2 border-bottom border-secondary-subtle">
                <span className="fw-bold small text-dark-emphasis">Notifications</span>
                {unreadCount > 0 && (
                  <button onClick={markAllRead} className="btn btn-link text-indigo text-decoration-none p-0 small">Mark read</button>
                )}
              </div>
              <div className="d-flex flex-column gap-2 overflow-y-auto" style={{ maxHeight: '200px' }}>
                {notifications.map(n => (
                  <div key={n.id} className={`p-2 rounded-3 small ${n.read ? 'text-muted' : 'bg-light-subtle text-dark-emphasis fw-medium'}`}>
                    <div>{n.text}</div>
                    <div className="text-muted" style={{ fontSize: '10px', marginTop: '2px' }}>{n.time}</div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* User Profile Avatar Dropdown */}
        <div className="position-relative">
          <div 
            className="d-flex align-items-center gap-2 cursor-pointer p-1.5 rounded-pill bg-light-subtle border border-secondary-subtle"
            onClick={() => setShowProfileMenu(!showProfileMenu)}
          >
            <img 
              src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150" 
              alt="Dr. Sarah Jenkins avatar" 
              className="rounded-circle"
              style={{ width: '32px', height: '32px', objectFit: 'cover' }}
            />
            <span className="d-none d-lg-inline small text-dark-emphasis fw-medium me-1">Dr. Sarah Jenkins</span>
          </div>

          {showProfileMenu && (
            <div className="glass-panel position-absolute end-0 mt-3 p-2 rounded-4 shadow-lg" style={{ width: '200px', zIndex: 1050 }}>
              <button 
                className="btn btn-link w-100 text-start text-decoration-none text-secondary d-flex align-items-center gap-2 py-2 px-3 hover-bg-accent rounded-3 border-0"
                onClick={() => { setShowProfileMenu(false); navigate('/settings'); }}
              >
                <FiSettings size={15} />
                <span className="small">Academic Profile</span>
              </button>
              <button 
                className="btn btn-link w-100 text-start text-decoration-none text-secondary d-flex align-items-center gap-2 py-2 px-3 hover-bg-accent rounded-3 border-0"
                onClick={() => { setShowProfileMenu(false); navigate('/settings'); }}
              >
                <FiHelpCircle size={15} />
                <span className="small">Help Desk</span>
              </button>
              <hr className="my-1 border-secondary-subtle" />
              <button 
                className="btn btn-link w-100 text-start text-decoration-none text-danger d-flex align-items-center gap-2 py-2 px-3 hover-bg-accent rounded-3 border-0"
                onClick={() => { setShowProfileMenu(false); navigate('/settings'); }}
              >
                <FiLogOut size={15} />
                <span className="small">Log out</span>
              </button>
            </div>
          )}
        </div>

      </div>
    </nav>
  )
}

export default Topbar
