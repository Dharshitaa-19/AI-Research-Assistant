import React, { useState, useMemo } from 'react'
import { FiSearch, FiFileText, FiStar, FiUploadCloud, FiBookOpen, FiBookmark } from 'react-icons/fi'

function ResearchPapers({ searchQuery }) {
  const [papers, setPapers] = useState([
    { id: 1, title: "Attention Is All You Need", authors: "Vaswani et al.", journal: "NeurIPS 2017", year: 2017, doi: "10.48550/arXiv.1706.03762", abstract: "We propose a new simple network architecture, the Transformer, based solely on attention mechanisms, dispensing with recurrence and convolutions entirely.", keywords: ["Attention", "Transformer", "NLP"], favorite: true, status: "Completed" },
    { id: 2, title: "Retrieval-Augmented Generation for Knowledge Tasks", authors: "Lewis et al.", journal: "arXiv 2020", year: 2020, doi: "10.48550/arXiv.2005.11401", abstract: "We explore Retrieval-Augmented Generation (RAG) which combines parametric and non-parametric memories.", keywords: ["RAG", "Dense Retrieval", "LLM"], favorite: true, status: "Reading" },
    { id: 3, title: "Generative Agents: Believable Human Behavior", authors: "Park et al.", journal: "UIST 2023", year: 2023, doi: "10.1145/3586183.3606763", abstract: "We introduce generative agents—computational software agents that simulate believable human behavior.", keywords: ["Agents", "Simulation", "LLM"], favorite: false, status: "Reading" },
    { id: 4, title: "LoRA: Low-Rank Adaptation of Large Language Models", authors: "Hu et al.", journal: "ICLR 2022", year: 2022, doi: "10.48550/arXiv.2106.09685", abstract: "We propose Low-Rank Adaptation (LoRA), which freezes the pre-trained model weights and injects trainable matrices.", keywords: ["LoRA", "PEFT", "Adaptation"], favorite: false, status: "Unread" }
  ]);

  const [activeTab, setActiveTab] = useState('All');
  const [localSearch, setLocalSearch] = useState('');
  const [uploading, setUploading] = useState(false);
  const [uploadedFile, setUploadedFile] = useState(null);

  const toggleFavorite = (id) => {
    setPapers(prev => prev.map(p => p.id === id ? { ...p, favorite: !p.favorite } : p));
  };

  const handleUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setUploading(true);
    setUploadedFile(file.name);
    setTimeout(() => {
      setUploading(false);
      const newP = {
        id: Date.now(),
        title: file.name.replace(/\.[^/.]+$/, ""),
        authors: "Dr. Sarah Jenkins",
        journal: "Self Published",
        year: 2026,
        doi: "Pending API Indexing",
        abstract: "Uploaded draft mapping out dynamic parameter adjustments under PEFT adapter logic structures.",
        keywords: ["PEFT", "Uploaded Draft"],
        favorite: false,
        status: "Unread"
      };
      setPapers(prev => [newP, ...prev]);
      alert("PDF uploaded and parsed successfully using client-side OCR simulation!");
    }, 1500);
  };

  const filteredPapers = useMemo(() => {
    const query = (localSearch || searchQuery || '').toLowerCase();
    return papers.filter(p => {
      const matchesSearch = p.title.toLowerCase().includes(query) || p.authors.toLowerCase().includes(query);
      const matchesTab = activeTab === 'All' ? true :
                         activeTab === 'Favorites' ? p.favorite :
                         p.status === activeTab;
      return matchesSearch && matchesTab;
    });
  }, [papers, localSearch, searchQuery, activeTab]);

  return (
    <div className="animate__animated animate__fadeIn">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2 className="fw-bold mb-1 text-dark-emphasis">Research Library</h2>
          <p className="text-secondary small mb-0">Organize literature references and upload local draft PDFs.</p>
        </div>
      </div>

      <div className="row g-4">
        {/* Left Side: Papers list & Filters */}
        <div className="col-lg-8">
          {/* Tab Filters */}
          <div className="d-flex gap-2 mb-3">
            {['All', 'Reading', 'Completed', 'Unread', 'Favorites'].map(tab => (
              <button 
                key={tab} 
                className={`btn btn-sm px-3 rounded-pill ${activeTab === tab ? 'btn-indigo text-white' : 'btn-outline-secondary'}`}
                onClick={() => setActiveTab(tab)}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="mb-4">
            <input 
              type="text" 
              className="form-control bg-white border border-secondary-subtle py-2.5 rounded-3" 
              placeholder="Search by title, author, or keyword..." 
              value={localSearch}
              onChange={e => setLocalSearch(e.target.value)}
            />
          </div>

          {/* Paper Cards List */}
          <div className="d-flex flex-column gap-3">
            {filteredPapers.map(paper => (
              <div key={paper.id} className="glass-card p-4 text-start">
                <div className="d-flex justify-content-between align-items-start mb-2">
                  <span className={`badge ${
                    paper.status === 'Completed' ? 'bg-success-subtle text-success' :
                    paper.status === 'Reading' ? 'bg-warning-subtle text-warning' : 'bg-secondary-subtle text-muted'
                  } rounded-pill`}>{paper.status}</span>
                  <button className="btn btn-link text-warning p-0" onClick={() => toggleFavorite(paper.id)}>
                    <i style={{ fontSize: '18px' }}><FiStar fill={paper.favorite ? '#eab308' : 'none'} color={paper.favorite ? '#eab308' : '#94a3b8'} /></i>
                  </button>
                </div>
                <h5 className="text-dark-emphasis fw-bold mb-1">{paper.title}</h5>
                <p className="text-secondary small mb-2">{paper.authors} &bull; {paper.journal} ({paper.year})</p>
                <p className="text-secondary small mb-3">{paper.abstract}</p>
                <div className="d-flex justify-content-between align-items-center">
                  <div className="d-flex gap-1">
                    {paper.keywords.map((kw, idx) => (
                      <span key={idx} className="badge bg-light-subtle text-secondary small rounded-pill">{kw}</span>
                    ))}
                  </div>
                  <span className="text-muted small" style={{ fontSize: '11px' }}>DOI: {paper.doi}</span>
                </div>
              </div>
            ))}

            {filteredPapers.length === 0 && (
              <div className="text-center py-5 text-muted">
                <p>No publications found in library workspace.</p>
              </div>
            )}
          </div>
        </div>

        {/* Right Side: PDF Upload panel */}
        <div className="col-lg-4">
          <div className="glass-card p-4 text-center">
            <FiUploadCloud size={40} className="text-indigo mb-3" />
            <h5 className="text-dark-emphasis fw-bold mb-2">Upload Document PDF</h5>
            <p className="text-secondary small mb-3">Extract abstract summaries, timeline points, and literature reviews automatically.</p>
            <label className="btn btn-indigo text-white px-4 py-2.5 rounded-3 w-100 cursor-pointer" style={{ background: 'linear-gradient(135deg, #6366f1, #a855f7)', border: 'none' }}>
              <span>Browse Files</span>
              <input type="file" accept="application/pdf" className="d-none" onChange={handleUpload} />
            </label>
            {uploading && (
              <div className="mt-3 small text-indigo animate__animated animate__pulse animate__infinite">
                Reading PDF metadata... {uploadedFile}
              </div>
            )}
          </div>

          <div className="glass-card p-4 mt-4">
            <h6 className="text-dark-emphasis fw-bold mb-2">Metadata Extract Rules</h6>
            <ul className="text-secondary small ps-3 mb-0" style={{ lineHeight: '1.8' }}>
              <li>Automatic references extraction</li>
              <li>Text alignment extraction</li>
              <li>Math equation conversion</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ResearchPapers
