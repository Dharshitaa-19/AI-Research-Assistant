import React, { useState } from 'react'
import { generateAIResponse } from '../config/gemini.js'
import ReactMarkdown from 'react-markdown'
import { FiCpu, FiLightbulb } from 'react-icons/fi'

function IdeaGenerator() {
  const [keywords, setKeywords] = useState('Graph Neural Networks, Molecular Biology, Cancer Drug Discovery');
  const [ideas, setIdeas] = useState('');
  const [loading, setLoading] = useState(false);

  const handleGenerateIdeas = async () => {
    if (!keywords.trim()) return;
    setLoading(true);
    setIdeas('');

    const prompt = `You are a Research Innovation Catalyst. Brainstorm three novel, high-impact research proposal ideas using these keywords: "${keywords}".

For each idea, provide:
1. **Title / Hypothesis** (Clear, professional proposal title)
2. **Methodology Overview** (Brief outline of the experimental or data workflow)
3. **Core Significance / Expected Impact** (Why it warrants grant funding)

Format the response in Markdown. Make sure each idea is distinct and mathematically or practically sound.`;

    try {
      const response = await generateAIResponse(prompt);
      setIdeas(response);
    } catch (error) {
      setIdeas("Error connecting to Gemini API. Please make sure your API key in `.env` is correct.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="animate__animated animate__fadeIn">
      <div className="mb-4">
        <h2 className="fw-bold mb-1 text-dark-emphasis">Idea Brainstormer</h2>
        <p className="text-secondary small mb-0">Generate novel hypotheses, thesis topics, and experimental outline maps using AI.</p>
      </div>

      <div className="row g-4">
        <div className="col-lg-4">
          <div className="glass-card p-4 text-start">
            <h5 className="text-dark-emphasis fw-bold mb-3">Topic Core</h5>
            
            <div className="mb-4">
              <label className="small text-secondary mb-1">Keywords / Core Concepts</label>
              <textarea 
                className="form-control bg-light-subtle border-secondary-subtle text-dark-emphasis" 
                rows="4"
                value={keywords}
                onChange={e => setKeywords(e.target.value)}
                placeholder="e.g. NLP, Medical records, Privacy"
              />
            </div>

            <button 
              className="btn btn-indigo text-white w-100 rounded-3 py-2.5 d-flex align-items-center justify-content-center gap-2"
              onClick={handleGenerateIdeas}
              disabled={loading}
              style={{ background: 'linear-gradient(135deg, #6366f1, #a855f7)', border: 'none' }}
            >
              <FiCpu />
              <span>{loading ? 'Brainstorming...' : 'Generate Ideas'}</span>
            </button>
          </div>
        </div>

        <div className="col-lg-8">
          <div className="glass-card p-4 text-start" style={{ minHeight: '350px' }}>
            <h5 className="text-dark-emphasis fw-bold mb-3"><i className="fa-solid fa-lightbulb me-2"></i> Proposed Hypotheses</h5>
            
            {loading ? (
              <div className="d-flex flex-column align-items-center justify-content-center py-5 text-indigo">
                <div className="spinner-border mb-3" role="status"></div>
                <span className="small">Querying Gemini AI for interdisciplinary concepts...</span>
              </div>
            ) : ideas ? (
              <div className="markdown-body p-2">
                <ReactMarkdown children={ideas} />
              </div>
            ) : (
              <div className="text-center py-5 text-muted">
                <FiLightbulb size={40} className="mb-3" />
                <p className="small mb-0">Enter a set of keywords on the left and click Generate Ideas.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default IdeaGenerator
