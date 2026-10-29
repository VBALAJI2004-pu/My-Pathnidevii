// TeddyCharacters.jsx — SVG Teddy Bear characters with animations
import { motion } from 'framer-motion';

// Boy teddy — warm brown tones
export function BoyTeddy({ style, className, expression = 'happy', scale = 1, holding = null }) {
  const eyeStyle = {
    happy: { rx: 4, ry: 3 },
    shy: { rx: 3, ry: 2 },
    love: { rx: 4, ry: 4 },
  }[expression] || { rx: 4, ry: 3 };

  return (
    <motion.div style={{ ...style, transform: `scale(${scale})`, transformOrigin: 'bottom center' }} className={className}>
      <svg viewBox="0 0 120 150" width="120" height="150" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        {/* Ears */}
        <ellipse cx="28" cy="35" rx="16" ry="16" fill="#a0704a" />
        <ellipse cx="28" cy="35" rx="9" ry="9" fill="#c99a72" />
        <ellipse cx="92" cy="35" rx="16" ry="16" fill="#a0704a" />
        <ellipse cx="92" cy="35" rx="9" ry="9" fill="#c99a72" />
        {/* Head */}
        <ellipse cx="60" cy="52" rx="40" ry="38" fill="#b8804e" />
        {/* Face shadow */}
        <ellipse cx="60" cy="62" rx="32" ry="28" fill="#c99a72" opacity="0.5" />
        {/* Eyes */}
        <ellipse cx="46" cy="48" rx={eyeStyle.rx} ry={eyeStyle.ry} fill="#2d1a0e" />
        <ellipse cx="74" cy="48" rx={eyeStyle.rx} ry={eyeStyle.ry} fill="#2d1a0e" />
        {/* Eye shines */}
        <ellipse cx="48" cy="46" rx="1.5" ry="1.5" fill="white" />
        <ellipse cx="76" cy="46" rx="1.5" ry="1.5" fill="white" />
        {/* Nose */}
        <ellipse cx="60" cy="58" rx="6" ry="4" fill="#2d1a0e" />
        {/* Smile / Blush */}
        {expression === 'happy' && (
          <path d="M 50 66 Q 60 74 70 66" stroke="#2d1a0e" strokeWidth="2" fill="none" strokeLinecap="round" />
        )}
        {expression === 'shy' && (
          <path d="M 52 66 Q 60 70 68 66" stroke="#2d1a0e" strokeWidth="2" fill="none" strokeLinecap="round" />
        )}
        {expression === 'love' && (
          <>
            <path d="M 50 66 Q 60 76 70 66" stroke="#2d1a0e" strokeWidth="2" fill="none" strokeLinecap="round" />
            <text x="38" y="60" fontSize="8" fill="#e8a6b7">♥</text>
            <text x="72" y="60" fontSize="8" fill="#e8a6b7">♥</text>
          </>
        )}
        {/* Blush */}
        {(expression === 'shy' || expression === 'love') && (
          <>
            <ellipse cx="38" cy="56" rx="8" ry="5" fill="#e8a6b7" opacity="0.5" />
            <ellipse cx="82" cy="56" rx="8" ry="5" fill="#e8a6b7" opacity="0.5" />
          </>
        )}
        {/* Body */}
        <ellipse cx="60" cy="115" rx="32" ry="35" fill="#b8804e" />
        {/* Tummy */}
        <ellipse cx="60" cy="118" rx="18" ry="20" fill="#c99a72" />
        {/* Arms */}
        <ellipse cx="22" cy="110" rx="13" ry="10" fill="#b8804e" transform="rotate(-20 22 110)" />
        <ellipse cx="98" cy="110" rx="13" ry="10" fill="#b8804e" transform="rotate(20 98 110)" />
        {/* Paws */}
        <ellipse cx="15" cy="118" rx="10" ry="8" fill="#a0704a" />
        <ellipse cx="105" cy="118" rx="10" ry="8" fill="#a0704a" />
        {/* Bow tie */}
        <path d="M 52 90 L 45 85 L 52 80 L 60 85 L 68 80 L 75 85 L 68 90 L 60 85 Z" fill="#D8B56A" />
        {/* Holding heart */}
        {holding === 'heart' && (
          <g transform="translate(90, 95)">
            <motion.g
              animate={{ scale: [1, 1.1, 1], rotate: [-5, 5, -5] }}
              transition={{ repeat: Infinity, duration: 2 }}
            >
              <path d="M 0,-8 C 0,-12 -6,-16 -12,-10 C -18,-4 -12,4 0,12 C 12,4 18,-4 12,-10 C 6,-16 0,-12 0,-8 Z" fill="#e8a6b7" />
            </motion.g>
          </g>
        )}
        {/* Legs */}
        <ellipse cx="44" cy="145" rx="13" ry="9" fill="#a0704a" />
        <ellipse cx="76" cy="145" rx="13" ry="9" fill="#a0704a" />
      </svg>
    </motion.div>
  );
}

// Girl teddy — softer pink-brown tones with bow
export function GirlTeddy({ style, className, expression = 'happy', scale = 1 }) {
  return (
    <motion.div style={{ ...style, transform: `scale(${scale})`, transformOrigin: 'bottom center' }} className={className}>
      <svg viewBox="0 0 120 160" width="120" height="160" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        {/* Ears */}
        <ellipse cx="28" cy="35" rx="16" ry="16" fill="#9e6b4e" />
        <ellipse cx="28" cy="35" rx="9" ry="9" fill="#d4a882" />
        <ellipse cx="92" cy="35" rx="16" ry="16" fill="#9e6b4e" />
        <ellipse cx="92" cy="35" rx="9" ry="9" fill="#d4a882" />
        {/* Head */}
        <ellipse cx="60" cy="52" rx="40" ry="38" fill="#b8804e" />
        <ellipse cx="60" cy="62" rx="32" ry="28" fill="#d4a882" opacity="0.45" />
        {/* Big bow on head */}
        <path d="M 50,16 L 38,8 L 50,4 L 60,12 L 70,4 L 82,8 L 70,16 L 60,10 Z" fill="#e8a6b7" />
        <ellipse cx="60" cy="12" rx="7" ry="6" fill="#f0c0d0" />
        {/* Eyes — slightly larger, more expressive */}
        <ellipse cx="46" cy="48" rx="5" ry="4" fill="#2d1a0e" />
        <ellipse cx="74" cy="48" rx="5" ry="4" fill="#2d1a0e" />
        <ellipse cx="48" cy="46" rx="1.8" ry="1.8" fill="white" />
        <ellipse cx="76" cy="46" rx="1.8" ry="1.8" fill="white" />
        {/* Eyelashes */}
        <line x1="42" y1="44" x2="40" y2="41" stroke="#2d1a0e" strokeWidth="1.2" />
        <line x1="46" y1="43" x2="45" y2="40" stroke="#2d1a0e" strokeWidth="1.2" />
        <line x1="50" y1="44" x2="52" y2="41" stroke="#2d1a0e" strokeWidth="1.2" />
        <line x1="70" y1="44" x2="68" y2="41" stroke="#2d1a0e" strokeWidth="1.2" />
        <line x1="74" y1="43" x2="75" y2="40" stroke="#2d1a0e" strokeWidth="1.2" />
        <line x1="78" y1="44" x2="80" y2="41" stroke="#2d1a0e" strokeWidth="1.2" />
        {/* Nose */}
        <ellipse cx="60" cy="58" rx="5" ry="3.5" fill="#2d1a0e" />
        {/* Smile */}
        {expression === 'happy' && (
          <path d="M 50 67 Q 60 76 70 67" stroke="#2d1a0e" strokeWidth="2" fill="none" strokeLinecap="round" />
        )}
        {expression === 'love' && (
          <>
            <path d="M 50 67 Q 60 78 70 67" stroke="#2d1a0e" strokeWidth="2" fill="none" strokeLinecap="round" />
            <text x="36" y="62" fontSize="8" fill="#e8a6b7">♥</text>
            <text x="73" y="62" fontSize="8" fill="#e8a6b7">♥</text>
          </>
        )}
        {/* Blush */}
        <ellipse cx="37" cy="56" rx="9" ry="6" fill="#e8a6b7" opacity="0.5" />
        <ellipse cx="83" cy="56" rx="9" ry="6" fill="#e8a6b7" opacity="0.5" />
        {/* Body */}
        <ellipse cx="60" cy="118" rx="32" ry="35" fill="#b8804e" />
        {/* Dress overlay */}
        <path d="M 28 100 Q 28 135 30 148 L 90 148 Q 92 135 92 100 Q 80 108 60 108 Q 40 108 28 100 Z" fill="#e8a6b7" opacity="0.7" />
        {/* Tummy */}
        <ellipse cx="60" cy="118" rx="18" ry="20" fill="#d4a882" opacity="0.6" />
        {/* Arms */}
        <ellipse cx="22" cy="112" rx="13" ry="10" fill="#b8804e" transform="rotate(-20 22 112)" />
        <ellipse cx="98" cy="112" rx="13" ry="10" fill="#b8804e" transform="rotate(20 98 112)" />
        <ellipse cx="14" cy="120" rx="10" ry="8" fill="#9e6b4e" />
        <ellipse cx="106" cy="120" rx="10" ry="8" fill="#9e6b4e" />
        {/* Legs */}
        <ellipse cx="44" cy="148" rx="13" ry="9" fill="#9e6b4e" />
        <ellipse cx="76" cy="148" rx="13" ry="9" fill="#9e6b4e" />
      </svg>
    </motion.div>
  );
}

// Hugging pose — combined SVG
export function HuggingTeddies({ scale = 1, style }) {
  return (
    <div style={{ ...style, transform: `scale(${scale})`, transformOrigin: 'bottom center', display: 'inline-block' }}>
      <svg viewBox="0 0 200 160" width="220" height="175" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        {/* Boy — left */}
        <g transform="translate(-10, 10)">
          {/* Ear */}
          <ellipse cx="22" cy="30" rx="13" ry="13" fill="#a0704a" />
          <ellipse cx="22" cy="30" rx="7" ry="7" fill="#c99a72" />
          <ellipse cx="70" cy="25" rx="13" ry="13" fill="#a0704a" />
          <ellipse cx="70" cy="25" rx="7" ry="7" fill="#c99a72" />
          {/* Head */}
          <ellipse cx="46" cy="44" rx="34" ry="32" fill="#b8804e" />
          <ellipse cx="46" cy="52" rx="26" ry="22" fill="#c99a72" opacity="0.45" />
          <ellipse cx="34" cy="42" rx="4" ry="3" fill="#2d1a0e" />
          <ellipse cx="58" cy="42" rx="4" ry="3" fill="#2d1a0e" />
          <ellipse cx="35.5" cy="40.5" rx="1.2" ry="1.2" fill="white" />
          <ellipse cx="59.5" cy="40.5" rx="1.2" ry="1.2" fill="white" />
          <ellipse cx="46" cy="52" rx="5" ry="3.5" fill="#2d1a0e" />
          <path d="M 38 60 Q 46 68 54 60" stroke="#2d1a0e" strokeWidth="1.8" fill="none" strokeLinecap="round" />
          <ellipse cx="28" cy="50" rx="7" ry="5" fill="#e8a6b7" opacity="0.45" />
          <ellipse cx="64" cy="50" rx="7" ry="5" fill="#e8a6b7" opacity="0.45" />
          {/* Body */}
          <ellipse cx="46" cy="108" rx="28" ry="30" fill="#b8804e" />
          <ellipse cx="46" cy="112" rx="16" ry="17" fill="#c99a72" />
          {/* Arm hugging right */}
          <path d="M 68 95 Q 90 85 105 95 Q 110 105 100 115" stroke="#b8804e" strokeWidth="16" fill="none" strokeLinecap="round" />
        </g>

        {/* Girl — right */}
        <g transform="translate(60, 0)">
          {/* Bow */}
          <path d="M 52,14 L 42,7 L 52,3 L 60,10 L 68,3 L 78,7 L 68,14 L 60,8 Z" fill="#e8a6b7" />
          <ellipse cx="60" cy="10" rx="6" ry="5" fill="#f0c0d0" />
          {/* Ear */}
          <ellipse cx="32" cy="32" rx="13" ry="13" fill="#9e6b4e" />
          <ellipse cx="32" cy="32" rx="7" ry="7" fill="#d4a882" />
          <ellipse cx="82" cy="32" rx="13" ry="13" fill="#9e6b4e" />
          <ellipse cx="82" cy="32" rx="7" ry="7" fill="#d4a882" />
          {/* Head */}
          <ellipse cx="57" cy="46" rx="34" ry="32" fill="#b8804e" />
          <ellipse cx="57" cy="54" rx="26" ry="22" fill="#d4a882" opacity="0.42" />
          <ellipse cx="45" cy="43" rx="4.5" ry="3.5" fill="#2d1a0e" />
          <ellipse cx="69" cy="43" rx="4.5" ry="3.5" fill="#2d1a0e" />
          <ellipse cx="46.5" cy="41.5" rx="1.4" ry="1.4" fill="white" />
          <ellipse cx="70.5" cy="41.5" rx="1.4" ry="1.4" fill="white" />
          <ellipse cx="57" cy="53" rx="4.5" ry="3" fill="#2d1a0e" />
          <path d="M 48 62 Q 57 70 66 62" stroke="#2d1a0e" strokeWidth="1.8" fill="none" strokeLinecap="round" />
          <ellipse cx="37" cy="52" rx="8" ry="5" fill="#e8a6b7" opacity="0.5" />
          <ellipse cx="77" cy="52" rx="8" ry="5" fill="#e8a6b7" opacity="0.5" />
          {/* Body */}
          <ellipse cx="57" cy="112" rx="28" ry="30" fill="#b8804e" />
          <path d="M 30 98 Q 29 132 31 148 L 83 148 Q 85 132 84 98 Q 72 106 57 106 Q 42 106 30 98 Z" fill="#e8a6b7" opacity="0.7" />
          {/* Arm hugging left */}
          <path d="M 34 95 Q 12 85 -5 95 Q -10 105 0 115" stroke="#b8804e" strokeWidth="16" fill="none" strokeLinecap="round" />
        </g>

        {/* Shared floating hearts */}
        <motion.text x="88" y="45" fontSize="16" fill="#e8a6b7"
          animate={{ y: [45, 35, 45], opacity: [0.8, 1, 0.8], scale: [1, 1.2, 1] }}
          transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
        >❤️</motion.text>
        <motion.text x="78" y="30" fontSize="11" fill="#D8B56A"
          animate={{ y: [30, 20, 30], opacity: [0.5, 0.9, 0.5] }}
          transition={{ repeat: Infinity, duration: 2.5, delay: 0.5 }}
        >✨</motion.text>
        <motion.text x="100" y="30" fontSize="11" fill="#D8B56A"
          animate={{ y: [30, 20, 30], opacity: [0.5, 0.9, 0.5] }}
          transition={{ repeat: Infinity, duration: 2.5, delay: 1 }}
        >✨</motion.text>
      </svg>
    </div>
  );
}

// Older teddy couple (subtle distinction via poses/accessories)
export function OlderTeddies({ style, scale = 1 }) {
  return (
    <div style={{ ...style, transform: `scale(${scale})`, transformOrigin: 'bottom center', display: 'inline-block' }}>
      <svg viewBox="0 0 200 170" width="220" height="185" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        {/* Bench */}
        <rect x="20" y="145" width="160" height="10" rx="5" fill="#8B5E3C" />
        <rect x="35" y="148" width="8" height="20" rx="3" fill="#6B4226" />
        <rect x="157" y="148" width="8" height="20" rx="3" fill="#6B4226" />

        {/* Boy — left, slightly greyer */}
        <g>
          <ellipse cx="38" cy="38" rx="13" ry="13" fill="#8a6040" />
          <ellipse cx="38" cy="38" rx="7" ry="7" fill="#b08868" />
          <ellipse cx="82" cy="32" rx="13" ry="13" fill="#8a6040" />
          <ellipse cx="82" cy="32" rx="7" ry="7" fill="#b08868" />
          <ellipse cx="60" cy="52" rx="34" ry="30" fill="#9e7050" />
          <ellipse cx="60" cy="60" rx="27" ry="22" fill="#b08868" opacity="0.4" />
          {/* Glasses */}
          <circle cx="48" cy="48" r="8" fill="none" stroke="#D8B56A" strokeWidth="1.5" />
          <circle cx="72" cy="48" r="8" fill="none" stroke="#D8B56A" strokeWidth="1.5" />
          <line x1="56" y1="48" x2="64" y2="48" stroke="#D8B56A" strokeWidth="1.5" />
          <ellipse cx="48" cy="48" rx="4" ry="3" fill="#2d1a0e" />
          <ellipse cx="72" cy="48" rx="4" ry="3" fill="#2d1a0e" />
          <ellipse cx="49.5" cy="46.5" rx="1.2" ry="1.2" fill="white" />
          <ellipse cx="73.5" cy="46.5" rx="1.2" ry="1.2" fill="white" />
          <ellipse cx="60" cy="58" rx="5" ry="3.5" fill="#2d1a0e" />
          <path d="M 50 67 Q 60 74 70 67" stroke="#2d1a0e" strokeWidth="1.8" fill="none" strokeLinecap="round" />
          <ellipse cx="60" cy="110" rx="27" ry="30" fill="#9e7050" />
          <ellipse cx="60" cy="114" rx="15" ry="16" fill="#b08868" />
          {/* Hand holding */}
          <ellipse cx="85" cy="118" rx="10" ry="7" fill="#8a6040" transform="rotate(10 85 118)" />
        </g>

        {/* Girl — right */}
        <g transform="translate(80, -5)">
          {/* Small bow */}
          <path d="M 40,14 L 32,8 L 40,4 L 48,10 L 56,4 L 64,8 L 56,14 L 48,8 Z" fill="#e8a6b7" opacity="0.9" />
          <ellipse cx="48" cy="10" rx="5" ry="4.5" fill="#f0c0d0" />
          <ellipse cx="26" cy="36" rx="13" ry="13" fill="#8a6040" />
          <ellipse cx="26" cy="36" rx="7" ry="7" fill="#c4927a" />
          <ellipse cx="70" cy="30" rx="13" ry="13" fill="#8a6040" />
          <ellipse cx="70" cy="30" rx="7" ry="7" fill="#c4927a" />
          <ellipse cx="48" cy="50" rx="32" ry="30" fill="#9e7050" />
          <ellipse cx="48" cy="58" rx="25" ry="22" fill="#c4927a" opacity="0.4" />
          <ellipse cx="36" cy="46" rx="4.5" ry="3.5" fill="#2d1a0e" />
          <ellipse cx="60" cy="46" rx="4.5" ry="3.5" fill="#2d1a0e" />
          <ellipse cx="37.5" cy="44.5" rx="1.4" ry="1.4" fill="white" />
          <ellipse cx="61.5" cy="44.5" rx="1.4" ry="1.4" fill="white" />
          <ellipse cx="48" cy="56" rx="4.5" ry="3" fill="#2d1a0e" />
          <path d="M 38 64 Q 48 72 58 64" stroke="#2d1a0e" strokeWidth="1.8" fill="none" strokeLinecap="round" />
          <ellipse cx="28" cy="54" rx="7" ry="5" fill="#e8a6b7" opacity="0.5" />
          <ellipse cx="68" cy="54" rx="7" ry="5" fill="#e8a6b7" opacity="0.5" />
          <ellipse cx="48" cy="110" rx="27" ry="30" fill="#9e7050" />
          <path d="M 22 96 Q 21 130 23 146 L 73 146 Q 75 130 74 96 Q 62 104 48 104 Q 34 104 22 96 Z" fill="#e8a6b7" opacity="0.6" />
          {/* Hand holding */}
          <ellipse cx="20" cy="116" rx="10" ry="7" fill="#8a6040" transform="rotate(-10 20 116)" />
        </g>

        {/* Clasped hands in middle */}
        <ellipse cx="100" cy="130" rx="10" ry="7" fill="#a07850" />
        <ellipse cx="112" cy="130" rx="10" ry="7" fill="#9e7050" />

        {/* Heart above */}
        <motion.text x="90" y="22" fontSize="18" fill="#e8a6b7"
          animate={{ y: [22, 12, 22], opacity: [0.7, 1, 0.7] }}
          transition={{ repeat: Infinity, duration: 3 }}
        >❤️</motion.text>
      </svg>
    </div>
  );
}
