import type { MDXComponents } from 'mdx/types';
import React from 'react';

interface TruthTableProps {
  title: string;
  headers: string[];
  rows: (string | number)[][];
}

function TruthTable({ title, headers, rows }: TruthTableProps) {
  return (
    <div className="my-6">
      <h4 className="text-lg font-bold text-[#1D1D1F] mb-3">{title}</h4>
      <div className="overflow-x-auto">
        <table className="min-w-full border border-[#D2D2D7] rounded-lg overflow-hidden">
          <thead>
            <tr>
              {headers.map((header, index) => (
                <th
                  key={index}
                  className="border border-[#D2D2D7] px-4 py-2 bg-[#F5F5F7] font-bold text-[#1D1D1F] text-left"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, rowIndex) => (
              <tr
                key={rowIndex}
                className={rowIndex % 2 === 0 ? 'bg-white' : 'bg-[#FAFAFA]'}
              >
                {row.map((cell, cellIndex) => (
                  <td
                    key={cellIndex}
                    className="border border-[#D2D2D7] px-4 py-2 text-[#3C3C43]"
                  >
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// 인터랙티브 컴포넌트는 여기 두지 않는다. 여기 두면 이 모듈이 모든 글의
// 번들 그래프에 들어가서 글자만 있는 글까지 전부 내려받게 된다.
// 필요한 글이 각자 MDX 상단에서 import한다.
export const mdxComponents: MDXComponents = {
  TruthTable,

  // 마크다운은 blockquote를 p 안에 넣기도 하는데 p 안의 blockquote는
  // 유효하지 않은 HTML이라 div로 바꿔 준다.
  p: ({ children, ...props }) => {
    const hasBlockquote = React.Children.toArray(children).some(
      (child) => React.isValidElement(child) && child.type === 'blockquote'
    );
    return hasBlockquote ? (
      <div {...props}>{children}</div>
    ) : (
      <p {...props}>{children}</p>
    );
  },
};

// @next/mdx가 컴파일한 MDX는 이 함수를 통해 컴포넌트를 찾는다.
// components prop을 따로 넘기지 않아도 되고 서버 컴포넌트에서 동작한다.
export function useMDXComponents(components: MDXComponents): MDXComponents {
  return { ...components, ...mdxComponents };
}
