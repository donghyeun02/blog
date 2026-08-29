import Link from 'next/link';
import { ViewTransition } from 'react';
import type { PostMeta } from '@/types';

// 날짜(YY.MM)와 제목만 있는 한 줄. 요약도 카드도 없다.
// 목록에서 훑을 때 필요한 건 언제 쓴 무엇인지 두 가지뿐이다.
export default function PostRow({ post }: { post: PostMeta }) {
  return (
    <Link href={post.path} className="row">
      <span className="row-date">{post.date?.replace('20', '')}</span>
      <ViewTransition
        name={`post-title-${post.slug}`}
        share="morph"
        default="none"
      >
        <span className="row-title">{post.title}</span>
      </ViewTransition>
    </Link>
  );
}
