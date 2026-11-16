import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Music, VolumeX, Volume2 } from 'lucide-react'
import { Entrance, Vibes, Fortune, Finale } from './pages.jsx'
import { setMuted, setMusic } from './sound.js'

const PAGES = [Entrance, Vibes, Fortune, Finale]
const NAMES = ['Entrance', 'Vibes', 'Fortune machine', 'Final card']

export default function App() {
  const [page, setPage] = useState(0)
  const [music, setMus] = useState(false)
  const [mute, setMute] = useState(false)
  const Page = PAGES[page]
  const go = (n) => { setPage(n); window.scrollTo(0, 0) }
  return (
    <div className="app">
      <header className="top">
        <nav className="dots" aria-label="Progress">
          {NAMES.map((n, i) => <span key={n} className={i === page ? 'on' : i < page ? 'past' : ''} aria-current={i === page ? 'step' : undefined} title={n} />)}
        </nav>
        <div className="tools">
          <button className={'tool' + (music ? ' active' : '')} aria-pressed={music} aria-label={music ? 'Turn music off' : 'Turn music on'} onClick={() => { setMusic(!music && !mute); setMus(!music) }}><Music size={18} /></button>
          <button className="tool" aria-pressed={mute} aria-label={mute ? 'Unmute sounds' : 'Mute all sounds'} onClick={() => { const m = !mute; setMute(m); setMuted(m); setMusic(!m && music) }}>{mute ? <VolumeX size={18} /> : <Volume2 size={18} />}</button>
        </div>
      </header>
      <AnimatePresence mode="wait">
        <motion.main key={page} initial={{ opacity: 0, y: 24, scale: 0.98 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: -24, scale: 1.02 }} transition={{ duration: 0.45 }}>
          <Page go={go} />
        </motion.main>
      </AnimatePresence>
    </div>
  )
}
