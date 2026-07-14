import React, { useState } from 'react'
import { generateAIResponse } from '../config/gemini.js'
import ReactMarkdown from 'react-markdown'
import { FiDatabase, FiCpu, FiDownload } from 'react-icons/fi'

function ReportGenerator() {
  const [topic, setTopic] = useState('PEFT models performance benchmarks on edge devices');
  const [sections, setSections] = useState('Executive Summary, Methodology, Synthesis Table');
  const [report, setReport] = useState('');
  const [loading, setLoading] = useState(false);

  const handleGenerateReport = async () => {
    if (!topic.trim()) return;
    setLoading(true);
    setReport('');

    const prompt = `You are a Senior Academic Writer. Generate a comprehensive research draft report on the topic: "${topic}".
The report must include the following specific sections: ${sections}.

Please draft this draft report using clear academic terms, complete with literature references and a final analysis subsection. Format the output in Markdown. Make sure each section is highly detailed.`;

    try {
      const response = await generateAIResponse(prompt);
      setReport(response);
    } catch (error) {
      setReport("Error connecting to Gemini API. Please make sure your API key in `.env` is correct.");
    } finally {
      setLoading(false);
    }
  };

  const downloadReport = () => {
    if (!report) return;
    const element = document.createElement("a");
    const file = new Blob([report], {type: 'text/plain'});
    element.href = URL.createObjectURL(file);
    element.download = "ResearchMate_AI_Report.md";
    document.body.appendChild(element);
    element.click();
  };

  return (
    <div className="animate__animated animate__fadeIn">
      <div className="mb-4">
        <h2 className="fw-bold mb-1 text-dark-emphasis">Report Generator</h2>
        <p className="text-secondary small mb-0">Compile complete academic draft reports, outlines, or review reviews using AI.</p>
      </div>

      <div className="row g-4">
        <div className="col-lg-4">
          <div className="glass-card p-4 text-start">
            <h5 className="text-dark-emphasis fw-bold mb-3">Report Outlines</h5>
            
            <div className="mb-3">
              <label className="small text-secondary mb-1">Research Topic</label>
              <input type="text" className="form-control bg-light-subtle border-secondary-subtle text-dark-emphasis" value={topic} onChange={e => setTopic(e.target.value)} />
            </div>

            <div className="mb-4">
              <label className="small text-secondary mb-1">Target Sections (comma separated)</label>
              <input type="text" className="form-control bg-light-subtle border-secondary-subtle text-dark-emphasis" value={sections} onChange={e => setSections(e.target.value)} />
            </div>

            <button 
              className="btn btn-indigo text-white w-100 rounded-3 py-2.5 d-flex align-items-center justify-content-center gap-2"
              onClick={handleGenerateReport}
              disabled={loading}
              style={{ background: 'linear-gradient(135deg, #6366f1, #a855f7)', border: 'none' }}
            >
              <FiCpu />
              <span>{loading ? 'Compiling draft...' : 'Compile Report'}</span>
            </button>
          </div>
        </div>

        <div className="col-lg-8">
          <div className="glass-card p-4 text-start" style={{ minHeight: '380px' }}>
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h5 className="text-dark-emphasis fw-bold mb-0"><i className="fa-solid fa-file-invoice me-2"></i> Report Draft Output</h5>
              {report && (
                <button className="btn btn-outline-secondary btn-sm d-flex align-items-center gap-1 text-white border-secondary" onClick={downloadReport}>
                  <FiDownload />
                  <span>Download Draft</span>
                </button>
              )}
            </div>

            {loading ? (
              <div className="d-flex flex-column align-items-center justify-content-center py-5 text-indigo">
                <div className="spinner-border mb-3" role="status"></div>
                <span className="small">Compiling detailed sections from Gemini AI...</span>
              </div>
            ) : report ? (
              <div className="markdown-body p-2">
                <ReactMarkdown children={report} />
              </div>
            ) : (
              <div className="text-center py-5 text-muted">
                <FiDatabase size={40} className="mb-3" />
                <p className="small mb-0">Outline your parameters on the left and click Compile Report.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ReportGenerator
