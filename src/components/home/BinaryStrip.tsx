'use client';

import { useState } from 'react';
import Link from 'next/link';

const MAX = 255;

// 홈에 놓는 축소판. 글 안에 있는 변환기와 같은 일을 하지만
// 테두리와 안내문 없이 한 줄로만 보여준다.
export default function BinaryStrip() {
  const [value, setValue] = useState('42');

  const num = Math.min(parseInt(value) || 0, MAX);
  const bits = num.toString(2).padStart(8, '0').split('');

  return (
    <div className="stack-sm">
      <div className="flex flex-wrap items-center gap-3">
        <label className="sr-only" htmlFor="binary-strip">
          십진수
        </label>
        <input
          id="binary-strip"
          inputMode="numeric"
          value={value}
          onChange={(e) => {
            const next = e.target.value;
            if (next === '' || /^\d{1,3}$/.test(next)) setValue(next);
          }}
          className="w-[4.5ch] border-b border-[#D2D2D7] bg-transparent pb-[2px] text-[1.05rem] font-medium tabular-nums text-[#1D1D1F] outline-none transition-[border-color] duration-150 focus-visible:border-[#1D1D1F]"
          aria-describedby="binary-strip-out"
        />

        <span aria-hidden="true" className="label-meta">
          →
        </span>

        <output
          id="binary-strip-out"
          className="flex gap-[3px]"
          aria-label={`${num}의 8비트 이진수`}
        >
          {bits.map((bit, i) => (
            <span
              key={i}
              className={`grid h-[26px] w-[22px] place-items-center font-mono text-[0.82rem] tabular-nums transition-colors duration-150 ${
                bit === '1'
                  ? 'bg-[#1D1D1F] text-[#FAFAFA]'
                  : 'bg-[#F2F2F7] text-[#AEAEB2]'
              }`}
            >
              {bit}
            </span>
          ))}
        </output>
      </div>

      <p className="text-[13px] leading-snug text-[#6E6E73]">
        숫자를 바꿔 보세요. 자리마다 128 · 64 · 32 … 1이 켜지고 꺼집니다.{' '}
        <Link
          href="/post/binary"
          className="text-[#1D1D1F] underline underline-offset-2 transition-[color] duration-150 hover:text-[#6E6E73]"
        >
          왜 하필 2진법인가 →
        </Link>
      </p>
    </div>
  );
}
