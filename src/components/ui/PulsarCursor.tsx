'use client';

import { useEffect, useState } from 'react';

export default function PulsarCursor() {
  const [isFinePointer, setIsFinePointer] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isPressed, setIsPressed] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    const mediaQueryList = window.matchMedia('(pointer: fine)');
    setIsFinePointer(mediaQueryList.matches);

    const handlePointerChange = (event: MediaQueryListEvent) => {
      setIsFinePointer(event.matches);
    };

    mediaQueryList.addEventListener('change', handlePointerChange);

    return () => {
      mediaQueryList.removeEventListener('change', handlePointerChange);
    };
  }, []);

  useEffect(() => {
    if (!isFinePointer) {
      return;
    }

    const handleMouseMove = (event: MouseEvent) => {
      setPosition({ x: event.clientX, y: event.clientY });
    };

    const handleMouseDown = () => setIsPressed(true);
    const handleMouseUp = () => setIsPressed(false);

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isFinePointer]);

  if (!isFinePointer) {
    return null;
  }

  return (
    <>
      <div
        style={{
          position: 'fixed',
          top: position.y,
          left: position.x,
          width: 8,
          height: 8,
          borderRadius: '50%',
          backgroundColor: 'var(--pulsar-cyan)',
          pointerEvents: 'none',
          zIndex: 9999,
          transform: 'translate(-50%, -50%)',
        }}
      />
      <div
        style={{
          position: 'fixed',
          top: position.y,
          left: position.x,
          width: 24,
          height: 24,
          borderRadius: '50%',
          border: '1px solid var(--pulsar-cyan)',
          pointerEvents: 'none',
          zIndex: 9999,
          transform: `translate(-50%, -50%) scale(${isPressed ? 1.5 : 1})`,
          transition: 'transform 150ms',
        }}
      />
    </>
  );
}