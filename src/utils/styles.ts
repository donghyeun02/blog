import { CSSProperties } from 'react';

// 공통 스타일 클래스들
export const commonStyles = {
  // 카드 스타일
  card: 'bg-white border border-gray-200 rounded-xl shadow-sm p-6',

  // 버튼 스타일
  button: {
    primary:
      'bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors',
    secondary:
      'bg-gray-600 text-white py-2 px-4 rounded-lg hover:bg-gray-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors',
    success:
      'bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors',
    warning:
      'bg-orange-600 text-white py-2 px-4 rounded-lg hover:bg-orange-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors',
  },

  // 입력 필드 스타일
  input:
    'w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500',

  // 상태 배지 스타일
  badge: {
    success: 'bg-green-100 text-green-700 border border-green-200',
    warning: 'bg-yellow-100 text-yellow-700 border border-yellow-200',
    error: 'bg-red-100 text-red-700 border border-red-200',
    info: 'bg-blue-100 text-blue-700 border border-blue-200',
  },

  // 레이아웃 스타일
  container: 'container mx-auto px-4 py-8 sm:py-12',
  maxWidth: 'max-w-6xl mx-auto',

  // 애니메이션 스타일
  motion: {
    fadeIn: 'initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}',
    slideIn: 'initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}',
  },
};

// 반응형 클래스들
export const responsiveClasses = {
  text: {
    h1: 'text-3xl sm:text-4xl md:text-5xl',
    h2: 'text-2xl sm:text-3xl md:text-4xl',
    h3: 'text-xl sm:text-2xl md:text-3xl',
    body: 'text-sm sm:text-base',
    small: 'text-xs sm:text-sm',
  },

  padding: {
    container: 'py-8 sm:py-12 lg:py-16',
    section: 'py-6 sm:py-8 lg:py-12',
  },

  grid: {
    posts: 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8',
    cards: 'grid grid-cols-1 lg:grid-cols-2 gap-6',
  },
};

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
