import "./Quadrants.css";

const Experience = () => {
  const experiences = [
    {
      company: "Cascading AI",
      role: "Software Engineer Intern",
      period: "May 2025 - Feb 2026",
      description:
        "Forward-deployed with major banks to build AI agents that automated SBA loan processing (10× faster) and generated banker UIs from schemas, reducing engineering requests by 60%. Supported $29M Series A through core infrastructure contributions.",
      technologies: ["TRPC", "Docker", "PostgreSQL", "AWS"],
      link: "https://cascading.ai",
    },
    {
      company: "Duke Fuqua School of Business",
      role: "Research Assistant",
      period: "Sept 2024 - May 2025",
      description:
        "Built a full-stack investment insights platform using Svelte, Flask, and Python to process real-time stock data for 100+ Finance graduate students.",
      technologies: ["Svelte", "Flask", "Python"],
      link: "https://www.fuqua.duke.edu",
    },
    {
      company: "Nustian USA",
      role: "Full Stack Developer",
      period: "Jun 2024 - Aug 2024",
      description:
        "Optimized backend with dynamic content systems and designed an intuitive UI that increased engagement by 25% and contributed to over $80,000 in donations for Pakistani charity.",
      technologies: ["Node.js", "MongoDB", "React"],
      link: "https://nustianusa.org/",
    },
  ];

  return (
    <div className="experience-container">
      {experiences.map((exp, index) => (
        <div key={index} className="experience-item">
          <div className="experience-header">
            <div className="company-info">
              <h3 className="company-name">{exp.company}</h3>
              <a
                href={exp.link}
                target="_blank"
                rel="noopener noreferrer"
                className="company-link"
                aria-label={`Visit ${exp.company} website`}
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
            </div>
            <p className="experience-period">{exp.period}</p>
          </div>
          <p className="experience-description">{exp.description}</p>
          <div className="technologies">
            {exp.technologies.map((tech, techIndex) => (
              <span key={techIndex} className="tech-tag">
                {tech}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Experience;
