'use client';

import React, { useState, useEffect, useRef } from 'react';

export default function SlideSection({
  visual,
  content,
  title,
  isFirstSlide = false,
}: {
  visual?: React.ReactNode;
  content: React.ReactNode;
  title?: string;
  isFirstSlide?: boolean;
}) {
  const [isMobile, setIsMobile] = useState(false);
  const [needsShrink, setNeedsShrink] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkIsMobile();
    window.addEventListener('resize', checkIsMobile);
    return () => window.removeEventListener('resize', checkIsMobile);
  }, []);

  useEffect(() => {
    if (contentRef.current) {
      const parentHeight = contentRef.current.parentElement?.clientHeight || 0;
      const contentHeight = contentRef.current.scrollHeight;

      // 기준: 부모 높이의 90% 넘으면 축소
      setNeedsShrink(contentHeight > parentHeight * 0.9);
    }
  }, [content, isMobile]);

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: visual ? (isMobile ? 'column' : 'row') : 'column',
        gap: '0',
        margin: '0',
        alignItems: visual ? 'center' : 'stretch',
        height: isMobile ? 'auto' : '100vh',
        minHeight: isMobile ? 'calc(100vh - 120px)' : 'auto',
        padding: isFirstSlide
          ? isMobile
            ? '0 20px 40px 20px'
            : '0 40px 60px 40px'
          : isMobile
            ? '40px 20px'
            : '60px 40px',
        borderBottom: 'none',
      }}
    >
      {visual && (
        <div
          style={{
            flex: isMobile ? '0 0 auto' : '0 0 35%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: isMobile ? '100%' : '35%',
            height: isMobile ? 'auto' : '100%',
            maxHeight: isMobile ? '150px' : '100%',
            overflow: 'hidden',
            order: isMobile ? 1 : 'unset',
          }}
        >
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              width: '100%',
              height: '100%',
            }}
          >
            {visual}
          </div>
        </div>
      )}
      <div
        style={{
          flex: visual ? (isMobile ? '1 1 auto' : '0 0 65%') : '1 1 100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-start',
          minWidth: 0,
          minHeight: visual ? 'auto' : '100%',
          order: visual ? (isMobile ? 2 : 'unset') : 'unset',
          width: visual ? (isMobile ? '100%' : '65%') : '100%',
          overflow: 'hidden',
          padding: visual
            ? isMobile
              ? '10px'
              : '20px'
            : isMobile
              ? '20px'
              : '30px',
          boxSizing: 'border-box',
        }}
      >
        {title && (
          <h2
            style={{
              marginBottom: '1rem',
              color: '#1f2937',
              fontSize: visual
                ? isMobile
                  ? 'clamp(0.8rem, 2vw, 1rem)'
                  : 'clamp(1rem, 2.5vw, 1.3rem)'
                : isMobile
                  ? 'clamp(1rem, 3vw, 1.2rem)'
                  : 'clamp(1.2rem, 4vw, 1.5rem)',
              fontWeight: 'bold',
              textAlign: isMobile ? 'center' : 'left',
            }}
          >
            {title}
          </h2>
        )}
        <div
          ref={contentRef}
          style={{
            fontSize: needsShrink
              ? isMobile
                ? 'clamp(0.8rem, 1.6vw, 0.9rem)'
                : 'clamp(0.9rem, 1.4vw, 1rem)'
              : isMobile
                ? 'clamp(0.95rem, 2vw, 1.05rem)'
                : 'clamp(1rem, 2vw, 1.2rem)',
            lineHeight: '1.5',
            textAlign: isMobile ? 'center' : 'left',
            overflowY: 'auto',
            maxHeight: '100%',
          }}
        >
          {content}
        </div>
      </div>
    </div>
  );
}
