import { useEffect, useRef, useState } from 'react'
import './App.css'

const sectionTitles = ['Experience', 'Projects', 'About', 'Blog']
const wrapIndex = (index: number) => ((index % sectionTitles.length) + sectionTitles.length) % sectionTitles.length

function App() {
  const [buttonsPressed, setButtonsPressed] = useState(false)
  const [projecting, setProjecting] = useState(false)
  const svgRef = useRef<SVGSVGElement>(null)
  const centerShapeRef = useRef<SVGPolygonElement>(null)
  const currentTitleRef = useRef<SVGTextElement>(null)
  const nextTitleRef = useRef<SVGTextElement>(null)

  const handleTitleClick = () => {
    setButtonsPressed(true)
    setProjecting(true)
    window.setTimeout(() => setButtonsPressed(false), 170)
  }

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
    <main className={`ben-10-canvas ${projecting ? 'projecting' : ''}`} aria-label="Ben 10 Omnitrix watch illustration">
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

          <circle cx="246" cy="181" r="88" fill="#030403" strokeWidth="4" />
          <g clipPath="url(#faceClip)">
            <circle cx="246" cy="181" r="82" fill="#030403" />
            <polygon
              ref={centerShapeRef}
              points="246,96 246,96 316,181 246,266 246,266 176,181"
              fill="url(#symbolGreen)"
            />
          </g>
          <g className="section-title" onClick={handleTitleClick}>
            <text ref={currentTitleRef} x="246" y="181">Experience</text>
            <text ref={nextTitleRef} x="246" y="181" opacity="0">Projects</text>
          </g>
          <circle cx="246" cy="181" r="82" fill="none" strokeWidth="6" />
        </g>
      </svg>
      <svg
        className="side-watch"
        viewBox="0 0 820 1024"
        role="img"
        aria-label="Side view of Omnitrix watch projecting green light"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="simpleGreen" x1="138" y1="220" x2="644" y2="940" gradientUnits="userSpaceOnUse">
            <stop offset="0" stopColor="#0bc72b" />
            <stop offset="0.5" stopColor="#078d1d" />
            <stop offset="1" stopColor="#02550d" />
          </linearGradient>
          <linearGradient id="simpleGreenBright" x1="166" y1="222" x2="663" y2="402" gradientUnits="userSpaceOnUse">
            <stop offset="0" stopColor="#12d734" />
            <stop offset="0.55" stopColor="#09ab25" />
            <stop offset="1" stopColor="#057316" />
          </linearGradient>
          <linearGradient id="simpleSteel" x1="190" y1="90" x2="676" y2="292" gradientUnits="userSpaceOnUse">
            <stop offset="0" stopColor="#68727f" />
            <stop offset="0.43" stopColor="#c8d0d8" />
            <stop offset="1" stopColor="#59636e" />
          </linearGradient>
          <linearGradient id="simpleSteelDark" x1="80" y1="292" x2="770" y2="312" gradientUnits="userSpaceOnUse">
            <stop offset="0" stopColor="#68737e" />
            <stop offset="0.5" stopColor="#c3ccd4" />
            <stop offset="1" stopColor="#58636d" />
          </linearGradient>
          <linearGradient id="simpleFaceGreen" x1="250" y1="95" x2="572" y2="184" gradientUnits="userSpaceOnUse">
            <stop offset="0" stopColor="#94e31d" />
            <stop offset="1" stopColor="#7acc13" />
          </linearGradient>
          <linearGradient id="simpleButton" x1="70" y1="308" x2="760" y2="323" gradientUnits="userSpaceOnUse">
            <stop offset="0" stopColor="#56616c" />
            <stop offset="0.46" stopColor="#c5ced7" />
            <stop offset="1" stopColor="#65707a" />
          </linearGradient>
          <clipPath id="simpleFaceClip">
            <ellipse cx="410" cy="142" rx="230" ry="70" />
          </clipPath>
          <clipPath id="simpleGlyphClip">
            <path d="M169 305c108 58 377 58 487-2v92c-116 59-367 60-487 1Z" />
          </clipPath>
        </defs>

        <rect width="820" height="1024" fill="#fff" />
        <g stroke="#050605" strokeLinejoin="round" strokeLinecap="round">
          <path d="M146 365C68 488 53 720 154 866c113 164 397 164 512 0 101-145 87-378 9-501h-82c67 112 72 312-14 426-80 105-258 105-337 0-86-114-81-314-14-426Z" fill="#050605" strokeWidth="5" />
          <path d="M158 363C84 482 73 707 169 844c105 150 371 150 476 0 96-137 85-362 11-481h-64c62 109 62 293-16 397-77 103-260 103-337 0-78-104-78-288-16-397Z" fill="url(#simpleGreen)" strokeWidth="4" />
          <path d="M214 382c-51 105-44 261 24 354 77 106 263 106 340 0 68-93 75-249 24-354h-45c44 94 36 228-22 301-63 79-191 79-254 0-58-73-66-207-22-301Z" fill="#050605" strokeWidth="4" />
          <path d="M166 404c-22 65-25 153-8 232M653 404c22 65 25 153 8 232M197 853c57 69 152 103 250 94M625 823c-36 68-105 111-187 124" stroke="#063d0c" strokeWidth="5" />
          <path d="M122 565c2-70 17-134 44-183M706 565c-2-70-17-134-44-183" stroke="#14d435" strokeWidth="8" opacity=".55" />
          <path d="M153 702c24 25 52 45 84 60M586 762c32-15 60-35 84-60M160 845l52 30M609 875l52-30" stroke="#07901e" strokeWidth="6" />

          <path d="M172 286h478c43 0 78 35 78 78v39H91v-39c0-43 35-78 81-78Z" fill="#050605" strokeWidth="5" />
          <path d="M91 344c87 73 548 73 637 0v74c-68 65-568 66-637 0Z" fill="url(#simpleGreenBright)" strokeWidth="5" />
          <path d="M100 405c79 55 541 55 620 0v52c-92 56-526 56-620 0Z" fill="#050605" strokeWidth="4" />
          <path d="M139 445h132v-73H139ZM548 372h133v73H548Z" fill="#071007" />
          <path d="M96 373h635M113 421c78 44 508 44 588 0" stroke="#050605" strokeWidth="4" />
          <path d="M184 293v92M303 286v112M518 286v112M646 293v92" stroke="#064b10" strokeWidth="3" />

          <path d="M169 305c108 58 377 58 487-2v92c-116 59-367 60-487 1Z" fill="#050605" strokeWidth="5" />
          <g clipPath="url(#simpleGlyphClip)">
            <rect x="138" y="288" width="542" height="130" fill="#050605" />
            <path d="M171 331h38v34h-27v30h-30v-78h19ZM228 323c26 0 34 28 12 45l-19 15h44v24h-79v-22l34-28c11-9 8-16-3-16h-28v-18ZM282 322h25v71h-25ZM325 322h28v55h62v28h-90ZM443 329h61v24h-36v15h57v25h-82ZM541 322h30v29h34v-29h31v85h-31v-31h-34v31h-30ZM660 322h33v85h-33Z" fill="#8bd823" />
            <circle cx="491" cy="364" r="18" fill="#8bd823" />
            <path d="M219 399h63M380 405h81M596 399h49" stroke="#8bd823" strokeWidth="9" />
          </g>

          <path d="M172 72c52-79 420-79 474 0l58 150c-77 98-511 98-590 0Z" fill="url(#simpleSteel)" strokeWidth="6" />
          <path d="M205 92c59-61 350-61 409 0 55 57-4 126-205 126S150 149 205 92Z" fill="#050605" strokeWidth="6" />
          <ellipse cx="410" cy="142" rx="230" ry="70" fill="#0e151b" strokeWidth="5" />
          <g clipPath="url(#simpleFaceClip)">
            <rect x="170" y="65" width="480" height="150" fill="#050605" />
            <path d="M262 112h170l-54 57 195-38 68 42-221 49-52-35-160 36-80-45Z" fill="url(#simpleFaceGreen)" />
            <path d="M170 168c125 38 355 38 480 0v75H170Z" fill="#050605" opacity=".65" />
          </g>
          <ellipse cx="410" cy="142" rx="254" ry="88" fill="none" stroke="#050605" strokeWidth="15" />
          <ellipse cx="410" cy="142" rx="228" ry="67" fill="none" stroke="#178c26" strokeWidth="18" />
          <ellipse cx="410" cy="142" rx="207" ry="55" fill="none" stroke="#1a232b" strokeWidth="14" />
          <path d="M169 221c101 51 380 52 482 0" stroke="#ccd4dc" strokeWidth="7" opacity=".65" />
          <path d="M285 64v68M528 64v68M176 188l61 18M584 206l61-18" stroke="#222b34" strokeWidth="4" />
          <path d="M151 116c42-64 188-77 307-69M597 85c38 25 63 65 65 101" stroke="#303942" strokeWidth="5" opacity=".7" />

          <path d="M91 339H46c-16 0-29-13-29-29v-21c0-16 13-29 29-29h45Z" fill="url(#simpleButton)" strokeWidth="5" />
          <ellipse cx="45" cy="300" rx="22" ry="40" fill="#74808b" strokeWidth="5" />
          <ellipse cx="45" cy="300" rx="12" ry="27" fill="#242c34" strokeWidth="4" />
          <path d="M76 263v73M102 267v66" stroke="#ccd4dc" strokeWidth="4" opacity=".6" />
          <path d="M728 260h45c16 0 29 13 29 29v21c0 16-13 29-29 29h-45Z" fill="url(#simpleButton)" strokeWidth="5" />
          <ellipse cx="775" cy="300" rx="22" ry="40" fill="#74808b" strokeWidth="5" />
          <ellipse cx="775" cy="300" rx="12" ry="27" fill="#242c34" strokeWidth="4" />
          <path d="M718 267v66M744 263v73" stroke="#ccd4dc" strokeWidth="4" opacity=".6" />
          <g transform="translate(490 372)">
            <path d="M0 0h56c30 0 55 25 55 55v18c0 30-25 55-55 55H0Z" fill="url(#simpleButton)" strokeWidth="5" />
            <ellipse cx="57" cy="64" rx="44" ry="56" fill="#8c97a2" strokeWidth="5" />
            <ellipse cx="57" cy="64" rx="24" ry="34" fill="#6d7782" strokeWidth="5" />
            <ellipse cx="57" cy="64" rx="12" ry="24" fill="#202832" strokeWidth="4" />
            <path d="M19 12c35 12 62 44 71 82M34 7c37 17 62 48 72 86" stroke="#c9d1d8" strokeWidth="4" opacity=".6" />
          </g>

          <path d="M314 454c65 20 129 20 193 0l-16 92c-50 22-116 22-165 0Z" fill="url(#simpleSteelDark)" strokeWidth="5" />
          <path d="M325 460c54 14 112 14 169 0" stroke="#eef3f7" strokeWidth="4" opacity=".55" />
          <path d="M307 456l-21-42M514 456l21-42" stroke="#050605" strokeWidth="5" />
        </g>
      </svg>
    </main>
  )
}

export default App
