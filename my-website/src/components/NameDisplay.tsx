import './NameDisplay.css';

const NameDisplay = () => {
  return (
    <div className="name-container">
      <h1 className="name-display">Ahmad Choudhary</h1>
      <div className="social-links">
        <a href="mailto:chahmad2005@gmail.com" className="social-link">chahmad2005@gmail.com</a>
        <span className="separator">|</span>
        <a href="https://github.com/2Ahmad5" target="_blank" rel="noopener noreferrer" className="social-link">github/2Ahmad5</a>
        <span className="separator">|</span>
        <a href="https://www.linkedin.com/in/ahmad-choudhary" target="_blank" rel="noopener noreferrer" className="social-link">linkedin/ahmad-choudhary</a>
      </div>
    </div>
  );
};

export default NameDisplay;