'use client';

import './viewer.css';

import dynamic from 'next/dynamic';
import { useEffect, useRef, useState } from 'react';

// 불러오기 전과 후가 같은 크기여야 글이 밀리지 않는다. 비율은 CSS 변수로 넘긴다.
function Placeholder() {
  return (
    <>
      <div className="studio-viewer-stage" />
      <div className="studio-viewer-bar" aria-hidden="true" />
    </>
  );
}

// React Flow는 무겁다. 도면이 화면 가까이 올 때만 이 청크를 받는다.
const StudioViewer = dynamic(() => import('./StudioViewer'), {
  ssr: false,
  loading: Placeholder,
});

type Props = {
  /** public/studio/docs/<doc>.json */
  doc: string;
  caption: string;
  /** 도면의 가로 ÷ 세로 */
  ratio: number;
};

export default function StudioDiagram({ doc, caption, ratio }: Props) {
  const ref = useRef<HTMLElement>(null);
  const [isNear, setIsNear] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const near = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) setIsNear(true);
      },
      { rootMargin: '600px 0px' }
    );
    // 화면에서 벗어나면 재생을 멈춰서 보이지 않는 패킷에 CPU를 쓰지 않는다.
    const seen = new IntersectionObserver(
      ([entry]) => setIsVisible(!!entry?.isIntersecting),
      { threshold: 0.1 }
    );
    near.observe(el);
    seen.observe(el);
    return () => {
      near.disconnect();
      seen.disconnect();
    };
  }, []);

  return (
    <figure ref={ref} className="studio-figure">
      <div
        className="studio-viewer"
        style={{ '--studio-ratio': ratio } as React.CSSProperties}
      >
        {isNear ? (
          <StudioViewer doc={doc} caption={caption} visible={isVisible} />
        ) : (
          <Placeholder />
        )}
      </div>
      <figcaption>{caption}</figcaption>
    </figure>
  );
}
