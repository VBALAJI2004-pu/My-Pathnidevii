// PhotoMemoriesScene.jsx — Full-screen with larger photo frames
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { photos } from '../content/storyContent';

function PhotoPlaceholder({ index }) {
  return (
    <div className="photo-placeholder" aria-label={`Place shalu-0${index + 1}.jpg here`}>
      <div className="photo-placeholder-icon">📷</div>
      <p className="photo-placeholder-text">
        Place{' '}
        <code style={{ fontFamily: 'monospace', fontSize: '0.82em', background: 'rgba(255,255,255,0.1)', padding: '2px 7px', borderRadius: '4px' }}>
          public/images/shalu-0{index + 1}.jpg
        </code>
        {' '}here to reveal the magic. ❤️
      </p>
    </div>
  );
}

function PhotoFrame({ photo, index }) {
  const [imgError, setImgError] = useState(false);
  return (
    <motion.div className="photo-frame-outer"
      initial={{ opacity: 0, scale: 0.91, y: 24 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.94, y: -16 }}
      transition={{ duration: 0.9, ease: [0.4, 0, 0.2, 1] }}>
      {/* Gold corner ornaments */}
      <div className="photo-corner tl" />
      <div className="photo-corner tr" />
      <div className="photo-corner bl" />
      <div className="photo-corner br" />
      <div className="photo-frame-mat">
        <div className="photo-frame-inner">
          {!imgError ? (
            <img src={photo.src} alt={photo.alt} className="photo-img"
              onError={() => setImgError(true)} loading="eager" draggable="false" />
          ) : (
            <PhotoPlaceholder index={index} />
          )}
        </div>
      </div>
      {/* Handwritten stamp */}
      <motion.span aria-hidden="true"
        style={{
          position: 'absolute', bottom: '24px', right: '30px',
          fontFamily: "'Dancing Script', cursive", fontSize: '0.9rem',
          color: '#4a2030', opacity: 0.45, userSelect: 'none', zIndex: 4,
        }}
        initial={{ opacity: 0 }} animate={{ opacity: 0.45 }} transition={{ delay: 0.6 }}>
        my Monkuu ❤️
      </motion.span>
    </motion.div>
  );
}

export default function PhotoMemoriesScene({ onNext }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [swipeDir, setSwipeDir] = useState(1);

  const goTo = (idx) => {
    if (idx === currentIndex) return;
    setSwipeDir(idx > currentIndex ? 1 : -1);
    setCurrentIndex(idx);
  };

  const goNext = () => currentIndex < photos.length - 1 ? goTo(currentIndex + 1) : onNext();

  const photo = photos[currentIndex];

  return (
    <div className="photos-scene" aria-label="Photo memories">
      {/* Background accent */}
      <div aria-hidden="true" style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        background: 'radial-gradient(ellipse 62% 52% at 50% 38%, rgba(109,41,63,0.2) 0%, transparent 65%)',
      }} />

      <motion.p className="section-eyebrow" initial={{ opacity: 0 }} animate={{ opacity: 0.7 }}
        style={{ position: 'relative', zIndex: 5 }}>
        Memories I Treasure
      </motion.p>

      <motion.p
        style={{
          position: 'relative', zIndex: 5, marginBottom: '20px',
          fontFamily: "'Dancing Script', cursive",
          fontSize: 'clamp(1.5rem, 4vw, 2.2rem)',
          color: '#D8B56A',
          textShadow: '0 0 28px rgba(216,181,106,0.28)',
        }}
        initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.9 }}>
        My dear, how can someone be this cute?
      </motion.p>

      {/* Photo frame */}
      <div style={{ position: 'relative', zIndex: 5 }}>
        <AnimatePresence mode="wait" custom={swipeDir}>
          <PhotoFrame key={currentIndex} photo={photo} index={currentIndex} />
        </AnimatePresence>
      </div>

      {/* Caption */}
      <AnimatePresence mode="wait">
        <motion.p key={`caption-${currentIndex}`} className="photo-caption"
          style={{ marginTop: '28px', position: 'relative', zIndex: 5, maxWidth: '480px', padding: '0 16px' }}
          initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
          transition={{ duration: 0.7 }}>
          {photo.caption}
        </motion.p>
      </AnimatePresence>

      {/* Dot indicators */}
      <div className="photo-indicator" style={{ marginTop: '24px', position: 'relative', zIndex: 5 }}>
        {photos.map((_, i) => (
          <button key={i} className={`photo-dot ${i === currentIndex ? 'active' : ''}`}
            onClick={() => goTo(i)} aria-label={`View photo ${i + 1}`} id={`photo-dot-${i}`} />
        ))}
      </div>

      {/* Navigation */}
      <div style={{ display: 'flex', gap: '14px', marginTop: '28px', alignItems: 'center', position: 'relative', zIndex: 5 }}>
        {currentIndex > 0 && (
          <motion.button className="next-btn" onClick={() => goTo(currentIndex - 1)}
            style={{ fontSize: '0.88rem' }} initial={{ opacity: 0 }} animate={{ opacity: 1 }} id="photo-prev-btn">
            ← Previous
          </motion.button>
        )}
        <button className="next-btn" onClick={goNext} id="photo-next-btn"
          style={{ fontSize: currentIndex === photos.length - 1 ? '1.05rem' : '0.95rem' }}>
          {currentIndex < photos.length - 1 ? 'Next photo →' : 'The life I imagine with you →'}
        </button>
      </div>

      {/* Subtle file-path hint */}
      <motion.p aria-hidden="true"
        style={{
          position: 'absolute', bottom: '18px', left: '50%', transform: 'translateX(-50%)',
          fontFamily: "'Lato', sans-serif", fontSize: '0.6rem', color: 'rgba(255,255,255,0.16)',
          letterSpacing: '0.12em', textTransform: 'uppercase', whiteSpace: 'nowrap',
        }}
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2 }}>
        public/images/shalu-01.jpg · shalu-02.jpg · shalu-03.jpg
      </motion.p>
    </div>
  );
}
