import { CSSProperties } from 'react';

// 반응형 스타일 생성
export function createResponsiveStyles(isMobile: boolean) {
  return {
    box: (isMobile
      ? {
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: 120,
          gap: 8,
          background: 'linear-gradient(90deg, #f8fafc 0%, #e0e7ff 100%)',
          borderRadius: 10,
          margin: '12px auto',
          boxShadow: '0 1px 4px #0001',
          width: '100%',
          maxWidth: '100%',
          padding: '16px 8px',
          border: '1px solid #e5e7eb',
          boxSizing: 'border-box' as const,
        }
      : {
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: 140,
          gap: 16,
          background: 'linear-gradient(90deg, #f8fafc 0%, #e0e7ff 100%)',
          borderRadius: 16,
          margin: '40px auto 32px auto',
          boxShadow: '0 4px 16px #0001',
          width: '100%',
          padding: '32px 32px',
          border: '1px solid #e5e7eb',
          boxSizing: 'border-box' as const,
        }) as CSSProperties,
    errorBox: (isMobile
      ? {
          background: '#fef2f2',
          color: '#b91c1c',
          border: '1px solid #fecaca',
          borderRadius: 10,
          padding: 14,
          margin: '16px auto',
          display: 'flex',
          alignItems: 'center',
          gap: 8,
          maxWidth: '100%',
          width: '100%',
        }
      : {
          background: '#fef2f2',
          color: '#b91c1c',
          border: '1px solid #fecaca',
          borderRadius: 12,
          padding: 20,
          margin: '32px auto 24px auto',
          display: 'flex',
          alignItems: 'center',
          gap: 12,
          maxWidth: 520,
          width: '100%',
        }) as CSSProperties,
    notFoundBox: (isMobile
      ? {
          background: '#f1f5f9',
          color: '#334155',
          border: '1px solid #cbd5e1',
          borderRadius: 10,
          padding: 14,
          margin: '16px auto',
          display: 'flex',
          alignItems: 'center',
          gap: 8,
          maxWidth: '100%',
          width: '100%',
        }
      : {
          background: '#f1f5f9',
          color: '#334155',
          border: '1px solid #cbd5e1',
          borderRadius: 12,
          padding: 20,
          margin: '32px auto 24px auto',
          display: 'flex',
          alignItems: 'center',
          gap: 12,
          maxWidth: 520,
          width: '100%',
        }) as CSSProperties,
    iconSize: isMobile ? 28 : 36,
    fontTitle: {
      fontWeight: 600,
      fontSize: isMobile ? 13 : 16,
      color: '#3730a3',
      textAlign: 'center' as const,
      lineHeight: 1.3,
    } as CSSProperties,
    fontDesc: {
      fontSize: isMobile ? 10 : 13,
      color: '#64748b',
      textAlign: 'center' as const,
      lineHeight: 1.5,
    } as CSSProperties,
  };
}

// 태그 렌더링 유틸리티
export function renderTags(tags: string[], maxDisplay: number = 3) {
  const displayTags = tags.slice(0, maxDisplay);
  const remainingCount = tags.length - maxDisplay;

  return {
    displayTags,
    remainingCount,
    hasMore: remainingCount > 0,
  };
}

// 날짜 포맷팅
export function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}
