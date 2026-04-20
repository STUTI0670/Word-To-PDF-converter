import React, { useState, useEffect } from 'react';
import './History.css';

const History = () => {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // In a real app, this would fetch from a backend API
    // For now, we'll simulate with some mock data
    const mockHistory = [
      { id: 1, filename: 'document1.docx', date: '2026-04-20', size: '2.4 MB' },
      { id: 2, filename: 'report.docx', date: '2026-04-19', size: '5.1 MB' },
      { id: 3, filename: 'presentation.pptx', date: '2026-04-18', size: '3.7 MB' },
      { id: 4, filename: 'notes.docx', date: '2026-04-17', size: '1.2 MB' },
    ];
    
    setTimeout(() => {
      setHistory(mockHistory);
      setLoading(false);
    }, 500);
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="history">
        <div className="loading">Loading history...</div>
      </div>
    );
  }

  return (
    <div className="history">
      <div className="container">
        <h2>Conversion History</h2>
        
        {history.length === 0 ? (
          <div className="empty-state">
            <p>No conversion history yet.</p>
            <p>Convert some Word documents to see them here.</p>
          </div>
        ) : (
          <div className="history-list">
            {history.map((item) => (
              <div key={item.id} className="history-item">
                <div className="history-info">
                  <h3>{item.filename}</h3>
                  <div className="history-details">
                    <span className="date">{formatDate(item.date)}</span>
                    <span className="size">{item.size}</span>
                  </div>
                </div>
                <button className="download-btn">Download PDF</button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default History;