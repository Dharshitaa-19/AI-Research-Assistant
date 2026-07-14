import React, { useState } from 'react'
import { generateAIResponse } from '../config/gemini.js'
import ReactMarkdown from 'react-markdown'
import { FiEdit3, FiCpu, FiCopy } from 'react-icons/fi'

function AiWritingAssistant() {
  const [inputText, setInputText] = useState('PEFT approaches make adjustments to models. LoRA does this by adding tiny trainable matrices into layers. This makes local storage very small so edge cards can run it.');
  const [instruction, setInstruction] = useState('Convert to Professional Academic Style');
  const [outputText, setOutputText] = useState('');
  const [loading, setLoading] = useState(false);

  const handleRewrite = async () => {
    if (!inputText.trim()) return;
    setLoading(true);
    setOutputText('');

    const prompt = `You are a professional Academic Editor. Rephrase and rewrite the following research draft paragraph according to the editing directive: "${instruction}".

Draft Paragraph:
"${inputText}"

Provide only the corrected/rewritten paragraph(s). Keep it structured and suitable for a high-quality scientific publication.`;

    try {
      const response = await generateAIResponse(prompt);
      setOutputText(response);
    } catch (error) {
      setOutputText("Error connecting to Gemini API. Please make sure your API key in `.env` is correct.");
    } finally {
      setLoading(false);
    }
  };

  const copyOutput = () => {
    navigator.clipboard.writeText(outputText);
    alert("Copied corrected text!");
  };

  return (
    <div className="animate__animated animate__fadeIn">
      <div className="mb-4">
        <h2 className="fw-bold mb-1 text-dark-emphasis">AI Writing Assistant</h2>
        <p className="text-secondary small mb-0">Refine paragraphs, convert syntax styles, and polish grammar indices.</p>
      </div>

      <div className="row g-4">
        {/* Source Box */}
        <div className="col-lg-6">
          <div className="glass-card p-4 text-start">
            <h5 className="text-dark-emphasis fw-bold mb-3">Original Paragraph</h5>
            
            <div className="mb-3">
              <label className="small text-secondary mb-1">Instruction / Directive</label>
              <select className="form-select bg-light-subtle border-secondary-subtle text-dark-emphasis" value={instruction} onChange={e => setInstruction(e.target.value)}>
                <option value="Convert to Professional Academic Style">Convert to Professional Academic Style</option>
                <option value="Improve Grammatical Flow">Improve Grammatical Flow</option>
                <option value="Expand Paragraph with Technical Terms">Expand Paragraph with Technical Terms</option>
                <option value="Summarize Argument Concisely">Summarize Argument Concisely</option>
              </select>
            </div>

            <div className="mb-4">
              <label className="small text-secondary mb-1">Source Text</label>
              <textarea 
                className="form-control bg-light-subtle border-secondary-subtle text-dark-emphasis" 
                rows="8"
                value={inputText}
                onChange={e => setInputText(e.target.value)}
              />
            </div>

            <button 
              className="btn btn-indigo text-white w-100 rounded-3 py-2.5 d-flex align-items-center justify-content-center gap-2"
              onClick={handleRewrite}
              disabled={loading}
              style={{ background: 'linear-gradient(135deg, #6366f1, #a855f7)', border: 'none' }}
            >
              <FiCpu />
              <span>{loading ? 'Rephrasing...' : 'Rewrite Paragraph'}</span>
            </button>
          </div>
        </div>

        {/* Corrected Box */}
        <div className="col-lg-6">
          <div className="glass-card p-4 text-start" style={{ minHeight: '380px' }}>
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h5 className="text-dark-emphasis fw-bold mb-0"><i className="fa-solid fa-wand-magic-sparkles me-2"></i> Corrected Output</h5>
              {outputText && (
                <button className="btn btn-outline-secondary btn-sm d-flex align-items-center gap-1 text-white border-secondary" onClick={copyOutput}>
                  <FiCopy />
                  <span>Copy</span>
                </button>
              )}
            </div>

            {loading ? (
              <div className="d-flex flex-column align-items-center justify-content-center py-5 text-indigo">
                <div className="spinner-border mb-3" role="status"></div>
                <span className="small">Rewriting text using Gemini model context...</span>
              </div>
            ) : outputText ? (
              <div className="markdown-body p-2 border-secondary-subtle">
                <ReactMarkdown children={outputText} />
              </div>
            ) : (
              <div className="text-center py-5 text-muted">
                <FiEdit3 size={40} className="mb-3" />
                <p className="small mb-0">Input your original paragraph on the left and click Rewrite.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default AiWritingAssistant
