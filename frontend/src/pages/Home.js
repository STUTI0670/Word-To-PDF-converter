import React, { useState } from 'react';
import './Home.css';

const Home = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isConverting, setIsConverting] = useState(false);
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState('Upload Word File');

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
      setStatus(`Selected: ${file.name}`);
    }
  };

  const handleDragOver = (event) => {
    event.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (event) => {
    event.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (event) => {
    event.preventDefault();
    setIsDragging(false);
    
    const file = event.dataTransfer.files[0];
    if (file && file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
      setSelectedFile(file);
      setStatus(`Selected: ${file.name}`);
    } else {
      setStatus('Please select a valid Word document (.docx)');
    }
  };

  const handleConvert = async () => {
    if (!selectedFile) {
      setStatus('Please select a file first');
      return;
    }

    setIsConverting(true);
    setStatus('Converting...');
    setProgress(0);

    // Simulate progress
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 90) {
          clearInterval(interval);
          return prev;
        }
        return prev + 10;
      });
    }, 300);

    try {
      const formData = new FormData();
      formData.append('file', selectedFile);

      const response = await fetch('http://localhost:5000/convert', {
        method: 'POST',
        body: formData
      });

      if (!response.ok) {
        throw new Error('Conversion failed');
      }

      clearInterval(interval);
      setProgress(100);

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'converted.pdf';
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);

      setStatus('Download complete!');
    } catch (error) {
      console.error('Error:', error);
      setStatus('Error occurred!');
    } finally {
      setIsConverting(false);
    }
  };

  return (
    <div className="home">
      <div className="card">
        <h2>{status}</h2>
        
        <div 
          className={`upload-box ${isDragging ? 'active' : ''}`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => document.getElementById('fileInput').click()}
        >
          <p>Drag & Drop file OR Click</p>
        </div>

        <input 
          type="file" 
          id="fileInput" 
          accept=".doc,.docx" 
          onChange={handleFileChange} 
          hidden 
        />

        {selectedFile && (
          <div id="fileName">
            Selected: {selectedFile.name}
          </div>
        )}

        <button 
          className="convert-btn" 
          onClick={handleConvert}
          disabled={isConverting || !selectedFile}
        >
          {isConverting ? 'Converting...' : 'Convert'}
        </button>

        {isConverting && (
          <div className="progress-container">
            <div className="progress-bar" style={{ width: `${progress}%` }}></div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;