import React, { useState } from 'react'
import { generateAIResponse } from '../config/gemini.js'
import ReactMarkdown from 'react-markdown'
import { FiSearch, FiCpu } from 'react-icons/fi'

function ResearchGapFinder() {
  const [domain, setDomain] = useState('Autonomous Agent Negotiation Protocols');
  const [gaps, setGaps] = useState('');
  const [loading, setLoading] = useState(false);

  const handleFindGaps = async () => {
    if (!domain.trim()) return;
    setLoading(true);
    setGaps('');

    const prompt = `You are a Principal Scientific Advisor. Conduct a critical literature assessment of the research domain: "${domain}".
Analyze the current state of literature and explicitly identify three significant Research Gaps that are not yet fully addressed.

Format the response using Markdown with these sections:
1. **Literature Assessment** (A brief overview of where the current state-of-the-art stands)
2. **Identified Research Gaps** (3 detailed items, explaining why each is a gap and what is missing)
3. **Proposed Study Proposal** (A brief outline of a research methodology to fill one of these gaps)

Be precise, academic, and analytical.`;

    try {
      const response = await generateAIResponse(prompt);
      setGaps(response);
    } catch (error) {
      setGaps("Error connecting to Gemini API. Please make sure your API key in `.env` is correct.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="animate__animated animate__fadeIn">
      <div className="mb-4">
        <h2 className="fw-bold mb-1 text-dark-emphasis">Research Gap Finder</h2>
        <p className="text-secondary small mb-0">Uncover overlooked research opportunities and validate theoretical gaps using AI analysis.</p>
      </div>

      <div className="row g-4">
        <div className="col-lg-4">
          <div className="glass-card p-4 text-start">
            <h5 className="text-dark-emphasis fw-bold mb-3">Target Domain</h5>
            
            <div className="mb-3">
              <label className="small text-secondary mb-1">Research Field / Paradigm</label>
              <input 
                type="text" 
                className="form-control bg-light-subtle border-secondary-subtle text-dark-emphasis" 
                value={domain}
                onChange={e => setDomain(e.target.value)}
                placeholder="e.g. LLM coding architectures"
              />
            </div>

            <button 
              className="btn btn-indigo text-white w-100 rounded-3 py-2.5 d-flex align-items-center justify-content-center gap-2"
              onClick={handleFindGaps}
              disabled={loading}
              style={{ background: 'linear-gradient(135deg, #6366f1, #a855f7)', border: 'none' }}
            >
              <FiCpu />
              <span>{loading ? 'Analyzing domain...' : 'Search Gaps'}</span>
            </button>
          </div>
        </div>

        <div className="col-lg-8">
          <div className="glass-card p-4 text-start" style={{ minHeight: '350px' }}>
            <h5 className="text-dark-emphasis fw-bold mb-3"><i className="fa-solid fa-compass me-2"></i> Literature Gap Analysis</h5>
            
            {loading ? (
              <div className="d-flex flex-column align-items-center justify-content-center py-5 text-indigo">
                <div className="spinner-border mb-3" role="status"></div>
                <span className="small">Scanning vectors and theoretical gaps via Gemini AI...</span>
              </div>
            ) : gaps ? (
              <div className="markdown-body p-2">
                <ReactMarkdown children={gaps} />
              </div>
            ) : (
              <div className="text-center py-5 text-muted">
                <FiSearch size={40} className="mb-3" />
                <p className="small mb-0">Enter a target domain on the left and click Search Gaps to query.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ResearchGapFinder
