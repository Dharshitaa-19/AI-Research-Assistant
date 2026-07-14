import React, { useState } from 'react'
import { generateAIResponse } from '../config/gemini.js'
import ReactMarkdown from 'react-markdown'
import { FiMaximize2, FiEdit3, FiBookOpen } from 'react-icons/fi'

function PaperSummarizer() {
  const [paperTitle, setPaperTitle] = useState('Attention Is All You Need');
  const [abstractText, setAbstractText] = useState(
    "The dominant sequence transduction models are based on complex recurrent or convolutional neural networks that include an encoder and a decoder. The best performing models also connect the encoder and decoder through an attention mechanism. We propose a new simple network architecture, the Transformer, based solely on attention mechanisms, dispensing with recurrence and convolutions entirely."
  );
  const [summary, setSummary] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSummarize = async () => {
    if (!abstractText.trim()) return;
    setLoading(true);
    setSummary('');

    const prompt = `You are an academic expert. Summarize the following research paper titled "${paperTitle}".
Here is the Abstract / Text:
"${abstractText}"

Please generate a structured summary under the following clear headings:
1. **Short Summary** (1-2 sentences summarizing the core contribution)
2. **Key Methodology** (How it works)
3. **Core Findings** (Why it matters / performance metrics)
4. **Limitations** (Critical evaluation of current design bounds)
5. **Future Directions** (Where researchers should follow up)

Keep the writing style extremely academic and clear.`;

    try {
      const response = await generateAIResponse(prompt);
      setSummary(response);
    } catch (error) {
      setSummary("Error connecting to Gemini API. Please make sure your API key in `.env` is correct.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="animate__animated animate__fadeIn">
      <div className="mb-4">
        <h2 className="fw-bold mb-1 text-dark-emphasis">Paper Summarizer</h2>
        <p className="text-secondary small mb-0">Generate modular summaries of academic papers from text abstracts or local indexes.</p>
      </div>

      <div className="row g-4">
        <div className="col-lg-5">
          <div className="glass-card p-4 text-start">
            <h5 className="text-dark-emphasis fw-bold mb-3">Paper Information</h5>
            
            <div className="mb-3">
              <label className="small text-secondary mb-1">Paper Title</label>
              <input 
                type="text" 
                className="form-control bg-light-subtle border-secondary-subtle text-dark-emphasis" 
                value={paperTitle}
                onChange={e => setPaperTitle(e.target.value)}
              />
            </div>

            <div className="mb-4">
              <label className="small text-secondary mb-1">Abstract / Content Text</label>
              <textarea 
                className="form-control bg-light-subtle border-secondary-subtle text-dark-emphasis" 
                rows="8"
                value={abstractText}
                onChange={e => setAbstractText(e.target.value)}
              />
            </div>

            <button 
              className="btn btn-indigo text-white w-100 rounded-3 py-2.5 d-flex align-items-center justify-content-center gap-2"
              onClick={handleSummarize}
              disabled={loading}
              style={{ background: 'linear-gradient(135deg, #6366f1, #a855f7)', border: 'none' }}
            >
              <FiMaximize2 />
              <span>{loading ? 'Analyzing Text...' : 'Summarize Paper'}</span>
            </button>
          </div>
        </div>

        <div className="col-lg-7">
          <div className="glass-card p-4 text-start" style={{ minHeight: '430px' }}>
            <h5 className="text-dark-emphasis fw-bold mb-3"><i className="fa-solid fa-list-check me-2"></i> Structured AI Summary</h5>
            
            {loading ? (
              <div className="d-flex flex-column align-items-center justify-content-center py-5 text-indigo">
                <div className="spinner-border mb-3" role="status"></div>
                <span className="small">Querying Gemini API for abstract synthesis...</span>
              </div>
            ) : summary ? (
              <div className="markdown-body p-2">
                <ReactMarkdown children={summary} />
              </div>
            ) : (
              <div className="text-center py-5 text-muted">
                <FiBookOpen size={40} className="mb-3" />
                <p className="small mb-0">Select paper inputs on the left and click Summarize to view details.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default PaperSummarizer
