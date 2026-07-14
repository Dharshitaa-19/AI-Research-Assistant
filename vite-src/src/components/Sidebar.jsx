import React, { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { 
  FiMessageSquare, FiFileText, FiBookOpen, FiCompass, FiSettings, 
  FiTrendingUp, FiBookmark, FiCalendar, FiEdit3, FiCpu, 
  FiSearch, FiAward, FiChevronLeft, FiChevronRight, FiPlus, 
  FiDatabase, FiMaximize2, FiActivity
} from 'react-icons/fi'

function Sidebar({ collapsed, setCollapsed, mobileExpanded, setMobileExpanded }) {
  const navigate = useNavigate();
  const [showHistory, setShowHistory] = useState(true);
  
  // Dummy local history threads
  const [historyThreads, setHistoryThreads] = useState([
    { id: 't1', title: 'PEFT Optimizations' },
    { id: 't2', title: 'Transformer Scalability' },
    { id: 't3', title: 'RAG vs Web Indexing' }
  ]);

  // Touch Swipe Gesture Variables
  let touchStartX = 0;
  let touchEndX = 0;

  const handleTouchStart = (e) => {
    touchStartX = e.changedTouches[0].screenX;
  };

  const handleTouchEnd = (e) => {
    touchEndX = e.changedTouches[0].screenX;
    // Swipe left (hide sidebar)
    if (touchStartX - touchEndX > 50) {
      setMobileExpanded(false);
    }
  };

  const triggerNewChat = () => {
    // Reset active session state and route to homepage chat
    window.dispatchEvent(new CustomEvent('initiate-new-chat'));
    navigate('/');
    setMobileExpanded(false);
  };

  const loadPastThread = (title) => {
    window.dispatchEvent(new CustomEvent('load-past-chat', { detail: title }));
    navigate('/');
    setMobileExpanded(false);
  };

  const menuItems = [
    { path: '/', label: 'AI Chat', icon: <FiMessageSquare /> },
    { path: '/papers', label: 'Research Papers', icon: <FiFileText /> },
    { path: '/literature-review', label: 'Literature Review', icon: <FiBookOpen /> },
    { path: '/summarizer', label: 'Paper Summarizer', icon: <FiMaximize2 /> },
    { path: '/gap-finder', label: 'Research Gap Finder', icon: <FiSearch /> },
    { path: '/citation', label: 'Citation Generator', icon: <FiAward /> },
    { path: '/report', label: 'Report Generator', icon: <FiDatabase /> },
    { path: '/ideas', label: 'Idea Generator', icon: <FiCpu /> },
    { path: '/notes', label: 'Research Notes', icon: <FiEdit3 /> },
    { path: '/saved', label: 'Saved Research', icon: <FiBookmark /> },
    { path: '/timeline', label: 'Research Timeline', icon: <FiCalendar /> },
    { path: '/writing-assistant', label: 'AI Writing Assistant', icon: <FiActivity /> },
    { path: '/trending', label: 'Trending Topics', icon: <FiTrendingUp /> },
    { path: '/settings', label: 'Settings', icon: <FiSettings /> }
  ];

  return (
    <div 
      className={`sidebar-container glass-panel ${collapsed ? 'collapsed' : ''} ${mobileExpanded ? 'expanded-mobile' : ''}`}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Brand logo & Toggle */}
      <div className="sidebar-header d-flex align-items-center justify-content-between">
        <div className="sidebar-logo cursor-pointer" onClick={() => navigate('/')}>
          <span className="fs-3">🧠</span>
          {(!collapsed || mobileExpanded) && <span className="fw-bold">ResearchMate</span>}
        </div>
        <button 
          className="btn btn-link text-secondary p-0 d-none d-lg-inline-block"
          onClick={() => setCollapsed(!collapsed)}
        >
          {collapsed ? <FiChevronRight size={20} /> : <FiChevronLeft size={20} />}
        </button>
      </div>

      <div className="sidebar-menu">
        {/* New Chat Primary Call-to-action */}
        <button 
          onClick={triggerNewChat}
          className="btn btn-indigo text-white w-100 rounded-3 py-2.5 mb-3 d-flex align-items-center justify-content-center gap-2"
          style={{ background: 'linear-gradient(135deg, #6366f1, #a855f7)', border: 'none' }}
        >
          <FiPlus />
          {(!collapsed || mobileExpanded) && <span className="small fw-semibold">New Chat</span>}
        </button>

        {/* Collapsible Chat History */}
        {(!collapsed || mobileExpanded) && (
          <div className="mb-3">
            <div 
              className="text-secondary small fw-bold px-2 py-1 cursor-pointer d-flex justify-content-between align-items-center"
              onClick={() => setShowHistory(!showHistory)}
            >
              <span>CHAT HISTORY</span>
              <span>{showHistory ? '−' : '+'}</span>
            </div>
            {showHistory && (
              <div className="d-flex flex-column gap-1 mt-1 animate__animated animate__fadeIn">
                {historyThreads.map(thread => (
                  <div 
                    key={thread.id}
                    onClick={() => loadPastThread(thread.title)}
                    className="p-2 rounded bg-light-subtle text-secondary small cursor-pointer hover-bg-accent text-truncate border border-transparent hover-border-secondary"
                    style={{ fontSize: '12px' }}
                  >
                    💬 {thread.title}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Main route list */}
        {menuItems.map(item => (
          <NavLink
            key={item.path}
            to={item.path}
            onClick={() => setMobileExpanded(false)}
            className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}
          >
            {item.icon}
            {(!collapsed || mobileExpanded) && <span>{item.label}</span>}
          </NavLink>
        ))}
      </div>

      {(!collapsed || mobileExpanded) && (
        <div className="p-3 border-top border-secondary-subtle text-center text-muted" style={{ fontSize: '11px' }}>
          ResearchMate v2.0.0 &copy; 2026
        </div>
      )}
    </div>
  )
}

export default Sidebar
