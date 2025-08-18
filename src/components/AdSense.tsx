import { useEffect, useState } from 'react';

interface AdSenseProps {
  adSlot: string;
  adFormat?: 'auto' | 'fluid';
  style?: React.CSSProperties;
  className?: string;
}

export default function AdSense({
  adSlot,
  adFormat = 'auto',
  style,
  className,
}: AdSenseProps) {
  const [adError, setAdError] = useState(false);

  useEffect(() => {
    try {
      // AdSense가 로드되었는지 확인
      if (typeof window !== 'undefined') {
        const adsbygoogle = (window as Window & { adsbygoogle?: unknown[] })
          .adsbygoogle;
        if (adsbygoogle) {
          adsbygoogle.push({});
        }
      }
    } catch (error) {
      console.error('AdSense error:', error);
      setAdError(true);
    }
  }, []);

  // 에러가 있으면 플레이스홀더 표시
  if (adError) {
    return (
      <div
        className={`adsense-placeholder ${className || ''}`}
        style={{
          ...style,
          minHeight: '250px',
          backgroundColor: '#f3f4f6',
          border: '2px dashed #d1d5db',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#6b7280',
          fontSize: '14px',
        }}
      >
        광고 영역
      </div>
    );
  }

  return (
    <div className={`adsense-container ${className || ''}`} style={style}>
      <ins
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client="ca-pub-5803293251875548"
        data-ad-slot={adSlot}
        data-ad-format={adFormat}
        data-full-width-responsive="true"
      />
    </div>
  );
}
