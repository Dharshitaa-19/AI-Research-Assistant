const { useState, useEffect, useRef, useMemo } = React;

function App() {
  // Global States
  const [authStep, setAuthStep] = useState('splash'); // splash -> welcome -> login -> signup -> forgot -> app
  const [activePage, setActivePage] = useState('dashboard'); // sidebar pages: dashboard, chat, papers, upload, etc.
  const [darkMode, setDarkMode] = useState(true);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [showAiDrawer, setShowAiDrawer] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  
  // Data States (initialized from mock data in data.js)
  const [papers, setPapers] = useState([]);
  const [notes, setNotes] = useState([]);
  const [chats, setChats] = useState([]);
  const [activeChatId, setActiveChatId] = useState(null);
  const [planner, setPlanner] = useState({ dailyGoals: [], weeklyGoals: [], milestones: [] });
  const [kanban, setKanban] = useState({ todo: [], inprogress: [], completed: [] });
  const [calendarEvents, setCalendarEvents] = useState([]);
  const [history, setHistory] = useState([]);
  const [bookmarks, setBookmarks] = useState([]);
  const [profile, setProfile] = useState({});
  const [highlights, setHighlights] = useState([
    { id: 1, paperTitle: "Attention Is All You Need", text: "We propose a new simple network architecture, the Transformer, based solely on attention mechanisms.", color: "yellow", date: "2026-07-10" },
    { id: 2, paperTitle: "Retrieval-Augmented Generation", text: "RAG combines parametric and non-parametric memories.", color: "green", date: "2026-07-12" }
  ]);
  const [notifications, setNotifications] = useState([
    { id: 1, title: "Upcoming Deadline", desc: "RAG Evaluation Draft Due tomorrow at 5 PM", time: "1 hour ago", read: false },
    { id: 2, title: "Paper Uploaded Successfully", desc: "PEFT Strategy for edge devices has been parsed", time: "3 hours ago", read: true },
    { id: 3, title: "New Citation Generated", desc: "APA format citation copied to clipboard", time: "Yesterday", read: true }
  ]);
  const [showNotificationsDropdown, setShowNotificationsDropdown] = useState(false);

  // Initialize data
  useEffect(() => {
    if (window.ResearchMateData) {
      const data = window.ResearchMateData;
      setPapers(data.papers);
      setNotes(data.notes);
      setChats(data.chats);
      if (data.chats.length > 0) setActiveChatId(data.chats[0].id);
      setPlanner(data.planner);
      setKanban(data.kanbanTasks);
      setCalendarEvents(data.calendarEvents);
      setHistory(data.history);
      setBookmarks(data.bookmarks);
      setProfile(data.profile);
    }
  }, []);

  // Theme Syncing
  useEffect(() => {
    if (darkMode) {
      document.body.classList.remove('light-mode');
    } else {
      document.body.classList.add('light-mode');
    }
  }, [darkMode]);

  // Auth routing helper
  const navigateAuth = (step) => {
    setAuthStep(step);
    if (step === 'app') {
      setActivePage('dashboard');
    }
  };

  // Sidebar Menu Items Definition
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: 'fa-chart-pie' },
    { id: 'chat', label: 'AI Chat', icon: 'fa-robot' },
    { id: 'papers', label: 'My Papers', icon: 'fa-file-lines' },
    { id: 'upload', label: 'Upload Papers', icon: 'fa-cloud-arrow-up' },
    { id: 'pdf', label: 'PDF Reader', icon: 'fa-file-pdf' },
    { id: 'summary', label: 'AI Summary', icon: 'fa-wand-magic-sparkles' },
    { id: 'review', label: 'Literature Review', icon: 'fa-book-open-reader' },
    { id: 'citation', label: 'Citation Generator', icon: 'fa-quote-left' },
    { id: 'notes', label: 'Research Notes', icon: 'fa-note-sticky' },
    { id: 'highlights', label: 'Highlights', icon: 'fa-highlighter' },
    { id: 'flashcards', label: 'Flashcards', icon: 'fa-clone' },
    { id: 'mindmap', label: 'Mind Map', icon: 'fa-circle-nodes' },
    { id: 'planner', label: 'Research Planner', icon: 'fa-compass' },
    { id: 'tasks', label: 'Task Manager', icon: 'fa-list-check' },
    { id: 'calendar', label: 'Calendar', icon: 'fa-calendar-days' },
    { id: 'analytics', label: 'Analytics', icon: 'fa-chart-line' },
    { id: 'bookmarks', label: 'Bookmarks', icon: 'fa-bookmark' },
    { id: 'history', label: 'History', icon: 'fa-clock-rotate-left' },
    { id: 'settings', label: 'Settings', icon: 'fa-sliders' }
  ];

  // Helper actions
  const addNotification = (title, desc) => {
    setNotifications(prev => [
      { id: Date.now(), title, desc, time: "Just now", read: false },
      ...prev
    ]);
  };

  const addHistory = (action, category) => {
    setHistory(prev => [
      { id: Date.now(), action, category, time: "Just now" },
      ...prev
    ]);
  };

  // Splash Screen Simulation
  if (authStep === 'splash') {
    return <SplashScreen onComplete={() => navigateAuth('welcome')} />;
  }

  // Welcome / Marketing Page
  if (authStep === 'welcome') {
    return <WelcomePage onGetStarted={() => navigateAuth('login')} />;
  }

  // Login View
  if (authStep === 'login') {
    return <LoginPage 
      onLogin={() => navigateAuth('app')} 
      onSignUp={() => navigateAuth('signup')} 
      onForgot={() => navigateAuth('forgot')} 
    />;
  }

  // Sign Up View
  if (authStep === 'signup') {
    return <SignUpPage 
      onSignUp={() => navigateAuth('app')} 
      onLogin={() => navigateAuth('login')} 
    />;
  }

  // Forgot Password View
  if (authStep === 'forgot') {
    return <ForgotPasswordPage onBackToLogin={() => navigateAuth('login')} />;
  }

  // MAIN SAAS LAYOUT
  return (
    <div className="app-wrapper">
      {/* Sidebar Navigation */}
      <Sidebar 
        menuItems={menuItems} 
        activePage={activePage} 
        setActivePage={setActivePage} 
        collapsed={sidebarCollapsed}
        setCollapsed={setSidebarCollapsed}
        onLogout={() => navigateAuth('welcome')}
      />

      {/* Top Navbar */}
      <Navbar 
        collapsed={sidebarCollapsed}
        setCollapsed={setSidebarCollapsed}
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        showAiDrawer={showAiDrawer}
        setShowAiDrawer={setShowAiDrawer}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        profile={profile}
        setActivePage={setActivePage}
        notifications={notifications}
        setNotifications={setNotifications}
        showNotificationsDropdown={showNotificationsDropdown}
        setShowNotificationsDropdown={setShowNotificationsDropdown}
      />

      {/* Slide-out AI Panel */}
      <AiAssistantDrawer 
        open={showAiDrawer} 
        onClose={() => setShowAiDrawer(false)} 
        addNotification={addNotification}
      />

      {/* Main Dynamic View Content */}
      <main className="app-content">
        <div className="container-fluid p-0 animate__animated animate__fadeIn">
          {activePage === 'dashboard' && (
            <DashboardView 
              papers={papers} 
              notes={notes} 
              chats={chats} 
              planner={planner} 
              calendarEvents={calendarEvents} 
              setActivePage={setActivePage} 
            />
          )}
          {activePage === 'chat' && (
            <AiChatView 
              chats={chats} 
              setChats={setChats} 
              activeChatId={activeChatId} 
              setActiveChatId={setActiveChatId}
              addNotification={addNotification}
              addHistory={addHistory}
            />
          )}
          {activePage === 'papers' && (
            <MyPapersView 
              papers={papers} 
              setPapers={setPapers} 
              searchQuery={searchQuery}
              setActivePage={setActivePage}
              setSelectedPaperForViewer={(paper) => {
                window.selectedPaperForViewer = paper;
              }}
              addNotification={addNotification}
              addHistory={addHistory}
            />
          )}
          {activePage === 'upload' && (
            <UploadPapersView 
              papers={papers} 
              setPapers={setPapers}
              addNotification={addNotification}
              addHistory={addHistory}
            />
          )}
          {activePage === 'pdf' && (
            <PdfReaderView 
              papers={papers}
              addNotification={addNotification}
              addHistory={addHistory}
            />
          )}
          {activePage === 'summary' && (
            <AiSummaryView 
              papers={papers}
            />
          )}
          {activePage === 'review' && (
            <LiteratureReviewView 
              papers={papers}
              addNotification={addNotification}
            />
          )}
          {activePage === 'citation' && (
            <CitationGeneratorView 
              papers={papers}
              bookmarks={bookmarks}
              setBookmarks={setBookmarks}
              addNotification={addNotification}
              addHistory={addHistory}
            />
          )}
          {activePage === 'notes' && (
            <ResearchNotesView 
              notes={notes} 
              setNotes={setNotes}
              addNotification={addNotification}
              addHistory={addHistory}
            />
          )}
          {activePage === 'highlights' && (
            <HighlightsView 
              highlights={highlights} 
              setHighlights={setHighlights}
              addNotification={addNotification}
            />
          )}
          {activePage === 'flashcards' && (
            <FlashcardsView 
              addNotification={addNotification}
            />
          )}
          {activePage === 'mindmap' && (
            <MindMapView 
              addNotification={addNotification}
            />
          )}
          {activePage === 'planner' && (
            <ResearchPlannerView 
              planner={planner} 
              setPlanner={setPlanner}
              addNotification={addNotification}
            />
          )}
          {activePage === 'tasks' && (
            <TaskManagerView 
              kanban={kanban} 
              setKanban={setKanban}
              addNotification={addNotification}
            />
          )}
          {activePage === 'calendar' && (
            <CalendarView 
              calendarEvents={calendarEvents} 
              setCalendarEvents={setCalendarEvents}
            />
          )}
          {activePage === 'analytics' && (
            <AnalyticsView 
              papers={papers}
              notes={notes}
            />
          )}
          {activePage === 'bookmarks' && (
            <BookmarksView 
              bookmarks={bookmarks} 
              setBookmarks={setBookmarks}
            />
          )}
          {activePage === 'history' && (
            <HistoryView 
              history={history} 
              setHistory={setHistory}
            />
          )}
          {activePage === 'settings' && (
            <SettingsView 
              darkMode={darkMode}
              setDarkMode={setDarkMode}
              addNotification={addNotification}
              onLogout={() => navigateAuth('welcome')}
            />
          )}
          {activePage === 'profile' && (
            <UserProfileView 
              profile={profile} 
              setProfile={setProfile}
              addNotification={addNotification}
            />
          )}
        </div>
      </main>
    </div>
  );
}

// ==================== SUB-COMPONENTS ====================

// 1. SPLASH SCREEN
function SplashScreen({ onComplete }) {
  useEffect(() => {
    const timer = setTimeout(onComplete, 2200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="splash-container">
      <div className="text-center animate__animated animate__zoomIn">
        <div className="splash-logo mb-4">
          <svg width="100" height="100" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="24" height="24" rx="6" fill="url(#gradSplash)" />
            <path d="M7 8H17M7 12H17M7 16H13" stroke="white" stroke-width="2" stroke-linecap="round"/>
            <circle cx="16" cy="16" r="3" fill="#14b8a6" />
            <path d="M16 14V18M14 16H18" stroke="white" stroke-width="1.2" stroke-linecap="round"/>
            <defs>
              <linearGradient id="gradSplash" x1="0" y1="0" x2="24" y2="24" gradientUnits="userSpaceOnUse">
                <stop stop-color="#6366f1" />
                <stop offset="1" stop-color="#14b8a6" />
              </linearGradient>
            </defs>
          </svg>
        </div>
        <h1 className="text-white fw-bold display-5 mb-1" style={{ fontFamily: 'Outfit', letterSpacing: '-1px' }}>ResearchMate</h1>
        <p className="text-muted fs-6">Empowering Scientific Literature Discovery</p>
        <div className="splash-loader-bar">
          <div className="splash-loader-progress"></div>
        </div>
      </div>
    </div>
  );
}

// 2. WELCOME PAGE
function WelcomePage({ onGetStarted }) {
  return (
    <div className="welcome-bg d-flex align-items-center justify-content-center py-5">
      <div className="container">
        <div className="row align-items-center justify-content-center text-center text-lg-start">
          <div className="col-lg-6 mb-5 mb-lg-0 animate__animated animate__fadeInLeft">
            <span className="badge bg-indigo-subtle text-indigo px-3 py-2 rounded-pill mb-3 border border-indigo-subtle">
              <i className="fa-sparkles me-2"></i>Next Generation Platform
            </span>
            <h1 className="display-4 fw-extrabold text-white lh-sm mb-3" style={{ fontFamily: 'Outfit' }}>
              Your AI Copilot for <br/>
              <span style={{ background: 'linear-gradient(90deg, #6366f1, #14b8a6)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Academic Research</span>
            </h1>
            <p className="lead text-secondary mb-4">
              Explore, synthesize, write, and manage papers effortlessly. ResearchMate combines neural search with contextualized assistants to skyrocket your productivity.
            </p>
            <div className="d-flex flex-column flex-sm-row gap-3 justify-content-center justify-content-lg-start">
              <button onClick={onGetStarted} className="btn btn-indigo px-4 py-3 rounded-3 fw-semibold shadow-lg text-white" style={{ background: 'linear-gradient(135deg, #6366f1, #4f46e5)' }}>
                Get Started for Free <i className="fa-arrow-right ms-2"></i>
              </button>
              <a href="#features" className="btn btn-outline-secondary px-4 py-3 rounded-3 fw-semibold border-secondary-subtle">
                Watch Demo
              </a>
            </div>
            <div className="d-flex align-items-center justify-content-center justify-content-lg-start gap-4 mt-5 text-muted">
              <div><strong className="text-white">10k+</strong> Researchers</div>
              <div className="vr bg-secondary opacity-25" style={{ height: '24px' }}></div>
              <div><strong className="text-white">4.9/5</strong> Rating</div>
              <div className="vr bg-secondary opacity-25" style={{ height: '24px' }}></div>
              <div><strong className="text-white">1M+</strong> Citations</div>
            </div>
          </div>
          <div className="col-lg-5 offset-lg-1 animate__animated animate__fadeInRight">
            <div className="glass-card p-4 text-start position-relative">
              <div className="d-flex align-items-center justify-content-between mb-4 border-bottom pb-3 border-secondary-subtle">
                <div className="d-flex align-items-center gap-2">
                  <div className="bg-indigo p-2 rounded-3 text-white"><i className="fa-robot"></i></div>
                  <div>
                    <h6 className="mb-0 text-white">ResearchMate Assistant</h6>
                    <span className="text-muted small">Online & Ready</span>
                  </div>
                </div>
                <span className="dot bg-success"></span>
              </div>
              <div className="chat-bubble-welcome mb-3 bg-secondary-subtle p-3 rounded-3 text-secondary border border-secondary-subtle">
                <strong>User:</strong> Synthesize the current findings on PEFT models in edge deployments.
              </div>
              <div className="chat-bubble-welcome bg-indigo-subtle p-3 rounded-3 text-indigo border border-indigo-subtle mb-4">
                <strong>Assistant:</strong> Sure! Parameter-Efficient Fine-Tuning (PEFT) adaptations like LoRA reduce trainable parameters by up to 99%, making edge deployment highly feasible by lowering memory footprints on device...
              </div>
              <div className="text-center">
                <span className="text-muted small"><i className="fa-lock me-1"></i> End-to-end Encrypted Session</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// 3. LOGIN PAGE
function LoginPage({ onLogin, onSignUp, onForgot }) {
  const [email, setEmail] = useState('sarah.jenkins@stanford.edu');
  const [password, setPassword] = useState('password123');

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin();
  };

  return (
    <div className="auth-container">
      <div className="glass-card auth-card animate__animated animate__fadeInUp text-center">
        <div className="brand-icon mb-3 fs-1"><i className="fa-brain"></i></div>
        <h3 className="fw-bold mb-1 text-white" style={{ fontFamily: 'Outfit' }}>Welcome Back</h3>
        <p className="text-secondary small mb-4">Login to access your research vault</p>
        
        <form onSubmit={handleSubmit} className="text-start">
          <div className="mb-3">
            <label className="form-label text-secondary small fw-medium">Academic Email</label>
            <input 
              type="email" 
              className="form-control bg-secondary-subtle border-secondary-subtle text-white" 
              value={email}
              onChange={e => setEmail(e.target.value)}
              required 
            />
          </div>
          <div className="mb-4">
            <div className="d-flex justify-content-between">
              <label className="form-label text-secondary small fw-medium">Password</label>
              <a href="#" onClick={onForgot} className="text-indigo small text-decoration-none">Forgot Password?</a>
            </div>
            <input 
              type="password" 
              className="form-control bg-secondary-subtle border-secondary-subtle text-white" 
              value={password}
              onChange={e => setPassword(e.target.value)}
              required 
            />
          </div>
          <button type="submit" className="btn btn-indigo w-100 py-2 rounded-3 text-white mb-3" style={{ background: 'linear-gradient(135deg, #6366f1, #4f46e5)' }}>
            Sign In
          </button>
        </form>

        <div className="text-secondary small mt-3">
          Don't have an account? <a href="#" onClick={onSignUp} className="text-indigo text-decoration-none">Sign Up</a>
        </div>
      </div>
    </div>
  );
}

// 4. SIGN UP PAGE
function SignUpPage({ onSignUp, onLogin }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSignUp();
  };

  return (
    <div className="auth-container">
      <div className="glass-card auth-card animate__animated animate__fadeInUp text-center">
        <div className="brand-icon mb-3 fs-1"><i className="fa-brain"></i></div>
        <h3 className="fw-bold mb-1 text-white" style={{ fontFamily: 'Outfit' }}>Create Account</h3>
        <p className="text-secondary small mb-4">Start organizing your literature today</p>
        
        <form onSubmit={handleSubmit} className="text-start">
          <div className="mb-3">
            <label className="form-label text-secondary small fw-medium">Full Name</label>
            <input 
              type="text" 
              className="form-control bg-secondary-subtle border-secondary-subtle text-white" 
              placeholder="e.g. Dr. Sarah Jenkins"
              value={name}
              onChange={e => setName(e.target.value)}
              required 
            />
          </div>
          <div className="mb-3">
            <label className="form-label text-secondary small fw-medium">Academic Email</label>
            <input 
              type="email" 
              className="form-control bg-secondary-subtle border-secondary-subtle text-white" 
              placeholder="e.g. sarah@stanford.edu"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required 
            />
          </div>
          <div className="mb-4">
            <label className="form-label text-secondary small fw-medium">Password</label>
            <input 
              type="password" 
              className="form-control bg-secondary-subtle border-secondary-subtle text-white" 
              value={password}
              onChange={e => setPassword(e.target.value)}
              required 
            />
          </div>
          <button type="submit" className="btn btn-indigo w-100 py-2 rounded-3 text-white mb-3" style={{ background: 'linear-gradient(135deg, #6366f1, #4f46e5)' }}>
            Sign Up
          </button>
        </form>

        <div className="text-secondary small mt-3">
          Already have an account? <a href="#" onClick={onLogin} className="text-indigo text-decoration-none">Sign In</a>
        </div>
      </div>
    </div>
  );
}

// 5. FORGOT PASSWORD PAGE
function ForgotPasswordPage({ onBackToLogin }) {
  const [submitted, setSubmitted] = useState(false);
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="auth-container">
      <div className="glass-card auth-card animate__animated animate__fadeInUp text-center">
        <div className="brand-icon mb-3 fs-1"><i className="fa-key"></i></div>
        <h3 className="fw-bold mb-1 text-white" style={{ fontFamily: 'Outfit' }}>Forgot Password</h3>
        <p className="text-secondary small mb-4">Recover access to your research account</p>
        
        {!submitted ? (
          <form onSubmit={handleSubmit} className="text-start">
            <div className="mb-4">
              <label className="form-label text-secondary small fw-medium">Academic Email</label>
              <input 
                type="email" 
                className="form-control bg-secondary-subtle border-secondary-subtle text-white" 
                placeholder="Enter registered email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required 
              />
            </div>
            <button type="submit" className="btn btn-indigo w-100 py-2 rounded-3 text-white mb-3" style={{ background: 'linear-gradient(135deg, #6366f1, #4f46e5)' }}>
              Send Reset Link
            </button>
          </form>
        ) : (
          <div className="text-center py-3 animate__animated animate__fadeIn">
            <i className="fa-circle-check text-success fs-1 mb-3 animate__animated animate__bounceIn"></i>
            <h5 className="text-white fw-bold">Check your email</h5>
            <p className="text-secondary small">We sent a secure password recovery link to your inbox.</p>
          </div>
        )}

        <button onClick={onBackToLogin} className="btn btn-outline-secondary w-100 py-2 rounded-3 mt-3">
          Back to Sign In
        </button>
      </div>
    </div>
  );
}

// 6. SIDEBAR
function Sidebar({ menuItems, activePage, setActivePage, collapsed, setCollapsed, onLogout }) {
  return (
    <aside className={`app-sidebar glass-panel ${collapsed ? 'collapsed' : ''}`}>
      <div className="sidebar-brand">
        <div className="brand-icon"><i className="fa-brain"></i></div>
        {!collapsed && <span className="brand-text text-white">ResearchMate</span>}
      </div>
      
      <div className="sidebar-menu">
        {menuItems.map(item => (
          <div 
            key={item.id} 
            onClick={() => setActivePage(item.id)}
            className={`sidebar-menu-item ${activePage === item.id ? 'active' : ''}`}
            title={item.label}
          >
            <i className={`fa-solid ${item.icon}`}></i>
            {!collapsed && <span>{item.label}</span>}
          </div>
        ))}
      </div>

      <div className="sidebar-footer">
        <div 
          onClick={onLogout}
          className="sidebar-menu-item text-danger border-0 mb-0 px-2" 
          style={{ background: 'transparent' }}
          title="Logout"
        >
          <i className="fa-solid fa-right-from-bracket text-danger"></i>
          {!collapsed && <span>Logout</span>}
        </div>
        {!collapsed && <div className="mt-2 text-center text-muted" style={{ fontSize: '10px' }}>v1.0.0 &copy; 2026</div>}
      </div>
    </aside>
  );
}

// 7. TOP NAVBAR
function Navbar({ 
  collapsed, 
  setCollapsed, 
  darkMode, 
  setDarkMode, 
  showAiDrawer, 
  setShowAiDrawer, 
  searchQuery, 
  setSearchQuery,
  profile,
  setActivePage,
  notifications,
  setNotifications,
  showNotificationsDropdown,
  setShowNotificationsDropdown
}) {
  const unreadCount = notifications.filter(n => !n.read).length;

  const markAllRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  return (
    <nav className="app-navbar glass-panel">
      <div className="navbar-left">
        <button className="nav-toggle-btn text-secondary" onClick={() => setCollapsed(!collapsed)}>
          <i className={`fa-solid ${collapsed ? 'fa-indent' : 'fa-outdent'}`}></i>
        </button>
        <div className="global-search-container">
          <i className="fa-solid fa-magnifying-glass"></i>
          <input 
            type="text" 
            className="global-search-input" 
            placeholder="Search papers, notes, citations..." 
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <div className="navbar-right">
        {/* Quick Assistant drawer button */}
        <button 
          className="ai-assistant-badge-btn" 
          onClick={() => setShowAiDrawer(!showAiDrawer)}
          title="Toggle Floating AI Assistant"
        >
          <i className="fa-solid fa-sparkles text-indigo"></i>
          <span className="d-none d-sm-inline text-white">AI Assistant</span>
        </button>

        {/* Dark/Light mode toggle */}
        <button 
          className="navbar-btn" 
          onClick={() => setDarkMode(!darkMode)}
          title="Toggle Light/Dark Theme"
        >
          <i className={`fa-solid ${darkMode ? 'fa-sun text-warning' : 'fa-moon text-indigo'}`}></i>
        </button>

        {/* Notifications dropdown trigger */}
        <div className="position-relative">
          <button 
            className="navbar-btn" 
            onClick={() => setShowNotificationsDropdown(!showNotificationsDropdown)}
            title="Notifications"
          >
            <i className="fa-solid fa-bell text-secondary"></i>
            {unreadCount > 0 && <span className="badge-dot"></span>}
          </button>

          {showNotificationsDropdown && (
            <div className="glass-panel position-absolute end-0 mt-2 p-3 rounded-4 shadow-lg" style={{ width: '320px', zIndex: 1001, top: '40px' }}>
              <div className="d-flex justify-content-between align-items-center mb-2 pb-2 border-bottom border-secondary-subtle">
                <h6 className="mb-0 text-white fw-bold">Notifications</h6>
                {unreadCount > 0 && (
                  <button onClick={markAllRead} className="btn btn-link text-indigo text-decoration-none p-0 small">Mark all read</button>
                )}
              </div>
              <div className="overflow-y-auto" style={{ maxHeight: '240px' }}>
                {notifications.map(notif => (
                  <div key={notif.id} className={`p-2 rounded-3 mb-2 small ${notif.read ? 'bg-transparent text-secondary' : 'bg-secondary-subtle text-white'}`}>
                    <div className="d-flex justify-content-between align-items-start">
                      <strong style={{ fontSize: '12px' }}>{notif.title}</strong>
                      <span className="text-muted" style={{ fontSize: '10px' }}>{notif.time}</span>
                    </div>
                    <div style={{ fontSize: '11px', marginTop: '2px' }}>{notif.desc}</div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Profile Avatar trigger */}
        <div className="nav-profile-menu" onClick={() => setActivePage('profile')} title="View Academic Profile">
          <img src={profile.avatar || "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150"} alt="User profile avatar" className="nav-avatar" />
          <span className="d-none d-lg-inline text-white small fw-medium">{profile.name || "Dr. Sarah Jenkins"}</span>
        </div>
      </div>
    </nav>
  );
}

// 8. QUICK FLOATING AI DRAWER
function AiAssistantDrawer({ open, onClose, addNotification }) {
  const [messages, setMessages] = useState([
    { sender: 'ai', text: "Hello! I'm your global context Assistant. Ask me anything about your current research vault, papers, notes or citations." }
  ]);
  const [inputVal, setInputVal] = useState('');
  const [typing, setTyping] = useState(false);
  const endRef = useRef(null);

  useEffect(() => {
    if (endRef.current) {
      endRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, typing]);

  const handleSend = () => {
    if (!inputVal.trim()) return;
    const userMsg = inputVal;
    setMessages(prev => [...prev, { sender: 'user', text: userMsg }]);
    setInputVal('');
    setTyping(true);

    setTimeout(() => {
      setTyping(false);
      setMessages(prev => [...prev, {
        sender: 'ai',
        text: `Based on your library, here are key inputs: "${userMsg}" aligns closely with your PEFT Fine-Tuning nodes. You have 2 papers covering this topology: 'LoRA' (2022) and 'DPO' (2023). Let me know if you'd like a synthesized literature grid summarizing their comparative metrics.`
      }]);
      addNotification("AI Copilot Replied", "The sidebar drawer generated a context search reply");
    }, 1500);
  };

  return (
    <div className={`ai-drawer glass-panel ${open ? 'open' : ''}`}>
      <div className="d-flex justify-content-between align-items-center p-3 border-bottom border-secondary-subtle bg-secondary-subtle">
        <div className="d-flex align-items-center gap-2">
          <i className="fa-solid fa-sparkles text-indigo fs-5 animate__animated animate__pulse animate__infinite"></i>
          <h6 className="mb-0 text-white fw-bold">Sidebar Copilot</h6>
        </div>
        <button className="btn btn-link text-secondary p-0 border-0" onClick={onClose}><i className="fa-solid fa-xmark"></i></button>
      </div>

      <div className="d-flex flex-column" style={{ height: 'calc(100% - 55px)' }}>
        <div className="flex-1 overflow-y-auto p-3 d-flex flex-column gap-3" style={{ height: '0', flexGrow: 1 }}>
          {messages.map((m, idx) => (
            <div key={idx} className={`chat-message-bubble ${m.sender === 'user' ? 'user' : 'ai'}`} style={{ maxWidth: '90%' }}>
              <div style={{ fontSize: '13px' }}>{m.text}</div>
            </div>
          ))}
          {typing && (
            <div className="chat-message-bubble ai">
              <div className="typing-dots">
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>
          )}
          <div ref={endRef}></div>
        </div>

        <div className="p-3 border-top border-secondary-subtle">
          <div className="input-group">
            <input 
              type="text" 
              className="form-control bg-secondary-subtle border-secondary-subtle text-white small" 
              placeholder="Ask anything..." 
              value={inputVal}
              onChange={e => setInputVal(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleSend()}
            />
            <button className="btn btn-indigo px-3" onClick={handleSend} style={{ background: 'linear-gradient(135deg, #6366f1, #4f46e5)' }}>
              <i className="fa-solid fa-paper-plane"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// 9. DASHBOARD VIEW
function DashboardView({ papers, notes, chats, planner, calendarEvents, setActivePage }) {
  const completedCount = papers.filter(p => p.readingStatus === 'Completed').length;
  const activeCount = papers.filter(p => p.readingStatus === 'Reading').length;
  const totalNotes = notes.length;
  
  const chartRef = useRef(null);
  const prodChartRef = useRef(null);

  useEffect(() => {
    // 1. Research Hours Line Chart
    let lineChart;
    if (chartRef.current) {
      const ctx = chartRef.current.getContext('2d');
      lineChart = new Chart(ctx, {
        type: 'line',
        data: {
          labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
          datasets: [{
            label: 'Reading Hours',
            data: [2.5, 4.0, 1.5, 5.0, 3.0, 6.5, 4.5],
            borderColor: '#6366f1',
            backgroundColor: 'rgba(99, 102, 241, 0.1)',
            fill: true,
            tension: 0.4,
            borderWidth: 3
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: { legend: { display: false } },
          scales: {
            y: { grid: { color: 'rgba(255,255,255,0.05)' }, ticks: { color: '#9ca3af' } },
            x: { grid: { display: false }, ticks: { color: '#9ca3af' } }
          }
        }
      });
    }

    // 2. Productivity Radar/Polar Chart
    let polarChart;
    if (prodChartRef.current) {
      const ctx = prodChartRef.current.getContext('2d');
      polarChart = new Chart(ctx, {
        type: 'polarArea',
        data: {
          labels: ['Reading', 'AI Chats', 'Notes', 'Citations', 'Planner Goals'],
          datasets: [{
            data: [completedCount * 10, chats.length * 8, totalNotes * 6, 25, 45],
            backgroundColor: [
              'rgba(99, 102, 241, 0.6)',
              'rgba(20, 184, 166, 0.6)',
              'rgba(245, 158, 11, 0.6)',
              'rgba(244, 63, 94, 0.6)',
              'rgba(139, 92, 246, 0.6)'
            ],
            borderWidth: 0
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: { legend: { position: 'bottom', labels: { color: '#9ca3af', font: { size: 10 } } } },
          scales: {
            r: { grid: { color: 'rgba(255,255,255,0.05)' }, angleLines: { color: 'rgba(255,255,255,0.05)' }, ticks: { display: false } }
          }
        }
      });
    }

    return () => {
      if (lineChart) lineChart.destroy();
      if (polarChart) polarChart.destroy();
    };
  }, [completedCount, chats.length, totalNotes]);

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2 className="fw-bold mb-1">Welcome back, Sarah!</h2>
          <p className="text-secondary small mb-0">Here's your research activity dashboard update for today.</p>
        </div>
        <button onClick={() => setActivePage('upload')} className="btn btn-indigo text-white px-4 rounded-3" style={{ background: 'linear-gradient(135deg, #6366f1, #4f46e5)' }}>
          <i className="fa-solid fa-plus me-2"></i>Upload Paper
        </button>
      </div>

      {/* Stats row */}
      <div className="row g-3 mb-4">
        <div className="col-6 col-md-3 col-xl-2">
          <div className="glass-card stat-card-glow p-3 h-100 d-flex flex-column justify-content-between">
            <div className="d-flex justify-content-between align-items-start mb-2">
              <span className="text-muted small fw-medium">Total Papers</span>
              <span className="badge bg-indigo-subtle text-indigo rounded-3"><i className="fa-file-lines"></i></span>
            </div>
            <div>
              <h3 className="fw-bold mb-0 text-white">{papers.length}</h3>
              <span className="text-success small" style={{ fontSize: '10px' }}><i className="fa-arrow-up"></i> +2 this week</span>
            </div>
          </div>
        </div>

        <div className="col-6 col-md-3 col-xl-2">
          <div className="glass-card stat-card-glow p-3 h-100 d-flex flex-column justify-content-between">
            <div className="d-flex justify-content-between align-items-start mb-2">
              <span className="text-muted small fw-medium">AI Discussions</span>
              <span className="badge bg-teal-subtle text-teal rounded-3"><i className="fa-robot"></i></span>
            </div>
            <div>
              <h3 className="fw-bold mb-0 text-white">{chats.length}</h3>
              <span className="text-muted small" style={{ fontSize: '10px' }}>Active sessions</span>
            </div>
          </div>
        </div>

        <div className="col-6 col-md-3 col-xl-2">
          <div className="glass-card stat-card-glow p-3 h-100 d-flex flex-column justify-content-between">
            <div className="d-flex justify-content-between align-items-start mb-2">
              <span className="text-muted small fw-medium">Saved Notes</span>
              <span className="badge bg-amber-subtle text-amber rounded-3"><i className="fa-note-sticky"></i></span>
            </div>
            <div>
              <h3 className="fw-bold mb-0 text-white">{totalNotes}</h3>
              <span className="text-indigo small" style={{ fontSize: '10px' }}><i className="fa-circle-check"></i> 2 pinned notes</span>
            </div>
          </div>
        </div>

        <div className="col-6 col-md-3 col-xl-2">
          <div className="glass-card stat-card-glow p-3 h-100 d-flex flex-column justify-content-between">
            <div className="d-flex justify-content-between align-items-start mb-2">
              <span className="text-muted small fw-medium">Weekly Hours</span>
              <span className="badge bg-rose-subtle text-rose rounded-3"><i className="fa-clock"></i></span>
            </div>
            <div>
              <h3 className="fw-bold mb-0 text-white">27.0</h3>
              <span className="text-success small" style={{ fontSize: '10px' }}><i className="fa-arrow-up"></i> Target met</span>
            </div>
          </div>
        </div>

        <div className="col-6 col-md-3 col-xl-2">
          <div className="glass-card stat-card-glow p-3 h-100 d-flex flex-column justify-content-between">
            <div className="d-flex justify-content-between align-items-start mb-2">
              <span className="text-muted small fw-medium">Citations Generated</span>
              <span className="badge bg-purple-subtle text-purple rounded-3"><i className="fa-quote-left"></i></span>
            </div>
            <div>
              <h3 className="fw-bold mb-0 text-white">42</h3>
              <span className="text-muted small" style={{ fontSize: '10px' }}>In APA/MLA/IEEE</span>
            </div>
          </div>
        </div>

        <div className="col-6 col-md-3 col-xl-2">
          <div className="glass-card stat-card-glow p-3 h-100 d-flex flex-column justify-content-between">
            <div className="d-flex justify-content-between align-items-start mb-2">
              <span className="text-muted small fw-medium">Research Progress</span>
              <span className="badge bg-success-subtle text-success rounded-3"><i className="fa-bars-progress"></i></span>
            </div>
            <div>
              <h3 className="fw-bold mb-0 text-white">74%</h3>
              <span className="text-success small" style={{ fontSize: '10px' }}><i className="fa-arrow-up"></i> +4% milestones</span>
            </div>
          </div>
        </div>
      </div>

      {/* Charts section */}
      <div className="row g-4 mb-4">
        <div className="col-lg-8">
          <div className="glass-card p-4 h-100">
            <div className="d-flex justify-content-between align-items-center mb-4">
              <div>
                <h5 className="mb-0 fw-bold">Weekly Research Activity</h5>
                <span className="text-muted small">Hours tracked reviewing literature</span>
              </div>
              <select className="form-select bg-secondary-subtle border-secondary-subtle text-white w-auto small">
                <option>This Week</option>
                <option>Last Week</option>
                <option>This Month</option>
              </select>
            </div>
            <div style={{ height: '280px' }}>
              <canvas ref={chartRef}></canvas>
            </div>
          </div>
        </div>

        <div className="col-lg-4">
          <div className="glass-card p-4 h-100">
            <div>
              <h5 className="mb-0 fw-bold">Productivity Distribution</h5>
              <span className="text-muted small">Core research work mapping</span>
            </div>
            <div className="mt-4" style={{ height: '240px' }}>
              <canvas ref={prodChartRef}></canvas>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom widgets */}
      <div className="row g-4">
        <div className="col-md-6 col-xl-7">
          <div className="glass-card p-4 h-100">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h5 className="mb-0 fw-bold">Active Papers Progress</h5>
              <button onClick={() => setActivePage('papers')} className="btn btn-link text-indigo text-decoration-none p-0 small">Manage Library</button>
            </div>
            <div className="d-flex flex-column gap-3">
              {papers.slice(0, 3).map(paper => (
                <div key={paper.id} className="d-flex align-items-center justify-content-between p-3 rounded-4 bg-secondary-subtle border border-secondary-subtle">
                  <div className="d-flex align-items-center gap-3 col-8 text-truncate">
                    <i className="fa-file-pdf text-danger fs-4"></i>
                    <div className="text-truncate">
                      <h6 className="mb-0 text-white text-truncate">{paper.title}</h6>
                      <span className="text-muted small">{paper.authors.split(',')[0]} (Year: {paper.year})</span>
                    </div>
                  </div>
                  <div>
                    <span className={`badge ${
                      paper.readingStatus === 'Completed' ? 'bg-success-subtle text-success' :
                      paper.readingStatus === 'Reading' ? 'bg-warning-subtle text-warning' : 'bg-secondary-subtle text-muted'
                    } rounded-pill`}>
                      {paper.readingStatus}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="col-md-6 col-xl-5">
          <div className="glass-card p-4 h-100">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h5 className="mb-0 fw-bold">Upcoming Deadlines</h5>
              <button onClick={() => setActivePage('calendar')} className="btn btn-link text-indigo text-decoration-none p-0 small">Open Calendar</button>
            </div>
            <div className="d-flex flex-column gap-3">
              {calendarEvents.slice(0, 3).map(event => (
                <div key={event.id} className="d-flex align-items-center justify-content-between p-3 rounded-4 bg-secondary-subtle border border-secondary-subtle">
                  <div className="d-flex align-items-center gap-3">
                    <div className={`p-2 rounded-3 text-white ${event.type === 'meeting' ? 'bg-indigo' : 'bg-rose'}`}>
                      <i className={`fa-solid ${event.type === 'meeting' ? 'fa-video' : 'fa-triangle-exclamation'}`}></i>
                    </div>
                    <div>
                      <h6 className="mb-0 text-white small fw-bold">{event.title}</h6>
                      <span className="text-muted" style={{ fontSize: '11px' }}>{event.date} at {event.time}</span>
                    </div>
                  </div>
                  <span className="badge bg-secondary text-secondary small">{event.type}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// 10. AI CHAT VIEW (ChatGPT-style interface)
function AiChatView({ chats, setChats, activeChatId, setActiveChatId, addNotification, addHistory }) {
  const [inputText, setInputText] = useState('');
  const [typing, setTyping] = useState(false);
  const [editingTitleId, setEditingTitleId] = useState(null);
  const [editedTitle, setEditedTitle] = useState('');
  const [voiceActive, setVoiceActive] = useState(false);
  
  const endRef = useRef(null);

  const activeChat = useMemo(() => {
    return chats.find(c => c.id === activeChatId) || chats[0];
  }, [chats, activeChatId]);

  useEffect(() => {
    if (endRef.current) {
      endRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [activeChat, typing]);

  const handleSendMessage = (customText) => {
    const textToSend = customText || inputText;
    if (!textToSend.trim() || !activeChat) return;

    // 1. Push user message
    const userMsg = { sender: 'user', text: textToSend, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) };
    
    setChats(prev => prev.map(c => {
      if (c.id === activeChat.id) {
        return { ...c, messages: [...c.messages, userMsg] };
      }
      return c;
    }));
    setInputText('');
    setTyping(true);
    addHistory(`Sent AI query: "${textToSend.substring(0, 25)}..."`, 'chat');

    // 2. Simulate AI response
    setTimeout(() => {
      setTyping(false);
      const aiResponseText = `Here is a context breakdown: related to your query on PEFT/RAG architecture. Self-attention weights can scale effectively but require optimization. In 'LoRA' (Low-Rank Adaptation), we freeze the pre-trained weights $W_0 \\in \\mathbb{R}^{d \\times k}$ and update the parameter representation matrices $A$ and $B$, which drops active parameter storage requirements by 90% without loss in language synthesis scores.\n\nLet me know if you would like me to generate a bibliography reference or format notes.`;
      const aiMsg = { sender: 'ai', text: aiResponseText, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) };
      
      setChats(prev => prev.map(c => {
        if (c.id === activeChat.id) {
          return { ...c, messages: [...c.messages, aiMsg] };
        }
        return c;
      }));
      addNotification("AI Assistant Answered", "Generated literature insights answer");
    }, 1800);
  };

  const createNewChat = () => {
    const newId = `chat-${Date.now()}`;
    const newChat = {
      id: newId,
      title: `Untitled Session ${chats.length + 1}`,
      pinned: false,
      messages: [
        { sender: 'ai', text: "Hello Sarah! Ready to dive into some paper analysis? Send a prompt or click a suggestion below.", time: "Just now" }
      ]
    };
    setChats(prev => [newChat, ...prev]);
    setActiveChatId(newId);
  };

  const deleteChat = (id, e) => {
    e.stopPropagation();
    if (chats.length <= 1) return;
    setChats(prev => prev.filter(c => c.id !== id));
    if (activeChatId === id) {
      const remaining = chats.filter(c => c.id !== id);
      setActiveChatId(remaining[0].id);
    }
  };

  const togglePinChat = (id, e) => {
    e.stopPropagation();
    setChats(prev => prev.map(c => {
      if (c.id === id) return { ...c, pinned: !c.pinned };
      return c;
    }));
  };

  const startRenameChat = (chat, e) => {
    e.stopPropagation();
    setEditingTitleId(chat.id);
    setEditedTitle(chat.title);
  };

  const saveRenameChat = (id) => {
    if (!editedTitle.trim()) return;
    setChats(prev => prev.map(c => {
      if (c.id === id) return { ...c, title: editedTitle };
      return c;
    }));
    setEditingTitleId(null);
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    addNotification("Copied to Clipboard", "AI Response content successfully copied");
  };

  const simulateVoiceInput = () => {
    setVoiceActive(true);
    setInputText('Parsing methodology from DPO models...');
    setTimeout(() => {
      setVoiceActive(false);
    }, 2000);
  };

  return (
    <div className="glass-card p-0 overflow-hidden" style={{ height: 'calc(100vh - 130px)' }}>
      <div className="row g-0 h-100">
        
        {/* Chat History Panel */}
        <div className="col-md-4 col-lg-3 chat-history-sidebar d-flex flex-column h-100">
          <div className="p-3 border-bottom border-secondary-subtle bg-secondary-subtle d-flex justify-content-between align-items-center">
            <h6 className="mb-0 text-white fw-bold">Chat History</h6>
            <button onClick={createNewChat} className="btn btn-outline-indigo btn-sm py-1 px-2 rounded-3 text-indigo">
              <i className="fa-plus me-1"></i> New
            </button>
          </div>
          
          <div className="flex-grow-1 overflow-y-auto p-2">
            {chats.map(chat => (
              <div 
                key={chat.id} 
                onClick={() => setActiveChatId(chat.id)}
                className={`p-2 rounded-3 mb-1 d-flex justify-content-between align-items-center cursor-pointer ${
                  activeChatId === chat.id ? 'bg-indigo-subtle border border-indigo-subtle text-white' : 'bg-transparent text-secondary'
                }`}
              >
                <div className="d-flex align-items-center gap-2 text-truncate col-9">
                  <i className={`fa-solid ${chat.pinned ? 'fa-thumbtack text-warning' : 'fa-message'}`} style={{ fontSize: '12px' }}></i>
                  {editingTitleId === chat.id ? (
                    <input 
                      type="text" 
                      className="form-control form-control-sm bg-dark border-secondary text-white py-0" 
                      value={editedTitle}
                      onChange={e => setEditedTitle(e.target.value)}
                      onBlur={() => saveRenameChat(chat.id)}
                      onKeyDown={e => e.key === 'Enter' && saveRenameChat(chat.id)}
                      autoFocus
                    />
                  ) : (
                    <span className="text-truncate small">{chat.title}</span>
                  )}
                </div>
                
                <div className="d-flex gap-1">
                  <button className="btn btn-link text-muted p-0" onClick={(e) => startRenameChat(chat, e)}>
                    <i className="fa-pen-to-square" style={{ fontSize: '11px' }}></i>
                  </button>
                  <button className="btn btn-link text-muted p-0" onClick={(e) => togglePinChat(chat, e)}>
                    <i className="fa-thumbtack" style={{ fontSize: '11px' }}></i>
                  </button>
                  {chats.length > 1 && (
                    <button className="btn btn-link text-danger p-0" onClick={(e) => deleteChat(chat.id, e)}>
                      <i className="fa-trash" style={{ fontSize: '11px' }}></i>
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Active Chat Conversation Panel */}
        <div className="col-md-8 col-lg-9 d-flex flex-column h-100 bg-black-subtle">
          {activeChat ? (
            <>
              {/* Header */}
              <div className="p-3 border-bottom border-secondary-subtle bg-secondary-subtle d-flex justify-content-between align-items-center">
                <div>
                  <h6 className="mb-0 text-white fw-bold">{activeChat.title}</h6>
                  <span className="text-muted small">Academic Research Model Copilot</span>
                </div>
                <div className="d-flex gap-2">
                  <button className="btn btn-outline-secondary btn-sm rounded-3" onClick={() => copyToClipboard(activeChat.messages.map(m => `${m.sender}: ${m.text}`).join('\n'))}>
                    <i className="fa-solid fa-file-export me-1"></i> Export
                  </button>
                </div>
              </div>

              {/* Message Streams */}
              <div className="chat-messages">
                {activeChat.messages.map((m, idx) => (
                  <div key={idx} className={`chat-message-bubble ${m.sender === 'user' ? 'user' : 'ai'}`}>
                    <div style={{ whiteSpace: 'pre-line' }}>{m.text}</div>
                    
                    {m.sender === 'ai' && (
                      <div className="chat-bubble-actions">
                        <i className="fa-regular fa-copy" title="Copy response" onClick={() => copyToClipboard(m.text)}></i>
                        <i className="fa-regular fa-thumbs-up" title="Like response" onClick={() => addNotification("Feedback Sent", "Liked AI contribution")}></i>
                        <i className="fa-regular fa-thumbs-down" title="Dislike response"></i>
                        <i className="fa-solid fa-arrows-rotate" title="Regenerate response" onClick={() => handleSendMessage("Regenerate response: " + activeChat.messages[activeChat.messages.length - 2].text)}></i>
                      </div>
                    )}
                  </div>
                ))}
                {typing && (
                  <div className="chat-message-bubble ai">
                    <div className="typing-dots">
                      <span></span>
                      <span></span>
                      <span></span>
                    </div>
                  </div>
                )}
                <div ref={endRef}></div>
              </div>

              {/* Suggestions panel */}
              <div className="p-2 border-top border-secondary-subtle d-flex gap-2 flex-wrap">
                {window.ResearchMateData.suggestedPrompts.slice(0, 3).map((prompt, pIdx) => (
                  <span key={pIdx} className="suggestion-pill" onClick={() => handleSendMessage(prompt)}>
                    {prompt}
                  </span>
                ))}
              </div>

              {/* User input box */}
              <div className="p-3 border-top border-secondary-subtle bg-secondary-subtle">
                <div className="input-group">
                  <button className={`btn ${voiceActive ? 'btn-danger' : 'btn-outline-secondary'} px-3`} onClick={simulateVoiceInput} title="Voice Input">
                    <i className={`fa-solid ${voiceActive ? 'fa-microphone-lines' : 'fa-microphone'}`}></i>
                  </button>
                  
                  <input 
                    type="text" 
                    className="form-control bg-dark border-secondary-subtle text-white px-3" 
                    placeholder="Ask AI Assistant to analyze papers, summarize structures, check math..." 
                    value={inputText}
                    onChange={e => setInputText(e.target.value)}
                    onKeyDown={e => e.key === 'Enter' && handleSendMessage()}
                  />
                  
                  <button className="btn btn-indigo px-4" onClick={() => handleSendMessage()} style={{ background: 'linear-gradient(135deg, #6366f1, #4f46e5)' }}>
                    Send <i className="fa-solid fa-paper-plane ms-1"></i>
                  </button>
                </div>
              </div>
            </>
          ) : (
            <div className="h-100 d-flex flex-column align-items-center justify-content-center text-muted">
              <i className="fa-robot fs-1 mb-3"></i>
              <p>No active sessions. Create a new chat on the left panel.</p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}

// 11. MY PAPERS VIEW
function MyPapersView({ papers, setPapers, searchQuery, setActivePage, setSelectedPaperForViewer, addNotification, addHistory }) {
  const [filterStatus, setFilterStatus] = useState('All');
  const [sortBy, setSortBy] = useState('Year');
  const [favoritesOnly, setFavoritesOnly] = useState(false);

  const toggleFavorite = (id) => {
    setPapers(prev => prev.map(p => {
      if (p.id === id) {
        const nextState = !p.isFavorite;
        addNotification(nextState ? "Added to Favorites" : "Removed from Favorites", `Paper ${p.title.substring(0, 15)}... updated`);
        return { ...p, isFavorite: nextState };
      }
      return p;
    }));
  };

  const filteredPapers = useMemo(() => {
    return papers.filter(p => {
      const matchQuery = p.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          p.authors.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          p.keywords.some(k => k.toLowerCase().includes(searchQuery.toLowerCase()));
      
      const matchStatus = filterStatus === 'All' ? true : p.readingStatus === filterStatus;
      const matchFavorite = favoritesOnly ? p.isFavorite : true;

      return matchQuery && matchStatus && matchFavorite;
    }).sort((a, b) => {
      if (sortBy === 'Year') return b.year - a.year;
      if (sortBy === 'Title') return a.title.localeCompare(b.title);
      return b.id.localeCompare(a.id); // default by id/dateAdded
    });
  }, [papers, searchQuery, filterStatus, sortBy, favoritesOnly]);

  const viewInPdfReader = (paper) => {
    setSelectedPaperForViewer(paper);
    addHistory(`Opened paper '${paper.title}' in Reader`, 'view');
    setActivePage('pdf');
  };

  const openSummary = (paper) => {
    setSelectedPaperForViewer(paper);
    addHistory(`Requested summary for '${paper.title}'`, 'summary');
    setActivePage('summary');
  };

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h3 className="fw-bold mb-1">My Research Library</h3>
          <p className="text-secondary small mb-0">Browse and filter academic publications in your personal vault.</p>
        </div>
        <button onClick={() => setActivePage('upload')} className="btn btn-indigo text-white px-3" style={{ background: 'linear-gradient(135deg, #6366f1, #4f46e5)' }}>
          <i className="fa-solid fa-plus me-1"></i> Add Paper
        </button>
      </div>

      {/* Filter and Control Toolbar */}
      <div className="row g-3 mb-4">
        <div className="col-md-4 col-lg-3">
          <label className="small text-secondary mb-1">Reading Status</label>
          <select 
            className="form-select bg-secondary-subtle border-secondary-subtle text-white" 
            value={filterStatus}
            onChange={e => setFilterStatus(e.target.value)}
          >
            <option value="All">All Statuses</option>
            <option value="Unread">Unread</option>
            <option value="Reading">Reading</option>
            <option value="Completed">Completed</option>
          </select>
        </div>

        <div className="col-md-4 col-lg-3">
          <label className="small text-secondary mb-1">Sort By</label>
          <select 
            className="form-select bg-secondary-subtle border-secondary-subtle text-white" 
            value={sortBy}
            onChange={e => setSortBy(e.target.value)}
          >
            <option value="Year">Publication Year</option>
            <option value="Title">Alphabetical Title</option>
            <option value="Added">Date Uploaded</option>
          </select>
        </div>

        <div className="col-md-4 col-lg-3 d-flex align-items-end">
          <button 
            className={`btn w-100 ${favoritesOnly ? 'btn-warning' : 'btn-outline-secondary'} py-2 rounded-3`}
            onClick={() => setFavoritesOnly(!favoritesOnly)}
          >
            <i className={`fa-star me-2 ${favoritesOnly ? 'fa-solid' : 'fa-regular'}`}></i>
            {favoritesOnly ? 'Showing Favorites' : 'Show Favorites Only'}
          </button>
        </div>
      </div>

      {/* Papers Grid */}
      <div className="row g-4">
        {filteredPapers.map(paper => (
          <div key={paper.id} className="col-md-6 col-xxl-4 animate__animated animate__fadeInUp">
            <div className="glass-card p-4 h-100 d-flex flex-column justify-content-between">
              <div>
                <div className="d-flex justify-content-between align-items-start mb-2">
                  <span className={`badge ${
                    paper.readingStatus === 'Completed' ? 'bg-success-subtle text-success' :
                    paper.readingStatus === 'Reading' ? 'bg-warning-subtle text-warning' : 'bg-secondary-subtle text-muted'
                  } rounded-pill`}>
                    {paper.readingStatus}
                  </span>
                  
                  <button className="btn btn-link text-warning p-0" onClick={() => toggleFavorite(paper.id)}>
                    <i className={`${paper.isFavorite ? 'fa-solid' : 'fa-regular'} fa-star`}></i>
                  </button>
                </div>

                <h5 className="text-white fw-bold mb-2 text-line-clamp-2" title={paper.title}>{paper.title}</h5>
                <p className="text-muted small mb-3 text-truncate">{paper.authors}</p>
                <div className="d-flex gap-2 text-muted small mb-3" style={{ fontSize: '12px' }}>
                  <span><i className="fa-building me-1"></i> {paper.journal}</span>
                  <span>&bull;</span>
                  <span><i className="fa-calendar me-1"></i> {paper.year}</span>
                </div>
                
                <p className="text-secondary small mb-3" style={{ display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                  {paper.abstract}
                </p>
              </div>

              <div>
                <div className="d-flex flex-wrap gap-1 mb-3">
                  {paper.keywords.map((kw, kwIdx) => (
                    <span key={kwIdx} className="badge bg-secondary text-secondary small rounded-pill px-2">{kw}</span>
                  ))}
                </div>

                <div className="row g-2">
                  <div className="col-6">
                    <button className="btn btn-outline-secondary w-100 py-2 btn-sm rounded-3" onClick={() => viewInPdfReader(paper)}>
                      <i className="fa-file-pdf text-danger me-1"></i> Read PDF
                    </button>
                  </div>
                  <div className="col-6">
                    <button className="btn btn-outline-indigo w-100 py-2 btn-sm rounded-3" onClick={() => openSummary(paper)}>
                      <i className="fa-wand-magic-sparkles text-indigo me-1"></i> Summarize
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}

        {filteredPapers.length === 0 && (
          <div className="col-12 text-center py-5 text-muted">
            <i className="fa-folder-open fs-1 mb-3"></i>
            <p>No papers found matching the filters or query.</p>
          </div>
        )}
      </div>
    </div>
  );
}

// 12. UPLOAD PAPERS VIEW
function UploadPapersView({ papers, setPapers, addNotification, addHistory }) {
  const [dragActive, setDragActive] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadingFile, setUploadingFile] = useState(null);

  const simulateUpload = (fileName) => {
    setUploadingFile(fileName);
    setUploadProgress(0);
    
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          
          // Add dummy paper
          const newPaper = {
            id: `paper-${Date.now()}`,
            title: fileName.replace(/\.[^/.]+$/, ""),
            authors: "Sarah Jenkins et al.",
            journal: "Stanford AI Lab Draft",
            year: 2026,
            doi: "Pending API Indexing",
            abstract: "This uploaded study reports empirical metrics regarding agent configurations, evaluation parameters, and performance scaling thresholds under distributed prompt templates.",
            keywords: ["Uploaded Draft", "Agent Configurations"],
            readingStatus: "Unread",
            isFavorite: false,
            color: "#e0e7ff",
            rating: 3,
            dateAdded: new Date().toISOString().split('T')[0]
          };

          setPapers(prevPapers => [newPaper, ...prevPapers]);
          addNotification("Upload Success", `File '${fileName}' successfully indexed`);
          addHistory(`Uploaded paper: '${fileName}'`, 'upload');
          setTimeout(() => setUploadingFile(null), 1000);
          return 100;
        }
        return prev + 10;
      });
    }, 150);
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      simulateUpload(e.dataTransfer.files[0].name);
    }
  };

  const triggerInputClick = () => {
    simulateUpload("PEFT_Evaluation_Edge_Nodes.pdf");
  };

  return (
    <div>
      <h3 className="fw-bold mb-1">Upload Publications</h3>
      <p className="text-secondary small mb-4">Ingest new PDFs into your localized vector database. AI generates indexes automatically.</p>

      <div className="row g-4">
        <div className="col-lg-8">
          <div 
            className={`glass-panel p-5 rounded-4 text-center border-dashed d-flex flex-column align-items-center justify-content-center cursor-pointer ${
              dragActive ? 'border-primary' : 'border-secondary-subtle'
            }`}
            style={{ minHeight: '300px', border: '2px dashed' }}
            onDragEnter={handleDrag}
            onDragOver={handleDrag}
            onDragLeave={handleDrag}
            onDrop={handleDrop}
            onClick={triggerInputClick}
          >
            <i className="fa-solid fa-cloud-arrow-up fs-1 text-indigo mb-3 animate__animated animate__pulse animate__infinite"></i>
            <h5 className="text-white fw-bold mb-2">Drag & Drop PDF here</h5>
            <p className="text-muted small mb-3">or click to browse your desktop directories</p>
            <span className="badge bg-secondary-subtle text-muted small">Max PDF Size: 50MB</span>
          </div>

          {uploadingFile && (
            <div className="glass-card p-3 mt-4 animate__animated animate__fadeIn">
              <div className="d-flex justify-content-between align-items-center mb-2">
                <span className="text-white small fw-bold"><i className="fa-file-pdf text-danger me-1"></i> {uploadingFile}</span>
                <span className="text-muted small">{uploadProgress}%</span>
              </div>
              <div className="progress bg-dark" style={{ height: '6px' }}>
                <div 
                  className="progress-bar bg-indigo" 
                  style={{ width: `${uploadProgress}%`, transition: 'width 0.1s ease' }}
                ></div>
              </div>
            </div>
          )}
        </div>

        <div className="col-lg-4">
          <div className="glass-card p-4">
            <h5 className="text-white fw-bold mb-3">Upload Guidelines</h5>
            <ul className="text-secondary small ps-3 mb-0" style={{ lineHeight: '1.8' }}>
              <li>Ensure PDF files contain machine-readable text layers (OCR).</li>
              <li>Embedded math formatting is dynamically parsed using MathJax.</li>
              <li>Vector indexes are saved locally in the cache space.</li>
              <li>AI synthesizes abstracts and generates metadata upon completion.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

// 13. PDF READER VIEW
function PdfReaderView({ papers, addNotification, addHistory }) {
  const [zoom, setZoom] = useState(100);
  const [pdfTextQuery, setPdfTextQuery] = useState('');
  const [stickyNotes, setStickyNotes] = useState([
    { id: 1, text: "Verify the path length equation derivation", color: "yellow" },
    { id: 2, text: "BART baseline performance is listed in section 4", color: "green" }
  ]);
  const [noteInput, setNoteInput] = useState('');
  const [noteColor, setNoteColor] = useState('yellow');
  const [highlightsList, setHighlightsList] = useState([
    { id: 1, text: "Attention architecture dispenses with recurrence entirely." },
    { id: 2, text: "We achieved state-of-the-art results in short training periods." }
  ]);

  const selectedPaper = window.selectedPaperForViewer || papers[0];

  const handleAddNote = () => {
    if (!noteInput.trim()) return;
    setStickyNotes(prev => [
      ...prev,
      { id: Date.now(), text: noteInput, color: noteColor }
    ]);
    setNoteInput('');
    addNotification("Note Added", "New sticky note generated inside reader session");
  };

  const deleteNote = (id) => {
    setStickyNotes(prev => prev.filter(n => n.id !== id));
  };

  const handleHighlightSelection = () => {
    // Simulating text highlight addition
    const dummyText = "Self-attention path length between distant positions is O(1) complexity.";
    setHighlightsList(prev => [...prev, { id: Date.now(), text: dummyText }]);
    addNotification("Text Highlighted", "Highlighted text added to the active ledger");
  };

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h3 className="fw-bold mb-1">PDF Workspace</h3>
          <p className="text-indigo mb-0 text-truncate" style={{ maxWidth: '400px' }}><i className="fa-file-pdf text-danger me-1"></i> {selectedPaper.title}</p>
        </div>
        
        {/* PDF Controls */}
        <div className="d-flex align-items-center gap-2">
          <button className="btn btn-outline-secondary btn-sm" onClick={() => setZoom(z => Math.max(z - 10, 50))} title="Zoom Out"><i className="fa-minus"></i></button>
          <span className="text-secondary small px-1">{zoom}%</span>
          <button className="btn btn-outline-secondary btn-sm" onClick={() => setZoom(z => Math.min(z + 10, 200))} title="Zoom In"><i className="fa-plus"></i></button>
          <div className="vr bg-secondary mx-2" style={{ height: '24px' }}></div>
          <button className="btn btn-outline-warning btn-sm" onClick={handleHighlightSelection} title="Simulate Highlight Selector"><i className="fa-highlighter me-1"></i> Highlight Text</button>
        </div>
      </div>

      <div className="row g-4">
        {/* Mock PDF Document Renderer */}
        <div className="col-lg-8">
          <div className="glass-card p-4 overflow-auto" style={{ height: '580px', transform: `scale(${zoom / 100})`, transformOrigin: 'top center', transition: 'transform 0.1s' }}>
            <div className="d-flex justify-content-between border-bottom pb-2 border-secondary-subtle text-muted small mb-3">
              <span>Section 1: Introduction</span>
              <span>Page 3 of 12</span>
            </div>
            
            <h4 className="text-white fw-bold mb-3">{selectedPaper.title}</h4>
            <p className="text-secondary" style={{ lineHeight: '1.8' }}>
              The dominant sequence transduction models are based on complex recurrent or convolutional neural networks that include an encoder and a decoder. The best performing models also connect the encoder and decoder through an attention mechanism. We propose a new simple network architecture, the <mark className="bg-warning text-black px-1 rounded">Transformer, based solely on self-attention mechanisms</mark>, dispensing with recurrence and convolutions entirely.
            </p>
            <p className="text-secondary" style={{ lineHeight: '1.8' }}>
              In this work, we present the Transformer, the first sequence model relying entirely on self-attention to compute representations of its input and output without using sequence-aligned RNNs or convolution. The architecture is highly parallelizable, allowing models to scale effectively. <mark className="bg-success text-white px-1 rounded">We achieved state-of-the-art results</mark> in short training cycles across translation benchmarks.
            </p>
            <div className="my-4 p-3 bg-secondary-subtle border border-secondary-subtle rounded-3 text-center">
              <span className="text-muted small">[Formula: Attention(Q, K, V) = Softmax( QK^T / &radic;d_k ) V]</span>
            </div>
            <p className="text-secondary" style={{ lineHeight: '1.8' }}>
              To compute the attention weights, the dot products of the queries with all keys are calculated, scaled, and processed using softmax to obtain weights to evaluate output scores.
            </p>
          </div>
        </div>

        {/* Notes and Highlights Sidebar */}
        <div className="col-lg-4">
          {/* Notes Workspace */}
          <div className="glass-card p-3 mb-4">
            <h6 className="text-white fw-bold mb-3"><i className="fa-thumbtack text-warning me-1"></i> Sticky Notes</h6>
            
            <div className="d-flex flex-column gap-2 overflow-y-auto mb-3" style={{ maxHeight: '200px' }}>
              {stickyNotes.map(n => (
                <div key={n.id} className={`sticky-note ${n.color}`}>
                  <div className="d-flex justify-content-between align-items-start small">
                    <span className="fw-semibold">Comment Note</span>
                    <button className="btn btn-link text-danger p-0 border-0 fs-6" onClick={() => deleteNote(n.id)}>&times;</button>
                  </div>
                  <div className="small mt-1">{n.text}</div>
                </div>
              ))}
            </div>

            <div className="input-group">
              <input 
                type="text" 
                className="form-control bg-secondary-subtle border-secondary-subtle text-white small" 
                placeholder="Write note..." 
                value={noteInput}
                onChange={e => setNoteInput(e.target.value)}
              />
              <select className="form-select bg-secondary-subtle border-secondary-subtle text-white" style={{ maxWidth: '90px' }} value={noteColor} onChange={e => setNoteColor(e.target.value)}>
                <option value="yellow">Yellow</option>
                <option value="green">Green</option>
                <option value="blue">Blue</option>
                <option value="pink">Pink</option>
              </select>
              <button className="btn btn-indigo" onClick={handleAddNote}><i className="fa-plus"></i></button>
            </div>
          </div>

          {/* Highlights Ledger */}
          <div className="glass-card p-3">
            <h6 className="text-white fw-bold mb-3"><i className="fa-highlighter text-indigo me-1"></i> Highlights Log</h6>
            <div className="d-flex flex-column gap-2 overflow-y-auto" style={{ maxHeight: '200px' }}>
              {highlightsList.map(h => (
                <div key={h.id} className="p-2 bg-secondary-subtle border border-secondary-subtle rounded-3 small text-secondary">
                  "{h.text}"
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// 14. AI SUMMARY VIEW
function AiSummaryView({ papers }) {
  const [selectedPaperId, setSelectedPaperId] = useState(papers[0]?.id || '');

  const summaryData = useMemo(() => {
    return window.ResearchMateData.summaries[selectedPaperId] || window.ResearchMateData.summaries['paper-1'];
  }, [selectedPaperId]);

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h3 className="fw-bold mb-1">AI Document Summary</h3>
          <p className="text-secondary small mb-0">Retrieve multi-dimensional synthesized reports mapping core paper logic.</p>
        </div>
        <select 
          className="form-select bg-secondary-subtle border-secondary-subtle text-white w-auto" 
          value={selectedPaperId}
          onChange={e => setSelectedPaperId(e.target.value)}
        >
          {papers.map(p => (
            <option key={p.id} value={p.id}>{p.title}</option>
          ))}
        </select>
      </div>

      {summaryData ? (
        <div className="row g-4">
          <div className="col-md-6 col-lg-4 animate__animated animate__fadeInUp">
            <div className="glass-card p-4 h-100">
              <h5 className="text-white fw-bold mb-3"><i className="fa-solid fa-compress text-indigo me-2"></i> Short Summary</h5>
              <p className="text-secondary small mb-0">{summaryData.short}</p>
            </div>
          </div>

          <div className="col-md-6 col-lg-4 animate__animated animate__fadeInUp">
            <div className="glass-card p-4 h-100">
              <h5 className="text-white fw-bold mb-3"><i className="fa-solid fa-align-left text-teal me-2"></i> Detailed Breakdown</h5>
              <p className="text-secondary small mb-0">{summaryData.detailed}</p>
            </div>
          </div>

          <div className="col-md-6 col-lg-4 animate__animated animate__fadeInUp">
            <div className="glass-card p-4 h-100">
              <h5 className="text-white fw-bold mb-3"><i className="fa-solid fa-magnifying-glass-chart text-warning me-2"></i> Key Findings</h5>
              <p className="text-secondary small mb-0">{summaryData.findings}</p>
            </div>
          </div>

          <div className="col-md-6 col-lg-4 animate__animated animate__fadeInUp">
            <div className="glass-card p-4 h-100">
              <h5 className="text-white fw-bold mb-3"><i className="fa-solid fa-calculator text-rose me-2"></i> Methodology</h5>
              <p className="text-secondary small mb-0">{summaryData.methodology}</p>
            </div>
          </div>

          <div className="col-md-6 col-lg-4 animate__animated animate__fadeInUp">
            <div className="glass-card p-4 h-100">
              <h5 className="text-white fw-bold mb-3"><i className="fa-solid fa-circle-check text-success me-2"></i> Conclusion</h5>
              <p className="text-secondary small mb-0">{summaryData.conclusion}</p>
            </div>
          </div>

          <div className="col-md-6 col-lg-4 animate__animated animate__fadeInUp">
            <div className="glass-card p-4 h-100">
              <h5 className="text-white fw-bold mb-3"><i className="fa-solid fa-thumbs-up text-info me-2"></i> Advantages</h5>
              <p className="text-secondary small mb-0">{summaryData.advantages}</p>
            </div>
          </div>

          <div className="col-md-6 col-lg-6 animate__animated animate__fadeInUp">
            <div className="glass-card p-4 h-100">
              <h5 className="text-white fw-bold mb-3"><i className="fa-solid fa-circle-exclamation text-danger me-2"></i> Limitations</h5>
              <p className="text-secondary small mb-0">{summaryData.limitations}</p>
            </div>
          </div>

          <div className="col-md-6 col-lg-6 animate__animated animate__fadeInUp">
            <div className="glass-card p-4 h-100">
              <h5 className="text-white fw-bold mb-3"><i className="fa-solid fa-forward text-indigo me-2"></i> Future Directives</h5>
              <p className="text-secondary small mb-0">{summaryData.future}</p>
            </div>
          </div>
        </div>
      ) : (
        <div className="text-center py-5 text-muted">
          <i className="fa-wand-magic-sparkles fs-1 mb-3"></i>
          <p>No summary index compiled for this document yet.</p>
        </div>
      )}
    </div>
  );
}

// 15. LITERATURE REVIEW VIEW
function LiteratureReviewView({ papers, addNotification }) {
  const [comparisons, setComparisons] = useState(window.ResearchMateData.litReview.comparisons);
  const [newTitle, setNewTitle] = useState('');
  const [newAuthor, setNewAuthor] = useState('');
  const [newGap, setNewGap] = useState('');

  const handleAddComparison = () => {
    if (!newTitle || !newAuthor) return;
    setComparisons(prev => [
      ...prev,
      { id: Date.now(), title: newTitle, authors: newAuthor, method: "Custom Review", gap: newGap, relevance: "Direct relation" }
    ]);
    setNewTitle('');
    setNewAuthor('');
    setNewGap('');
    addNotification("Review Matrix Updated", "Added a literature gap validation node");
  };

  return (
    <div>
      <h3 className="fw-bold mb-1">Literature Review & Synthesis</h3>
      <p className="text-secondary small mb-4">Synthesize correlations between studies, mapping methodology differences and research gaps.</p>

      {/* Synthesis grid comparison */}
      <div className="glass-card p-4 mb-4">
        <h5 className="text-white fw-bold mb-3">Comparison Table</h5>
        <div className="table-responsive">
          <table className="table table-dark table-hover border-secondary-subtle">
            <thead>
              <tr className="text-secondary">
                <th>Paper / Draft</th>
                <th>Author</th>
                <th>Methodology</th>
                <th>Critical Research Gap</th>
              </tr>
            </thead>
            <tbody>
              {comparisons.map(comp => (
                <tr key={comp.id}>
                  <td className="text-white fw-semibold">{comp.title}</td>
                  <td>{comp.authors}</td>
                  <td><span className="badge bg-secondary-subtle text-secondary">{comp.method}</span></td>
                  <td className="text-warning small">{comp.gap}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="row g-4">
        <div className="col-lg-6">
          <div className="glass-card p-4">
            <h5 className="text-white fw-bold mb-3">Add Study Entry</h5>
            <div className="mb-3">
              <label className="small text-secondary mb-1">Paper Title</label>
              <input type="text" className="form-control bg-secondary-subtle border-secondary-subtle text-white" value={newTitle} onChange={e => setNewTitle(e.target.value)} />
            </div>
            <div className="mb-3">
              <label className="small text-secondary mb-1">Author Name</label>
              <input type="text" className="form-control bg-secondary-subtle border-secondary-subtle text-white" value={newAuthor} onChange={e => setNewAuthor(e.target.value)} />
            </div>
            <div className="mb-3">
              <label className="small text-secondary mb-1">Identified Research Gap</label>
              <input type="text" className="form-control bg-secondary-subtle border-secondary-subtle text-white" value={newGap} onChange={e => setNewGap(e.target.value)} />
            </div>
            <button className="btn btn-indigo" onClick={handleAddComparison}>Append Comparison</button>
          </div>
        </div>

        <div className="col-lg-6">
          <div className="glass-card p-4 h-100">
            <h5 className="text-white fw-bold mb-3"><i className="fa-solid fa-triangle-exclamation text-warning me-2"></i> AI Literature Insight</h5>
            <p className="text-secondary small leading-lg">
              Based on the comparison matrix, there is a clear scaling dependency conflict in attention networks. While <strong>Vaswani et al.</strong> introduced self-attention to bypass convolutions, the quadratic scalability remains unresolved in context sizes above 128k tokens, presenting a clear opportunity for PEFT block configurations.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

// 16. CITATION GENERATOR
function CitationGeneratorView({ papers, bookmarks, setBookmarks, addNotification, addHistory }) {
  const [selectedPaperId, setSelectedPaperId] = useState(papers[0]?.id || '');
  const [style, setStyle] = useState('apa');

  const activePaper = useMemo(() => {
    return papers.find(p => p.id === selectedPaperId) || papers[0];
  }, [papers, selectedPaperId]);

  const activeCitations = useMemo(() => {
    return window.ResearchMateData.citations[activePaper.id] || window.ResearchMateData.citations['paper-1'];
  }, [activePaper]);

  const handleCopy = () => {
    const citationText = activeCitations[style];
    navigator.clipboard.writeText(citationText);
    addNotification("Citation Copied", `Formatted citation copied in ${style.toUpperCase()}`);
    addHistory(`Copied citation for '${activePaper.title}' (${style.toUpperCase()})`, 'citation');
  };

  const handleSaveToBookmarks = () => {
    const newBookmark = {
      id: Date.now(),
      title: `${activePaper.title} - ${style.toUpperCase()} Citation`,
      type: "Citation Text",
      url: activePaper.doi
    };
    setBookmarks(prev => [newBookmark, ...prev]);
    addNotification("Bookmark Saved", "Saved formatted citation to Bookmarks view");
  };

  const handleDownload = () => {
    const element = document.createElement("a");
    const file = new Blob([activeCitations[style]], {type: 'text/plain'});
    element.href = URL.createObjectURL(file);
    element.download = `${activePaper.id}_citation.txt`;
    document.body.appendChild(element);
    element.click();
    addNotification("Citation Downloaded", "Text file saved locally");
  };

  return (
    <div>
      <h3 className="fw-bold mb-1">Citation Generator</h3>
      <p className="text-secondary small mb-4">Export bibliography formats directly using indexed DOI values.</p>

      <div className="row g-4">
        <div className="col-lg-8">
          <div className="glass-card p-4">
            <div className="row g-3 mb-4">
              <div className="col-md-6">
                <label className="small text-secondary mb-1">Select Paper</label>
                <select 
                  className="form-select bg-secondary-subtle border-secondary-subtle text-white" 
                  value={selectedPaperId}
                  onChange={e => setSelectedPaperId(e.target.value)}
                >
                  {papers.map(p => (
                    <option key={p.id} value={p.id}>{p.title}</option>
                  ))}
                </select>
              </div>

              <div className="col-md-6">
                <label className="small text-secondary mb-1">Citation Style</label>
                <select 
                  className="form-select bg-secondary-subtle border-secondary-subtle text-white" 
                  value={style}
                  onChange={e => setStyle(e.target.value)}
                >
                  <option value="apa">APA (7th edition)</option>
                  <option value="ieee">IEEE</option>
                  <option value="mla">MLA (9th edition)</option>
                  <option value="chicago">Chicago Manual of Style</option>
                  <option value="harvard">Harvard Style</option>
                </select>
              </div>
            </div>

            {activeCitations ? (
              <div className="p-4 bg-secondary-subtle border border-secondary-subtle rounded-4 mb-4">
                <p className="text-white mb-0 style-italic" style={{ fontFamily: 'monospace', fontSize: '14px', lineHeight: '1.6' }}>
                  {activeCitations[style]}
                </p>
              </div>
            ) : (
              <p className="text-muted">No citation generated for this entry.</p>
            )}

            <div className="d-flex flex-wrap gap-2">
              <button className="btn btn-indigo" onClick={handleCopy}><i className="fa-solid fa-copy me-1"></i> Copy Citation</button>
              <button className="btn btn-outline-secondary text-white" onClick={handleSaveToBookmarks}><i className="fa-solid fa-bookmark me-1"></i> Bookmark</button>
              <button className="btn btn-outline-secondary text-white" onClick={handleDownload}><i className="fa-solid fa-download me-1"></i> Download TXT</button>
            </div>
          </div>
        </div>

        <div className="col-lg-4">
          <div className="glass-card p-4 h-100">
            <h5 className="text-white fw-bold mb-3">Bibliography Rules</h5>
            <p className="text-secondary small leading-lg">
              Check DOI mapping. Bibliographies are resolved recursively from DOI database registries. Custom parameters can be manually adjusted in Settings.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

// 17. RESEARCH NOTES VIEW
function ResearchNotesView({ notes, setNotes, addNotification, addHistory }) {
  const [activeNote, setActiveNote] = useState(notes[0]);
  const [noteTitle, setNoteTitle] = useState(notes[0]?.title || '');
  const [noteContent, setNoteContent] = useState(notes[0]?.content || '');
  const [noteColor, setNoteColor] = useState(notes[0]?.color || 'note-indigo');
  const [noteTags, setNoteTags] = useState(notes[0]?.tags.join(', ') || '');
  const [searchVal, setSearchVal] = useState('');

  const filteredNotes = useMemo(() => {
    return notes.filter(n => 
      n.title.toLowerCase().includes(searchVal.toLowerCase()) || 
      n.content.toLowerCase().includes(searchVal.toLowerCase())
    );
  }, [notes, searchVal]);

  const selectNote = (note) => {
    setActiveNote(note);
    setNoteTitle(note.title);
    setNoteContent(note.content);
    setNoteColor(note.color);
    setNoteTags(note.tags.join(', '));
  };

  const handleSave = () => {
    if (!noteTitle) return;
    setNotes(prev => prev.map(n => {
      if (n.id === activeNote.id) {
        return {
          ...n,
          title: noteTitle,
          content: noteContent,
          color: noteColor,
          tags: noteTags.split(',').map(t => t.trim()).filter(Boolean)
        };
      }
      return n;
    }));
    addNotification("Note Saved", `Note '${noteTitle}' successfully saved`);
    addHistory(`Updated note '${noteTitle}'`, 'edit');
  };

  const handleCreate = () => {
    const newN = {
      id: `note-${Date.now()}`,
      title: "Untitled Note",
      content: "",
      date: new Date().toISOString().split('T')[0],
      pinned: false,
      color: "note-indigo",
      tags: ["Draft"]
    };
    setNotes(prev => [newN, ...prev]);
    selectNote(newN);
    addNotification("Note Created", "New blank note added to sidebar");
  };

  const handleDelete = (id, e) => {
    e.stopPropagation();
    const remaining = notes.filter(n => n.id !== id);
    setNotes(remaining);
    if (remaining.length > 0) {
      selectNote(remaining[0]);
    }
    addNotification("Note Deleted", "Note entry removed from database");
  };

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h3 className="fw-bold mb-1">Research Workspace Notes</h3>
          <p className="text-secondary small mb-0">Record critical thoughts, outlines, and formulas in markdown style drafts.</p>
        </div>
        <button className="btn btn-indigo" onClick={handleCreate}><i className="fa-plus me-1"></i> New Note</button>
      </div>

      <div className="row g-4">
        {/* Notes list */}
        <div className="col-md-4">
          <div className="glass-card p-3 d-flex flex-column gap-3" style={{ maxHeight: '520px', overflowY: 'auto' }}>
            <input 
              type="text" 
              className="form-control bg-secondary-subtle border-secondary-subtle text-white small" 
              placeholder="Search notes..." 
              value={searchVal}
              onChange={e => setSearchVal(e.target.value)}
            />
            <div className="d-flex flex-column gap-2">
              {filteredNotes.map(n => (
                <div 
                  key={n.id} 
                  onClick={() => selectNote(n)}
                  className={`p-3 rounded-4 bg-secondary-subtle border cursor-pointer text-start ${n.color} ${
                    activeNote?.id === n.id ? 'border-primary' : 'border-secondary-subtle'
                  }`}
                >
                  <div className="d-flex justify-content-between align-items-start">
                    <h6 className="text-white fw-bold mb-1 text-truncate">{n.title}</h6>
                    <button className="btn btn-link text-danger p-0 border-0 fs-6" onClick={(e) => handleDelete(n.id, e)}>&times;</button>
                  </div>
                  <p className="text-muted small text-truncate mb-2">{n.content}</p>
                  <span className="text-secondary small" style={{ fontSize: '10px' }}><i className="fa-calendar me-1"></i> {n.date}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Editor */}
        <div className="col-md-8">
          {activeNote ? (
            <div className="glass-card p-4">
              <div className="mb-3">
                <input 
                  type="text" 
                  className="form-control bg-transparent border-0 text-white fw-bold fs-4 px-0" 
                  placeholder="Note Title" 
                  value={noteTitle}
                  onChange={e => setNoteTitle(e.target.value)}
                />
              </div>

              {/* Rich edit controls simulation */}
              <div className="d-flex gap-2 mb-3 border-bottom pb-2 border-secondary-subtle">
                <button className="btn btn-outline-secondary btn-sm text-white px-2"><i className="fa-bold"></i></button>
                <button className="btn btn-outline-secondary btn-sm text-white px-2"><i className="fa-italic"></i></button>
                <button className="btn btn-outline-secondary btn-sm text-white px-2"><i className="fa-code"></i></button>
                <button className="btn btn-outline-secondary btn-sm text-white px-2"><i className="fa-list-ol"></i></button>
                <div className="vr bg-secondary"></div>
                
                {/* Note color selectors */}
                {['note-indigo', 'note-emerald', 'note-amber', 'note-rose'].map(c => (
                  <button 
                    key={c}
                    onClick={() => setNoteColor(c)}
                    className={`btn rounded-circle p-2 border-0 ${
                      c === 'note-indigo' ? 'bg-primary' : 
                      c === 'note-emerald' ? 'bg-success' : 
                      c === 'note-amber' ? 'bg-warning' : 'bg-danger'
                    }`}
                    style={{ width: '14px', height: '14px' }}
                  ></button>
                ))}
              </div>

              <div className="mb-3">
                <textarea 
                  className="form-control bg-secondary-subtle border-secondary-subtle text-white" 
                  rows="10" 
                  placeholder="Start writing ideas here..."
                  value={noteContent}
                  onChange={e => setNoteContent(e.target.value)}
                ></textarea>
              </div>

              <div className="mb-3">
                <label className="small text-secondary mb-1">Tags (comma-separated)</label>
                <input 
                  type="text" 
                  className="form-control bg-secondary-subtle border-secondary-subtle text-white small" 
                  value={noteTags}
                  onChange={e => setNoteTags(e.target.value)}
                />
              </div>

              <button className="btn btn-indigo" onClick={handleSave}>Save Workspace Note</button>
            </div>
          ) : (
            <div className="h-100 d-flex flex-column align-items-center justify-content-center text-muted">
              <i className="fa-note-sticky fs-1 mb-3"></i>
              <p>No note selected. Choose one on the left or create a new note.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// 18. HIGHLIGHTS VIEW
function HighlightsView({ highlights, setHighlights, addNotification }) {
  const [newH, setNewH] = useState('');
  const [paperSource, setPaperSource] = useState('LoRA Research');

  const addHighlight = () => {
    if (!newH.trim()) return;
    setHighlights(prev => [
      ...prev,
      { id: Date.now(), paperTitle: paperSource, text: newH, color: "yellow", date: "Just now" }
    ]);
    setNewH('');
    addNotification("Highlight Appended", "Added citation highlight note entry");
  };

  const removeHighlight = (id) => {
    setHighlights(prev => prev.filter(h => h.id !== id));
  };

  return (
    <div>
      <h3 className="fw-bold mb-1">Highlighted Excerpts</h3>
      <p className="text-secondary small mb-4">View key quotes and annotations captured across references.</p>

      <div className="row g-4">
        <div className="col-lg-8">
          <div className="d-flex flex-column gap-3">
            {highlights.map(h => (
              <div key={h.id} className="glass-card p-4 text-start border-start border-warning" style={{ borderLeftWidth: '5px' }}>
                <div className="d-flex justify-content-between align-items-start mb-2">
                  <span className="badge bg-indigo-subtle text-indigo">{h.paperTitle}</span>
                  <button className="btn btn-link text-danger p-0 border-0" onClick={() => removeHighlight(h.id)}><i className="fa-trash-can"></i></button>
                </div>
                <p className="text-white style-italic mb-2" style={{ fontFamily: 'serif', fontSize: '16px' }}>"{h.text}"</p>
                <div className="text-muted small" style={{ fontSize: '10px' }}><i className="fa-calendar me-1"></i> Captured {h.date}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="col-lg-4">
          <div className="glass-card p-4">
            <h5 className="text-white fw-bold mb-3">Add Custom Quote</h5>
            <div className="mb-3">
              <label className="small text-secondary mb-1">Paper Source</label>
              <input type="text" className="form-control bg-secondary-subtle border-secondary-subtle text-white" value={paperSource} onChange={e => setPaperSource(e.target.value)} />
            </div>
            <div className="mb-3">
              <label className="small text-secondary mb-1">Highlighted Text</label>
              <textarea className="form-control bg-secondary-subtle border-secondary-subtle text-white" rows="4" value={newH} onChange={e => setNewH(e.target.value)}></textarea>
            </div>
            <button className="btn btn-indigo" onClick={addHighlight}>Save Highlight</button>
          </div>
        </div>
      </div>
    </div>
  );
}

// 19. FLASHCARDS VIEW
function FlashcardsView({ addNotification }) {
  const [cards, setCards] = useState([
    { id: 1, question: "What is the primary contribution of the Self-Attention mechanism?", answer: "Allows sequence representation to compute dependencies regardless of distance, without recurrence loops.", favorite: false },
    { id: 2, question: "What does RAG stand for?", answer: "Retrieval-Augmented Generation. It integrates external dense vector search query pools to supply context parameters to LLMs.", favorite: true },
    { id: 3, question: "Explain the parameter rank (r) in LoRA.", answer: "Represents the bottleneck rank dimensionality. Standard values lie between 4 and 16, balancing compute and accuracy score retention.", favorite: false }
  ]);
  
  const [activeIdx, setActiveIdx] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [easyCount, setEasyCount] = useState(0);
  const [hardCount, setHardCount] = useState(0);

  const activeCard = cards[activeIdx];

  const handleNext = () => {
    setFlipped(false);
    setTimeout(() => {
      setActiveIdx(prev => (prev + 1) % cards.length);
    }, 150);
  };

  const handlePrev = () => {
    setFlipped(false);
    setTimeout(() => {
      setActiveIdx(prev => (prev - 1 + cards.length) % cards.length);
    }, 150);
  };

  const handleDifficulty = (type) => {
    if (type === 'easy') setEasyCount(prev => prev + 1);
    if (type === 'hard') setHardCount(prev => prev + 1);
    addNotification("Flashcard Classified", `Marked card as: ${type.toUpperCase()}`);
    handleNext();
  };

  return (
    <div className="d-flex flex-column align-items-center">
      <div className="text-center mb-4">
        <h3 className="fw-bold mb-1">Active Study Flashcards</h3>
        <p className="text-secondary small">Test your key concepts recall prior to proposal defense sessions.</p>
      </div>

      <div className="mb-4">
        <span className="badge bg-secondary-subtle text-secondary px-3 py-2 rounded-pill small">
          Card {activeIdx + 1} of {cards.length}
        </span>
      </div>

      {activeCard && (
        <div className={`flashcard-wrapper ${flipped ? 'flipped' : ''}`} onClick={() => setFlipped(!flipped)}>
          <div className="flashcard-inner">
            <div className="flashcard-front">
              <span className="text-muted small mb-3"><i className="fa-circle-question"></i> CONCEPT QUESTION</span>
              <h5 className="text-white fw-semibold px-2">{activeCard.question}</h5>
              <span className="text-indigo small mt-4"><i className="fa-arrows-rotate me-1"></i> Click card to flip</span>
            </div>
            
            <div className="flashcard-back">
              <span className="text-white-50 small mb-3"><i className="fa-lightbulb"></i> SYSTEM ANSWER</span>
              <p className="mb-4 px-2 fs-6">{activeCard.answer}</p>
              <div className="d-flex gap-2" onClick={e => e.stopPropagation()}>
                <button className="btn btn-sm btn-success px-3 rounded-pill" onClick={() => handleDifficulty('easy')}>Mark Easy</button>
                <button className="btn btn-sm btn-danger px-3 rounded-pill" onClick={() => handleDifficulty('hard')}>Mark Hard</button>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="d-flex gap-3 mt-4">
        <button className="btn btn-outline-secondary text-white px-4 rounded-3" onClick={handlePrev}><i className="fa-arrow-left"></i> Previous</button>
        <button className="btn btn-outline-secondary text-white px-4 rounded-3" onClick={handleNext}>Next <i className="fa-arrow-right"></i></button>
      </div>

      <div className="d-flex gap-4 mt-5 text-muted small">
        <div><i className="fa-circle text-success me-1"></i> Easy: <strong>{easyCount}</strong></div>
        <div><i className="fa-circle text-danger me-1"></i> Needs Practice: <strong>{hardCount}</strong></div>
      </div>
    </div>
  );
}

// 20. MIND MAP VIEW
function MindMapView({ addNotification }) {
  const [nodes, setNodes] = useState([
    { id: '1', label: 'Adaptive Agents', x: 220, y: 200, type: 'root' },
    { id: '2', label: 'PEFT Adaptations', x: 60, y: 100, type: 'child', parentId: '1' },
    { id: '3', label: 'Retrieval Loops', x: 380, y: 100, type: 'child', parentId: '1' },
    { id: '4', label: 'Evaluation Metrics', x: 220, y: 350, type: 'child', parentId: '1' },
    { id: '5', label: 'LoRA Matrix', x: 40, y: 30, type: 'subchild', parentId: '2' },
    { id: '6', label: 'DPO Align', x: 120, y: 30, type: 'subchild', parentId: '2' }
  ]);
  const [newNodeText, setNewNodeText] = useState('');
  const [selectedParentId, setSelectedParentId] = useState('1');
  const [zoomScale, setZoomScale] = useState(1);

  const handleAddNode = () => {
    if (!newNodeText.trim()) return;
    const parentNode = nodes.find(n => n.id === selectedParentId);
    if (!parentNode) return;

    const angle = Math.random() * Math.PI * 2;
    const distance = 120;
    const newX = Math.max(20, Math.min(460, parentNode.x + Math.cos(angle) * distance));
    const newY = Math.max(20, Math.min(420, parentNode.y + Math.sin(angle) * distance));

    setNodes(prev => [
      ...prev,
      { id: `node-${Date.now()}`, label: newNodeText, x: newX, y: newY, type: 'subchild', parentId: selectedParentId }
    ]);
    setNewNodeText('');
    addNotification("Mind Map Node Created", `Node '${newNodeText}' added under parent link`);
  };

  const removeNode = (id) => {
    if (id === '1') return; // protect root
    setNodes(prev => prev.filter(n => n.id !== id && n.parentId !== id));
  };

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h3 className="fw-bold mb-1">Interactive Research Swarm</h3>
          <p className="text-secondary small mb-0">Visualize semantic dependencies between literature nodes.</p>
        </div>
        <div className="d-flex gap-2">
          <button className="btn btn-outline-secondary btn-sm text-white" onClick={() => setZoomScale(z => Math.max(z - 0.1, 0.7))}><i className="fa-magnifying-glass-minus"></i></button>
          <button className="btn btn-outline-secondary btn-sm text-white" onClick={() => setZoomScale(1)}>Reset</button>
          <button className="btn btn-outline-secondary btn-sm text-white" onClick={() => setZoomScale(z => Math.min(z + 0.1, 1.3))}><i className="fa-magnifying-glass-plus"></i></button>
        </div>
      </div>

      <div className="row g-4">
        <div className="col-lg-8">
          <div className="mindmap-container" style={{ transform: `scale(${zoomScale})`, transformOrigin: 'center center' }}>
            
            {/* Draw nodes */}
            {nodes.map(n => (
              <div 
                key={n.id} 
                className={`mindmap-node ${n.type}`} 
                style={{ left: `${n.x}px`, top: `${n.y}px` }}
              >
                <span>{n.label}</span>
                {n.id !== '1' && (
                  <span className="ms-2 text-danger cursor-pointer" onClick={() => removeNode(n.id)}>&times;</span>
                )}
              </div>
            ))}

            {/* Connect child nodes to parent with simple absolute SVG lines */}
            <svg className="position-absolute w-100 h-100" style={{ left: 0, top: 0, pointerEvents: 'none', zIndex: 1 }}>
              {nodes.map(n => {
                if (!n.parentId) return null;
                const parent = nodes.find(pn => pn.id === n.parentId);
                if (!parent) return null;
                return (
                  <line 
                    key={n.id} 
                    x1={parent.x + 50} 
                    y1={parent.y + 20} 
                    x2={n.x + 50} 
                    y2={n.y + 20} 
                    stroke="rgba(99, 102, 241, 0.2)" 
                    strokeWidth="2" 
                  />
                );
              })}
            </svg>

          </div>
        </div>

        <div className="col-lg-4">
          <div className="glass-card p-4">
            <h5 className="text-white fw-bold mb-3">Node Workspace</h5>
            
            <div className="mb-3">
              <label className="small text-secondary mb-1">Parent Node</label>
              <select className="form-select bg-secondary-subtle border-secondary-subtle text-white" value={selectedParentId} onChange={e => setSelectedParentId(e.target.value)}>
                {nodes.map(n => (
                  <option key={n.id} value={n.id}>{n.label}</option>
                ))}
              </select>
            </div>

            <div className="mb-3">
              <label className="small text-secondary mb-1">New Branch Label</label>
              <input type="text" className="form-control bg-secondary-subtle border-secondary-subtle text-white" value={newNodeText} onChange={e => setNewNodeText(e.target.value)} />
            </div>

            <button className="btn btn-indigo w-100" onClick={handleAddNode}>Extend Branch</button>
            
            <button className="btn btn-outline-secondary w-100 text-white mt-3" onClick={() => addNotification("Export Mindmap", "Saves structure layout locally as SVG")}>
              Export Graph Image
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// 21. RESEARCH PLANNER VIEW
function ResearchPlannerView({ planner, setPlanner, addNotification }) {
  const [newDaily, setNewDaily] = useState('');
  const [newWeekly, setNewWeekly] = useState('');

  const toggleDailyGoal = (id) => {
    setPlanner(prev => ({
      ...prev,
      dailyGoals: prev.dailyGoals.map(g => g.id === id ? { ...g, done: !g.done } : g)
    }));
  };

  const toggleWeeklyGoal = (id) => {
    setPlanner(prev => ({
      ...prev,
      weeklyGoals: prev.weeklyGoals.map(g => g.id === id ? { ...g, done: !g.done } : g)
    }));
  };

  const addDaily = () => {
    if (!newDaily.trim()) return;
    setPlanner(prev => ({
      ...prev,
      dailyGoals: [...prev.dailyGoals, { id: Date.now(), text: newDaily, done: false }]
    }));
    setNewDaily('');
    addNotification("Planner Updated", "Added new Daily Goal checklist item");
  };

  const addWeekly = () => {
    if (!newWeekly.trim()) return;
    setPlanner(prev => ({
      ...prev,
      weeklyGoals: [...prev.weeklyGoals, { id: Date.now(), text: newWeekly, done: false }]
    }));
    setNewWeekly('');
    addNotification("Planner Updated", "Added new Weekly Milestone item");
  };

  return (
    <div>
      <h3 className="fw-bold mb-1">Research Planner</h3>
      <p className="text-secondary small mb-4">Coordinate research timelines, checklists, and document drafting target dates.</p>

      <div className="row g-4">
        {/* Daily Goals */}
        <div className="col-md-6 col-lg-4">
          <div className="glass-card p-4">
            <h5 className="text-white fw-bold mb-3"><i className="fa-solid fa-calendar-day text-indigo me-2"></i> Daily Checklist</h5>
            <div className="d-flex flex-column gap-2 mb-3">
              {planner.dailyGoals.map(g => (
                <div key={g.id} className="d-flex align-items-center gap-2">
                  <input type="checkbox" checked={g.done} onChange={() => toggleDailyGoal(g.id)} />
                  <span className={`small ${g.done ? 'text-decoration-line-through text-muted' : 'text-white'}`}>{g.text}</span>
                </div>
              ))}
            </div>
            <div className="input-group">
              <input type="text" className="form-control bg-secondary-subtle border-secondary-subtle text-white small" placeholder="New goal..." value={newDaily} onChange={e => setNewDaily(e.target.value)} />
              <button className="btn btn-indigo btn-sm px-2" onClick={addDaily}><i className="fa-plus"></i></button>
            </div>
          </div>
        </div>

        {/* Weekly Milestones */}
        <div className="col-md-6 col-lg-4">
          <div className="glass-card p-4">
            <h5 className="text-white fw-bold mb-3"><i className="fa-solid fa-calendar-week text-teal me-2"></i> Weekly Goals</h5>
            <div className="d-flex flex-column gap-2 mb-3">
              {planner.weeklyGoals.map(g => (
                <div key={g.id} className="d-flex align-items-center gap-2">
                  <input type="checkbox" checked={g.done} onChange={() => toggleWeeklyGoal(g.id)} />
                  <span className={`small ${g.done ? 'text-decoration-line-through text-muted' : 'text-white'}`}>{g.text}</span>
                </div>
              ))}
            </div>
            <div className="input-group">
              <input type="text" className="form-control bg-secondary-subtle border-secondary-subtle text-white small" placeholder="New weekly goal..." value={newWeekly} onChange={e => setNewWeekly(e.target.value)} />
              <button className="btn btn-indigo btn-sm px-2" onClick={addWeekly}><i className="fa-plus"></i></button>
            </div>
          </div>
        </div>

        {/* Main Milestones Progress */}
        <div className="col-lg-4">
          <div className="glass-card p-4">
            <h5 className="text-white fw-bold mb-3"><i className="fa-solid fa-flag text-rose me-2"></i> Project Roadmap</h5>
            <div className="d-flex flex-column gap-3">
              {planner.milestones.map(m => (
                <div key={m.id}>
                  <div className="d-flex justify-content-between text-secondary small mb-1">
                    <span>{m.title}</span>
                    <span>{m.progress}%</span>
                  </div>
                  <div className="progress bg-dark" style={{ height: '6px' }}>
                    <div className="progress-bar bg-indigo" style={{ width: `${m.progress}%` }}></div>
                  </div>
                  <div className="text-muted small mt-1" style={{ fontSize: '10px' }}>Target: {m.date}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// 22. TASK MANAGER VIEW (Kanban board)
function TaskManagerView({ kanban, setKanban, addNotification }) {
  const [taskTitle, setTaskTitle] = useState('');
  const [columnType, setColumnType] = useState('todo');

  const handleAddTask = () => {
    if (!taskTitle.trim()) return;
    const newTask = {
      id: `task-${Date.now()}`,
      title: taskTitle,
      desc: "Autogenerated card log",
      priority: "Medium",
      comments: 0,
      date: "Today"
    };

    setKanban(prev => ({
      ...prev,
      [columnType]: [...prev[columnType], newTask]
    }));
    setTaskTitle('');
    addNotification("Task Created", `Added task to column: ${columnType.toUpperCase()}`);
  };

  const moveTask = (taskId, sourceCol, destCol) => {
    const taskToMove = kanban[sourceCol].find(t => t.id === taskId);
    if (!taskToMove) return;

    setKanban(prev => ({
      ...prev,
      [sourceCol]: prev[sourceCol].filter(t => t.id !== taskId),
      [destCol]: [...prev[destCol], taskToMove]
    }));
    addNotification("Task Shifted", "Moved Kanban item status");
  };

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h3 className="fw-bold mb-1">Research Kanban Task Manager</h3>
          <p className="text-secondary small mb-0">Coordinate draft revisions and code optimizations across columns.</p>
        </div>
        
        {/* Quick Task Injector */}
        <div className="d-flex gap-2">
          <input 
            type="text" 
            className="form-control bg-secondary-subtle border-secondary-subtle text-white form-control-sm" 
            placeholder="Quick task title..." 
            value={taskTitle}
            onChange={e => setTaskTitle(e.target.value)}
          />
          <select 
            className="form-select bg-secondary-subtle border-secondary-subtle text-white form-select-sm"
            value={columnType}
            onChange={e => setColumnType(e.target.value)}
          >
            <option value="todo">To Do</option>
            <option value="inprogress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
          <button className="btn btn-indigo btn-sm" onClick={handleAddTask}>Add</button>
        </div>
      </div>

      <div className="row g-3">
        {/* TO DO COLUMN */}
        <div className="col-md-4">
          <div className="kanban-column p-3">
            <h6 className="text-white fw-bold mb-3 border-bottom pb-2 border-secondary-subtle d-flex justify-content-between align-items-center">
              <span>To Do</span>
              <span className="badge bg-secondary-subtle text-secondary small">{kanban.todo.length}</span>
            </h6>
            {kanban.todo.map(task => (
              <div key={task.id} className="kanban-card">
                <div className="d-flex justify-content-between align-items-start mb-2">
                  <span className="badge bg-danger-subtle text-danger small" style={{ fontSize: '9px' }}>{task.priority}</span>
                  <button className="btn btn-link text-indigo p-0 btn-sm" onClick={() => moveTask(task.id, 'todo', 'inprogress')} title="Move to In Progress"><i className="fa-arrow-right"></i></button>
                </div>
                <h6 className="text-white fw-bold mb-1 small">{task.title}</h6>
                <p className="text-muted mb-2" style={{ fontSize: '11px' }}>{task.desc}</p>
                <div className="d-flex justify-content-between text-muted small" style={{ fontSize: '10px' }}>
                  <span><i className="fa-calendar me-1"></i> {task.date}</span>
                  <span><i className="fa-comment me-1"></i> {task.comments}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* IN PROGRESS COLUMN */}
        <div className="col-md-4">
          <div className="kanban-column p-3">
            <h6 className="text-white fw-bold mb-3 border-bottom pb-2 border-secondary-subtle d-flex justify-content-between align-items-center">
              <span>In Progress</span>
              <span className="badge bg-secondary-subtle text-secondary small">{kanban.inprogress.length}</span>
            </h6>
            {kanban.inprogress.map(task => (
              <div key={task.id} className="kanban-card">
                <div className="d-flex justify-content-between align-items-start mb-2">
                  <span className="badge bg-warning-subtle text-warning small" style={{ fontSize: '9px' }}>{task.priority}</span>
                  <div className="d-flex gap-2">
                    <button className="btn btn-link text-secondary p-0 btn-sm" onClick={() => moveTask(task.id, 'inprogress', 'todo')} title="Move to To Do"><i className="fa-arrow-left"></i></button>
                    <button className="btn btn-link text-success p-0 btn-sm" onClick={() => moveTask(task.id, 'inprogress', 'completed')} title="Move to Completed"><i className="fa-arrow-right"></i></button>
                  </div>
                </div>
                <h6 className="text-white fw-bold mb-1 small">{task.title}</h6>
                <p className="text-muted mb-2" style={{ fontSize: '11px' }}>{task.desc}</p>
                <div className="d-flex justify-content-between text-muted small" style={{ fontSize: '10px' }}>
                  <span><i className="fa-calendar me-1"></i> {task.date}</span>
                  <span><i className="fa-comment me-1"></i> {task.comments}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* COMPLETED COLUMN */}
        <div className="col-md-4">
          <div className="kanban-column p-3">
            <h6 className="text-white fw-bold mb-3 border-bottom pb-2 border-secondary-subtle d-flex justify-content-between align-items-center">
              <span>Completed</span>
              <span className="badge bg-secondary-subtle text-secondary small">{kanban.completed.length}</span>
            </h6>
            {kanban.completed.map(task => (
              <div key={task.id} className="kanban-card">
                <div className="d-flex justify-content-between align-items-start mb-2">
                  <span className="badge bg-success-subtle text-success small" style={{ fontSize: '9px' }}>{task.priority}</span>
                  <button className="btn btn-link text-secondary p-0 btn-sm" onClick={() => moveTask(task.id, 'completed', 'inprogress')} title="Move to In Progress"><i className="fa-arrow-left"></i></button>
                </div>
                <h6 className="text-white fw-bold mb-1 small">{task.title}</h6>
                <p className="text-muted mb-2" style={{ fontSize: '11px' }}>{task.desc}</p>
                <div className="d-flex justify-content-between text-muted small" style={{ fontSize: '10px' }}>
                  <span><i className="fa-calendar me-1"></i> {task.date}</span>
                  <span><i className="fa-comment me-1"></i> {task.comments}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}

// 23. CALENDAR VIEW
function CalendarView({ calendarEvents, setCalendarEvents }) {
  const [activeDay, setActiveDay] = useState(14);
  const [eventsForDay, setEventsForDay] = useState([]);

  // Generate calendar days for July 2026
  const daysInMonth = 31;
  const startDayOffset = 3; // July 2026 starts on Wednesday

  useEffect(() => {
    const dateStr = `2026-07-${activeDay.toString().padStart(2, '0')}`;
    const matched = calendarEvents.filter(ev => ev.date === dateStr);
    setEventsForDay(matched);
  }, [activeDay, calendarEvents]);

  return (
    <div>
      <h3 className="fw-bold mb-1">Calendar & Deadlines</h3>
      <p className="text-secondary small mb-4">Track submission dates, reviewer deadlines, and supervisor check-ins.</p>

      <div className="row g-4">
        {/* Calendar Grid */}
        <div className="col-lg-8">
          <div className="glass-card p-4">
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h5 className="text-white fw-bold mb-0">July 2026</h5>
              <span className="text-muted small">Pacific Standard Time</span>
            </div>
            
            <div className="grid text-center font-bold text-secondary small mb-2" style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)' }}>
              <div>Sun</div><div>Mon</div><div>Tue</div><div>Wed</div><div>Thu</div><div>Fri</div><div>Sat</div>
            </div>

            <div className="grid text-center text-white" style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '6px' }}>
              {/* offset placeholders */}
              {Array.from({ length: startDayOffset }).map((_, idx) => (
                <div key={`offset-${idx}`} className="p-3 bg-transparent text-transparent">0</div>
              ))}
              
              {/* actual calendar days */}
              {Array.from({ length: daysInMonth }).map((_, idx) => {
                const dayNum = idx + 1;
                const isSelected = activeDay === dayNum;
                
                // check if day has events
                const dateStr = `2026-07-${dayNum.toString().padStart(2, '0')}`;
                const hasEvent = calendarEvents.some(ev => ev.date === dateStr);

                return (
                  <div 
                    key={`day-${dayNum}`} 
                    onClick={() => setActiveDay(dayNum)}
                    className={`p-3 rounded-3 cursor-pointer position-relative ${
                      isSelected ? 'bg-indigo text-white fw-bold' : 'bg-secondary-subtle hover-bg-accent text-secondary'
                    }`}
                  >
                    {dayNum}
                    {hasEvent && !isSelected && (
                      <span className="position-absolute bottom-0 start-50 translate-middle-x mb-1" style={{ width: '4px', height: '4px', background: '#e11d48', borderRadius: '50%' }}></span>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Day Events Details Panel */}
        <div className="col-lg-4">
          <div className="glass-card p-4 h-100">
            <h5 className="text-white fw-bold mb-3">Schedule: July {activeDay}, 2026</h5>
            
            {eventsForDay.length > 0 ? (
              <div className="d-flex flex-column gap-3">
                {eventsForDay.map(ev => (
                  <div key={ev.id} className="p-3 bg-secondary-subtle border border-secondary-subtle rounded-4">
                    <div className="d-flex justify-content-between align-items-start mb-2">
                      <span className={`badge ${ev.type === 'meeting' ? 'bg-indigo' : 'bg-rose'} text-white`}>{ev.type}</span>
                      <span className="text-muted small">{ev.time}</span>
                    </div>
                    <h6 className="text-white fw-bold mb-1">{ev.title}</h6>
                    <p className="text-secondary small mb-0">{ev.desc}</p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-5 text-muted">
                <i className="fa-calendar-circle-minus fs-2 mb-2"></i>
                <p className="small mb-0">No meetings or deadlines scheduled for today.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// 24. ANALYTICS VIEW
function AnalyticsView({ papers, notes }) {
  const chartRef = useRef(null);
  const aiChartRef = useRef(null);
  
  useEffect(() => {
    let lineChart;
    if (chartRef.current) {
      const ctx = chartRef.current.getContext('2d');
      lineChart = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
          datasets: [
            {
              label: 'Papers Completed',
              data: [3, 5, 2, 7, 4, 8, 5],
              backgroundColor: '#6366f1'
            },
            {
              label: 'Saved Notes',
              data: [5, 9, 8, 12, 10, 15, 8],
              backgroundColor: '#14b8a6'
            }
          ]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: { legend: { labels: { color: '#9ca3af' } } },
          scales: {
            y: { grid: { color: 'rgba(255,255,255,0.05)' }, ticks: { color: '#9ca3af' } },
            x: { grid: { display: false }, ticks: { color: '#9ca3af' } }
          }
        }
      });
    }

    let radarChart;
    if (aiChartRef.current) {
      const ctx = aiChartRef.current.getContext('2d');
      radarChart = new Chart(ctx, {
        type: 'radar',
        data: {
          labels: ['Literature Search', 'Citation Maps', 'Babel Parsing', 'Synthesis', 'Note Export', 'OCR Conversion'],
          datasets: [{
            label: 'AI Feature Usage',
            data: [95, 70, 80, 90, 60, 45],
            borderColor: '#14b8a6',
            backgroundColor: 'rgba(20, 184, 166, 0.2)',
            borderWidth: 2
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: { legend: { display: false } },
          scales: {
            r: {
              grid: { color: 'rgba(255,255,255,0.08)' },
              angleLines: { color: 'rgba(255,255,255,0.08)' },
              pointLabels: { color: '#9ca3af', font: { size: 10 } },
              ticks: { display: false }
            }
          }
        }
      });
    }

    return () => {
      if (lineChart) lineChart.destroy();
      if (radarChart) radarChart.destroy();
    };
  }, [papers, notes]);

  return (
    <div>
      <h3 className="fw-bold mb-1">Research Metrics & Analytics</h3>
      <p className="text-secondary small mb-4">Gain structural reports assessing review performance and AI utilization metrics.</p>

      <div className="row g-4">
        <div className="col-lg-7">
          <div className="glass-card p-4">
            <h5 className="text-white fw-bold mb-3">Academic Performance Growth</h5>
            <div style={{ height: '300px' }}>
              <canvas ref={chartRef}></canvas>
            </div>
          </div>
        </div>

        <div className="col-lg-5">
          <div className="glass-card p-4">
            <h5 className="text-white fw-bold mb-3">AI Co-Worker Interactions</h5>
            <div style={{ height: '300px' }}>
              <canvas ref={aiChartRef}></canvas>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// 25. BOOKMARKS VIEW
function BookmarksView({ bookmarks, setBookmarks }) {
  const [newTitle, setNewTitle] = useState('');
  const [newUrl, setNewUrl] = useState('');

  const addBookmark = () => {
    if (!newTitle) return;
    setBookmarks(prev => [
      ...prev,
      { id: Date.now(), title: newTitle, type: "External Link", url: newUrl || "https://arxiv.org" }
    ]);
    setNewTitle('');
    setNewUrl('');
  };

  const removeBookmark = (id) => {
    setBookmarks(prev => prev.filter(b => b.id !== id));
  };

  return (
    <div>
      <h3 className="fw-bold mb-1">Bookmarks Workspace</h3>
      <p className="text-secondary small mb-4">Quick references to external databases and writing resources.</p>

      <div className="row g-4">
        <div className="col-lg-8">
          <div className="row g-3">
            {bookmarks.map(b => (
              <div key={b.id} className="col-md-6">
                <div className="glass-card p-3 d-flex justify-content-between align-items-center">
                  <div>
                    <span className="badge bg-secondary-subtle text-secondary small mb-1">{b.type}</span>
                    <h6 className="text-white fw-bold mb-1 text-truncate">{b.title}</h6>
                    <a href={b.url} target="_blank" className="text-indigo small text-decoration-none text-truncate" style={{ display: 'block', maxWidth: '220px' }}>{b.url}</a>
                  </div>
                  <button className="btn btn-link text-danger p-0" onClick={() => removeBookmark(b.id)}><i className="fa-trash"></i></button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="col-lg-4">
          <div className="glass-card p-4">
            <h5 className="text-white fw-bold mb-3">Add Custom Link</h5>
            <div className="mb-3">
              <label className="small text-secondary mb-1">Resource Title</label>
              <input type="text" className="form-control bg-secondary-subtle border-secondary-subtle text-white" value={newTitle} onChange={e => setNewTitle(e.target.value)} />
            </div>
            <div className="mb-3">
              <label className="small text-secondary mb-1">URL (ArXiv / Semantic Scholar)</label>
              <input type="text" className="form-control bg-secondary-subtle border-secondary-subtle text-white" value={newUrl} onChange={e => setNewUrl(e.target.value)} />
            </div>
            <button className="btn btn-indigo w-100" onClick={addBookmark}>Bookmark Link</button>
          </div>
        </div>
      </div>
    </div>
  );
}

// 26. HISTORY VIEW
function HistoryView({ history, setHistory }) {
  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h3 className="fw-bold mb-1">Research Audit Log</h3>
          <p className="text-secondary small mb-0">Review trace directories listing all searches and AI requests.</p>
        </div>
        <button className="btn btn-outline-danger btn-sm rounded-3" onClick={() => setHistory([])}>Clear History</button>
      </div>

      <div className="glass-card p-4">
        <div className="d-flex flex-column gap-3">
          {history.map(item => (
            <div key={item.id} className="d-flex align-items-center justify-content-between border-bottom pb-2 border-secondary-subtle">
              <div className="d-flex align-items-center gap-3">
                <div className="p-2 rounded bg-secondary-subtle text-white">
                  <i className={`fa-solid ${
                    item.category === 'search' ? 'fa-magnifying-glass' :
                    item.category === 'chat' ? 'fa-robot' :
                    item.category === 'view' ? 'fa-eye' :
                    item.category === 'citation' ? 'fa-quote-left' : 'fa-cloud-arrow-up'
                  }`}></i>
                </div>
                <div>
                  <h6 className="text-white mb-0 small fw-bold">{item.action}</h6>
                  <span className="text-muted small" style={{ fontSize: '10px' }}>Category: {item.category}</span>
                </div>
              </div>
              <span className="text-muted small">{item.time}</span>
            </div>
          ))}

          {history.length === 0 && (
            <div className="text-center py-5 text-muted">
              <i className="fa-history fs-1 mb-2"></i>
              <p>Audit trace empty.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// 27. SETTINGS VIEW
function SettingsView({ darkMode, setDarkMode, addNotification, onLogout }) {
  const [lang, setLang] = useState('en');
  
  const handleSaveSettings = () => {
    addNotification("Settings Saved", "System config successfully updated");
  };

  return (
    <div>
      <h3 className="fw-bold mb-1">Workspace Settings</h3>
      <p className="text-secondary small mb-4">Adjust interface configurations, cache rules, and notification nodes.</p>

      <div className="row g-4">
        <div className="col-lg-8">
          <div className="glass-card p-4">
            <h5 className="text-white fw-bold mb-4">System Parameters</h5>
            
            <div className="mb-4">
              <label className="form-label text-secondary small fw-medium">Primary Language</label>
              <select className="form-select bg-secondary-subtle border-secondary-subtle text-white w-auto" value={lang} onChange={e => setLang(e.target.value)}>
                <option value="en">English (US)</option>
                <option value="es">Español</option>
                <option value="fr">Français</option>
                <option value="de">Deutsch</option>
              </select>
            </div>

            <div className="mb-4">
              <label className="form-label text-secondary small fw-medium">Theme Configuration</label>
              <div className="d-flex align-items-center gap-3">
                <button 
                  className={`btn btn-sm ${darkMode ? 'btn-indigo text-white' : 'btn-outline-secondary'}`}
                  onClick={() => setDarkMode(true)}
                >
                  Dark Theme
                </button>
                <button 
                  className={`btn btn-sm ${!darkMode ? 'btn-indigo text-white' : 'btn-outline-secondary'}`}
                  onClick={() => setDarkMode(false)}
                >
                  Light Theme
                </button>
              </div>
            </div>

            <div className="mb-4">
              <label className="form-label text-secondary small fw-medium">Privacy Settings</label>
              <div className="form-check form-switch mb-2">
                <input className="form-check-input" type="checkbox" defaultChecked />
                <label className="form-check-label text-white small">Backup research logs automatically</label>
              </div>
              <div className="form-check form-switch">
                <input className="form-check-input" type="checkbox" defaultChecked />
                <label className="form-check-label text-white small">Allow AI context search over custom PDF indexes</label>
              </div>
            </div>

            <div className="d-flex gap-2">
              <button className="btn btn-indigo" onClick={handleSaveSettings}>Save Parameters</button>
              <button className="btn btn-outline-danger" onClick={onLogout}>Logout</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// 28. USER PROFILE VIEW
function UserProfileView({ profile, setProfile, addNotification }) {
  const [bioInput, setBioInput] = useState(profile.bio || '');
  const [roleInput, setRoleInput] = useState(profile.role || '');

  const handleProfileSave = () => {
    setProfile(prev => ({
      ...prev,
      bio: bioInput,
      role: roleInput
    }));
    addNotification("Profile Updated", "Academic profile description updated");
  };

  return (
    <div>
      <h3 className="fw-bold mb-1">Academic Profile</h3>
      <p className="text-secondary small mb-4">Manage academic registrations, research interests, and earned badges.</p>

      <div className="row g-4">
        {/* Left card */}
        <div className="col-md-5 col-lg-4">
          <div className="glass-card p-4 text-center">
            <img 
              src={profile.avatar || "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150"} 
              alt="Dr. Sarah Jenkins Avatar" 
              className="rounded-circle mb-3 border border-indigo"
              style={{ width: '120px', height: '120px', objectFit: 'cover' }}
            />
            <h5 className="text-white fw-bold mb-1">{profile.name}</h5>
            <span className="text-indigo small">{profile.role}</span>
            <div className="text-muted small mt-1">{profile.institution}</div>
            
            <hr className="my-3 border-secondary-subtle" />
            
            <div className="text-start">
              <h6 className="text-white fw-bold mb-2">Research Badges</h6>
              <div className="d-flex flex-wrap gap-2">
                {profile.badges?.map((badge, idx) => (
                  <span key={idx} className="badge bg-indigo-subtle text-indigo rounded-pill px-2.5 py-1.5">{badge}</span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right card inputs */}
        <div className="col-md-7 col-lg-8">
          <div className="glass-card p-4">
            <h5 className="text-white fw-bold mb-4">Academic Credentials</h5>
            
            <div className="mb-3">
              <label className="small text-secondary mb-1">Current Role / Title</label>
              <input type="text" className="form-control bg-secondary-subtle border-secondary-subtle text-white" value={roleInput} onChange={e => setRoleInput(e.target.value)} />
            </div>

            <div className="mb-3">
              <label className="small text-secondary mb-1">Biography</label>
              <textarea className="form-control bg-secondary-subtle border-secondary-subtle text-white" rows="4" value={bioInput} onChange={e => setBioInput(e.target.value)}></textarea>
            </div>

            <div className="mb-4">
              <label className="small text-secondary mb-2">Primary Academic Interests</label>
              <div className="d-flex flex-wrap gap-2">
                {profile.interests?.map((interest, idx) => (
                  <span key={idx} className="badge bg-secondary text-secondary small rounded-pill px-3">{interest}</span>
                ))}
              </div>
            </div>

            <button className="btn btn-indigo" onClick={handleProfileSave}>Update Profile</button>
          </div>
        </div>
      </div>
    </div>
  );
}

// Render React App
const container = document.getElementById('root');
const root = ReactDOM.createRoot(container);
root.render(<App />);
