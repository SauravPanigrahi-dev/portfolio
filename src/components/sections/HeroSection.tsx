'use client';

import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
import CTAButton from '@/components/ui/CTAButton';
import { HERO } from '@/data/portfolio';

const HeroCanvas = dynamic(() => import('./HeroCanvas'), { ssr: false });

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);
  return isMobile;
}

function handleEnter(e: React.MouseEvent<HTMLAnchorElement>) {
  e.currentTarget.style.color = 'var(--pulsar-cyan)';
}

function handleLeave(e: React.MouseEvent<HTMLAnchorElement>) {
  e.currentTarget.style.color = 'var(--muted)';
}

export default function HeroSection() {
  const isMobile = useIsMobile();

  if (isMobile) {
    return (
      <section
        style={{
          minHeight: '100vh',
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '5rem 1.5rem 3rem',
        }}
      >
        {/* Canvas as background on mobile */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            opacity: 0.3,
            zIndex: 0,
          }}
        >
          <HeroCanvas />
        </div>

        {/* Text on top */}
        <div style={{ position: 'relative', zIndex: 1 }}>
          <p
            style={{
              fontFamily: 'var(--font-mono)',
              color: 'var(--pulsar-cyan)',
              fontSize: '0.75rem',
              marginBottom: '1rem',
              letterSpacing: '0.08em',
            }}
          >
            {HERO.sub}
          </p>

          <h1
            style={{
              fontSize: '2rem',
              fontWeight: 700,
              color: 'var(--star-white)',
              lineHeight: 1.1,
              marginBottom: '1.25rem',
              letterSpacing: '-0.02em',
            }}
          >
            {HERO.headline}
          </h1>

          <p
            style={{
              color: 'var(--muted)',
              fontSize: '0.9rem',
              lineHeight: 1.7,
              marginBottom: '2rem',
            }}
          >
            CS undergrad at IIIT Bhubaneswar building ML systems in Computer
            Vision and NLP. Currently researching novel OCR methodology for
            handwritten prescriptions.
          </p>

          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <CTAButton
              variant="primary"
              onClick={() =>
                document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })
              }
            >
              View Projects
            </CTAButton>
            <CTAButton
              variant="ghost"
              onClick={() => window.open(`mailto:${HERO.email}`)}
            >
              Get in Touch
            </CTAButton>
          </div>

          <div style={{ display: 'flex', gap: '1.5rem', marginTop: '2rem' }}>
            <a
              href={HERO.github}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                fontFamily: 'var(--font-mono)',
                color: 'var(--muted)',
                fontSize: '0.8rem',
                textDecoration: 'none',
                transition: 'color 200ms',
              }}
              onMouseEnter={handleEnter}
              onMouseLeave={handleLeave}
            >
              GitHub ↗
            </a>
            <a
              href={HERO.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                fontFamily: 'var(--font-mono)',
                color: 'var(--muted)',
                fontSize: '0.8rem',
                textDecoration: 'none',
                transition: 'color 200ms',
              }}
              onMouseEnter={handleEnter}
              onMouseLeave={handleLeave}
            >
              LinkedIn ↗
            </a>
          </div>
        </div>
      </section>
    );
  }

  // Desktop layout — two column grid
  return (
    <section
      style={{
        minHeight: '100vh',
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        alignItems: 'center',
        padding: '0 4rem',
        gap: '2rem',
      }}
    >
      {/* Left — text */}
      <div>
        <p
          style={{
            fontFamily: 'var(--font-mono)',
            color: 'var(--pulsar-cyan)',
            fontSize: '0.875rem',
            marginBottom: '1rem',
            letterSpacing: '0.1em',
          }}
        >
          {HERO.sub}
        </p>

        <h1
          style={{
            fontSize: 'clamp(2.2rem, 4vw, 3.5rem)',
            fontWeight: 700,
            color: 'var(--star-white)',
            lineHeight: 1.1,
            marginBottom: '1.5rem',
            letterSpacing: '-0.02em',
          }}
        >
          {HERO.headline}
        </h1>

        <p
          style={{
            color: 'var(--muted)',
            fontSize: '1rem',
            lineHeight: 1.7,
            maxWidth: '420px',
            marginBottom: '2rem',
          }}
        >
          CS undergrad at IIIT Bhubaneswar building ML systems in Computer Vision
          and NLP. Currently researching novel OCR methodology for handwritten
          prescriptions.
        </p>

        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
          <CTAButton
            variant="primary"
            onClick={() =>
              document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })
            }
          >
            View Projects
          </CTAButton>
          <CTAButton
            variant="ghost"
            onClick={() => window.open(`mailto:${HERO.email}`)}
          >
            Get in Touch
          </CTAButton>
        </div>

        <div style={{ display: 'flex', gap: '1.5rem', marginTop: '2rem' }}>
          <a
            href={HERO.github}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              fontFamily: 'var(--font-mono)',
              color: 'var(--muted)',
              fontSize: '0.8rem',
              textDecoration: 'none',
              transition: 'color 200ms',
            }}
            onMouseEnter={handleEnter}
            onMouseLeave={handleLeave}
          >
            GitHub ↗
          </a>
          <a
            href={HERO.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              fontFamily: 'var(--font-mono)',
              color: 'var(--muted)',
              fontSize: '0.8rem',
              textDecoration: 'none',
              transition: 'color 200ms',
            }}
            onMouseEnter={handleEnter}
            onMouseLeave={handleLeave}
          >
            LinkedIn ↗
          </a>
        </div>
      </div>

      {/* Right — canvas */}
      <div style={{ height: '500px', position: 'relative' }}>
        <HeroCanvas />
      </div>
    </section>
  );
}