import { useState, type WheelEvent } from 'react'
import movieRankingsRaw from '../data/movieRankings.txt?raw'
import showRankingsRaw from '../data/showRankings.txt?raw'

type Ranking = {
  name: string
  score: string
  note?: string
}

const parseRankings = (content: string): Ranking[] =>
  content
    .split(/\r?\n/)
    .flatMap((entry) => {
      const line = entry.trim()
      if (!line || line.startsWith('#')) return []

      const [name, scoreText, ...noteParts] = line.split('|').map((part) => part.trim())
      const scoreMatch = scoreText?.match(/^(\d+(?:\.\d+)?)\/10$/)
      if (!name || !scoreMatch) return []

      const note = noteParts.join(' | ').trim()
      return [{ name, score: scoreMatch[1], ...(note ? { note } : {}) }]
    })
    .sort((a, b) => Number(b.score) - Number(a.score))

const rankings = {
  movies: parseRankings(movieRankingsRaw),
  shows: parseRankings(showRankingsRaw),
}

const ExtrasContent = () => {
  const [showRankings, setShowRankings] = useState(false)
  const [activeTab, setActiveTab] = useState<keyof typeof rankings>('movies')
  const [expandedNote, setExpandedNote] = useState<string | null>(null)
  const activeRankings = rankings[activeTab]

  const selectTab = (tab: keyof typeof rankings) => {
    setActiveTab(tab)
    setExpandedNote(null)
  }

  const scrollRankingsHorizontally = (event: WheelEvent<HTMLOListElement>) => {
    if (Math.abs(event.deltaY) <= Math.abs(event.deltaX)) return
    event.preventDefault()
    event.currentTarget.scrollLeft += event.deltaY
  }

  return (
    <div className={`extras-content${showRankings ? ' is-showing-rankings' : ''}`}>
      <div className="extras-home" aria-hidden={showRankings}>
        <div className="extras-collage" aria-hidden="true">
          <div className="extras-photo extras-photo-one" />
          <div className="extras-photo extras-photo-two" />
          <div className="extras-photo extras-photo-three" />
          <p className="extras-collage-caption">I like making films :)</p>
        </div>

        <aside className="extras-copy">
          <p>
            Aside from filming, I'm a big NBA fan who supports Golden State (ONLY because of curry). I also love playing
            strategy board games like Magic and Catan. Currently trying to build a Catan bot that can play competitively.
            I'm always down to meet new people and talking about anything so hmu if you're intersted in talking or building :)
          </p>
          <p className="extras-coming-soon">Blog &amp; Movie ranking coming soon</p>
        </aside>
      </div>

      <section className="extras-rankings" data-lenis-prevent aria-hidden={!showRankings}>
        <div className="extras-ranking-toolbar">
          <button
            className="extras-ranking-back"
            type="button"
            tabIndex={showRankings ? 0 : -1}
            aria-label="Back to Extras"
            onClick={() => setShowRankings(false)}
          >
            <span aria-hidden="true">&#8592;</span>
          </button>
          <div className="extras-ranking-tabs" role="tablist" aria-label="Rankings">
            <button
              className={activeTab === 'movies' ? 'is-active' : ''}
              type="button"
              role="tab"
              tabIndex={showRankings ? 0 : -1}
              aria-selected={activeTab === 'movies'}
              onClick={() => selectTab('movies')}
            >
              Movies
            </button>
            <button
              className={activeTab === 'shows' ? 'is-active' : ''}
              type="button"
              role="tab"
              tabIndex={showRankings ? 0 : -1}
              aria-selected={activeTab === 'shows'}
              onClick={() => selectTab('shows')}
            >
              Shows
            </button>
          </div>
        </div>

        {activeRankings.length ? (
          <ol
            className="extras-ranking-list"
            data-lenis-prevent
            tabIndex={0}
            aria-label={`${activeTab} ranked from highest to lowest`}
            onWheel={scrollRankingsHorizontally}
          >
            {activeRankings.map((ranking, index) => {
              const rankingId = `${activeTab}-${index}`
              const isExpanded = expandedNote === rankingId

              return (
                <li key={`${ranking.name}-${ranking.score}`}>
                  <div className="extras-ranking-summary">
                    <span>{String(index + 1).padStart(2, '0')}</span>
                    {ranking.note ? (
                      <button
                        className="extras-ranking-title has-note"
                        type="button"
                        aria-expanded={isExpanded}
                        onClick={() => setExpandedNote(isExpanded ? null : rankingId)}
                      >
                        {ranking.name}
                      </button>
                    ) : (
                      <strong className="extras-ranking-title">{ranking.name}</strong>
                    )}
                    <span>{ranking.score}/10</span>
                  </div>

                  {ranking.note && (
                    <div className={`extras-ranking-note${isExpanded ? ' is-open' : ''}`}>
                      <div><p>{ranking.note}</p></div>
                    </div>
                  )}
                </li>
              )
            })}
          </ol>
        ) : (
          <p className="extras-ranking-empty">No {activeTab} ranked yet.</p>
        )}
      </section>
    </div>
  )
}

export default ExtrasContent
