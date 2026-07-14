import React, { useState } from 'react'
import { generateAIResponse } from '../config/gemini.js'
import ReactMarkdown from 'react-markdown'
import { FiBookOpen, FiCpu, FiFileText } from 'react-icons/fi'

function LiteratureReview() {
  const [topic, setTopic] = useState('Reinforcement Learning from Human Feedback (RLHF)');
  const [synthesis, setSynthesis] = useState('');
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    if (!topic.trim()) return;
    setLoading(true);
    setSynthesis('');

    const prompt = `You are an academic researcher. Generate a literature review comparison table for the topic: "${topic}".
Include at least three real or highly representative academic papers/drafts.
Format the output as a Markdown table with the following columns:
1. Paper Title & Year
2. Core Methodology
3. Key Findings
4. Critical Research Gap

Below the table, provide a short paragraph synthesizing the main findings and indicating where future work is most needed. Make it professional and detailed.`;

    try {
      const response = await generateAIResponse(prompt);
      setSynthesis(response);
    } catch (error) {
      setSynthesis("Error connecting to Gemini API. Please make sure your API key in `.env` is correct.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="animate__animated animate__fadeIn">
      <div className="mb-4">
        <h2 className="fw-bold mb-1 text-dark-emphasis">Literature Review Generator</h2>
        <p className="text-secondary small mb-0">Generate comparisons, highlight findings, and identify synthesis overlaps across topics.</p>
      </div>

      <div className="row g-4">
        <div className="col-lg-4">
          <div className="glass-card p-4 text-start">
            <h5 className="text-dark-emphasis fw-bold mb-3">Topic Selection</h5>
            
            <div className="mb-3">
              <label className="small text-secondary mb-1">Research Subject / Query</label>
              <input 
                type="text" 
                className="form-control bg-light-subtle border-secondary-subtle text-dark-emphasis" 
                value={topic}
                onChange={e => setTopic(e.target.value)}
                placeholder="e.g. LLM fine-tuning latency"
              />
            </div>

            <button 
              className="btn btn-indigo text-white w-100 rounded-3 py-2.5 d-flex align-items-center justify-content-center gap-2"
              onClick={handleGenerate}
              disabled={loading}
              style={{ background: 'linear-gradient(135deg, #6366f1, #a855f7)', border: 'none' }}
            >
              <FiCpu />
              <span>{loading ? 'Synthesizing...' : 'Generate Matrix'}</span>
            </button>
          </div>

          <div className="glass-card p-4 mt-4 text-start">
            <h6 className="text-dark-emphasis fw-bold mb-2">Review Tips</h6>
            <p className="text-secondary small mb-0" style={{ lineHeight: '1.6' }}>
              For best results, include specific names of methodologies or paradigms (e.g., 'Low-Rank Adaptation' rather than 'tuning models').
            </p>
          </div>
        </div>

        <div className="col-lg-8">
          <div className="glass-card p-4 text-start" style={{ minHeight: '350px' }}>
            <h5 className="text-dark-emphasis fw-bold mb-3"><i className="fa-solid fa-table me-2"></i> Review Matrix Results</h5>
            
            {loading ? (
              <div className="d-flex flex-column align-items-center justify-content-center py-5 text-indigo">
                <div className="spinner-border mb-3" role="status"></div>
                <span className="small">Querying Google Gemini for synthesis insights...</span>
              </div>
            ) : synthesis ? (
              <div className="markdown-body p-2 border-secondary-subtle">
                <ReactMarkdown children={synthesis} />
              </div>
            ) : (
              <div className="text-center py-5 text-muted">
                <FiBookOpen size={40} className="mb-3" />
                <p className="small mb-0">Enter a research topic on the left and click Generate to query the AI assistant.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default LiteratureReview
