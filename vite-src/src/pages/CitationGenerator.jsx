import React, { useState, useMemo } from 'react'
import { FiAward, FiCopy, FiCheck, FiBookOpen } from 'react-icons/fi'

function CitationGenerator() {
  const [title, setTitle] = useState('Attention Is All You Need');
  const [authors, setAuthors] = useState('Ashish Vaswani, Noam Shazeer, Niki Parmar, Jakob Uszkoreit');
  const [journal, setJournal] = useState('Advances in Neural Information Processing Systems');
  const [year, setYear] = useState('2017');
  const [copiedStyle, setCopiedStyle] = useState(null);

  const formattedCitations = useMemo(() => {
    const firstAuthorLast = authors.split(',')[0].split(' ').pop();
    const initials = authors.split(',')[0].split(' ').map(name => name[0]).slice(0, -1).join('. ');
    const etAl = authors.split(',').length > 1 ? ', et al.' : '';

    return {
      apa: `${firstAuthorLast}, ${initials}.${etAl} (${year}). ${title}. *${journal}*, 5998-6008.`,
      ieee: `${initials}. ${firstAuthorLast}${etAl}, "${title}," in *${journal}*, ${year}, pp. 5998-6008.`,
      mla: `${firstAuthorLast}, ${initials}.${etAl} "${title}." *${journal}*, ${year}, pp. 5998-6008.`,
      chicago: `${firstAuthorLast}, ${initials}.${etAl} "${title}." *${journal}* (${year}): 5998-6008.`,
      harvard: `${firstAuthorLast}, ${initials}.${etAl} ${year}. ${title}. *${journal}*, pp. 5998-6008.`
    };
  }, [title, authors, journal, year]);

  const handleCopy = (styleName, text) => {
    const cleanText = text.replace(/\*/g, ''); // strip markdown style italic markers
    navigator.clipboard.writeText(cleanText);
    setCopiedStyle(styleName);
    setTimeout(() => setCopiedStyle(null), 1500);
  };

  return (
    <div className="animate__animated animate__fadeIn">
      <div className="mb-4">
        <h2 className="fw-bold mb-1 text-dark-emphasis">Citation Generator</h2>
        <p className="text-secondary small mb-0">Format bibliographic entries instantly in standard scientific referencing layouts.</p>
      </div>

      <div className="row g-4">
        <div className="col-lg-5">
          <div className="glass-card p-4 text-start">
            <h5 className="text-dark-emphasis fw-bold mb-3">Paper Details</h5>
            
            <div className="mb-3">
              <label className="small text-secondary mb-1">Title</label>
              <input type="text" className="form-control bg-light-subtle border-secondary-subtle text-dark-emphasis" value={title} onChange={e => setTitle(e.target.value)} />
            </div>

            <div className="mb-3">
              <label className="small text-secondary mb-1">Authors (comma separated)</label>
              <input type="text" className="form-control bg-light-subtle border-secondary-subtle text-dark-emphasis" value={authors} onChange={e => setAuthors(e.target.value)} />
            </div>

            <div className="row g-3">
              <div className="col-8">
                <label className="small text-secondary mb-1">Journal / Conference</label>
                <input type="text" className="form-control bg-light-subtle border-secondary-subtle text-dark-emphasis" value={journal} onChange={e => setJournal(e.target.value)} />
              </div>
              <div className="col-4">
                <label className="small text-secondary mb-1">Year</label>
                <input type="text" className="form-control bg-light-subtle border-secondary-subtle text-dark-emphasis" value={year} onChange={e => setYear(e.target.value)} />
              </div>
            </div>
          </div>
        </div>

        <div className="col-lg-7">
          <div className="glass-card p-4 text-start">
            <h5 className="text-dark-emphasis fw-bold mb-3"><i className="fa-solid fa-quote-left me-2"></i> Formatted References</h5>

            <div className="d-flex flex-column gap-3">
              {Object.entries(formattedCitations).map(([styleKey, text]) => (
                <div key={styleKey} className="p-3 bg-light-subtle border border-secondary-subtle rounded-3">
                  <div className="d-flex justify-content-between align-items-center mb-1">
                    <span className="badge bg-indigo-subtle text-indigo fw-bold">{styleKey.toUpperCase()}</span>
                    <button 
                      className="btn btn-link text-secondary p-0 border-0 d-flex align-items-center gap-1 text-decoration-none small"
                      onClick={() => handleCopy(styleKey, text)}
                    >
                      {copiedStyle === styleKey ? (
                        <>
                          <FiCheck className="text-success" />
                          <span className="text-success small">Copied!</span>
                        </>
                      ) : (
                        <>
                          <FiCopy />
                          <span className="small">Copy</span>
                        </>
                      )}
                    </button>
                  </div>
                  <div className="text-dark-emphasis small mt-1" dangerouslySetInnerHTML={{ 
                    __html: text.replace(/\*(.*?)\*/g, '<em>$1</em>') 
                  }} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CitationGenerator
