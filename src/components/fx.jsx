import { useMemo } from 'react'
import { Heart, Star, Flower, Butterfly, Bow } from './art.jsx'
const COL = ['#ffb3d1', '#d9c2ff', '#bfe3ff', '#fff1c9', '#ff8fb8', '#ffffff']
export function Confetti({ n = 60, burst = false }) {
  const items = useMemo(() => Array.from({ length: n }, (_, i) => ({
    id: i, l: Math.random() * 100, d: Math.random() * (burst ? 0.3 : 6), t: (burst ? 1.8 : 5) + Math.random() * 3,
    c: COL[i % COL.length], w: 6 + Math.random() * 7, x: (Math.random() - 0.5) * (burst ? 520 : 0),
  })), [n, burst])
  return (
    <div className={'confetti' + (burst ? ' is-burst' : '')} aria-hidden>
      {items.map((p) => <i key={p.id} style={{ left: burst ? '50%' : p.l + '%', background: p.c, width: p.w, height: p.w * 1.5, animationDelay: p.d + 's', animationDuration: p.t + 's', '--x': p.x + 'px' }} />)}
    </div>
  )
}
const KINDS = [() => <Heart size={18} color="#ffb3d1" />, () => <Star size={20} />, () => <Flower size={26} />, () => <Butterfly size={28} />, () => <Bow size={28} color="#d9c2ff" />, () => <span style={{ fontSize: 22 }}>✨</span>]
export function Floaters({ n = 12, seed = 1 }) {
  const items = useMemo(() => Array.from({ length: n }, (_, i) => {
    const r = (k) => { const x = Math.sin((i + 1) * (k + seed) * 9301) * 10000; return x - Math.floor(x) }
    return { i, l: r(1) * 94, t: r(2) * 90, d: r(3) * 5, s: 5 + r(4) * 5 }
  }), [n, seed])
  return <div className="floaters" aria-hidden>{items.map((p) => { const K = KINDS[p.i % KINDS.length]; return <span key={p.i} style={{ left: p.l + '%', top: p.t + '%', animationDelay: p.d + 's', animationDuration: p.s + 's' }}><K /></span> })}</div>
}
