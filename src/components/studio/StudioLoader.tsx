'use client';

import dynamic from 'next/dynamic';

// 편집기는 브라우저 저장소와 캔버스가 있어야 동작하므로 서버에서 그리지 않는다.
// 클라이언트 모듈 안에서 dynamic을 써야 React Flow가 이 페이지 청크로만 분리된다.
const Studio = dynamic(() => import('./Studio'), {
  ssr: false,
  loading: () => (
    <div className="px-4 py-4">
      <div
        className="h-[70dvh] w-full animate-pulse bg-[#F2F2F7]"
        aria-hidden="true"
      />
    </div>
  ),
});

export default function StudioLoader() {
  return <Studio />;
}
