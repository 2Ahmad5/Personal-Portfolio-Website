import { useState, useEffect } from 'react';
import './Navbar.css';

const Navbar = () => {
  const [activeSection, setActiveSection] = useState('home');
  
  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'resume', label: 'Resume' },
    { id: 'projects', label: 'Projects' },
    { id: 'education', label: 'Education' },
    { id: 'contact', label: 'Contact Me' }
  ];

  useEffect(() => {
    const handleScroll = () => {
      const sections = navItems.map(item => ({
        id: item.id,
        element: document.getElementById(item.id)
      })).filter(section => section.element);

      const scrollPosition = window.scrollY + window.innerHeight / 3;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section.element && section.element.offsetTop <= scrollPosition) {
          setActiveSection(section.id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Call once to set initial state

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className="navbar-stepper">
      <div className="stepper-container">
        {navItems.map((item, index) => (
          <div 
            key={item.id} 
            className={`stepper-item ${activeSection === item.id ? 'active' : ''}`}
            onClick={() => handleNavClick(item.id)}
          >
            <div className="stepper-circle">
              <div className="circle-inner"></div>
            </div>
            <span className="stepper-label">{item.label}</span>
            {index < navItems.length - 1 && <div className="stepper-line"></div>}
          </div>
        ))}
      </div>
    </nav>
  );
};

export default Navbar;