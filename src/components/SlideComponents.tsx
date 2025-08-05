import React from 'react';
import SlideSection from './SlideSection';

export function MainSlide({
  title,
  tags,
  summary,
  author,
  date,
  integrityStatus,
}: {
  title: string;
  tags: string[];
  summary: string;
  author: string;
  date: string;
  integrityStatus?: {
    isValid: boolean;
    message: string;
  } | null;
}) {
  // 전역 변수에서 integrityStatus 가져오기
  const globalIntegrityStatus =
    (typeof window !== 'undefined' &&
      (
        window as Window & {
          integrityStatus?: { isValid: boolean; message: string } | null;
        }
      ).integrityStatus) ||
    integrityStatus;

  // 모바일 감지
  const [isMobile, setIsMobile] = React.useState(false);

  React.useEffect(() => {
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
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        width: '100%',
        margin: 0,
        padding: 0,
      }}
    >
      <div
        style={{
          position: 'relative',
          zIndex: 10,
          maxWidth: '64rem',
          margin: '0',
          padding: '0',
          textAlign: 'center',
          width: '100%',
          height: '100vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        {/* 태그들과 무결성 검증 */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            alignItems: 'center',
            gap: 'clamp(0.25rem, 1vw, 0.5rem)',
            marginBottom: 'clamp(2rem, 6vw, 3.5rem)',
            position: 'relative',
            width: '100%',
          }}
        >
          {/* 태그들과 무결성 검증 */}
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'center',
              gap: 'clamp(0.25rem, 1vw, 0.5rem)',
            }}
          >
            {tags.map((tag, index) => (
              <span
                key={index}
                style={{
                  padding:
                    'clamp(0.05rem, 0.5vw, 0.1rem) clamp(0.25rem, 1.5vw, 0.5rem)',
                  borderRadius: 'clamp(0.5rem, 1.5vw, 0.75rem)',
                  backgroundColor: 'rgba(255, 255, 255, 0.6)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  color: '#374151',
                  fontSize: 'clamp(0.625rem, 2vw, 0.75rem)',
                  fontWeight: '350',
                  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                }}
              >
                {tag}
              </span>
            ))}

            {/* 무결성 검증 (모바일에서는 태그들과 함께, 데스크톱에서는 오른쪽 끝) */}
            {globalIntegrityStatus && (
              <span
                style={{
                  position: isMobile ? 'static' : 'absolute',
                  right: isMobile ? 'auto' : '0',
                  top: isMobile ? 'auto' : '50%',
                  transform: isMobile ? 'none' : 'translateY(-50%)',
                  padding:
                    'clamp(0.05rem, 0.5vw, 0.1rem) clamp(0.25rem, 1.5vw, 0.5rem)',
                  borderRadius: 'clamp(0.5rem, 1.5vw, 0.75rem)',
                  backgroundColor: globalIntegrityStatus.isValid
                    ? 'rgba(34, 197, 94, 0.1)'
                    : 'rgba(239, 68, 68, 0.1)',
                  color: globalIntegrityStatus.isValid ? '#16a34a' : '#dc2626',
                  border: `1px solid ${
                    globalIntegrityStatus.isValid
                      ? 'rgba(34, 197, 94, 0.2)'
                      : 'rgba(239, 68, 68, 0.2)'
                  }`,
                  fontSize: 'clamp(0.625rem, 2vw, 0.75rem)',
                  fontWeight: '350',
                  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                  maxWidth: isMobile ? 'auto' : 'clamp(120px, 25vw, 200px)',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                }}
              >
                {globalIntegrityStatus.isValid ? '✅' : '❌'}{' '}
                {globalIntegrityStatus.isValid
                  ? '무결성 검증 성공'
                  : '무결성 검증 실패'}
              </span>
            )}
          </div>
        </div>

        {/* 제목 */}
        <h1
          style={{
            fontSize: 'clamp(24px, 5vw, 60px)',
            margin: '0 !important',
            padding: '0 !important',
            color: '#1f2937',
            fontWeight: '500',
            lineHeight: '1.1',
            display: 'block',
            textAlign: 'center',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          }}
        >
          {title}
        </h1>

        {/* 요약문 */}
        <p
          style={{
            fontSize: 'clamp(0.875rem, 2.5vw, 1.125rem)',
            color: '#6b7280',
            maxWidth: 'clamp(20rem, 80vw, 42rem)',
            margin: 'clamp(0.25rem, 1vw, 0.5rem) 0 0 0',
            lineHeight: 'clamp(1.3, 1.5, 1.4)',
            textAlign: 'center',
          }}
        >
          {summary}
        </p>

        {/* 메타 정보 */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: 'clamp(1rem, 3vw, 1.75rem)',
            color: '#9ca3af',
            fontSize: 'clamp(0.625rem, 2vw, 0.75rem)',
            marginTop: 'clamp(0.75rem, 2vw, 1rem)',
          }}
        >
          <span>{date}</span>
          <span>{author}</span>
        </div>
      </div>
    </div>
  );
}

export function SlideLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      {React.Children.map(children, (child, index) => (
        <div key={index}>{child}</div>
      ))}
    </div>
  );
}

export function Slide({
  title,
  children,
  image,
  imageAlt = '',
  layout = 'split',
}: {
  title?: string;
  children: React.ReactNode;
  image?: string;
  imageAlt?: string;
  layout?: 'split' | 'full' | 'text-only' | 'main';
}) {
  if (layout === 'main') {
    return (
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '100vh',
          width: '100%',
          margin: 0,
          padding: 0,
        }}
      >
        {children}
      </div>
    );
  }

  if (layout === 'text-only') {
    return (
      <div
        style={{
          display: 'flex',
          gap: '4rem',
          margin: '4rem 0',
          alignItems: 'center',
          minHeight: '500px',
          padding: '2rem',
          borderBottom: '1px solid #e5e7eb',
        }}
      >
        <div
          style={{
            flex: '1 1 100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            minWidth: 0,
            minHeight: '400px',
          }}
        >
          {title && (
            <h2
              style={{
                marginBottom: '1.5rem',
                color: '#1f2937',
                fontSize: '1.5rem',
                fontWeight: 'bold',
              }}
            >
              {title}
            </h2>
          )}
          <div style={{ lineHeight: '1.7' }}>{children}</div>
        </div>
      </div>
    );
  }

  if (layout === 'full') {
    return (
      <SlideSection
        visual={
          image ? (
            <img
              src={image}
              alt={imageAlt}
              style={{
                width: 'clamp(300px, 80vw, 600px)',
                height: 'auto',
                borderRadius: '12px',
                boxShadow: '0 8px 25px rgba(0, 0, 0, 0.15)',
                objectFit: 'contain',
              }}
            />
          ) : (
            <div style={{ flex: 1 }} />
          )
        }
        content={
          <div>
            {title && (
              <h2
                style={{
                  marginBottom: '1rem',
                  color: '#1f2937',
                  fontSize: '1.5rem',
                  fontWeight: 'bold',
                }}
              >
                {title}
              </h2>
            )}
            {children}
          </div>
        }
      />
    );
  }

  return (
    <SlideSection
      visual={
        image ? (
          <img
            src={image}
            alt={imageAlt}
            style={{
              width: 'clamp(300px, 80vw, 600px)',
              height: 'auto',
              borderRadius: '12px',
              boxShadow: '0 8px 25px rgba(0, 0, 0, 0.15)',
              objectFit: 'contain',
            }}
          />
        ) : (
          <div
            style={{
              background: '#f8f9fa',
              padding: 'clamp(1rem, 4vw, 2rem)',
              borderRadius: '12px',
              border: '2px solid #e5e7eb',
              maxWidth: 'clamp(250px, 70vw, 400px)',
              textAlign: 'center',
              color: '#6b7280',
            }}
          >
            이미지 없음
          </div>
        )
      }
      content={
        <div>
          {title && (
            <h2
              style={{
                marginBottom: '1rem',
                color: '#1f2937',
                fontSize: '1.5rem',
                fontWeight: 'bold',
              }}
            >
              {title}
            </h2>
          )}
          {children}
        </div>
      }
    />
  );
}

export function CodeSlide({
  title,
  code,
  children,
}: {
  title?: string;
  code: string;
  children: React.ReactNode;
}) {
  return (
    <SlideSection
      title={title}
      visual={
        <div
          style={{
            background: '#1e293b',
            padding: 'clamp(0.5rem, 2vw, 1rem)',
            borderRadius: '12px',
            fontFamily: "'JetBrains Mono', 'Fira Code', 'Consolas', monospace",
            fontSize: 'clamp(0.75rem, 2vw, 0.9rem)',
            border: '1px solid #334155',
            boxShadow: '0 8px 25px rgba(0, 0, 0, 0.2)',
            width: 'clamp(300px, 80vw, 600px)',
            color: '#e2e8f0',
            overflowX: 'hidden',
            overflowY: 'auto',
            minHeight: 'clamp(150px, 30vh, 300px)',
            maxHeight: 'clamp(250px, 50vh, 400px)',
            lineHeight: '1.5',
            cursor: 'text',
            userSelect: 'text',
            WebkitOverflowScrolling: 'touch',
            margin: 0,
            display: 'block',
            scrollbarWidth: 'thin',
            scrollbarColor: '#475569 #1e293b',
          }}
          className="custom-scrollbar"
        >
          <pre
            style={{
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <code
              style={{
                fontFamily: 'inherit',
                fontSize: 'inherit',
                color: 'inherit',
                display: 'block',
                flex: 1,
              }}
            >
              {code}
            </code>
          </pre>
        </div>
      }
      content={children}
    />
  );
}
