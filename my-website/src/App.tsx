import { useEffect, useRef } from 'react'
import Lenis from 'lenis'
import 'lenis/dist/lenis.css'
import './App.css'
import AhmadPortrait from './assets/Ahmad.png'
import ResumePdf from './assets/Resume.pdf'
import ExperienceShowcase from './components/ExperienceShowcase'
import ExtrasContent from './components/ExtrasContent'
import ProjectsShowcase from './components/ProjectsShowcase'

function App() {
  const sceneRef = useRef<HTMLElement>(null)

  useEffect(() => {
    let frame = 0
    let lenisFrame = 0
    const lenis = new Lenis({
      lerp: 0.075,
      wheelMultiplier: 0.8,
      smoothWheel: true,
      syncTouch: false,
      respectReducedMotion: true,
    })

    const updateProgress = () => {
      frame = 0
      const scene = sceneRef.current
      if (!scene) return

      const bounds = scene.getBoundingClientRect()
      const scrollDistance = scene.offsetHeight - window.innerHeight
      const progress = Math.min(1, Math.max(0, -bounds.top / scrollDistance))

      const phase = (start: number, end: number) => {
        const value = Math.min(1, Math.max(0, (progress - start) / (end - start)))
        return value * value * (3 - 2 * value)
      }

      const aboutShrink = phase(0, 0.07)
      const aboutExit = phase(0.07, 0.14)
      const experienceEnter = phase(0.07, 0.14)
      const experienceGrow = phase(0.14, 0.22)
      const experienceShrink = phase(0.4, 0.47)
      const experienceExit = phase(0.47, 0.54)
      const projectsEnter = phase(0.47, 0.54)
      const projectsGrow = phase(0.54, 0.62)
      const projectsShrink = phase(0.78, 0.85)
      const projectsExit = phase(0.85, 0.92)
      const extrasEnter = phase(0.85, 0.92)
      const extrasGrow = phase(0.92, 0.99)
      const experienceGrayscale = Math.max(1 - experienceGrow, experienceShrink)
      const projectsGrayscale = Math.max(1 - projectsGrow, projectsShrink)
      const extrasGrayscale = 1 - extrasGrow

      scene.style.setProperty('--about-shrink', String(aboutShrink))
      scene.style.setProperty('--about-exit', String(aboutExit))
      scene.style.setProperty('--experience-enter', String(experienceEnter))
      scene.style.setProperty('--experience-grow', String(experienceGrow))
      scene.style.setProperty('--experience-shrink', String(experienceShrink))
      scene.style.setProperty('--experience-exit', String(experienceExit))
      scene.style.setProperty('--experience-grayscale', String(experienceGrayscale))
      scene.style.setProperty('--projects-enter', String(projectsEnter))
      scene.style.setProperty('--projects-grow', String(projectsGrow))
      scene.style.setProperty('--projects-shrink', String(projectsShrink))
      scene.style.setProperty('--projects-exit', String(projectsExit))
      scene.style.setProperty('--projects-grayscale', String(projectsGrayscale))
      scene.style.setProperty('--extras-enter', String(extrasEnter))
      scene.style.setProperty('--extras-grow', String(extrasGrow))
      scene.style.setProperty('--extras-grayscale', String(extrasGrayscale))
    }

    const requestUpdate = () => {
      if (!frame) frame = window.requestAnimationFrame(updateProgress)
    }

    const animateScroll = (time: number) => {
      lenis.raf(time)
      lenisFrame = window.requestAnimationFrame(animateScroll)
    }

    updateProgress()
    lenis.on('scroll', requestUpdate)
    lenisFrame = window.requestAnimationFrame(animateScroll)
    window.addEventListener('resize', requestUpdate)

    return () => {
      window.removeEventListener('resize', requestUpdate)
      if (frame) window.cancelAnimationFrame(frame)
      window.cancelAnimationFrame(lenisFrame)
      lenis.destroy()
    }
  }, [])

  return (
    <main className="app">
      <section className="scroll-scene" ref={sceneRef}>
        <div className="scroll-stage">
          <nav className="contact-links" aria-label="Contact links">
            <a href="https://www.linkedin.com/in/ahmad-choudhary" target="_blank" rel="noreferrer">
              LinkedIn
            </a>
            <a href="https://github.com/2Ahmad5" target="_blank" rel="noreferrer">
              GitHub
            </a>
            <a href={ResumePdf} target="_blank" rel="noreferrer">
              Resume
            </a>
            <a href="mailto:chahmad2005@gmail.com">Email</a>
          </nav>

          <section className="slide about-slide" aria-labelledby="about-heading">
            <div className="about-layout">
              <div className="about-panel">
                <div className="about-row">
                  <div className="about-heading-column">
                    <h1 id="about-heading">
                      About Me<span className="about-heading-dot">.</span>
                    </h1>
                  </div>

                  <div className="about-copy">
                    <p>
                      I'm <mark>Ahmad Choudhary</mark>, a computer science student at
                      <a className="accent-underline" href="https://duke.edu" target="_blank" rel="noreferrer"> Duke University</a> focused on artificial intelligence and machine
                      learning, with a minor in math and cinematic arts. I enjoy solving
                      difficult problems, <a className="accent-underline" href="https://github.com/2Ahmad5" target="_blank" rel="noreferrer">building useful things</a>, and collaborating with
                      people who care about their craft. Away from software, you'll find
                      me playing <a className="accent-underline" href="https://magic.wizards.com/en" target="_blank" rel="noreferrer">board games</a>, following professional basketball, or
                      exploring a new topic.
                    </p>
                  </div>
                </div>
              </div>

              <aside className="portrait-panel">
                <div className="portrait-art">
                  <img
                    className="portrait"
                    src={AhmadPortrait}
                    alt="Ahmad Choudhary"
                  />
                </div>
              </aside>
            </div>

            <div className="scroll-cue" aria-hidden="true">
              <i />
              <span>Scroll</span>
              <i />
            </div>
          </section>

          <section className="slide experience-slide" aria-labelledby="experience-heading">
            <h2 id="experience-heading">
              Experience<span className="experience-heading-dot">.</span>
            </h2>
            <ExperienceShowcase />
          </section>

          <section className="slide projects-slide" aria-labelledby="projects-heading">
            <h2 id="projects-heading">
              Projects<span className="projects-heading-dot">.</span>
            </h2>
            <ProjectsShowcase />
          </section>

          <section className="slide extras-slide" aria-labelledby="extras-heading">
            <h2 id="extras-heading">
              Extras<span className="extras-heading-dot">.</span>
            </h2>
            <ExtrasContent />
          </section>
        </div>
      </section>
    </main>
  )
}

export default App
