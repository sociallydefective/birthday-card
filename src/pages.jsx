import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { ArrowLeft, ArrowRight, Sparkles, RotateCcw } from 'lucide-react'
import { Cake, Balloon, Bow, Heart, Flower, Ghost, StarPix, Chick, BananaCat, Alien, Mew, Espeon, Pikachu } from './components/art.jsx'
import { Confetti, Floaters } from './components/fx.jsx'
import { sfx } from './sound.js'

const Btn = ({ children, onClick, disabled, big }) => (
  <motion.button className={'btn' + (big ? ' big' : '')} onClick={() => { sfx('click'); onClick?.() }} disabled={disabled} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.93 }}>{children}</motion.button>
)
const Back = ({ go, to }) => <button className="back" onClick={() => { sfx('click'); go(to) }} aria-label="Go back"><ArrowLeft size={18} /> Back</button>

/* ---------------- PAGE 1 ---------------- */
export function Entrance({ go }) {
  const [burst, setBurst] = useState(0)
  const open = () => { setBurst((b) => b + 1); setTimeout(() => go(1), 900) }
  const balloons = ['#ffb3d1', '#d9c2ff', '#bfe3ff', '#ffd6e8', '#e6d9ff']
  return (
    <section className="page p1">
      <Confetti n={30} /><Floaters n={14} seed={2} />
      {balloons.map((c, i) => <motion.div key={i} className="balloon" style={{ left: [4, 16, 78, 90, 46][i] + '%', top: [58, 12, 10, 56, 2][i] + '%' }} animate={{ y: [0, -18, 0] }} transition={{ repeat: Infinity, duration: 3 + i * 0.6, ease: 'easeInOut' }}><Balloon color={c} size={i === 4 ? 40 : 58} /></motion.div>)}
      <Mew className="pet pa" size={96} /><Pikachu className="pet pb" size={96} />
      <div className="center">
        <motion.h1 className="title" initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ type: 'spring', delay: 0.1 }}>HAPPY BIRTHDAY, <span className="script">Mridhula!</span></motion.h1>
        <p className="sub">Well well well… someone’s getting older! 🎀</p>
        <motion.div animate={{ y: [0, -8, 0] }} transition={{ repeat: Infinity, duration: 2.4 }}><Cake size={240} /></motion.div>
        <Btn big onClick={open}>OPEN YOUR SURPRISE ✨</Btn>
      </div>
      {burst > 0 && <Confetti key={burst} n={70} burst />}
    </section>
  )
}

/* ---------------- PAGE 2 ---------------- */
const CARDS = [
  ['Another year of being iconic. Keep it up!', <Ghost size={84} />, 'c-pink'],
  ['Hope your day is filled with happiness, laughter and LOTS of cake.', <StarPix size={84} />, 'c-lav'],
  ['May all the good things find their way to you.', <Chick size={84} />, 'c-blue'],
  ['Stay weird, stay wonderful, and never stop being yourself.', <BananaCat size={84} />, 'c-cream'],
]
const MEOWS = ['Meow! Happy Birthday!', 'Give me some cake!', 'You’re officially older now.', 'Purrfect day, isn’t it?']
export function Vibes({ go }) {
  const [msg, setMsg] = useState(null), last = useRef(-1), [n, setN] = useState(0)
  const poke = () => {
    let i; do { i = Math.floor(Math.random() * MEOWS.length) } while (i === last.current)
    last.current = i; setMsg(MEOWS[i]); setN((x) => x + 1); sfx('meow')
  }
  return (
    <section className="page p2">
      <Floaters n={12} seed={5} /><Back go={go} to={0} />
      <div className="center">
        <h2 className="title sm">Today is all about <span className="script">YOU!</span></h2>
        <p className="sub">Because birthdays deserve a little extra happiness.</p>
        <div className="cards">
          {CARDS.map(([t, art, cls], i) => (
            <motion.article key={i} className={'msg ' + cls} initial={{ opacity: 0, y: 40, rotate: i % 2 ? 4 : -4 }} animate={{ opacity: 1, y: 0, rotate: i % 2 ? 1.5 : -1.5 }} transition={{ delay: 0.15 * i, type: 'spring', stiffness: 120 }} whileHover={{ rotate: 0, scale: 1.04, y: -6 }} whileTap={{ scale: 0.96, rotate: i % 2 ? -3 : 3 }} tabIndex={0}>
              <div className="art">{art}</div><p>{t}</p>
            </motion.article>
          ))}
        </div>
        <div className="catzone">
          <AnimatePresence mode="wait">{msg && <motion.div key={n} className="bubble" initial={{ opacity: 0, scale: 0.6, y: 10 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0 }} role="status">{msg}</motion.div>}</AnimatePresence>
          <motion.button className="catbtn" onClick={poke} aria-label="Poke the cat" whileTap={{ scale: 0.85, rotate: -8 }} animate={{ rotate: n ? [0, -10, 10, -6, 0] : 0 }} key={'c' + n}>
            <Espeon size={120} />
          </motion.button>
          {!msg && <small className="hint">Psst… poke the kitty 🐾</small>}
        </div>
        <Btn big onClick={() => go(2)}>NEXT SURPRISE <ArrowRight size={20} /></Btn>
      </div>
    </section>
  )
}

/* ---------------- PAGE 3 ---------------- */
const FORTUNES = [
  'A year full of unexpected happiness is waiting for you.', 'Good things are closer than you think.', 'Your smile is about to have a really good year.',
  'Somewhere ahead, a very memorable adventure awaits.', 'Your luck called. It said this is your year.', 'More laughter, less stress. That’s the prediction.',
  'You are about to collect some beautiful memories.', 'A little surprise might make your day very soon.', 'Your future looks suspiciously full of cake.',
  'Warning: Excessive happiness detected in your upcoming year.', 'Your next chapter comes with unexpected plot twists. Good ones, hopefully!', 'The stars have confirmed: You’re pretty awesome.',
]
const FUNNY = new Set([4, 8, 9, 10, 11])
const SYMS = ['★', '✦', '♥', '☾', '✿', '?', '♪', '☁', '🔮', '🐱', '🍰', '✨']
const REACT = ['Mrrp?!', 'I saw that coming!', 'Wow, fancy!', 'Told you so. Meow.']
const shuffle = (a) => { const b = [...a]; for (let i = b.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1));[b[i], b[j]] = [b[j], b[i]] } return b }

export function Fortune({ go }) {
  const reduce = useReducedMotion()
  const bag = useRef(shuffle(FORTUNES.map((_, i) => i)))
  const [phase, setPhase] = useState('idle'), [count, setCount] = useState(0), [screen, setScreen] = useState('✦ ✦ ✦')
  const [ticket, setTicket] = useState(null), [boom, setBoom] = useState(0), [catSay, setCatSay] = useState(null)
  const timers = useRef([])
  useEffect(() => () => timers.current.forEach((t) => { clearInterval(t); clearTimeout(t) }), [])
  const reveal = () => {
    if (phase === 'busy' || count >= 3) return
    setPhase('busy'); setTicket(null); setCatSay(null); sfx('pop')
    const iv = setInterval(() => { setScreen(Array.from({ length: 3 }, () => SYMS[Math.floor(Math.random() * SYMS.length)]).join(' ')); sfx('tick') }, 90)
    timers.current.push(iv)
    const to = setTimeout(() => {
      clearInterval(iv)
      const id = bag.current[count], c = count + 1
      setScreen('★ ✿ ★'); setTicket({ id, text: FORTUNES[id], style: count }); setCount(c); setPhase('done'); sfx('ticket')
      setCatSay(FUNNY.has(id) ? 'Hehe, that one’s good!' : REACT[Math.floor(Math.random() * REACT.length)])
      if (FUNNY.has(id)) setTimeout(() => setBoom((b) => b + 1), 900)
    }, reduce ? 400 : 2200)
    timers.current.push(to)
  }
  const busy = phase === 'busy', done = count >= 3
  return (
    <section className="page p3">
      <Floaters n={12} seed={8} /><Back go={go} to={1} />
      <div className="center">
        <h2 className="title sm">THE BIRTHDAY FORTUNE MACHINE 🔮</h2>
        <p className="sub">Let’s see what the universe has planned for you…</p>
        <motion.div className={'machine' + (busy ? ' on shake' : phase === 'done' ? ' on' : '')} animate={busy && !reduce ? { x: [0, -4, 4, -3, 3, 0] } : { x: 0 }} transition={{ repeat: busy ? Infinity : 0, duration: 0.4 }}>
          <div className="mcats"><Mew size={70} className="mc1" /><Espeon size={70} className="mc2" /></div>
          <Bow size={44} className="mbow" />
          <div className="mbody">
            <div className="mscreen" aria-live="polite"><span>{screen}</span></div>
            <div className="mlights"><i /><i /><i /></div>
            <button className="mbutton" onClick={() => { sfx('click'); reveal() }} disabled={busy || done} aria-label="Reveal my fortune"><span /></button>
            <div className="tray"><div className="slot" /></div>
          </div>
          <div className="tickwrap">
            <AnimatePresence mode="wait">
              {ticket && (
                <motion.div key={count} className={'ticket t' + ticket.style} initial={{ y: -130, opacity: 0, scaleY: 0.2 }} animate={{ y: 0, opacity: 1, scaleY: 1 }} transition={{ duration: reduce ? 0.2 : 1, type: 'spring', damping: 14 }} style={{ transformOrigin: 'top' }}>
                  <span className="stk s1">{['🐱', '🌸', '⭐'][ticket.style]}</span><span className="stk s2">{['🎀', '🐶', '💗'][ticket.style]}</span>
                  <small>~ your fortune ~</small><p>{ticket.text}</p><small>No. {String(ticket.id + 1).padStart(2, '0')} / 12 ✿</small>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
        <Btn big onClick={reveal} disabled={busy || done}>{done ? 'ALL 3 FORTUNES USED' : <>REVEAL MY FORTUNE <Sparkles size={20} /></>}</Btn>
        <p className="count">Fortunes left: {3 - count}</p>
        <div className="catzone">
          <AnimatePresence>{catSay && <motion.div key={catSay + count} className="bubble" initial={{ opacity: 0, scale: 0.6 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}>{catSay}</motion.div>}</AnimatePresence>
          <motion.div key={'k' + count} animate={{ y: count ? [0, -18, 0, -10, 0] : 0 }}><Pikachu size={84} /></motion.div>
        </div>
        {done && !busy && ticket && <motion.p className="break" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2 }}>Even the fortune machine needs a little break! Go enjoy your birthday! 🐱</motion.p>}
        <p className="sub">Okay, enough predictions. One last surprise awaits…</p>
        <Btn big onClick={() => go(3)}>ONE LAST SURPRISE <ArrowRight size={20} /></Btn>
      </div>
      {boom > 0 && <Confetti key={boom} n={60} burst />}
    </section>
  )
}

/* ---------------- PAGE 4 ---------------- */
const LETTER = [
  'Dear Mridhula,', 'Happiest Birthday!! 🎂',
  'Hope this year brings you endless happiness, exciting adventures, good health and countless reasons to smile.',
  'May you achieve everything you’re working towards, make beautiful memories and have the best time doing all the things you love.',
  'Keep being your wonderful self, enjoy your special day to the fullest, and don’t forget to save me some cake!',
  'Have an amazing birthday! 🌷', '— From a friend',
]
export function Finale({ go }) {
  const reduce = useReducedMotion()
  const [step, setStep] = useState(0) // 0 closed, 1 opening, 2 card
  const open = () => {
    if (step) return
    setStep(1); sfx('open')
    setTimeout(() => setStep(2), reduce ? 400 : 2600)
  }
  return (
    <section className="page p4">
      <Floaters n={16} seed={11} />{step === 0 && <Back go={go} to={2} />}
      {step === 2 && <><Confetti n={50} /><Confetti key="b" n={90} burst /></>}
      <div className="center">
        <AnimatePresence mode="wait">
          {step < 2 ? (
            <motion.div key="env" className="stage" exit={{ opacity: 0, y: 60, scale: 0.8 }} transition={{ duration: 0.6 }}>
              <h2 className="title sm">WAIT… THERE’S ONE LAST THING FOR YOU.</h2>
              <div className="envwrap">
                <div className="env">
                  <div className="eback" />
                  <motion.div className="paper" animate={{ y: step ? '-62%' : '0%' }} transition={{ delay: step ? 1 : 0, duration: 1, ease: 'easeOut' }}><span className="script">Mridhula 🎀</span></motion.div>
                  <div className="efront" />
                  <motion.div className="eflap" animate={{ rotateX: step ? 180 : 0, zIndex: step ? 1 : 4 }} transition={{ rotateX: { delay: 0.35, duration: 0.9 }, zIndex: { delay: step ? 0.75 : 0, duration: 0 } }} />
                  <AnimatePresence>{!step && <motion.button className="seal" onClick={open} aria-label="Pop the heart seal" exit={{ scale: 2.2, opacity: 0, rotate: 25 }} transition={{ duration: 0.35 }} whileHover={{ scale: 1.15 }}><Heart size={34} color="#ff4f8b" /></motion.button>}</AnimatePresence>
                  {[0, 1, 2, 3, 4].map((i) => <span key={i} className="spk" style={{ left: [-8, 96, 40, 8, 80][i] + '%', top: [0, 10, -14, 90, 96][i] + '%', animationDelay: i * 0.4 + 's' }}>✨</span>)}
                </div>
                <Espeon className="envcat" size={92} />
              </div>
              <p className="sub">Open your birthday card 💗</p>
              <Btn big onClick={open} disabled={step > 0}>OPEN YOUR CARD ✨</Btn>
            </motion.div>
          ) : (
            <motion.div key="card" className="stage" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <motion.article className="letter" initial={{ rotateX: -80, scale: 0.7, opacity: 0, y: 80 }} animate={{ rotateX: 0, scale: 1, opacity: 1, y: 0 }} transition={{ type: 'spring', damping: 16, stiffness: 70 }} style={{ transformOrigin: 'top', perspective: 1000 }}>
                <Bow className="lbow" size={64} /><Flower className="lfl" size={38} color="#d9c2ff" />
                {LETTER.map((l, i) => <motion.p key={i} className={i === 0 ? 'lh' : i === LETTER.length - 1 ? 'ls' : ''} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 + i * 0.5 }}>{l}</motion.p>)}
              </motion.article>
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 + LETTER.length * 0.5 }} className="row">
                <Alien size={76} /><Btn big onClick={() => go(0)}>REPLAY THE SURPRISE <RotateCcw size={18} /></Btn><Mew size={76} />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}
