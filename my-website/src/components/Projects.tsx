import './Quadrants.css';

const Projects = () => {
  const projects = [
    {
      name: "Shahzad o3",
      description: "Fine-tuned an 8B LLM with LoRA, SFT, and RL to improve instruction-following, reasoning, and code generation. Built DPO and GRPO pipelines that raised math accuracy from 44% to 78.0% across evaluations.",
      technologies: ["NLP", "LoRA", "Reinforcement Learning", "PyTorch"],
      link: ""
    },
    {
      name: "Explorer",
      description: "Built an AI-first Finder and file explorer in Swift for low-latency RAG operations. Added agentic semantic search, autonomous file tasks, and Google Docs and Gmail integrations for in-app workflows.",
      technologies: ["Agentic AI", "Swift", "Cerebras"],
      link: "https://github.com/2Ahmad5/Finder-2"
    },
    {
      name: "TruthGuard",
      description: "Created a Chrome extension for real-time fact-checking of articles and videos using the Perplexity API for cited evidence. Won 1st place at HackDuke while leading frontend, backend, prompt engineering, and server integration.",
      technologies: ["React", "Perplexity API", "Flask", "JavaScript", "Vite"],
      link: "https://github.com/2Ahmad5/HackDukeProject"
    },
    {
      name: "ML Games - Pac-Man and Robotics",
      description: "Achieved a 90% Pac-Man win rate with reinforcement learning, a custom heuristic, and a robust score function. Also predicted outcomes for 6,000 matches across 2,500 teams with 85% accuracy and improved training accuracy by 20% with cross-validation and random forests.",
      technologies: ["Reinforcement Learning", "Cross-Validation", "Random Forest", "Python"],
      link: ""
    },
    {
      name: "Deep Learning Projects",
      description: "Investigating confounding variables in TARNet causal estimators. Trained a custom CNN for multi-class ImageNet classification with 70% accuracy and built a region proposal network that improved image-search speed and detection efficiency.",
      technologies: ["PyTorch", "TensorFlow", "NumPy", "CNN", "MLP"],
      link: ""
    }
  ];

  return (
    <div className="experience-container">
      {projects.map((project, index) => (
        <div key={index} className="experience-item">
          <div className="experience-header">
            <div className="company-info">
              <div className="company-title-row">
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
