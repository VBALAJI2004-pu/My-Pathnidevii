// useAudio.js — Persistent audio, attempts autoplay on load,
// falls back to earliest user interaction if browser blocks it.
import { useEffect, useCallback, useRef } from 'react';
import { audio as audioCfg } from '../content/storyContent';

// ── Single module-level audio instance ──────────────────────────────────────
let audioEl = null;
let hasStarted = false;
let pendingInteractionFallback = false;

function getAudio() {
  if (!audioEl) {
    audioEl = new Audio(audioCfg.src);
    audioEl.loop    = true;
    audioEl.volume  = audioCfg.volume; // 0.5
    audioEl.preload = 'auto';
  }
  return audioEl;
}

function tryPlay() {
  if (hasStarted) return;
  const el = getAudio();
  el.play()
    .then(() => {
      hasStarted = true;
      pendingInteractionFallback = false;
      removeFallbackListeners();
    })
    .catch(() => {
      // Browser blocked autoplay — set up interaction fallback
      if (!pendingInteractionFallback) {
        pendingInteractionFallback = true;
        addFallbackListeners();
      }
    });
}

function onFirstInteraction() {
  if (hasStarted) { removeFallbackListeners(); return; }
  const el = getAudio();
  el.play()
    .then(() => {
      hasStarted = true;
      pendingInteractionFallback = false;
      removeFallbackListeners();
    })
    .catch(() => { /* still blocked — give up quietly */ });
}

const FALLBACK_EVENTS = ['click', 'touchstart', 'keydown', 'pointerdown'];

function addFallbackListeners() {
  FALLBACK_EVENTS.forEach(ev =>
    window.addEventListener(ev, onFirstInteraction, { once: false, passive: true, capture: true })
  );
}

function removeFallbackListeners() {
  FALLBACK_EVENTS.forEach(ev =>
    window.removeEventListener(ev, onFirstInteraction, { capture: true })
  );
}

// ── React hook ────────────────────────────────────────────────────────────────
export function useAudio() {
  const mountedRef = useRef(false);

  // Attempt autoplay immediately on first mount
  useEffect(() => {
    if (mountedRef.current) return;
    mountedRef.current = true;
    tryPlay();
    // Cleanup: if component unmounts, nothing to tear down —
    // the module-level instance persists intentionally across scene changes.
  }, []);

  // Also expose an imperative trigger so OpeningScene can nudge playback
  // on the first confirmed user click (ensures it starts at the button tap).
  const initAudio = useCallback(() => {
    tryPlay();
  }, []);

  return { initAudio };
}
