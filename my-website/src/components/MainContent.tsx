import { useState } from 'react';
import './MainContent.css';
import Experience from './Experience';
import Projects from './Projects';
import About from './About';
import Blog from './Blog';
import ResumePDF from '../assets/Resume.pdf';

type Section = 'experience' | 'about' | 'projects' | 'blog' | null;

const MainContent = () => {
  const [activeSection, setActiveSection] = useState<Section>(null);
  const [isClosing, setIsClosing] = useState(false);

  const handleQuadrantClick = (section: Section) => {
    setActiveSection(section);
    setIsClosing(false);
  };

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      setActiveSection(null);
      setIsClosing(false);
    }, 1300); // Match total animation duration (0.3s title + 0.2s pause + 0.6s collapse + 0.2s fade)
  };

  return (
    <div className="main-content" onClick={() => activeSection && !isClosing && handleClose()}>
      <div className={`quadrant-grid ${activeSection ? 'expanded' : ''} ${activeSection ? `active-${activeSection}` : ''} ${isClosing ? 'closing' : ''}`}>
        {/* Top Left - Experience */}
        <div
          className={`quadrant top-left ${activeSection === 'experience' ? 'active' : ''} ${activeSection && activeSection !== 'experience' ? 'hidden' : ''} ${isClosing && activeSection === 'experience' ? 'closing' : ''}`}
          onClick={(e) => {
            if (!activeSection && !isClosing) {
              e.stopPropagation();
              handleQuadrantClick('experience');
            }
          }}
        >
          <h2 className="quadrant-title">Experience</h2>
          {activeSection === 'experience' && (
            <>
              <button
                className="close-button"
                onClick={(e) => {
                  e.stopPropagation();
                  handleClose();
                }}
              >
                x
              </button>
              <div className="section-content" onClick={(e) => e.stopPropagation()}>
                <Experience />
              </div>
            </>
          )}
        </div>

        {/* Top Right - Projects */}
        <div
          className={`quadrant top-right ${activeSection === 'projects' ? 'active' : ''} ${activeSection && activeSection !== 'projects' ? 'hidden' : ''} ${isClosing && activeSection === 'projects' ? 'closing' : ''}`}
          onClick={(e) => {
            if (!activeSection && !isClosing) {
              e.stopPropagation();
              handleQuadrantClick('projects');
            }
          }}
        >
          <h2 className="quadrant-title">Projects</h2>
          {activeSection === 'projects' && (
            <>
              <button
                className="close-button"
                onClick={(e) => {
                  e.stopPropagation();
                  handleClose();
                }}
              >
                x
              </button>
              <div className="section-content" onClick={(e) => e.stopPropagation()}>
                <Projects />
              </div>
            </>
          )}
        </div>

        {/* Bottom Left - About */}
        <div
          className={`quadrant bottom-left ${activeSection === 'about' ? 'active' : ''} ${activeSection && activeSection !== 'about' ? 'hidden' : ''} ${isClosing && activeSection === 'about' ? 'closing' : ''}`}
          onClick={(e) => {
            if (!activeSection && !isClosing) {
              e.stopPropagation();
              handleQuadrantClick('about');
            }
          }}
        >
          <h2 className="quadrant-title">About</h2>
          {activeSection === 'about' && (
            <>
              <button
                className="close-button"
                onClick={(e) => {
                  e.stopPropagation();
                  handleClose();
                }}
              >
                x
              </button>
              <div className="section-content" onClick={(e) => e.stopPropagation()}>
                <About />
              </div>
            </>
          )}
        </div>

        {/* Bottom Right - Blog */}
        <div
          className={`quadrant bottom-right ${activeSection === 'blog' ? 'active' : ''} ${activeSection && activeSection !== 'blog' ? 'hidden' : ''} ${isClosing && activeSection === 'blog' ? 'closing' : ''}`}
          onClick={(e) => {
            if (!activeSection && !isClosing) {
              e.stopPropagation();
              handleQuadrantClick('blog');
            }
          }}
        >
          <h2 className="quadrant-title">Blog</h2>
          {activeSection === 'blog' && (
            <>
              <button
                className="close-button"
                onClick={(e) => {
                  e.stopPropagation();
                  handleClose();
                }}
              >
                x
              </button>
              <div className="section-content" onClick={(e) => e.stopPropagation()}>
                <Blog />
              </div>
            </>
          )}
        </div>
      </div>

      <a
        href={ResumePDF}
        download="Ahmad_Choudhary_Resume.pdf"
        className="resume-button"
      >
        Resume
      </a>
    </div>
  );
};

export default MainContent;
