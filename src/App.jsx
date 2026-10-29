// App.jsx — Main orchestrator with scene management and audio
import { useState, useCallback, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useAudio } from './hooks/useAudio';

import OpeningScene from './components/OpeningScene';
import StorybookScene from './components/StorybookScene';
import TeddyQuestionScene from './components/TeddyQuestionScene';
import PhotoMemoriesScene from './components/PhotoMemoriesScene';
import FutureLifeScene from './components/FutureLifeScene';
import LoveLetterScene from './components/LoveLetterScene';
import FinalProposalScene from './components/FinalProposalScene';
import PetalEffects from './components/PetalEffects';

import './styles/global.css';
import './styles/scenes.css';

const SCENES = [
  'opening',
  'storybook',
  'teddy-question',
  'photos',
  'future',
  'letter',
  'final',
];

const SCENE_NAMES = {
  opening: 'Beginning',
  storybook: 'Our Story',
  'teddy-question': 'A Question',
  photos: 'Moments',
  future: 'Our Future',
  letter: 'My Letter',
  final: 'Always',
};

// Smooth page transition wrapper
const pageVariants = {
  initial: { opacity: 0, y: 20 },
  enter: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.4, 0, 0.2, 1] } },
  exit: { opacity: 0, y: -20, transition: { duration: 0.5, ease: [0.4, 0, 0.2, 1] } },
};

export default function App() {
  const [sceneIndex, setSceneIndex] = useState(0);
  const [started, setStarted] = useState(false);
  const { initAudio } = useAudio();

  const currentScene = SCENES[sceneIndex];
  const progress = ((sceneIndex) / (SCENES.length - 1)) * 100;

  // Attempt autoplay on mount — hook already does this, but calling
  // initAudio here ensures React StrictMode re-mount is also handled.
  useEffect(() => {
    initAudio();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const goToNext = useCallback(() => {
    if (sceneIndex < SCENES.length - 1) {
      setSceneIndex(i => i + 1);
    }
  }, [sceneIndex]);

  const handleStart = useCallback(() => {
    initAudio();
    setStarted(true);
    setSceneIndex(1);
  }, [initAudio]);

  const handleRestart = useCallback(() => {
    setSceneIndex(0);
    setStarted(false);
  }, []);

  const handleSkip = useCallback(() => {
    if (sceneIndex === 0) {
      handleStart();
    } else {
      goToNext();
    }
  }, [sceneIndex, handleStart, goToNext]);

  return (
    <>
      {/* Ambient petals — only after starting */}
      {started && <PetalEffects intensity={0.7} />}

      {/* Progress bar */}
      {started && (
        <div
          className="progress-bar"
          style={{ width: `${progress}%` }}
          role="progressbar"
          aria-valuenow={sceneIndex}
          aria-valuemax={SCENES.length - 1}
          aria-label={`Scene ${sceneIndex + 1} of ${SCENES.length}: ${SCENE_NAMES[currentScene]}`}
        />
      )}

      {/* Skip button — hide on teddy-question (playful NO-button scene) and final */}
      {currentScene !== 'final' && currentScene !== 'teddy-question' && (
        <button className="skip-btn" onClick={handleSkip} id="skip-btn" aria-label="Skip this section">
          Skip
        </button>
      )}

      {/* Scene renderer */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentScene}
          variants={pageVariants}
          initial="initial"
          animate="enter"
          exit="exit"
          style={{ width: '100%', minHeight: '100dvh' }}
        >
          {currentScene === 'opening' && (
            <OpeningScene onStart={handleStart} />
          )}
          {currentScene === 'storybook' && (
            <StorybookScene onNext={goToNext} />
          )}
          {currentScene === 'teddy-question' && (
            <TeddyQuestionScene onNext={goToNext} />
          )}
          {currentScene === 'photos' && (
            <PhotoMemoriesScene onNext={goToNext} />
          )}
          {currentScene === 'future' && (
            <FutureLifeScene onNext={goToNext} />
          )}
          {currentScene === 'letter' && (
            <LoveLetterScene onNext={goToNext} />
          )}
          {currentScene === 'final' && (
            <FinalProposalScene onRestart={handleRestart} />
          )}
        </motion.div>
      </AnimatePresence>
    </>
  );
}
