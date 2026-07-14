import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Sidebar from './components/Sidebar.jsx'
import Topbar from './components/Topbar.jsx'

// Import all pages
import AIChat from './pages/AIChat.jsx'
import ResearchPapers from './pages/ResearchPapers.jsx'
import LiteratureReview from './pages/LiteratureReview.jsx'
import PaperSummarizer from './pages/PaperSummarizer.jsx'
import ResearchGapFinder from './pages/ResearchGapFinder.jsx'
import CitationGenerator from './pages/CitationGenerator.jsx'
import ReportGenerator from './pages/ReportGenerator.jsx'
import IdeaGenerator from './pages/IdeaGenerator.jsx'
import ResearchNotes from './pages/ResearchNotes.jsx'
import SavedResearch from './pages/SavedResearch.jsx'
import ResearchTimeline from './pages/ResearchTimeline.jsx'
import AiWritingAssistant from './pages/AiWritingAssistant.jsx'
import TrendingTopics from './pages/TrendingTopics.jsx'
import Settings from './pages/Settings.jsx'

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileExpanded, setMobileExpanded] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Sync theme to body tag
  useEffect(() => {
    if (darkMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  }, [darkMode]);

  return (
    <Router>
      <div className={`layout-wrapper ${sidebarCollapsed ? 'collapsed' : ''} ${mobileExpanded ? 'expanded-mobile' : ''}`}>
        
        {/* Responsive Collapsible Sidebar */}
        <Sidebar 
          collapsed={sidebarCollapsed} 
          setCollapsed={setSidebarCollapsed} 
          mobileExpanded={mobileExpanded}
          setMobileExpanded={setMobileExpanded}
        />

        {/* Header Navigation Area */}
        <Topbar 
          darkMode={darkMode} 
          setDarkMode={setDarkMode} 
          sidebarCollapsed={sidebarCollapsed} 
          setSidebarCollapsed={setSidebarCollapsed}
          mobileExpanded={mobileExpanded}
          setMobileExpanded={setMobileExpanded}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />

        {/* Scrollable Layout Context Area */}
        <div className="main-content">
          <Routes>
            <Route path="/" element={<AIChat searchQuery={searchQuery} />} />
            <Route path="/papers" element={<ResearchPapers searchQuery={searchQuery} />} />
            <Route path="/literature-review" element={<LiteratureReview />} />
            <Route path="/summarizer" element={<PaperSummarizer />} />
            <Route path="/gap-finder" element={<ResearchGapFinder />} />
            <Route path="/citation" element={<CitationGenerator />} />
            <Route path="/report" element={<ReportGenerator />} />
            <Route path="/ideas" element={<IdeaGenerator />} />
            <Route path="/notes" element={<ResearchNotes searchQuery={searchQuery} />} />
            <Route path="/saved" element={<SavedResearch />} />
            <Route path="/timeline" element={<ResearchTimeline />} />
            <Route path="/writing-assistant" element={<AiWritingAssistant />} />
            <Route path="/trending" element={<TrendingTopics />} />
            <Route path="/settings" element={<Settings darkMode={darkMode} setDarkMode={setDarkMode} />} />
            {/* Fallback to homepage chat */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>

      </div>
    </Router>
  )
}

export default App
