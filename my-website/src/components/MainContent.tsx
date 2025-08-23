import { useState } from 'react';
import './MainContent.css';
import Navbar from './Navbar';

const MainContent = () => {
  const [showResumeModal, setShowResumeModal] = useState(false);

  return (
    <div className="main-content">
      <Navbar />
      <div className="content-wrapper">
        <section id="home" className="about-section">
          <p className="intro">
            I'm a passionate software developer with a keen interest in creating innovative solutions 
            that make a difference. With expertise in modern web technologies and a commitment to 
            continuous learning, I strive to build applications that are both functional and elegant.
          </p>
          <p className="description">
            My journey in technology has been driven by curiosity and a desire to solve complex problems. 
            I enjoy working with cutting-edge frameworks and technologies, always looking for opportunities 
            to expand my skill set and contribute to meaningful projects.
          </p>
          
          <div className="skills-cards">
            <div className="skill-card">
              <div className="card-icon">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2L2 7V12C2 16.5 4.23 20.68 7.62 23.15L12 21L16.38 23.15C19.77 20.68 22 16.5 22 12V7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M12 11C13.1046 11 14 10.1046 14 9C14 7.89543 13.1046 7 12 7C10.8954 7 10 7.89543 10 9C10 10.1046 10.8954 11 12 11Z" stroke="currentColor" strokeWidth="2"/>
                  <path d="M12 11V17" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </div>
              <h3>Machine Learning</h3>
              <p>Building intelligent systems with advanced algorithms and neural networks. Transforming data into actionable insights through predictive modeling.</p>
            </div>
            
            <div className="skill-card">
              <div className="card-icon">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="4" y="4" width="16" height="16" rx="2" stroke="currentColor" strokeWidth="2"/>
                  <path d="M9 9H15" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                  <path d="M9 13H15" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                  <path d="M9 17H13" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </div>
              <h3>Fullstack Development</h3>
              <p>Creating seamless end-to-end applications with modern frameworks. Bridging frontend elegance with robust backend architecture.</p>
            </div>
            
            <div className="skill-card">
              <div className="card-icon">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2"/>
                  <path d="M12 2V8" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                  <path d="M12 16V22" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                  <path d="M4.93 4.93L8.17 8.17" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                  <path d="M15.83 15.83L19.07 19.07" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                  <path d="M2 12H8" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                  <path d="M16 12H22" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                  <path d="M4.93 19.07L8.17 15.83" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                  <path d="M15.83 8.17L19.07 4.93" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </div>
              <h3>Systems Design</h3>
              <p>Architecting scalable and resilient distributed systems. Optimizing performance while maintaining reliability and maintainability.</p>
            </div>
          </div>
        </section>
        
        <section id="resume" className="resume-section">
          <h2 className="section-title">Resume</h2>
          <div className="resume-container">
            <div className="resume-preview">
              <div className="resume-image-wrapper" onClick={() => setShowResumeModal(true)}>
                <img 
                  src="/assets/resume-preview.png" 
                  alt="Resume Preview" 
                  className="resume-image"
                />
                <div className="resume-overlay">
                  <span>Click to view full resume</span>
                </div>
                <a href="/assets/resume.pdf" download className="download-icon-btn" onClick={(e) => e.stopPropagation()}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M21 15V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M7 10L12 15L17 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M12 15V3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </a>
              </div>
            </div>
            
            <div className="resume-highlights">
              <div className="highlight-section">
                <h3>Professional Experience</h3>
                <ul className="professional-list">
                  <li>
                    <strong>Software Engineering Intern</strong>
                    <span className="company">Tech Company | Summer 2023</span>
                  </li>
                  <li>
                    <strong>Machine Learning Research Assistant</strong>
                    <span className="company">University Lab | 2022-2023</span>
                  </li>
                  <li>
                    <strong>Full Stack Developer</strong>
                    <span className="company">Startup | Spring 2022</span>
                  </li>
                </ul>
              </div>
              
              <div className="highlight-section">
                <h3>Technical Skills</h3>
                <div className="skills-grid">
                  <div className="skill-category">
                    <span className="category-label">Languages:</span>
                    <span className="category-items">Python, TypeScript, Java, C++, SQL</span>
                  </div>
                  <div className="skill-category">
                    <span className="category-label">Frameworks:</span>
                    <span className="category-items">React, Node.js, Django, TensorFlow, PyTorch</span>
                  </div>
                  <div className="skill-category">
                    <span className="category-label">Tools:</span>
                    <span className="category-items">AWS, Docker, Git, PostgreSQL, MongoDB</span>
                  </div>
                </div>
              </div>
            
            </div>
          </div>
          
          {showResumeModal && (
            <div className="resume-modal" onClick={() => setShowResumeModal(false)}>
              <button className="modal-close" onClick={() => setShowResumeModal(false)}>×</button>
              <img 
                src="/assets/resume-preview.png" 
                alt="Resume" 
                className="modal-resume-image"
                onClick={(e) => e.stopPropagation()}
              />
            </div>
          )}
        </section>
        
        <section id="projects" className="projects-section">
          <h2 className="section-title">Projects</h2>
          <div className="projects-container">
            <div className="project-item">
              <div className="project-image">
                <img src="/assets/truthguard.png" alt="TruthGuard" />
                <div className="image-overlay"></div>
              </div>
              <div className="project-content">
                <div className="project-header">
                  <div>
                    <h3>TruthGuard AI</h3>
                    <span className="project-date">Nov 2023 - Present</span>
                  </div>
                  <a href="https://github.com/yourusername/project1" target="_blank" rel="noopener noreferrer" className="repo-link">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M18 13V19C18 19.5304 17.7893 20.0391 17.4142 20.4142C17.0391 20.7893 16.5304 21 16 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V8C3 7.46957 3.21071 6.96086 3.58579 6.58579C3.96086 6.21071 4.46957 6 5 6H11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M15 3H21V9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M10 14L21 3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </a>
                </div>
                <p className="project-description">
                  An intelligent code review system that leverages machine learning to automatically detect bugs, 
                  suggest improvements, and enforce coding standards. Built with Python and TensorFlow, it analyzes 
                  code patterns and provides contextual feedback to improve code quality.
                </p>
                <div className="project-tags">
                  <span className="tag">Python</span>
                  <span className="tag">TensorFlow</span>
                  <span className="tag">ML</span>
                </div>
              </div>
            </div>
            
            <div className="project-item">
              <div className="project-image">
                <img src="/assets/fileJIT.png" alt="FileJIT" />
                <div className="image-overlay"></div>
              </div>
              <div className="project-content">
                <div>
                  <h3>FileJIT Scheduler</h3>
                  <span className="project-date">Jun - Sep 2023</span>
                </div>
                <p className="project-description">
                  A high-performance distributed task scheduling system designed for microservices architectures. 
                  Implements advanced load balancing algorithms and fault tolerance mechanisms to ensure reliable 
                  task execution across multiple nodes with minimal latency.
                </p>
                <div className="project-tags">
                  <span className="tag">Go</span>
                  <span className="tag">Kubernetes</span>
                  <span className="tag">gRPC</span>
                </div>
              </div>
            </div>
            
            <div className="project-item">
              <div className="project-image">
                <img src="/assets/terminal.png" alt="Terminal Dashboard" />
                <div className="image-overlay"></div>
              </div>
              <div className="project-content">
                <div className="project-header">
                  <div>
                    <h3>Terminal Analytics</h3>
                    <span className="project-date">Feb - May 2023</span>
                  </div>
                  <a href="https://github.com/yourusername/project3" target="_blank" rel="noopener noreferrer" className="repo-link">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M18 13V19C18 19.5304 17.7893 20.0391 17.4142 20.4142C17.0391 20.7893 16.5304 21 16 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V8C3 7.46957 3.21071 6.96086 3.58579 6.58579C3.96086 6.21071 4.46957 6 5 6H11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M15 3H21V9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M10 14L21 3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </a>
                </div>
                <p className="project-description">
                  A comprehensive real-time data visualization platform built with React and WebSockets. 
                  Processes millions of events per second and provides interactive dashboards with customizable 
                  widgets for monitoring system metrics and business KPIs.
                </p>
                <div className="project-tags">
                  <span className="tag">React</span>
                  <span className="tag">WebSockets</span>
                  <span className="tag">D3.js</span>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        <section id="education" className="education-section">
          <h2 className="section-title">Education</h2>
          <div className="education-container">
            <div className="university-header">
              <div className="university-logo">
                <img src="/assets/duke-logo.png" alt="Duke University" />
              </div>
              <div className="university-info">
                <h3>Duke University</h3>
                <p className="degree">Bachelor of Science in Computer Science</p>
                <p className="minors">Minors: Physics & Finance</p>
                <div className="education-details">
                  <span className="detail-item">Junior</span>
                  <span className="detail-separator">•</span>
                  <span className="detail-item">GPA: 3.8</span>
                  <span className="detail-separator">•</span>
                  <span className="detail-item">Expected: May 2027</span>
                </div>
              </div>
            </div>
            
            <div className="education-content">
              <div className="coursework-section">
                <h4>Relevant Coursework</h4>
                <p className="course-list">
                  Data Structures & Algorithms, Machine Learning, Computer Architecture, 
                  Computer Vision, Databases, Artificial Intelligence, Multivariable Calculus, 
                  Linear Algebra
                </p>
              </div>
              
              <div className="clubs-section">
                <h4>Organizations</h4>
                <div className="clubs-list">
                  <div className="club-item">
                    <span className="club-name">DUCC - Duke University Cricket Club</span>
                    <span className="club-role">Co-Founder</span>
                  </div>
                  <div className="club-item">
                    <span className="club-name">DAML - Duke Applied Machine Learning</span>
                    <span className="club-role">Member</span>
                  </div>
                  <div className="club-item">
                    <span className="club-name">DUQIS - Duke University Quantum Information Society</span>
                    <span className="club-role">Member</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        <section id="contact" className="contact-section">
          <h2 className="section-title">Contact Me</h2>
          <div className="contact-container">
            <div className="contact-intro">
              <p>I'm always interested in hearing about new opportunities and collaborations. 
                 Feel free to reach out if you'd like to connect!</p>
            </div>
            
            <form 
              className="contact-form" 
              action="https://api.web3forms.com/submit" 
              method="POST"
            >
              <input type="hidden" name="access_key" value={import.meta.env.VITE_WEB3FORMS_ACCESS_KEY || "25fbf50d-b461-4093-afee-de809d5bd079"} />
              
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="name">Name</label>
                  <input 
                    type="text" 
                    id="name" 
                    name="name" 
                    required 
                    placeholder="Your Name"
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input 
                    type="email" 
                    id="email" 
                    name="email" 
                    required 
                    placeholder="your.email@example.com"
                  />
                </div>
              </div>
              
              <div className="form-group">
                <label htmlFor="subject">Subject</label>
                <input 
                  type="text" 
                  id="subject" 
                  name="subject" 
                  required 
                  placeholder="What's this about?"
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="message">Message</label>
                <textarea 
                  id="message" 
                  name="message" 
                  rows={6} 
                  required 
                  placeholder="Your message here..."
                ></textarea>
              </div>
              
              <div className="form-actions">
                <button type="submit" className="submit-btn">
                  <span>Send</span>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M22 2L11 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M22 2L15 22L11 13L2 9L22 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
              </div>
            </form>
            
            <div className="contact-links">
              <p className="connect-text">Or connect with me on:</p>
              <a href="https://www.linkedin.com/in/ahmad-choudhary" target="_blank" rel="noopener noreferrer" className="linkedin-link">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M16 8C17.5913 8 19.1174 8.63214 20.2426 9.75736C21.3679 10.8826 22 12.4087 22 14V21H18V14C18 13.4696 17.7893 12.9609 17.4142 12.5858C17.0391 12.2107 16.5304 12 16 12C15.4696 12 14.9609 12.2107 14.5858 12.5858C14.2107 12.9609 14 13.4696 14 14V21H10V14C10 12.4087 10.6321 10.8826 11.7574 9.75736C12.8826 8.63214 14.4087 8 16 8Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M6 9H2V21H6V9Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M4 6C5.10457 6 6 5.10457 6 4C6 2.89543 5.10457 2 4 2C2.89543 2 2 2.89543 2 4C2 5.10457 2.89543 6 4 6Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <span>LinkedIn</span>
              </a>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default MainContent;