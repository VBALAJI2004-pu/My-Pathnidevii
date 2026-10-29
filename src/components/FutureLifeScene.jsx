// FutureLifeScene.jsx — "Our Journey Home" — full-screen, big house, big teddies
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { futureScenes, futureFinalLine } from '../content/storyContent';
import { BoyTeddy, GirlTeddy, HuggingTeddies, OlderTeddies } from './TeddyCharacters';

/* ====== BIG DREAM HOUSE SVG ====== */
function DreamHouse() {
  return (
    <div className="dream-house-container">
      <svg viewBox="0 0 820 460" width="100%" xmlns="http://www.w3.org/2000/svg"
        aria-label="A beautiful dream home at golden sunset" style={{ display: 'block' }}>
        <defs>
          <linearGradient id="skyG2" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#0e0410" />
            <stop offset="40%" stopColor="#4a1420" />
            <stop offset="72%" stopColor="#8B3040" />
            <stop offset="100%" stopColor="#b05028" stopOpacity="0.8" />
          </linearGradient>
          <radialGradient id="sunG2" cx="80%" cy="26%">
            <stop offset="0%" stopColor="#D8B56A" stopOpacity="0.9" />
            <stop offset="40%" stopColor="#c06030" stopOpacity="0.35" />
            <stop offset="100%" stopColor="transparent" />
          </radialGradient>
          <linearGradient id="wallG2" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#6B2A3A" />
            <stop offset="100%" stopColor="#4a1a28" />
          </linearGradient>
          <linearGradient id="roofG2" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#1e0810" />
            <stop offset="100%" stopColor="#3a1020" />
          </linearGradient>
          <linearGradient id="groundG2" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#162010" />
            <stop offset="100%" stopColor="#0c1408" />
          </linearGradient>
          <filter id="winGlow2">
            <feGaussianBlur stdDeviation="9" result="blur" />
            <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
          <filter id="houseGlow">
            <feGaussianBlur stdDeviation="18" result="blur" />
            <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
          <radialGradient id="vigG">
            <stop offset="0%" stopColor="transparent" />
            <stop offset="100%" stopColor="rgba(8,2,6,0.55)" />
          </radialGradient>
        </defs>

        {/* Sky */}
        <rect width="820" height="460" fill="url(#skyG2)" />

        {/* Sun halo */}
        <ellipse cx="656" cy="120" rx="140" ry="130" fill="url(#sunG2)" />
        <motion.circle cx="656" cy="120" r="30" fill="#D8B56A" opacity="0.8"
          animate={{ opacity: [0.7, 0.95, 0.7] }} transition={{ repeat: Infinity, duration: 4 }} />

        {/* Stars */}
        {[[45,36],[92,70],[140,24],[700,46],[750,28],[790,18],[30,62],[600,55],[680,38]].map(([x,y],i) => (
          <motion.circle key={i} cx={x} cy={y} r="2" fill="#D8B56A"
            animate={{ opacity: [0.2, 0.9, 0.2] }}
            transition={{ repeat: Infinity, duration: 2.8 + i * 0.35, delay: i * 0.28 }} />
        ))}

        {/* Clouds (soft) */}
        {[[100,60],[300,40],[500,55]].map(([x,y],i) => (
          <motion.ellipse key={`c${i}`} cx={x} cy={y} rx={45 + i*18} ry={16 + i*6}
            fill="rgba(180,120,100,0.08)"
            animate={{ x: [0, 18, 0] }} transition={{ repeat: Infinity, duration: 14 + i * 4, ease: 'easeInOut' }} />
        ))}

        {/* Ground */}
        <rect x="0" y="360" width="820" height="100" fill="url(#groundG2)" />
        <ellipse cx="410" cy="362" rx="430" ry="24" fill="#182810" opacity="0.75" />

        {/* Stone pathway */}
        <path d="M 360 460 Q 390 400 410 365 Q 430 400 460 460" fill="none" stroke="#1c2810" strokeWidth="52" opacity="0.7" />
        {[0,1,2,3,4,5].map(i => (
          <ellipse key={`p${i}`} cx={410 + (i%2===0?-8:8)} cy={385 + i*12} rx={20} ry={6} fill="#182210" opacity="0.6" />
        ))}

        {/* Far left trees */}
        <rect x="60" y="220" width="20" height="150" fill="#142210" rx="5" />
        <ellipse cx="70" cy="212" rx="44" ry="68" fill="#1a2e12" />
        <ellipse cx="70" cy="185" rx="34" ry="52" fill="#203818" />
        <ellipse cx="70" cy="162" rx="22" ry="36" fill="#264020" />

        {/* Far right trees */}
        <rect x="738" y="210" width="20" height="160" fill="#142210" rx="5" />
        <ellipse cx="748" cy="200" rx="48" ry="74" fill="#1a2e12" />
        <ellipse cx="748" cy="168" rx="36" ry="54" fill="#203818" />
        <ellipse cx="748" cy="140" rx="24" ry="40" fill="#264020" />

        {/* Mid-left trees */}
        <rect x="148" y="248" width="14" height="120" fill="#142210" rx="4" />
        <ellipse cx="155" cy="240" rx="32" ry="52" fill="#1e3015" />
        <ellipse cx="155" cy="218" rx="22" ry="38" fill="#243a1a" />

        {/* Mid-right trees */}
        <rect x="658" y="240" width="14" height="120" fill="#142210" rx="4" />
        <ellipse cx="665" cy="230" rx="32" ry="52" fill="#1e3015" />
        <ellipse cx="665" cy="208" rx="22" ry="38" fill="#243a1a" />

        {/* Bushes / hedges */}
        {[185,220,260,555,595,630].map((x,i) => (
          <ellipse key={`b${i}`} cx={x} cy={362} rx={26 + i*2} ry={17} fill="#243a18" opacity="0.9" />
        ))}

        {/* ===== MAIN HOUSE ===== */}

        {/* House soft glow */}
        <ellipse cx="410" cy="280" rx="260" ry="200" fill="rgba(216,181,106,0.04)" filter="url(#houseGlow)" />

        {/* Main wall */}
        <rect x="170" y="168" width="480" height="215" fill="url(#wallG2)" rx="4" />
        {/* Wall texture */}
        {Array.from({length:10}, (_,i) => (
          <line key={`wl${i}`} x1="170" y1={192 + i*22} x2="650" y2={192 + i*22} stroke="rgba(0,0,0,0.07)" strokeWidth="1" />
        ))}
        {/* Wall shadow left */}
        <rect x="170" y="168" width="22" height="215" fill="rgba(0,0,0,0.18)" />

        {/* Extended wing — left */}
        <rect x="110" y="210" width="70" height="173" fill="#5a2030" rx="2" />
        <line x1="110" y1="228" x2="180" y2="228" stroke="rgba(0,0,0,0.07)" strokeWidth="1" />
        <line x1="110" y1="248" x2="180" y2="248" stroke="rgba(0,0,0,0.07)" strokeWidth="1" />

        {/* Extended wing — right */}
        <rect x="640" y="210" width="70" height="173" fill="#5a2030" rx="2" />

        {/* Porch / veranda */}
        <rect x="300" y="300" width="220" height="88" fill="#5a2035" />
        <rect x="288" y="289" width="244" height="20" fill="#42182a" rx="2" />
        {/* Porch columns */}
        {[318, 372, 428, 482].map((x,i) => (
          <rect key={`col${i}`} x={x} y={295} width="14" height="93" fill="#321220" rx="3" />
        ))}
        {/* Porch railing */}
        <rect x="302" y="336" width="216" height="8" fill="#2a1018" rx="3" />
        {/* Porch floor */}
        <rect x="300" y="378" width="220" height="10" fill="#3a1828" />

        {/* Front door */}
        <rect x="382" y="316" width="56" height="72" fill="#160a0e" rx="4" />
        <rect x="390" y="324" width="18" height="30" fill="rgba(216,181,106,0.18)" rx="2" />
        <rect x="412" y="324" width="18" height="30" fill="rgba(216,181,106,0.18)" rx="2" />
        <circle cx="409" cy="360" r="4" fill="#D8B56A" />
        {/* Door arch */}
        <path d="M 382 318 Q 410 298 438 318" fill="#1e0c12" />
        <motion.path d="M 385 320 Q 410 302 435 320" fill="none" stroke="#D8B56A" strokeWidth="1.5" opacity="0.4"
          animate={{ opacity: [0.3, 0.6, 0.3] }} transition={{ repeat: Infinity, duration: 2.5 }} />

        {/* MAIN ROOF */}
        <polygon points="145,182 410,55 675,182" fill="url(#roofG2)" />
        {/* Roof ridge highlights */}
        <line x1="410" y1="55" x2="145" y2="182" stroke="rgba(216,181,106,0.12)" strokeWidth="2" />
        <line x1="410" y1="55" x2="675" y2="182" stroke="rgba(216,181,106,0.12)" strokeWidth="2" />
        {/* Eave shadow */}
        <rect x="145" y="178" width="530" height="12" fill="rgba(0,0,0,0.28)" />

        {/* Wing roofs */}
        <polygon points="100,224 145,182 180,224" fill="#2a0e18" />
        <polygon points="640,224 675,182 720,224" fill="#2a0e18" />

        {/* Dormer window centre */}
        <polygon points="368,108 410,80 452,108" fill="#2a1018" />
        <rect x="378" y="107" width="64" height="44" fill="#2a1018" />
        <rect x="385" y="115" width="24" height="30" fill="rgba(216,181,106,0.65)" rx="1.5" />
        <rect x="413" y="115" width="24" height="30" fill="rgba(216,181,106,0.60)" rx="1.5" />
        <motion.rect x="385" y="115" width="24" height="30" fill="#D8B56A" rx="1.5"
          animate={{ opacity: [0.12, 0.38, 0.12] }} transition={{ repeat: Infinity, duration: 2.8 }} />
        <motion.rect x="413" y="115" width="24" height="30" fill="#D8B56A" rx="1.5"
          animate={{ opacity: [0.12, 0.38, 0.12] }} transition={{ repeat: Infinity, duration: 2.8, delay: 0.4 }} />

        {/* Chimney left */}
        <rect x="260" y="88" width="30" height="88" fill="#341018" rx="2" />
        <rect x="255" y="84" width="40" height="12" fill="#240c12" rx="1" />
        {/* Chimney smoke */}
        {[0,1,2].map(i => (
          <motion.ellipse key={`sm${i}`} cx={275 + i*4} cy={72 - i*18} rx={9 + i*5} ry={7 + i*4}
            fill="rgba(200,180,160,0.1)"
            animate={{ y: [0, -28], opacity: [0.15, 0], scaleX: [1, 1.9] }}
            transition={{ repeat: Infinity, duration: 2.8 + i*0.5, delay: i*0.7 }} />
        ))}

        {/* Chimney right */}
        <rect x="540" y="95" width="28" height="80" fill="#341018" rx="2" />
        <rect x="535" y="91" width="38" height="11" fill="#240c12" rx="1" />
        {[0,1,2].map(i => (
          <motion.ellipse key={`smr${i}`} cx={554 + i*3} cy={78 - i*16} rx={8 + i*4} ry={6 + i*3}
            fill="rgba(200,180,160,0.1)"
            animate={{ y: [0, -24], opacity: [0.12, 0], scaleX: [1, 1.8] }}
            transition={{ repeat: Infinity, duration: 3 + i*0.5, delay: i*0.6 + 1 }} />
        ))}

        {/* LEFT WING WINDOW */}
        <rect x="120" y="235" width="52" height="42" fill="#140810" rx="3" />
        <rect x="126" y="241" width="18" height="30" fill="rgba(216,181,106,0.72)" rx="1" filter="url(#winGlow2)" />
        <rect x="148" y="241" width="18" height="30" fill="rgba(216,181,106,0.65)" rx="1" filter="url(#winGlow2)" />
        <motion.rect x="126" y="241" width="18" height="30" fill="#D8B56A" rx="1"
          animate={{ opacity: [0.18, 0.4, 0.18] }} transition={{ repeat: Infinity, duration: 3 }} />

        {/* RIGHT WING WINDOW */}
        <rect x="648" y="235" width="52" height="42" fill="#140810" rx="3" />
        <rect x="654" y="241" width="18" height="30" fill="rgba(216,181,106,0.68)" rx="1" filter="url(#winGlow2)" />
        <rect x="676" y="241" width="18" height="30" fill="rgba(216,181,106,0.60)" rx="1" filter="url(#winGlow2)" />
        <motion.rect x="654" y="241" width="18" height="30" fill="#D8B56A" rx="1"
          animate={{ opacity: [0.15, 0.38, 0.15] }} transition={{ repeat: Infinity, duration: 3.2 }} />

        {/* MAIN WINDOWS LEFT */}
        <rect x="188" y="195" width="88" height="68" fill="#140810" rx="3" />
        <rect x="196" y="203" width="32" height="52" fill="rgba(216,181,106,0.75)" rx="1.5" filter="url(#winGlow2)" />
        <rect x="232" y="203" width="32" height="52" fill="rgba(216,181,106,0.68)" rx="1.5" filter="url(#winGlow2)" />
        <line x1="228" y1="203" x2="228" y2="255" stroke="#140810" strokeWidth="4" />
        <line x1="196" y1="229" x2="264" y2="229" stroke="#140810" strokeWidth="2.5" />
        <motion.rect x="196" y="203" width="32" height="52" fill="#D8B56A" rx="1.5"
          animate={{ opacity: [0.18, 0.42, 0.18] }} transition={{ repeat: Infinity, duration: 3.2 }} />
        <motion.ellipse cx="228" cy="229" rx="54" ry="44" fill="#D8B56A" opacity="0.06"
          animate={{ opacity: [0.04, 0.12, 0.04] }} transition={{ repeat: Infinity, duration: 4 }} />

        {/* MAIN WINDOWS LEFT LOWER */}
        <rect x="188" y="278" width="88" height="62" fill="#140810" rx="3" />
        <rect x="196" y="286" width="32" height="46" fill="rgba(216,181,106,0.65)" rx="1.5" />
        <rect x="232" y="286" width="32" height="46" fill="rgba(216,181,106,0.58)" rx="1.5" />
        <line x1="228" y1="286" x2="228" y2="332" stroke="#140810" strokeWidth="4" />
        <line x1="196" y1="308" x2="264" y2="308" stroke="#140810" strokeWidth="2.5" />
        <motion.rect x="196" y="286" width="32" height="46" fill="#D8B56A" rx="1.5"
          animate={{ opacity: [0.14, 0.32, 0.14] }} transition={{ repeat: Infinity, duration: 2.8, delay: 0.4 }} />

        {/* MAIN WINDOWS RIGHT */}
        <rect x="544" y="195" width="88" height="68" fill="#140810" rx="3" />
        <rect x="552" y="203" width="32" height="52" fill="rgba(216,181,106,0.75)" rx="1.5" filter="url(#winGlow2)" />
        <rect x="588" y="203" width="32" height="52" fill="rgba(216,181,106,0.68)" rx="1.5" filter="url(#winGlow2)" />
        <line x1="584" y1="203" x2="584" y2="255" stroke="#140810" strokeWidth="4" />
        <line x1="552" y1="229" x2="620" y2="229" stroke="#140810" strokeWidth="2.5" />
        <motion.rect x="552" y="203" width="32" height="52" fill="#D8B56A" rx="1.5"
          animate={{ opacity: [0.18, 0.42, 0.18] }} transition={{ repeat: Infinity, duration: 3.5 }} />
        <motion.ellipse cx="584" cy="229" rx="54" ry="44" fill="#D8B56A" opacity="0.06"
          animate={{ opacity: [0.04, 0.14, 0.04] }} transition={{ repeat: Infinity, duration: 4, delay: 0.9 }} />

        {/* MAIN WINDOWS RIGHT LOWER */}
        <rect x="544" y="278" width="88" height="62" fill="#140810" rx="3" />
        <rect x="552" y="286" width="32" height="46" fill="rgba(216,181,106,0.65)" rx="1.5" />
        <rect x="588" y="286" width="32" height="46" fill="rgba(216,181,106,0.58)" rx="1.5" />
        <line x1="584" y1="286" x2="584" y2="332" stroke="#140810" strokeWidth="4" />
        <line x1="552" y1="308" x2="620" y2="308" stroke="#140810" strokeWidth="2.5" />
        <motion.rect x="552" y="286" width="32" height="46" fill="#D8B56A" rx="1.5"
          animate={{ opacity: [0.14, 0.32, 0.14] }} transition={{ repeat: Infinity, duration: 2.8, delay: 0.7 }} />

        {/* Porch lanterns */}
        <motion.ellipse cx="326" cy="305" rx="14" ry="16" fill="#D8B56A" opacity="0.55"
          animate={{ opacity: [0.42, 0.72, 0.42] }} transition={{ repeat: Infinity, duration: 2.2 }} />
        <motion.ellipse cx="494" cy="305" rx="14" ry="16" fill="#D8B56A" opacity="0.55"
          animate={{ opacity: [0.42, 0.72, 0.42] }} transition={{ repeat: Infinity, duration: 2.2, delay: 0.8 }} />

        {/* Garden flowers — left */}
        {[[180,368],[208,362],[236,370],[264,364]].map(([x,y],i) => (
          <motion.g key={`fl${i}`} animate={{ y: [0, -4, 0] }}
            transition={{ repeat: Infinity, duration: 2.8 + i*0.4, delay: i*0.5 }}>
            <rect x={x-3} y={y} width="5" height="16" fill="#2a4018" />
            <circle cx={x} cy={y-2} r={10} fill={['#E8A6B7','#D8B56A','#f9d0dc','#e8a6b7'][i]} opacity="0.85" />
          </motion.g>
        ))}
        {/* Garden flowers — right */}
        {[[560,368],[588,362],[616,370],[644,364]].map(([x,y],i) => (
          <motion.g key={`fr${i}`} animate={{ y: [0, -4, 0] }}
            transition={{ repeat: Infinity, duration: 2.8 + i*0.4, delay: i*0.4 + 0.9 }}>
            <rect x={x-3} y={y} width="5" height="16" fill="#2a4018" />
            <circle cx={x} cy={y-2} r={10} fill={['#D8B56A','#E8A6B7','#f0c0d0','#D8B56A'][i]} opacity="0.85" />
          </motion.g>
        ))}

        {/* Teddy couple at pathway — clear and prominent */}
        <g transform="translate(340, 320) scale(0.54)">
          {/* Boy */}
          <g transform="translate(-75, 0)">
            <ellipse cx="28" cy="38" rx="15" ry="15" fill="#a0704a"/><ellipse cx="28" cy="38" rx="8" ry="8" fill="#c99a72"/>
            <ellipse cx="78" cy="32" rx="15" ry="15" fill="#a0704a"/><ellipse cx="78" cy="32" rx="8" ry="8" fill="#c99a72"/>
            <ellipse cx="53" cy="54" rx="36" ry="32" fill="#b8804e"/>
            <ellipse cx="41" cy="52" rx="4.5" ry="3.5" fill="#2d1a0e"/><ellipse cx="65" cy="52" rx="4.5" ry="3.5" fill="#2d1a0e"/>
            <ellipse cx="53" cy="62" rx="5.5" ry="4" fill="#2d1a0e"/>
            <path d="M 43 70 Q 53 78 63 70" stroke="#2d1a0e" strokeWidth="2.2" fill="none" strokeLinecap="round"/>
            <ellipse cx="53" cy="118" rx="30" ry="32" fill="#b8804e"/>
            <ellipse cx="53" cy="122" rx="17" ry="18" fill="#c99a72"/>
          </g>
          {/* Girl */}
          <g transform="translate(75, 0)">
            <path d="M 37,14 L 27,7 L 37,3 L 53,11 L 69,3 L 79,7 L 69,14 L 53,8 Z" fill="#e8a6b7"/>
            <ellipse cx="53" cy="10" rx="7" ry="6" fill="#f0c0d0"/>
            <ellipse cx="28" cy="38" rx="15" ry="15" fill="#9e6b4e"/><ellipse cx="28" cy="38" rx="8" ry="8" fill="#d4a882"/>
            <ellipse cx="78" cy="32" rx="15" ry="15" fill="#9e6b4e"/><ellipse cx="78" cy="32" rx="8" ry="8" fill="#d4a882"/>
            <ellipse cx="53" cy="54" rx="36" ry="32" fill="#b8804e"/>
            <ellipse cx="41" cy="52" rx="5" ry="4" fill="#2d1a0e"/><ellipse cx="65" cy="52" rx="5" ry="4" fill="#2d1a0e"/>
            <ellipse cx="53" cy="62" rx="5" ry="3.5" fill="#2d1a0e"/>
            <path d="M 43 70 Q 53 80 63 70" stroke="#2d1a0e" strokeWidth="2.2" fill="none" strokeLinecap="round"/>
            <path d="M 24 98 Q 23 132 25 150 L 81 150 Q 83 132 82 98 Q 70 108 53 108 Q 36 108 24 98Z" fill="#e8a6b7" opacity="0.7"/>
            <ellipse cx="53" cy="118" rx="30" ry="32" fill="#b8804e"/>
          </g>
        </g>

        {/* Fireflies */}
        {[[120,240],[135,200],[700,210],[720,250],[780,195],[80,275],[360,175]].map(([x,y],i) => (
          <motion.circle key={`ff${i}`} cx={x} cy={y} r="3"
            fill="#D8B56A" style={{ filter: 'blur(0.5px)' }}
            animate={{ opacity: [0, 0.9, 0], x: [x, x+18, x], y: [y, y-22, y] }}
            transition={{ repeat: Infinity, duration: 3.2 + i*0.5, delay: i*0.75 }} />
        ))}

        {/* Vignette */}
        <rect width="820" height="460" fill="url(#vigG)" />
      </svg>
    </div>
  );
}

/* ====== OTHER SCENE ILLUSTRATIONS ====== */
function MorningScene() {
  return (
    <div className="scene-illustration">
      <svg viewBox="0 0 560 280" width="100%" xmlns="http://www.w3.org/2000/svg" style={{ display: 'block' }}>
        <rect width="560" height="280" fill="#080810" />
        <rect x="40" y="24" width="480" height="240" fill="#0d0c1a" rx="14" />
        <line x1="280" y1="24" x2="280" y2="264" stroke="#1a1028" strokeWidth="8" />
        <line x1="40" y1="144" x2="520" y2="144" stroke="#1a1028" strokeWidth="8" />
        {[0,1,2,3,4].map(i => (
          <motion.line key={i} x1={80 + i*38} y1="24" x2={72 + i*38} y2="264"
            stroke="#D8B56A" strokeWidth="2.5" opacity="0.07"
            animate={{ opacity: [0.04, 0.16, 0.04] }}
            transition={{ repeat: Infinity, duration: 4 + i*0.7, delay: i*0.4 }} />
        ))}
        <rect x="100" y="215" width="360" height="16" fill="#3a1820" rx="6" />
        <rect x="116" y="231" width="10" height="28" fill="#2a1218" rx="3" />
        <rect x="434" y="231" width="10" height="28" fill="#2a1218" rx="3" />
        <rect x="218" y="188" width="42" height="28" fill="#8B3040" rx="6" />
        <path d="M 260 196 Q 275 196 275 210 Q 275 220 260 220" fill="none" stroke="#8B3040" strokeWidth="5" strokeLinecap="round" />
        <rect x="268" y="188" width="42" height="28" fill="#C58B9D" rx="6" />
        <path d="M 310 196 Q 325 196 325 210 Q 325 220 310 220" fill="none" stroke="#C58B9D" strokeWidth="5" strokeLinecap="round" />
        {[235,288].map((x,i) => (
          <motion.path key={i} d={`M${x} 186 Q${x+6} 174 ${x-4} 162`} fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="2.5"
            animate={{ opacity: [0, 0.55, 0], y: [0, -10] }}
            transition={{ repeat: Infinity, duration: 2.4, delay: i*1.1 }} />
        ))}
        <motion.ellipse cx="430" cy="100" rx="44" ry="44" fill="rgba(216,181,106,0.13)"
          animate={{ opacity: [0.09, 0.2, 0.09] }} transition={{ repeat: Infinity, duration: 3.8 }} />
        <circle cx="430" cy="86" r="13" fill="#D8B56A" opacity="0.6" />
        <rect x="426" y="99" width="8" height="52" fill="#5a3020" rx="3" />
      </svg>
    </div>
  );
}

function RainyScene() {
  return (
    <div className="scene-illustration">
      <svg viewBox="0 0 560 280" width="100%" xmlns="http://www.w3.org/2000/svg" style={{ display: 'block' }}>
        <rect width="560" height="280" fill="#060810" />
        <rect x="50" y="20" width="460" height="248" fill="#0a0c1c" rx="12" />
        {Array.from({length:28}, (_,i) => (
          <motion.line key={i} x1={58 + i*16} y1="20" x2={54 + i*16} y2="268"
            stroke="rgba(140,160,210,0.28)" strokeWidth="1.5"
            animate={{ opacity: [0.1, 0.5, 0.1], y: [0, 14] }}
            transition={{ repeat: Infinity, duration: 1 + Math.random()*0.5, delay: i*0.07 }} />
        ))}
        <rect x="90" y="195" width="380" height="68" fill="#280f1e" rx="10" />
        <rect x="80" y="182" width="36" height="80" fill="#280f1e" rx="8" />
        <rect x="444" y="182" width="36" height="80" fill="#280f1e" rx="8" />
        <rect x="90" y="208" width="380" height="14" fill="#3a1828" rx="3" />
        <rect x="106" y="218" width="160" height="40" fill="#331528" rx="6" />
        <rect x="294" y="218" width="160" height="40" fill="#331528" rx="6" />
        <motion.ellipse cx="456" cy="115" rx="48" ry="48" fill="rgba(216,181,106,0.14)"
          animate={{ opacity: [0.09, 0.2, 0.09] }} transition={{ repeat: Infinity, duration: 3.5 }} />
        <circle cx="456" cy="100" r="14" fill="#D8B56A" opacity="0.6" />
        <rect x="452" y="114" width="8" height="60" fill="#5a3020" rx="3" />
      </svg>
    </div>
  );
}

function GardenScene() {
  return (
    <div className="scene-illustration">
      <svg viewBox="0 0 560 280" width="100%" xmlns="http://www.w3.org/2000/svg" style={{ display: 'block' }}>
        <defs>
          <linearGradient id="gardSky2" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#0a1420" />
            <stop offset="100%" stopColor="#162010" />
          </linearGradient>
        </defs>
        <rect width="560" height="280" fill="url(#gardSky2)" />
        <rect x="0" y="215" width="560" height="65" fill="#101e0a" />
        <ellipse cx="280" cy="217" rx="320" ry="25" fill="#162210" opacity="0.7" />
        {[[55,218],[490,210]].map(([x,y],i) => (
          <g key={i}>
            <rect x={x-5} y={y} width="10" height={280-y} fill="#1a2a10" rx="3" />
            <ellipse cx={x} cy={y} rx="42" ry="64" fill="#1e3015" />
            <ellipse cx={x} cy={y-28} rx="30" ry="48" fill="#243a1a" />
            <ellipse cx={x} cy={y-52} rx="18" ry="32" fill="#2a4020" />
          </g>
        ))}
        {[80,120,160,200,240,280,320,360,400,440,480].map((x,i) => (
          <motion.g key={i} animate={{ y: [0, -5, 0] }}
            transition={{ repeat: Infinity, duration: 2.8 + i*0.25, delay: i*0.35 }}>
            <rect x={x-3} y={215} width="5" height={22} fill="#2a4018" />
            <circle cx={x} cy={213} r={11} fill={['#E8A6B7','#D8B56A','#f9d0dc','#e8c4a0','#b8e0b0','#E8A6B7','#D8B56A','#f9d0dc','#e8a6b7','#D8B56A','#E8A6B7'][i]} opacity="0.88" />
          </motion.g>
        ))}
        {[42,108,185,260,340,420,495].map((x,i) => (
          <motion.circle key={i+20} cx={x} cy={30 + i*10} r="2.5" fill="#D8B56A"
            animate={{ opacity: [0.2, 1, 0.2] }} transition={{ repeat: Infinity, duration: 2.8 + i*0.4, delay: i*0.55 }} />
        ))}
        {[72,180,290,400,510].map((x,i) => (
          <motion.circle key={i+30} cx={x} cy={80+i*22} r="3.5" fill="#D8B56A" opacity="0.8"
            animate={{ opacity: [0, 0.9, 0], x: [x, x+24, x] }}
            transition={{ repeat: Infinity, duration: 3.2+i*0.6, delay: i*0.9 }} />
        ))}
      </svg>
    </div>
  );
}

function SunsetScene() {
  return (
    <div className="scene-illustration">
      <svg viewBox="0 0 560 280" width="100%" xmlns="http://www.w3.org/2000/svg" style={{ display: 'block' }}>
        <defs>
          <linearGradient id="sunsetSky2" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#421526" />
            <stop offset="48%" stopColor="#8B2040" />
            <stop offset="82%" stopColor="#b85830" stopOpacity="0.85" />
            <stop offset="100%" stopColor="#160608" />
          </linearGradient>
        </defs>
        <rect width="560" height="280" fill="url(#sunsetSky2)" />
        <motion.circle cx="432" cy="125" r="40" fill="#D8B56A" opacity="0.78"
          animate={{ opacity: [0.6, 0.88, 0.6] }} transition={{ repeat: Infinity, duration: 4.5 }} />
        <ellipse cx="432" cy="132" rx="90" ry="80" fill="rgba(216,181,106,0.13)" />
        <rect x="0" y="224" width="560" height="56" fill="#0e1808" />
        <ellipse cx="280" cy="224" rx="310" ry="25" fill="#142008" opacity="0.8" />
        <rect x="178" y="208" width="204" height="18" fill="#0a0e06" rx="5" />
        <rect x="198" y="226" width="12" height="28" fill="#060a04" rx="3" />
        <rect x="352" y="226" width="12" height="28" fill="#060a04" rx="3" />
        <rect x="178" y="193" width="204" height="12" fill="#0a0e06" rx="3" />
        {[[44,198],[508,192]].map(([x,y],i) => (
          <g key={i}>
            <rect x={x-6} y={y} width="12" height="82" fill="#060a04" />
            <ellipse cx={x} cy={y} rx="40" ry="68" fill="#080c06" />
          </g>
        ))}
        {[0,1,2,3].map(i => (
          <motion.g key={i} animate={{ x: [0, 28, 0], y: [0, -18, 0] }}
            transition={{ repeat: Infinity, duration: 5+i, delay: i*1.4 }}>
            <ellipse cx={260+i*50} cy={88+i*22} rx="13" ry="8" fill="#E8A6B7" opacity="0.72"
              transform={`rotate(-28 ${260+i*50} ${88+i*22})`} />
            <ellipse cx={260+i*50} cy={88+i*22} rx="13" ry="8" fill="#D8B56A" opacity="0.65"
              transform={`rotate(28 ${260+i*50} ${88+i*22})`} />
          </motion.g>
        ))}
      </svg>
    </div>
  );
}

/* ====== SCENE TEDDIES ====== */
function SceneTeddies({ id }) {
  const s = 1.35;
  const cfg = {
    mornings:  <div style={{ display: 'flex', justifyContent: 'center', gap: '8px' }}><BoyTeddy scale={s} expression="happy" /><GirlTeddy scale={s} expression="happy" /></div>,
    harddays:  <div style={{ display: 'flex', justifyContent: 'center' }}><HuggingTeddies scale={s} /></div>,
    growing:   <div style={{ display: 'flex', justifyContent: 'center', gap: '10px' }}><BoyTeddy scale={s} expression="love" /><GirlTeddy scale={s} expression="love" /></div>,
    old:       <div style={{ display: 'flex', justifyContent: 'center' }}><OlderTeddies scale={s} /></div>,
  };
  return cfg[id] ? <div style={{ marginBottom: '8px' }}>{cfg[id]}</div> : null;
}

/* ====== MAIN COMPONENT ====== */
export default function FutureLifeScene({ onNext }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showFinal, setShowFinal] = useState(false);

  const scene = futureScenes[currentIndex];

  const goNext = () => {
    if (currentIndex < futureScenes.length - 1) setCurrentIndex(i => i + 1);
    else setShowFinal(true);
  };

  // scene background colours
  const bgs = {
    home:     'linear-gradient(165deg, #0c0608 0%, #180c0a 50%, #0c0608 100%)',
    mornings: 'linear-gradient(165deg, #060810 0%, #0e0d1a 50%, #060810 100%)',
    harddays: 'linear-gradient(165deg, #06080e 0%, #0a0e18 50%, #06080e 100%)',
    growing:  'linear-gradient(165deg, #060e08 0%, #0c1a0c 50%, #060e08 100%)',
    old:      'linear-gradient(165deg, #160610 0%, #2a1020 50%, #160610 100%)',
  };

  if (showFinal) {
    return (
      <div className="future-scene" style={{ background: bgs.old, justifyContent: 'center' }}>
        <div aria-hidden="true" style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 65% 55% at 50% 55%, rgba(216,181,106,0.06) 0%, transparent 65%)', pointerEvents: 'none' }} />
        <motion.div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', zIndex: 5, padding: '0 28px', maxWidth: 720 }}
          initial={{ opacity: 0, scale: 0.94 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1.2 }}>
          <OlderTeddies scale={1.3} />
          <motion.p className="text-serif-lg" style={{ textAlign: 'center', maxWidth: 600, marginTop: '36px' }}
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7, duration: 1 }}>
            {futureFinalLine}
          </motion.p>
          <motion.div style={{ marginTop: '48px' }} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.6 }}>
            <button className="btn-primary" onClick={onNext} id="future-final-btn">
              A letter from my heart →
            </button>
          </motion.div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="future-scene" style={{ background: bgs[scene.id] || bgs.home }}>
      <div aria-hidden="true" style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 55% 45% at 50% 48%, rgba(66,21,38,0.3) 0%, transparent 65%)', pointerEvents: 'none' }} />

      <motion.p className="section-eyebrow" initial={{ opacity: 0 }} animate={{ opacity: 0.7 }}
        style={{ position: 'relative', zIndex: 5 }}>
        The Life I Imagine With You
      </motion.p>

      <AnimatePresence mode="wait">
        <motion.div key={scene.id}
          style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', zIndex: 5, width: '100%', padding: '0 12px', maxWidth: 860 }}
          initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -50 }}
          transition={{ duration: 0.7 }}>

          {/* Illustration */}
          {scene.id === 'home'     && <DreamHouse />}
          {scene.id === 'mornings' && <MorningScene />}
          {scene.id === 'harddays' && <RainyScene />}
          {scene.id === 'growing'  && <GardenScene />}
          {scene.id === 'old'      && <SunsetScene />}

          {/* Teddies (non-home scenes) */}
          {scene.id !== 'home' && <SceneTeddies id={scene.id} />}

          {/* Content card */}
          <div className="future-card" style={{ marginTop: scene.id === 'home' ? '20px' : '14px' }}>
            <span className="future-icon">{scene.icon}</span>
            <h3 className="future-title">{scene.title}</h3>
            <p className="future-text">{scene.text}</p>
            {scene.subtext && <p className="future-subtext">{scene.subtext}</p>}
            {/* Progress */}
            <div className="future-progress">
              {futureScenes.map((_, i) => (
                <div key={i} className={`future-dot ${i === currentIndex ? 'active' : ''}`} />
              ))}
            </div>
          </div>

          <motion.div style={{ marginTop: '28px' }}>
            <button className="next-btn" onClick={goNext} id={`future-next-${scene.id}`}>
              {currentIndex < futureScenes.length - 1
                ? `${futureScenes[currentIndex + 1].title} →`
                : 'One final dream →'}
            </button>
          </motion.div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
