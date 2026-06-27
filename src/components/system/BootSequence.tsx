'use client';

import { useEffect, useRef, useState } from 'react';
import { useMotion } from '@/hooks/useMotion';
import PulsarCursor from '@/components/ui/PulsarCursor';
import styles from './BootSequence.module.css';

const LINES = [
  '> initializing stellar renderer',
  '> calibrating emotion model (ONNX, ~22MB)',
  '> mapping constellation: 4 projects, 6 skills',
  '> ready — press Cmd+K anytime to navigate',
];

const LINE_DELAY_MS = 120;
const COMPLETE_DELAY_MS = 300;
const FAST_FORWARD_TRANSITION_MS = 16; // ~one frame

interface BootSequenceProps {
  onComplete: () => void;
  /**
   * Optional external signal that the real hero/font assets have finished
   * loading. When this becomes true before the scripted lines finish, the
   * sequence fast-forwards to the final line and completes one frame later,
   * per Phase 0 Step 4 ("never slower than the page genuinely needs").
   * If omitted, falls back to `document.fonts.ready` as the readiness signal.
   */
  assetsReady?: boolean;
}

export default function BootSequence({ onComplete, assetsReady }: BootSequenceProps) {
  const { shouldAnimate } = useMotion();
  const [shouldRender, setShouldRender] = useState(false);
  const [gateChecked, setGateChecked] = useState(false);
  const [visibleCount, setVisibleCount] = useState(0);
  const [fontsReady, setFontsReady] = useState(false);
  const [fastForwarded, setFastForwarded] = useState(false);
  const onCompleteRef = useRef(onComplete);
  const hasCompletedRef = useRef(false);

  onCompleteRef.current = onComplete;

  const fireOnComplete = () => {
    if (hasCompletedRef.current) {
      return;
    }
    hasCompletedRef.current = true;
    onCompleteRef.current();
  };

  // Fallback readiness signal when the caller doesn't pass `assetsReady`:
  // resolve once webfonts have loaded, mirroring the "real hero/font load"
  // race described in Phase 0 Step 4.
  useEffect(() => {
    if (assetsReady !== undefined) {
      return;
    }
    if (typeof document === 'undefined' || !document.fonts) {
      setFontsReady(true);
      return;
    }
    let cancelled = false;
    document.fonts.ready.then(() => {
      if (!cancelled) {
        setFontsReady(true);
      }
    });
    return () => {
      cancelled = true;
    };
  }, [assetsReady]);

  const isAssetsReady = assetsReady !== undefined ? assetsReady : fontsReady;

  // Gating logic — decide once, on mount, before anything paints.
  useEffect(() => {
    if (typeof window === 'undefined') {
      setGateChecked(true);
      return;
    }

    const alreadySeen = sessionStorage.getItem('seenBoot') === 'true';
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    if (alreadySeen || prefersReducedMotion) {
      setShouldRender(false);
      setGateChecked(true);
      return;
    }

    sessionStorage.setItem('seenBoot', 'true');
    setShouldRender(true);
    setGateChecked(true);
  }, []);

  // Belt-and-suspenders: useMotion hook gate (covers live changes to the
  // OS setting that the one-shot matchMedia check above wouldn't catch).
  useEffect(() => {
    if (gateChecked && !shouldAnimate) {
      setShouldRender(false);
    }
  }, [gateChecked, shouldAnimate]);

  // Drive the line-reveal sequence.
  useEffect(() => {
    if (!gateChecked || !shouldRender) {
      return;
    }

    const timers: ReturnType<typeof setTimeout>[] = [];

    LINES.forEach((_, index) => {
      const timer = setTimeout(() => {
        setVisibleCount(index + 1);
      }, LINE_DELAY_MS * (index + 1));
      timers.push(timer);
    });

    const completeTimer = setTimeout(() => {
      fireOnComplete();
    }, LINE_DELAY_MS * LINES.length + COMPLETE_DELAY_MS);
    timers.push(completeTimer);

    return () => {
      timers.forEach(clearTimeout);
    };
  }, [gateChecked, shouldRender]);

  // Real-progress shortcut (Phase 0, Step 4): if the real hero/font assets
  // finish loading before the scripted lines do, fast-forward straight to
  // the final line and complete one frame later instead of padding to the
  // fixed duration.
  useEffect(() => {
    if (!gateChecked || !shouldRender || fastForwarded) {
      return;
    }
    if (!isAssetsReady) {
      return;
    }
    if (visibleCount >= LINES.length) {
      // Scripted sequence already reached the end naturally; nothing to skip.
      return;
    }

    setFastForwarded(true);
    setVisibleCount(LINES.length);

    const timer = setTimeout(() => {
      fireOnComplete();
    }, FAST_FORWARD_TRANSITION_MS);

    return () => clearTimeout(timer);
  }, [gateChecked, shouldRender, isAssetsReady, fastForwarded, visibleCount]);

  // Skip on any keydown / pointerdown for the duration of the sequence.
  useEffect(() => {
    if (!gateChecked || !shouldRender) {
      return;
    }

    const handleSkip = () => {
      fireOnComplete();
    };

    document.addEventListener('keydown', handleSkip);
    document.addEventListener('pointerdown', handleSkip);

    return () => {
      document.removeEventListener('keydown', handleSkip);
      document.removeEventListener('pointerdown', handleSkip);
    };
  }, [gateChecked, shouldRender]);

  if (!gateChecked || !shouldRender || !shouldAnimate) {
    return null;
  }

  const progress = (visibleCount / LINES.length) * 100;

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        width: '100vw',
        height: '100vh',
        background: 'var(--void)',
        zIndex: 50,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <button
        type="button"
        className={styles.skipButton}
        onClick={() => fireOnComplete()}
      >
        Skip intro
      </button>

      <div style={{ width: 'min(90vw, 480px)' }}>
        <div aria-live="polite" aria-atomic="false">
          {LINES.slice(0, visibleCount).map((line, index) => (
            <div
              key={index}
              className={styles.bootLine}
              style={{
                fontFamily: 'var(--font-mono)',
                color: 'var(--star-white)',
                fontSize: 'clamp(13px, 2vw, 15px)',
                marginBottom: 4,
                whiteSpace: 'pre-wrap',
              }}
            >
              {line}
            </div>
          ))}
        </div>

        <div
          style={{
            marginTop: 12,
            width: '100%',
            height: 2,
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
          }}
        >
          <div
            style={{
              height: '100%',
              width: `${progress}%`,
              backgroundColor: 'var(--pulsar-cyan)',
              transition: `width ${LINE_DELAY_MS}ms linear`,
            }}
          />
        </div>
      </div>

      <PulsarCursor />
    </div>
  );
}