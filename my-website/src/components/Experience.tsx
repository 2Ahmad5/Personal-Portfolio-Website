import "./Quadrants.css";

const Experience = () => {
  const experiences = [
    {
      company: "Cruise",
      role: "Machine Learning Engineer Intern",
      period: "May 2026 - Aug 2026",
      description:
        "Built SPARK, an ML infrastructure tool using Pyroscope telemetry to profile post-training workloads. Designed an AI-driven hotspot pipeline that reduced ML training regressions by about 40% and automated targeted PR fixes, improving workload performance by 12-18%.",
      technologies: ["Python", "Pyroscope", "Machine Learning"],
      link: "https://getcruise.com",
    },
    {
      company: "Casca (YC S23)",
      role: "Software Engineer Intern",
      period: "May 2025 - Feb 2026",
      description:
        "Forward-deployed with major banks to build AI agents that automated SBA loan processing (10× faster) and generated banker UIs from schemas, reducing engineering requests by 60%. Supported $29M Series A through core infrastructure contributions.",
      technologies: ["TRPC", "Docker", "PostgreSQL", "AWS"],
      link: "https://cascading.ai",
    },
    {
      company: "Fain Lab, Duke University",
      role: "Researcher",
      period: "Apr 2026 - Present",
      description:
        "Conducting LLM safety research with inverse reinforcement learning to improve reward interpretability and alignment. Evaluating preference-learning methods against Bradley-Terry algorithms and building pipelines to test reward-model robustness against unfiltered LLM-generated preferences.",
      technologies: ["LLMs", "Inverse Reinforcement Learning", "Python"],
    },
    {
      company: "Duke Fuqua School of Business",
      role: "Software Engineering Intern",
      period: "Sept 2024 - May 2025",
      description:
        "Built a full-stack investment insights platform using Svelte, Flask, and Python to process real-time stock data for 100+ Finance graduate students.",
      technologies: ["Svelte", "Flask", "Python"],
    },
  ];

  return (
    <div className="experience-container">
      {experiences.map((exp, index) => (
        <div key={index} className="experience-item">
          <div className="experience-header">
            <div className="company-info">
              <div>
                <div className="company-title-row">
                  <h3 className="company-name">{exp.company}</h3>
                  {exp.link && (
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
                        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1 2-2V8a2 2 0 0 1 2-2h6"></path>
                        <polyline points="15 3 21 3 21 9"></polyline>
                        <line x1="10" y1="14" x2="21" y2="3"></line>
                      </svg>
                    </a>
                  )}
                </div>
                <p className="experience-role">{exp.role}</p>
              </div>
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
