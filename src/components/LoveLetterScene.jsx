// LoveLetterScene.jsx
// ──────────────────────────────────────────────────────────────
// Full-screen letter experience with cinematic line-by-line reveal.
// ──────────────────────────────────────────────────────────────
import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { loveLetter } from '../content/storyContent';

// ── How long (ms) each paragraph stays before the next auto-reveals ──────────
// Shorter paragraphs get less time; longer ones get more.
const BASE_DELAY = 4200;   // minimum ms between auto-reveals
const MS_PER_CHAR = 22;    // extra ms per character so longer paras breathe

function paragraphDelay(text) {
  return Math.max(BASE_DELAY, text.length * MS_PER_CHAR);
}

// ── Animated candle ──────────────────────────────────────────────────────────
function Candle({ size = 44, style = {} }) {
  return (
    <div style={{ ...style, flexShrink: 0, pointerEvents: 'none' }} aria-hidden="true">
      <svg viewBox="0 0 44 100" width={size} height={size * 2.27} xmlns="http://www.w3.org/2000/svg">
        <defs>
          <radialGradient id="flameG" cx="50%" cy="72%">
            <stop offset="0%"   stopColor="#fff9c0" />
            <stop offset="38%"  stopColor="#D8B56A" />
            <stop offset="78%"  stopColor="#c04820" stopOpacity="0.4" />
            <stop offset="100%" stopColor="transparent" />
          </radialGradient>
        </defs>
        {/* Halo */}
        <motion.ellipse cx="22" cy="22" rx="20" ry="20" fill="#D8B56A" opacity="0.09"
          animate={{ opacity: [0.06, 0.17, 0.06], scale: [1, 1.22, 1] }}
          style={{ transformOrigin: '22px 22px' }}
          transition={{ repeat: Infinity, duration: 2.4, ease: 'easeInOut' }} />
        {/* Flame */}
        <motion.path
          d="M22 32 C22 32 10 24 12 11 C13 4 22 2 22 2 C22 2 31 4 32 11 C34 24 22 32 22 32Z"
          fill="url(#flameG)"
          animate={{ scaleX: [1, 1.14, 0.88, 1.06, 1], scaleY: [1, 0.94, 1.12, 0.96, 1] }}
          style={{ transformOrigin: '22px 32px' }}
          transition={{ repeat: Infinity, duration: 1.7, ease: 'easeInOut' }} />
        {/* Wick */}
        <line x1="22" y1="32" x2="22" y2="40" stroke="#1a0a0e" strokeWidth="2.5" strokeLinecap="round" />
        {/* Wax */}
        <rect x="14" y="38" width="16" height="58" rx="5" fill="#FFF8F0" />
        <rect x="14" y="38" width="16" height="16" rx="5" fill="#f0e0c0" />
        {/* Drip */}
        <ellipse cx="18" cy="55" rx="4" ry="8" fill="#fff0e0" opacity="0.55" />
      </svg>
    </div>
  );
}

// ── Ambient floating flower petals ───────────────────────────────────────────
function AmbientPetals() {
  const petals = Array.from({ length: 10 }, (_, i) => ({
    id: i,
    x: 5 + i * 10 + Math.random() * 5,
    delay: i * 2.2,
    dur: 14 + Math.random() * 8,
    drift: (Math.random() - 0.5) * 60,
    sym: i % 3 === 0 ? '🌹' : i % 3 === 1 ? '🌸' : '🌺',
    sz: 0.6 + Math.random() * 0.5,
  }));
  return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none', zIndex: 1 }} aria-hidden="true">
      {petals.map(p => (
        <motion.span key={p.id}
          style={{ position: 'absolute', top: '-30px', left: `${p.x}%`, fontSize: `${p.sz}rem`, opacity: 0 }}
          animate={{ y: ['0vh', '108vh'], x: [0, p.drift], opacity: [0, 0.35, 0.28, 0], rotate: [0, 360] }}
          transition={{ repeat: Infinity, duration: p.dur, delay: p.delay, ease: 'linear' }}>
          {p.sym}
        </motion.span>
      ))}
    </div>
  );
}

// ── Warm candlelight bloom ───────────────────────────────────────────────────
function CandlelightBloom() {
  return (
    <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 1 }} aria-hidden="true">
      <motion.div style={{
        position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)',
        width: '70vw', height: '40vh',
        background: 'radial-gradient(ellipse at 50% 0%, rgba(140,90,24,0.22) 0%, transparent 68%)',
      }}
        animate={{ opacity: [0.7, 1, 0.7] }}
        transition={{ repeat: Infinity, duration: 3.2, ease: 'easeInOut' }} />
    </div>
  );
}

// ── Main component ────────────────────────────────────────────────────────────
const TOTAL = loveLetter.paragraphs.length;

export default function LoveLetterScene({ onNext }) {
  const [revealedCount, setRevealedCount] = useState(0); // how many paras are visible
  const [isPaused,      setIsPaused]      = useState(false);
  const [allShown,      setAllShown]      = useState(false);
  const paperRef   = useRef(null);
  const timerRef   = useRef(null);
  const pausedRef  = useRef(false);

  // Keep pausedRef in sync
  useEffect(() => { pausedRef.current = isPaused; }, [isPaused]);

  // ── Auto-reveal engine ──
  const scheduleNext = useCallback((count) => {
    clearTimeout(timerRef.current);
    if (count >= TOTAL) {
      setAllShown(true);
      return;
    }
    const delay = paragraphDelay(loveLetter.paragraphs[count]);
    timerRef.current = setTimeout(() => {
      if (pausedRef.current) return; // paused — don't advance
      setRevealedCount(c => {
        const next = c + 1;
        scheduleNext(next);
        return next;
      });
    }, delay);
  }, []);

  // Start revealing on mount
  useEffect(() => {
    // Show first paragraph immediately, then schedule the rest
    setRevealedCount(1);
    scheduleNext(1);
    return () => clearTimeout(timerRef.current);
  }, [scheduleNext]);

  // Smooth-scroll to keep the latest paragraph in view
  useEffect(() => {
    if (!paperRef.current || revealedCount <= 2) return;
    const paper = paperRef.current;
    // Scroll to show last ~20% of current content
    setTimeout(() => {
      paper.scrollTo({ top: paper.scrollHeight, behavior: 'smooth' });
    }, 180);
  }, [revealedCount]);

  // ── User controls ──
  const handlePauseResume = useCallback(() => {
    setIsPaused(p => {
      const next = !p;
      if (!next && revealedCount < TOTAL) {
        // Resuming — schedule the next reveal
        const delay = paragraphDelay(loveLetter.paragraphs[revealedCount]);
        timerRef.current = setTimeout(() => {
          setRevealedCount(c => {
            const n = c + 1;
            scheduleNext(n);
            return n;
          });
        }, delay);
      }
      return next;
    });
  }, [revealedCount, scheduleNext]);

  const handleNext = useCallback(() => {
    clearTimeout(timerRef.current);
    if (revealedCount < TOTAL) {
      const next = revealedCount + 1;
      setRevealedCount(next);
      scheduleNext(next);
    }
  }, [revealedCount, scheduleNext]);

  const handleShowAll = useCallback(() => {
    clearTimeout(timerRef.current);
    setRevealedCount(TOTAL);
    setAllShown(true);
    setIsPaused(false);
  }, []);

  const visibleParas = loveLetter.paragraphs.slice(0, revealedCount);

  return (
    <div className="letter-scene" aria-label="Love letter">

      {/* ── Ambient layer ── */}
      <AmbientPetals />
      <CandlelightBloom />

      {/* ── TOP HEADER ── */}
      <header className="letter-header">
        <motion.p className="section-eyebrow"
          initial={{ opacity: 0 }} animate={{ opacity: 0.65 }} transition={{ duration: 1 }}>
          A Letter from My Heart
        </motion.p>
        <motion.h2
          style={{
            fontFamily: "'Dancing Script', cursive",
            fontSize: 'clamp(1.5rem, 3.5vw, 2.2rem)',
            color: '#D8B56A',
            textShadow: '0 0 28px rgba(216,181,106,0.3)',
            textAlign: 'center',
            lineHeight: 1.2,
          }}
          initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.9 }}>
          {loveLetter.title}
        </motion.h2>
      </header>

      {/* ── PAPER BODY ── */}
      <div className="letter-body">
        <div className="letter-paper-wrap">

          {/* Candle — top-right corner of paper wrap */}
          <motion.div style={{ position: 'absolute', top: '-44px', right: '16px', zIndex: 20 }}
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
            <Candle size={40} />
          </motion.div>
          <motion.div style={{ position: 'absolute', top: '-36px', left: '28px', zIndex: 20 }}
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7 }}>
            <Candle size={28} />
          </motion.div>

          <motion.div ref={paperRef} className="letter-paper"
            initial={{ y: 28, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1.2, ease: [0.4, 0, 0.2, 1] }}>

            {/* Decorative watermark */}
            <span className="letter-decor-mark" aria-hidden="true">❤</span>

            {/* Subtitle on paper */}
            <span className="letter-title" aria-hidden="true">— {loveLetter.title}</span>

            {/* Salutation */}
            <motion.span className="letter-salutation"
              initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.55, duration: 0.9 }}>
              {loveLetter.salutation}
            </motion.span>

            {/* Paragraphs — revealed one by one */}
            {visibleParas.map((para, i) => {
              const isCurrent = i === revealedCount - 1;
              const isLast = i === visibleParas.length - 1;
              return (
                <motion.p key={i} className="letter-para"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.95, ease: 'easeOut' }}>
                  {para}
                  {/* Writing cursor on the currently-revealing paragraph */}
                  {isCurrent && !allShown && isLast && (
                    <span className="pen-indicator" aria-hidden="true">✒️</span>
                  )}
                </motion.p>
              );
            })}

            {/* Closing — shows only after all paragraphs revealed */}
            <AnimatePresence>
              {allShown && (
                <motion.span className="letter-closing"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 1.1 }}>
                  {loveLetter.closing}
                </motion.span>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Progress dots */}
          <motion.div className="letter-progress"
            style={{ marginTop: '10px', alignSelf: 'center' }}
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }}>
            {loveLetter.paragraphs.map((_, i) => {
              let cls = 'letter-progress-dot';
              if (i < revealedCount - 1) cls += ' revealed';
              else if (i === revealedCount - 1) cls += ' current';
              return <div key={i} className={cls} aria-hidden="true" />;
            })}
          </motion.div>
        </div>
      </div>

      {/* ── FOOTER CONTROLS ── */}
      <footer className="letter-footer">
        {/* While still revealing */}
        {!allShown && (
          <div style={{ display: 'flex', gap: '12px', alignItems: 'center', flexWrap: 'wrap', justifyContent: 'center' }}>

            {/* Pause / Resume */}
            <motion.button
              onClick={handlePauseResume}
              id="letter-pause-btn"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2 }}
              style={{
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(255,255,255,0.12)',
                color: 'rgba(255,255,255,0.5)',
                padding: '10px 24px',
                borderRadius: '24px',
                fontFamily: "'Lato', sans-serif",
                fontSize: '0.78rem',
                letterSpacing: '0.08em',
                cursor: 'pointer',
                backdropFilter: 'blur(10px)',
                transition: 'all 0.3s ease',
              }}>
              {isPaused ? '▶ Continue reading' : '⏸ Pause'}
            </motion.button>

            {/* Next paragraph immediately */}
            {!isPaused && revealedCount < TOTAL && (
              <motion.button
                onClick={handleNext}
                id="letter-next-para-btn"
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.4 }}
                style={{
                  background: 'rgba(216,181,106,0.07)',
                  border: '1px solid rgba(216,181,106,0.22)',
                  color: 'rgba(216,181,106,0.7)',
                  padding: '10px 24px',
                  borderRadius: '24px',
                  fontFamily: "'Lato', sans-serif",
                  fontSize: '0.78rem',
                  letterSpacing: '0.08em',
                  cursor: 'pointer',
                  backdropFilter: 'blur(10px)',
                  transition: 'all 0.3s ease',
                }}>
                Next →
              </motion.button>
            )}

            {/* Skip to full letter */}
            {revealedCount >= 4 && (
              <motion.button
                onClick={handleShowAll}
                id="letter-skip-btn"
                initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                style={{
                  background: 'transparent',
                  border: 'none',
                  color: 'rgba(255,255,255,0.2)',
                  fontFamily: "'Lato', sans-serif",
                  fontSize: '0.72rem',
                  letterSpacing: '0.08em',
                  cursor: 'pointer',
                  textDecoration: 'underline',
                  textUnderlineOffset: '3px',
                }}>
                Show full letter
              </motion.button>
            )}
          </div>
        )}

        {/* Once all paragraphs shown → Continue button */}
        <AnimatePresence>
          {allShown && (
            <motion.div
              initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.9 }}>
              <button className="btn-primary" onClick={onNext} id="letter-continue-btn">
                One final message… ❤️
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </footer>
    </div>
  );
}
