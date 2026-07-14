import React, { useState } from 'react'
import { generateAIResponse } from '../config/gemini.js'
import ReactMarkdown from 'react-markdown'
import { FiTrendingUp, FiCpu, FiBookOpen } from 'react-icons/fi'

function TrendingTopics() {
  const [trends, setTrends] = useState([
    { id: 1, topic: "State-Space Models (Mamba)", category: "Deep Learning Architectures", desc: "Linear-time sequence modeling alternative to classic self-attention transformers." },
    { id: 2, topic: "Liquid Neural Swarms", category: "Robotics & Control Systems", desc: "Adaptable time-continuous parameters modeling dynamically adjusted control outputs." },
    { id: 3, topic: "Direct Preference Optimization (DPO)", category: "Model Alignment Paradigm", desc: "Closed-form alternative to RLHF eliminating reference reward modeling stages." }
  ]);

  const [selectedTopic, setSelectedTopic] = useState('');
  const [explanation, setExplanation] = useState('');
  const [loading, setLoading] = useState(false);

  const handleExplainTrend = async (topicName) => {
    setSelectedTopic(topicName);
    setLoading(true);
    setExplanation('');

    const prompt = `You are a Tech Trend Analyst. Explain the scientific significance and current state-of-the-art developments regarding: "${topicName}".
Provide:
1. What it is (simple summary)
2. How it improves over previous models (technical comparison)
3. Key papers or academic references to explore.

Format the output in Markdown. Make it professional and concise.`;

    try {
      const response = await generateAIResponse(prompt);
      setExplanation(response);
    } catch (error) {
      setExplanation("Error connecting to Gemini API. Please make sure your API key in `.env` is correct.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="animate__animated animate__fadeIn">
      <div className="mb-4">
        <h2 className="fw-bold mb-1 text-dark-emphasis">Trending Research Topics</h2>
        <p className="text-secondary small mb-0">Discover emerging paradigms, active conference topics, and scientific breakthroughs.</p>
      </div>

      <div className="row g-4">
        {/* Left Side: Trends List */}
        <div className="col-lg-5">
          <div className="d-flex flex-column gap-3">
            {trends.map(t => (
              <div key={t.id} className="glass-card p-4 text-start">
                <span className="badge bg-indigo-subtle text-indigo mb-2">{t.category}</span>
                <h5 className="text-dark-emphasis fw-bold mb-1">{t.topic}</h5>
                <p className="text-secondary small mb-3">{t.desc}</p>
                <button 
                  className="btn btn-outline-indigo btn-sm rounded-3 px-3 border-secondary-subtle"
                  onClick={() => handleExplainTrend(t.topic)}
                >
                  <FiCpu className="me-1" /> Explain Concept
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Right Side: Explain Output */}
        <div className="col-lg-7">
          <div className="glass-card p-4 text-start" style={{ minHeight: '430px' }}>
            <h5 className="text-dark-emphasis fw-bold mb-3"><i className="fa-solid fa-graduation-cap me-2"></i> Topic Assessment: {selectedTopic || 'None Selected'}</h5>

            {loading ? (
              <div className="d-flex flex-column align-items-center justify-content-center py-5 text-indigo">
                <div className="spinner-border mb-3" role="status"></div>
                <span className="small">Querying Gemini API for active trends and citations...</span>
              </div>
            ) : explanation ? (
              <div className="markdown-body p-2 border-secondary-subtle">
                <ReactMarkdown children={explanation} />
              </div>
            ) : (
              <div className="text-center py-5 text-muted">
                <FiBookOpen size={40} className="mb-3" />
                <p className="small mb-0">Select a trend on the left and click Explain Concept to see insights.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default TrendingTopics
