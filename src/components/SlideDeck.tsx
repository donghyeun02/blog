'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';

export default function SlideDeck({
  children,
}: {
  children: React.ReactNode[];
}) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const slideRefs = useRef<(HTMLDivElement | null)[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkIsMobile();
    window.addEventListener('resize', checkIsMobile);

    return () => window.removeEventListener('resize', checkIsMobile);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = slideRefs.current.findIndex(
              (ref) => ref === entry.target
            );
            if (index !== -1) {
              setCurrentSlide(index);
            }
          }
        });
      },
      {
        threshold: 0.5,
        rootMargin: '-10% 0px -10% 0px',
      }
    );

    slideRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, [children]);

  const handleScroll = () => {
    setIsScrolling(true);

    if (scrollTimeoutRef.current) {
      clearTimeout(scrollTimeoutRef.current);
    }

    scrollTimeoutRef.current = setTimeout(() => {
      setIsScrolling(false);
    }, 100);
  };

  const goToSlide = useCallback(
    (index: number) => {
      if (index >= 0 && index < children.length) {
        slideRefs.current[index]?.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        });
        setCurrentSlide(index);
      }
    },
    [children.length]
  );

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowDown' || e.key === 'PageDown') {
        e.preventDefault();
        goToSlide(currentSlide + 1);
      } else if (e.key === 'ArrowUp' || e.key === 'PageUp') {
        e.preventDefault();
        goToSlide(currentSlide - 1);
      } else if (e.key === 'Home') {
        e.preventDefault();
        goToSlide(0);
      } else if (e.key === 'End') {
        e.preventDefault();
        goToSlide(children.length - 1);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentSlide, children.length, goToSlide]);

  return (
    <div
      ref={containerRef}
      onScroll={handleScroll}
      style={{
        width: '100%',
        height: '100vh',
        overflowY: 'scroll',
        scrollSnapType: 'y mandatory',
        scrollBehavior: 'smooth',
        position: 'relative',
        scrollbarWidth: 'none',
        WebkitOverflowScrolling: 'touch',
        backgroundColor: '#FAFAFA',
        scrollSnapStop: 'always',
      }}
    >
      <style jsx>{`
        div::-webkit-scrollbar {
          display: none;
        }
      `}</style>

      {React.Children.map(children, (child, index) => (
        <div
          ref={(el) => {
            slideRefs.current[index] = el;
          }}
          style={{
            height: '100vh',
            width: '100%',
            display: 'flex',
            alignItems: index === 0 ? 'stretch' : 'center',
            justifyContent: index === 0 ? 'stretch' : 'center',
            scrollSnapAlign: 'start',
            scrollSnapStop: 'always',
            boxSizing: 'border-box',
            flexShrink: 0,
            position: 'relative',
            transition: 'opacity 0.2s ease',
            opacity: isScrolling ? 0.95 : 1,
            margin: 0,
            padding: 0,
            minHeight: isMobile ? '100vh' : 'auto',
            borderBottom: '1px solid transparent',
          }}
        >
          {child}
        </div>
      ))}

      {/* 페이지네이션 인디케이터 */}
      {!isMobile && (
        <div
          style={{
            position: 'fixed',
            right: '2rem',
            top: '50%',
            transform: 'translateY(-50%)',
            zIndex: 1000,
            display: 'flex',
            flexDirection: 'column',
            gap: '0.5rem',
          }}
        >
          {React.Children.map(children, (_, index) => (
            <div
              key={index}
              style={{
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                backgroundColor:
                  index === currentSlide
                    ? 'rgba(59, 130, 246, 0.6)'
                    : 'rgba(0, 0, 0, 0.15)',
                transition: 'all 0.3s ease',
                cursor: 'pointer',
                border: 'none',
                boxShadow: 'none',
              }}
              onClick={() => goToSlide(index)}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.2)';
                e.currentTarget.style.backgroundColor =
                  index === currentSlide
                    ? 'rgba(59, 130, 246, 0.8)'
                    : 'rgba(0, 0, 0, 0.25)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1)';
                e.currentTarget.style.backgroundColor =
                  index === currentSlide
                    ? 'rgba(59, 130, 246, 0.6)'
                    : 'rgba(0, 0, 0, 0.15)';
              }}
            />
          ))}
        </div>
      )}

      {/* 키보드 안내 (좌측 하단) */}
      {!isMobile && (
        <div
          style={{
            position: 'fixed',
            left: '2rem',
            bottom: '2rem',
            zIndex: 1000,
            padding: '0.6rem 1.2rem',
            background: 'rgba(0, 0, 0, 0.25)',
            borderRadius: '20px',
            backdropFilter: 'blur(8px)',
            border: '1px solid rgba(255, 255, 255, 0.15)',
            color: 'rgba(255, 255, 255, 0.8)',
            fontSize: '0.85rem',
            fontWeight: '400',
            transition: 'all 0.3s ease',
            opacity: 0.75,
          }}
        >
          ↑↓ 키보드로 이동
        </div>
      )}
    </div>
  );
}
