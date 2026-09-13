import type { Metadata } from 'next';
import StudioLoader from '@/components/studio/StudioLoader';

export const metadata: Metadata = {
  title: '스튜디오 · donghyeun02',
  description:
    'ERD, 아키텍처, 흐름도를 만드는 곳입니다.',
};

export default function StudioPage() {
  return (
    <div className="studio-page">
      <h1 className="sr-only">다이어그램 스튜디오</h1>
      <StudioLoader />
    </div>
  );
}
