// All audio is synthesised with the Web Audio API: no files, no licensing concerns.
let ctx, muted = false, timer = null
const AC = () => ctx || (ctx = new (window.AudioContext || window.webkitAudioContext)())
function tone(f, t = 0, d = 0.15, type = 'sine', v = 0.07) {
  if (muted) return
  try {
    const c = AC(), o = c.createOscillator(), g = c.createGain(), s = c.currentTime + t
    o.type = type; o.frequency.value = f
    g.gain.setValueAtTime(0, s); g.gain.linearRampToValueAtTime(v, s + 0.01)
    g.gain.exponentialRampToValueAtTime(0.0001, s + d)
    o.connect(g); g.connect(c.destination); o.start(s); o.stop(s + d + 0.05)
  } catch { /* audio unavailable */ }
}
const SFX = {
  click: () => { tone(880, 0, .1); tone(1320, .07, .12) },
  pop: () => { tone(300, 0, .12, 'triangle', .1); tone(900, .05, .1) },
  tick: () => tone(500 + Math.random() * 600, 0, .05, 'square', .03),
  ticket: () => [660, 880, 990, 1320].forEach((f, i) => tone(f, i * .08, .15)),
  open: () => [523, 659, 784, 1047, 1319].forEach((f, i) => tone(f, i * .1, .35, 'triangle')),
  meow: () => { tone(700, 0, .15, 'triangle', .08); tone(520, .12, .2, 'triangle', .08) },
}
export const sfx = (k) => SFX[k]?.()
export const setMuted = (m) => { muted = m }
const NOTES = [523, 587, 659, 784, 880, 784, 659, 587]
export function setMusic(on) {
  clearInterval(timer); timer = null
  if (!on) return
  let i = 0
  try { AC().resume() } catch { /* noop */ }
  timer = setInterval(() => { tone(NOTES[i % 8], 0, .6, 'triangle', .03); if (i % 4 === 0) tone(NOTES[i % 8] / 2, 0, .9, 'sine', .03); i++ }, 450)
}
