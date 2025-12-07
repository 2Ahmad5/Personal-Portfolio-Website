import './Quadrants.css';

const Projects = () => {
  const projects = [
    {
      name: "Finder-2",
      description: "A custom AI-powered Finder application that enhances file navigation and search capabilities using an agentic AI framework.",
      technologies: ["GoLang", "Wails", "LLM", "macOS"],
      link: "https://github.com/2Ahmad5/Finder-2"
    },
    {
      name: "TruthGuard",
      description: "Chrome extension that provides real-time misinformation detection for articles and videos, helping users identify unreliable content as they browse.",
      technologies: ["JavaScript", "Flask", "React"],
      link: "https://github.com/2Ahmad5/HackDukeProject"
    },
    {
      name: "ML Projects",
      description: "Collection of machine learning experiments including GAN and VAE implementations, TARNet confounding variable analysis, and SAM 2 for AR obstruction detection.",
      technologies: ["PyTorch", "TensorFlow", "SAM 2", "Computer Vision"],
      link: ""
    }
  ];

  return (
    <div className="experience-container">
      {projects.map((project, index) => (
        <div key={index} className="experience-item">
          <div className="experience-header">
            <div className="company-info">
              <h3 className="company-name">{project.name}</h3>
              {project.link && (
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="company-link"
                  aria-label={`View ${project.name} project`}
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                    <polyline points="15 3 21 3 21 9"></polyline>
                    <line x1="10" y1="14" x2="21" y2="3"></line>
                  </svg>
                </a>
              )}
            </div>
          </div>
          <p className="experience-description">{project.description}</p>
          <div className="technologies">
            {project.technologies.map((tech, techIndex) => (
              <span key={techIndex} className="tech-tag">{tech}</span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Projects;
