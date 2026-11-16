import cakeImg from '../assets/cake.png'
import ghostImg from '../assets/ghost.png'
import starImg from '../assets/star.png'
import chickImg from '../assets/chick.png'
import bananaImg from '../assets/bananacat.png'
import alienImg from '../assets/alien.png'
import mewImg from '../assets/mew.png'
import espeonImg from '../assets/espeon.png'
import pikachuImg from '../assets/pikachu.png'
// Original SVG illustrations (no external assets).
const S = '#e0a3bd'
export const Bow = ({ size = 40, color = '#ff8fb8', style, className = '' }) => (
  <svg viewBox="0 0 60 40" width={size} style={style} className={className} aria-hidden>
    <path d="M30 20 L4 4 Q-2 20 4 36Z" fill={color} stroke="#fff" strokeWidth="2" strokeLinejoin="round" />
    <path d="M30 20 L56 4 Q62 20 56 36Z" fill={color} stroke="#fff" strokeWidth="2" strokeLinejoin="round" />
    <circle cx="30" cy="20" r="6" fill={color} stroke="#fff" strokeWidth="2" />
  </svg>
)
export const Heart = ({ size = 24, color = '#ff6fa5' }) => (
  <svg viewBox="0 0 24 24" width={size} aria-hidden><path d="M12 21s-8-5.3-8-11a4.5 4.5 0 0 1 8-2.8A4.5 4.5 0 0 1 20 10c0 5.700-8 11-8 11z" fill={color} /></svg>
)
export const Star = ({ size = 30, color = '#ffe08a' }) => (
  <svg viewBox="0 0 24 24" width={size} aria-hidden><path d="M12 2l2.9 6.3 6.8.8-5 4.7 1.3 6.8L12 17.200 6 20.600l1.300-6.800-5-4.700 6.800-.8z" fill={color} stroke="#f3c969" strokeWidth="1" strokeLinejoin="round" /></svg>
)
export const Flower = ({ size = 34, color = '#ffb3d1' }) => (
  <svg viewBox="0 0 40 40" width={size} aria-hidden>
    {[0, 72, 144, 216, 288].map((r) => <ellipse key={r} cx="20" cy="9" rx="6" ry="8" fill={color} transform={`rotate(${r} 20 20)`} />)}
    <circle cx="20" cy="20" r="5" fill="#ffe08a" />
  </svg>
)
export const Butterfly = ({ size = 36 }) => (
  <svg viewBox="0 0 40 30" width={size} aria-hidden className="flap">
    <ellipse cx="11" cy="11" rx="9" ry="10" fill="#d9c2ff" /><ellipse cx="29" cy="11" rx="9" ry="10" fill="#d9c2ff" />
    <ellipse cx="13" cy="23" rx="6" ry="6" fill="#bfe3ff" /><ellipse cx="27" cy="23" rx="6" ry="6" fill="#bfe3ff" />
    <rect x="19" y="6" width="2" height="20" rx="1" fill="#8a6fb0" />
  </svg>
)
export const Balloon = ({ color = '#ffb3d1', size = 56 }) => (
  <svg viewBox="0 0 50 90" width={size} aria-hidden>
    <ellipse cx="25" cy="28" rx="20" ry="25" fill={color} /><ellipse cx="18" cy="18" rx="5" ry="8" fill="#fff" opacity=".5" />
    <path d="M22 52 h6 l-3 5z" fill={color} /><path d="M25 57 q-8 12 0 20 q6 6 0 12" stroke="#c9a7c0" strokeWidth="1.500" fill="none" />
  </svg>
)
// Sticker-style image sprites. `size` is the height in px; pixel art stays crisp.
const sprite = (src, alt = '', pixel = true) => ({ size = 100, className = '', style }) => (
  <img src={src} alt={alt} aria-hidden={!alt} height={size} draggable="false" className={`spr ${pixel ? 'px' : ''} ${className}`} style={{ height: size, width: 'auto', ...style }} />
)
export const Cake = sprite(cakeImg, 'Pixel birthday cake with candles')
export const Ghost = sprite(ghostImg)
export const StarPix = sprite(starImg)
export const Chick = sprite(chickImg)
export const BananaCat = sprite(bananaImg, '', false)
export const Alien = sprite(alienImg, '', false)
export const Mew = sprite(mewImg)
export const Espeon = sprite(espeonImg)
export const Pikachu = sprite(pikachuImg)
