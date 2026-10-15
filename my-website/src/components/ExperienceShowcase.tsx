import { useState } from 'react'
import CascaLogo from '../assets/Casca.png'
import CruiseLogo from '../assets/Cruise.png'
import DukeComputerScienceLogo from '../assets/duke computer science.png'
import MercorLogo from '../assets/mercor.png'

const experiences = [
  {
    company: 'Cruise',
    colorKey: 'cruise',
    logo: CruiseLogo,
    role: 'Machine Learning Engineer Intern',
    period: 'May 2026 - Aug 2026',
    description:
      'Built SPARK, an ML infrastructure tool using Pyroscope to profile CPU waits, mutex contention, blocking, and memory allocation across ML workflows. Designed an AI-driven hotspot pipeline that cut training regressions by about 40% through automated bottleneck detection and targeted PR generation.',
    technologies: ['Python', 'Pyroscope', 'Machine Learning'],
    link: 'https://getcruise.com',
  },
  {
    company: 'Casca',
    colorKey: 'casca',
    logo: CascaLogo,
    role: 'Software Engineer Intern',
    period: 'May 2025 - Feb 2026',
    description:
      'Forward-deployed with major banks to build AI agents that automated SBA loan processing 10x faster and generated banker interfaces from schemas, reducing engineering requests by 60%. Supported a $29M Series A through core infrastructure contributions.',
    technologies: ['TRPC', 'Docker', 'PostgreSQL', 'AWS'],
    link: 'https://cascading.ai',
  },
  {
    company: 'Fain Lab',
    colorKey: 'fain',
    logo: DukeComputerScienceLogo,
    role: 'Researcher, Duke University',
    period: 'Apr 2026 - Present',
    description:
      'Conducting LLM safety research with inverse reinforcement learning to improve reward interpretability and alignment. Evaluating preference-learning methods and building pipelines to test reward-model robustness against unfiltered LLM-generated preferences.',
    technologies: ['LLMs', 'Inverse RL', 'Python'],
    link: 'https://cs.duke.edu',
  },
  {
    company: 'Mercor',
    colorKey: 'mercor',
    logo: MercorLogo,
    role: 'Project Manager Intern',
    period: 'Sept 2026 - Present',
    description:
      'Analyzed data from 700+ SME-built RL environments, measuring development time, throughput, and workflow performance. Built analyses to identify bottlenecks in environment production, uncovering inefficiencies responsible for 46%+ of development time.',
    technologies: ['Data Science', 'Reinforcement Learning', 'Analytics'],
    link: 'https://www.mercor.com',
  },
]

const ExperienceShowcase = () => {
  const [activeIndex, setActiveIndex] = useState(0)
  const activeExperience = experiences[activeIndex]

  return (
    <div className="experience-browser" data-active-company={activeExperience.colorKey}>
      <div className="experience-company-list" aria-label="Companies">
        {experiences.map((experience, index) => (
          <button
            key={experience.company}
            className={`experience-company${index === activeIndex ? ' is-active' : ''}`}
            data-company={experience.colorKey}
            type="button"
            aria-pressed={index === activeIndex}
            onClick={() => setActiveIndex(index)}
          >
            {experience.company}
          </button>
        ))}
        <p className="experience-prompt">Click a company</p>
      </div>

      <article className="experience-detail" key={activeExperience.company}>
        <div className="experience-detail-card">
          {activeExperience.logo && <img className="experience-detail-logo" src={activeExperience.logo} alt="" />}
          <p className="experience-detail-period">{activeExperience.period}</p>
          <h3>{activeExperience.role}</h3>
          <p className="experience-detail-description">{activeExperience.description}</p>

          <div className="experience-detail-footer">
            <div className="experience-skills">
              {activeExperience.technologies.map((technology) => (
                <span key={technology}>{technology}</span>
              ))}
            </div>

            {activeExperience.link && (
              <a href={activeExperience.link} target="_blank" rel="noreferrer">
                Visit company <span aria-hidden="true">-&gt;</span>
              </a>
            )}
          </div>
        </div>
      </article>
    </div>
  )
}

export default ExperienceShowcase
