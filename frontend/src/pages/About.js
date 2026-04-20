import React from 'react';
import './About.css';

const About = () => {
  return (
    <div className="about">
      <div className="container">
        <h2>About Word to PDF Converter</h2>
        
        <div className="about-content">
          <div className="about-text">
            <p>
              This application allows you to easily convert Microsoft Word documents 
              (.doc and .docx) into PDF format. Our service is fast, secure, and 
              completely online - no software installation required.
            </p>
            
            <h3>How It Works</h3>
            <ol>
              <li>Upload your Word document</li>
              <li>Our system converts it to PDF format</li>
              <li>Download your converted PDF file</li>
            </ol>
            
            <h3>Features</h3>
            <ul>
              <li>Support for .doc and .docx formats</li>
              <li>Fast and reliable conversion</li>
              <li>Secure processing (files are deleted after conversion)</li>
              <li>Responsive design works on all devices</li>
              <li>Drag and drop file upload</li>
            </ul>
          </div>
          
          <div className="about-image">
            <div className="image-placeholder">
              <svg xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 24 24" fill="none" stroke="#4f46e5" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2z"></path>
                <polyline points="14 2 14 8 20 8"></polyline>
                <line x1="16" y1="13" x2="8" y2="13"></line>
                <line x1="16" y1="17" x2="8" y2="17"></line>
                <polyline points="10 9 9 9 8 9"></polyline>
              </svg>
            </div>
          </div>
        </div>
        
        <div className="tech-stack">
          <h3>Tech Stack</h3>
          <div className="tech-icons">
            <div className="tech-item">
              <div className="tech-icon">⚛️</div>
              <span>React</span>
            </div>
            <div className="tech-item">
              <div className="tech-icon">🌐</div>
              <span>Node.js</span>
            </div>
            <div className="tech-item">
              <div className="tech-icon">📄</div>
              <span>LibreOffice</span>
            </div>
            <div className="tech-item">
              <div className="tech-icon">🔄</div>
              <span>Express</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;