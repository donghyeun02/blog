'use client';

import React, { useState, useEffect } from 'react';

export default function SlideSection({
  visual,
  content,
  title,
}: {
  visual: React.ReactNode;
  content: React.ReactNode;
  title?: string;
}) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkIsMobile();
    window.addEventListener('resize', checkIsMobile);

    return () => window.removeEventListener('resize', checkIsMobile);
  }, []);

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: isMobile ? 'column' : 'row',
        gap: isMobile ? '0' : 'clamp(2rem, 6vw, 4rem)',
        margin: isMobile
          ? 'clamp(1rem, 3vw, 2rem) 0'
          : 'clamp(2rem, 6vw, 4rem) 0',
        alignItems: 'center',
        minHeight: isMobile
          ? 'clamp(500px, 70vh, 600px)'
          : 'clamp(400px, 55vh, 500px)',
        padding: isMobile
          ? 'clamp(0.5rem, 2vw, 1rem)'
          : 'clamp(1rem, 4vw, 2rem)',
        borderBottom: 'none',
      }}
    >
      <div
        style={{
          flex: isMobile ? '1 1 100%' : '1 1 50%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: isMobile
            ? 'clamp(200px, 30vh, 300px)'
            : 'clamp(120px, 25vh, 250px)',
          height: isMobile ? 'clamp(200px, 30vh, 300px)' : 'fit-content',
          overflow: 'visible',
          order: isMobile ? 1 : 'unset',
          width: isMobile ? '100%' : '50%',
        }}
      >
        {visual}
      </div>
      <div
        style={{
          flex: isMobile ? '1 1 100%' : '1 1 50%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          minWidth: 0,
          minHeight: isMobile
            ? 'clamp(120px, 25vh, 200px)'
            : 'clamp(220px, 40vh, 400px)',
          order: isMobile ? 2 : 'unset',
          width: isMobile ? '100%' : '50%',
        }}
      >
        {title && (
          <h2
            style={{
              marginBottom: 'clamp(1rem, 3vw, 1.5rem)',
              color: '#1f2937',
              fontSize: 'clamp(1.25rem, 3vw, 1.5rem)',
              fontWeight: 'bold',
              textAlign: isMobile ? 'center' : 'left',
            }}
          >
            {title}
          </h2>
        )}
        <div
          style={{
            lineHeight: 'clamp(1.5, 1.8, 1.7)',
            textAlign: isMobile ? 'center' : 'left',
          }}
        >
          {content}
        </div>
      </div>
    </div>
  );
}
