import { useEffect, useRef, useState } from 'react'
import './App.css'
import sideWatchSvg from './assets/sideways watch.svg'

const sectionTitles = ['Experience', 'Projects', 'About', 'Blog']
const wrapIndex = (index: number) => ((index % sectionTitles.length) + sectionTitles.length) % sectionTitles.length
type ProjectionPhase = 'idle' | 'forming' | 'projecting'

function App() {
  const [buttonsPressed, setButtonsPressed] = useState(false)
  const [projectionPhase, setProjectionPhase] = useState<ProjectionPhase>('idle')
  const svgRef = useRef<SVGSVGElement>(null)
  const centerShapeRef = useRef<SVGPolygonElement>(null)
  const currentTitleRef = useRef<SVGTextElement>(null)
  const nextTitleRef = useRef<SVGTextElement>(null)

  const handleTitleClick = () => {
    if (projectionPhase !== 'idle') return

    setButtonsPressed(true)
    window.setTimeout(() => {
      setButtonsPressed(false)
      setProjectionPhase('forming')
    }, 170)
  }

  useEffect(() => {
    if (projectionPhase !== 'forming') return

    const projectionTimeout = window.setTimeout(() => setProjectionPhase('projecting'), 940)
    return () => window.clearTimeout(projectionTimeout)
  }, [projectionPhase])

  useEffect(() => {
    const hourglassPoints = [
      [176, 96],
      [316, 96],
      [256, 181],
      [316, 266],
      [176, 266],
      [236, 181],
    ]
    const diamondPoints = [
      [246, 96],
      [246, 96],
      [316, 181],
      [246, 266],
      [246, 266],
      [176, 181],
    ]
    let targetRotation = 0
    let currentRotation = 0
    let targetPosition = 0
    let currentPosition = 0
    let animationFrame = 0
    let snapTimeout = 0

    const animate = () => {
      currentRotation += (targetRotation - currentRotation) * 0.14
      currentPosition += (targetPosition - currentPosition) * 0.14
      svgRef.current?.style.setProperty('--ring-rotation', `${currentRotation}deg`)

      const sectionPosition = Math.floor(currentPosition)
      const sectionIndex = wrapIndex(sectionPosition)
      const nextSectionIndex = wrapIndex(sectionPosition + 1)
      const sectionProgress = currentPosition - sectionPosition
      const faceProgress = Math.sin(sectionProgress * Math.PI)

      if (currentTitleRef.current) {
        currentTitleRef.current.textContent = sectionTitles[sectionIndex]
        currentTitleRef.current.style.opacity = `${sectionProgress < 0.16 ? 1 - sectionProgress / 0.16 : 0}`
      }

      if (nextTitleRef.current) {
        nextTitleRef.current.textContent = sectionTitles[nextSectionIndex]
        nextTitleRef.current.style.opacity = `${sectionProgress > 0.84 ? (sectionProgress - 0.84) / 0.16 : 0}`
      }

      const points = hourglassPoints.map(([x, y], index) => {
        const [targetX, targetY] = diamondPoints[index]
        return `${targetX + (x - targetX) * faceProgress},${targetY + (y - targetY) * faceProgress}`
      })
      centerShapeRef.current?.setAttribute('points', points.join(' '))

      if (
        Math.abs(targetRotation - currentRotation) > 0.01 ||
        Math.abs(targetPosition - currentPosition) > 0.001
      ) {
        animationFrame = requestAnimationFrame(animate)
      } else {
        animationFrame = 0
      }
    }

    const startAnimation = () => {
      if (!animationFrame) {
        animationFrame = requestAnimationFrame(animate)
      }
    }

    const rotateRing = (event: WheelEvent) => {
      targetRotation += event.deltaY * 0.18
      targetPosition += event.deltaY * 0.0012

      window.clearTimeout(snapTimeout)
      snapTimeout = window.setTimeout(() => {
        targetPosition = Math.round(targetPosition)
        startAnimation()
      }, 130)

      startAnimation()
    }

    window.addEventListener('wheel', rotateRing, { passive: true })

    return () => {
      window.removeEventListener('wheel', rotateRing)
      window.clearTimeout(snapTimeout)
      if (animationFrame) cancelAnimationFrame(animationFrame)
    }
  }, [])

  return (
    <main className={`ben-10-canvas projection-${projectionPhase}`} aria-label="Ben 10 Omnitrix watch illustration">
      <svg
        ref={svgRef}
        className="omnitrix"
        viewBox="0 0 492 362"
        role="img"
        aria-labelledby="omnitrix-title"
        xmlns="http://www.w3.org/2000/svg"
      >
        <title id="omnitrix-title">Ben 10 Omnitrix watch</title>
        <defs>
          <linearGradient id="greenMetal" x1="0" x2="1" y1="0" y2="1">
            <stop offset="0" stopColor="#14c737" />
            <stop offset="0.42" stopColor="#07991f" />
            <stop offset="0.72" stopColor="#036313" />
            <stop offset="1" stopColor="#10b62e" />
          </linearGradient>
          <linearGradient id="greenEdge" x1="0" x2="1" y1="0" y2="1">
            <stop offset="0" stopColor="#39df4d" />
            <stop offset="0.5" stopColor="#07a723" />
            <stop offset="1" stopColor="#025911" />
          </linearGradient>
          <linearGradient id="darkGreenMetal" x1="0" x2="1" y1="0" y2="1">
            <stop offset="0" stopColor="#1a6a1d" />
            <stop offset="0.55" stopColor="#0e4012" />
            <stop offset="1" stopColor="#16821f" />
          </linearGradient>
          <linearGradient id="buttonSteel" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0" stopColor="#b6c0ca" />
            <stop offset="0.5" stopColor="#737e89" />
            <stop offset="1" stopColor="#424b55" />
          </linearGradient>
          <linearGradient id="ringSteel" x1="0" x2="1" y1="0" y2="1">
            <stop offset="0" stopColor="#b1bbc7" />
            <stop offset="0.35" stopColor="#89939f" />
            <stop offset="0.68" stopColor="#555f6b" />
            <stop offset="1" stopColor="#9aa4af" />
          </linearGradient>
          <linearGradient id="symbolGreen" x1="0" x2="1" y1="0" y2="1">
            <stop offset="0" stopColor="#9be238" />
            <stop offset="0.55" stopColor="#75c820" />
            <stop offset="1" stopColor="#4fa70e" />
          </linearGradient>
          <clipPath id="dialClip">
            <circle cx="181" cy="246" r="102" />
          </clipPath>
          <clipPath id="bodyClip">
            <path d="M114 0h134c-2 24 4 50 16 78 13 31 33 55 58 76l-41 44 1 94 42 44c-27 22-48 49-61 82-11 27-16 52-14 74H113c2-23-3-49-15-78-13-32-33-59-59-80l41-43v-91l-42-45c26-21 46-47 59-79 12-28 17-53 17-76Z" />
          </clipPath>
          <clipPath id="faceClip">
            <circle cx="246" cy="181" r="82" />
          </clipPath>
        </defs>

        <rect width="492" height="362" fill="#000" />

        <g transform="translate(492 0) rotate(90)">
          <g stroke="#050605" strokeLinejoin="round" strokeLinecap="round">
            <g clipPath="url(#bodyClip)">
              <path d="M115 0h43v492h-43c0-25-5-50-18-78-14-32-35-59-61-80l42-43v-91l-42-45c27-22 48-49 61-81 13-29 18-54 18-74Z" fill="url(#greenMetal)" />
              <path d="M204 0h43c0 22 6 48 18 77 14 33 34 58 61 79l-43 43v91l43 45c-27 22-49 49-62 82-12 28-17 52-17 75h-43V0Z" fill="url(#greenMetal)" />
              <path d="M144 0h75v492h-75V0Z" fill="#070807" />
              <path d="M142 31h79v25h-79zM142 417h79v50h-79z" fill="#020302" />
              <path d="M109 292c-25 18-48 36-71 55 22 18 42 40 56 65 12 21 18 42 20 61h31V292Z" fill="url(#darkGreenMetal)" opacity=".94" />
              <path d="M252 292c25 18 49 36 72 55-22 18-42 40-56 65-12 22-18 42-20 61h-31V292Z" fill="url(#greenEdge)" />
              <path d="M109 199c-25-18-48-36-71-55 22-18 42-40 56-65 12-21 18-42 20-61h31v181Z" fill="url(#darkGreenMetal)" />
              <path d="M252 199c25-18 49-36 72-55-22-18-42-40-56-65-12-22-18-42-20-61h-31v181Z" fill="url(#greenEdge)" />
              <path d="M143 5h-29l-1 25h30V5ZM219 5h29l1 25h-30V5ZM143 462h-30l1 25h29v-25ZM219 462h30l-1 25h-29v-25Z" fill="#009b20" />
            </g>

            <path d="M39 146c34-31 57-68 68-117h37v94c-31 2-57 10-78 26l-26 47Z" fill="url(#greenMetal)" strokeWidth="4" />
            <path d="M323 146c-34-31-57-68-68-117h-37v94c31 2 57 10 78 26l26 47Z" fill="url(#greenEdge)" strokeWidth="4" />
            <path d="M39 346c34 31 57 68 68 117h37v-94c-31-2-57-10-78-26l-26-47Z" fill="url(#darkGreenMetal)" strokeWidth="4" />
            <path d="M323 346c-34 31-57 68-68 117h-37v-94c31-2 57-10 78-26l26-47Z" fill="url(#greenEdge)" strokeWidth="4" />

            <path d="M121 91c35-14 83-14 120 0v18H121Z" fill="#818993" strokeWidth="4" />
            <path d="M121 383c35 14 83 14 120 0v18H121Z" fill="#7b838d" strokeWidth="4" />

            <path d="M48 156c70-78 197-78 266 0l-32 40c-51-60-151-61-202-1Z" fill="url(#greenEdge)" strokeWidth="4" />
            <path d="M48 336c70 78 197 78 266 0l-32-40c-51 60-151 61-202 1Z" fill="url(#greenMetal)" strokeWidth="4" />
            <path d="M69 139l22 16M293 139l-22 16M69 353l22-16M293 353l-22-16" stroke="#050605" strokeWidth="4" />

            <g className="center-ring">
              <circle cx="181" cy="246" r="136" fill="#080908" strokeWidth="4" />
              <circle cx="181" cy="246" r="131" fill="url(#ringSteel)" strokeWidth="0" />
              <g clipPath="url(#dialClip)">
                <path d="M74 143h44l36 104-36 102H74Z" fill="#1e232a" />
                <path d="M244 143h44v206h-44l-36-103Z" fill="#151a1f" />
                <path d="M74 143h44l36 104-36 102H74Z" fill="#656e7a" transform="translate(0 -10)" opacity=".9" />
                <path d="M181 142h107v207H181Z" fill="#8e98a4" />
              </g>
              <path d="M181 116v52M181 324v52M49 246h50M263 246h50" stroke="#050605" strokeWidth="5" />
              <circle cx="181" cy="246" r="102" fill="none" stroke="#050605" strokeWidth="13" />
            </g>

            <circle cx="181" cy="246" r="92" fill="#030403" stroke="#050605" strokeWidth="4" />
          </g>
        </g>

        <g stroke="#050605" strokeLinejoin="round" strokeLinecap="round">
          <g className={`watch-buttons ${buttonsPressed ? 'pressed' : ''}`}>
            <g className="top-button">
              <path d="M230 62h32v25h-32z" fill="url(#buttonSteel)" strokeWidth="4" />
              <g className="top-button-cap">
                <rect x="224" y="18" width="44" height="44" fill="url(#buttonSteel)" strokeWidth="4" />
                <path d="M230 19v42M242 19v42M254 19v42M266 19v42" stroke="#9fa7b0" strokeWidth="2" />
                <path d="M225 28h42" stroke="#20252b" strokeWidth="4" />
              </g>
            </g>
            <g className="bottom-button">
              <path d="M230 275h32v25h-32z" fill="url(#buttonSteel)" strokeWidth="4" />
              <g className="bottom-button-cap">
                <rect x="224" y="300" width="44" height="44" fill="url(#buttonSteel)" strokeWidth="4" />
                <path d="M230 301v42M242 301v42M254 301v42M266 301v42" stroke="#9fa7b0" strokeWidth="2" />
                <path d="M225 334h42" stroke="#20252b" strokeWidth="4" />
              </g>
            </g>
          </g>

          <g className="watch-face" onClick={handleTitleClick}>
            <circle cx="246" cy="181" r="88" fill="#030403" strokeWidth="4" />
            <g clipPath="url(#faceClip)">
              <circle cx="246" cy="181" r="82" fill="#030403" />
              <polygon
                ref={centerShapeRef}
                points="246,96 246,96 316,181 246,266 246,266 176,181"
                fill="url(#symbolGreen)"
              />
            </g>
            <g className="section-title">
              <text ref={currentTitleRef} x="246" y="181">Experience</text>
              <text ref={nextTitleRef} x="246" y="181" opacity="0">Projects</text>
            </g>
            <circle cx="246" cy="181" r="82" fill="none" strokeWidth="6" />
          </g>
        </g>
      </svg>
      {projectionPhase === 'projecting' && (
        <div className="projection-stage" aria-label="Projected Omnitrix hologram">
          <VerticalWatch />
        </div>
      )}
    </main>
  )
}

function VerticalWatch() {
  return (
    <div className="side-watch-shell">
      <img
        className="side-watch"
        src={sideWatchSvg}
        alt="Three-quarter view of Ben 10 Omnitrix watch"
      />
      <div className="hologram-beam" aria-hidden="true">
        <div className="hologram-text">
          Software engineer building fast, polished web experiences with React, TypeScript, and thoughtful product design.
        </div>
      </div>
    </div>
  )
}

export default App
