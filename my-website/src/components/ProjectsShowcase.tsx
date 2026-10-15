import ExplorerScreenshot from '../assets/explorer.png'
import ShahzadScreenshot from '../assets/Shahzad o3.png'
import TruthGuardScreenshot from '../assets/truthguard.jpg'

const projects = [
  {
    title: 'Shahzad o3',
    year: '2026',
    description:
      'Fine-tuned an 8B LLM with LoRA, SFT, DPO, and GRPO, raising math accuracy from 44% to 78%.',
    image: ShahzadScreenshot,
    imageAlt: 'Shahzad o3 model evaluation results',
    imageFit: 'contain',
    tags: ['NLP', 'LoRA', 'PyTorch'],
    links: [
      {
        label: 'Code',
        url: 'https://github.com/2Ahmad5/CPS572_Sp26_mini_project/tree/ahmads-version',
      },
    ],
  },
  {
    title: 'Explorer',
    year: '2025',
    description:
      'Built an AI-first Finder in Swift with semantic search, autonomous file tasks, and connected workflows.',
    image: ExplorerScreenshot,
    imageAlt: 'Explorer file search interface',
    imageFit: 'contain',
    tags: ['Agentic AI', 'Swift', 'Cerebras'],
    links: [{ label: 'Code', url: 'https://github.com/2Ahmad5/Finder-2' }],
  },
  {
    title: 'TruthGuard',
    year: '2025',
    description:
      'Created a real-time fact-checking extension for articles and videos that won first place at HackDuke.',
    image: TruthGuardScreenshot,
    imageAlt: 'TruthGuard fact-checking an article',
    imageFit: 'cover',
    tags: ['React', 'Perplexity API', 'Flask'],
    links: [{ label: 'Code', url: 'https://github.com/2Ahmad5/HackDukeProject' }],
  },
]

const ProjectsShowcase = () => (
  <div className="projects-grid">
    {projects.map((project) => (
      <article className="project-card" key={project.title}>
        <div className="project-image-frame">
          {project.image ? (
            <img
              className={`project-image project-image--${project.imageFit}`}
              src={project.image}
              alt={project.imageAlt}
            />
          ) : (
            <div className="project-image project-image-placeholder">Screenshot</div>
          )}
        </div>

        <p className="project-meta">
          {project.year}
        </p>
        <h3>{project.title}</h3>
        <p className="project-description">{project.description}</p>

        <ul className="project-technologies" aria-label={`${project.title} technologies`}>
          {project.tags.map((tag) => (
            <li key={tag}>{tag}</li>
          ))}
        </ul>

        <div className="project-links">
          {project.links.map((link) => (
            <a key={link.label} href={link.url} target="_blank" rel="noreferrer">
              {link.label} <span aria-hidden="true">&#8599;</span>
            </a>
          ))}
        </div>
      </article>
    ))}
  </div>
)

export default ProjectsShowcase
