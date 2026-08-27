'use client';

import dynamic from 'next/dynamic';

// 글 안의 인터랙티브 위젯은 전부 여기서 lazy로 만든다.
//
// 서버 컴포넌트에서 dynamic()을 쓰면 Next가 라우트 단위 클라이언트 매니페스트에
// 전부 집어넣기 때문에 /post/[slug] 하나를 공유하는 모든 글이 같은 청크를
// 내려받는다. 클라이언트 모듈 안에서 만들어야 실제로 렌더될 때만 받는다.
//
// 위젯은 어차피 JS가 있어야 동작하므로 ssr: false로 두고 자리만 잡아 둔다.

const Placeholder = () => (
  <div
    className="my-6 h-40 w-full animate-pulse bg-[#F5F5F7]"
    aria-hidden="true"
  />
);

const lazyDefault = (loader: () => Promise<{ default: React.ComponentType }>) =>
  dynamic(loader, { ssr: false, loading: Placeholder });

export const DecimalToBinaryConverter = lazyDefault(
  () => import('@/components/CS/Binary/DecimalToBinaryConverter')
);
export const TextToBinaryConverter = lazyDefault(
  () => import('@/components/CS/Binary/TextToBinaryConverter')
);
export const ColorToBinaryConverter = lazyDefault(
  () => import('@/components/CS/Binary/ColorToBinaryConverter')
);
export const CalculatorDecimalToBinaryConverter = lazyDefault(
  () => import('@/components/CS/DecimalToBinaryConverter')
);
export const HttpFlowDemo = lazyDefault(
  () => import('@/components/Backend/HttpFlowDemo')
);
export const CentralizedVsDecentralized = lazyDefault(
  () => import('@/components/Blockchain/CentralizedVsDecentralized')
);
export const SmartContractLegalQuiz = lazyDefault(
  () => import('@/components/Blockchain/SmartContractLegalQuiz')
);
export const PathTraversalDemo = lazyDefault(
  () => import('@/components/Security/PathTraversalDemo')
);

// reactflow를 끌고 오는 시뮬레이터들
const lazyGate = (
  pick: (
    m: typeof import('@/components/CS/gateSimulators')
  ) => React.ComponentType
) =>
  dynamic(() => import('@/components/CS/gateSimulators').then(pick), {
    ssr: false,
    loading: Placeholder,
  });

export const BufferGateSimulator = lazyGate((m) => m.BufferGateSimulator);
export const HalfAdderSimulator = lazyGate((m) => m.HalfAdderSimulator);
export const FullAdderSimulator = lazyGate((m) => m.FullAdderSimulator);
export const FullAdderFromHalfAddersSimulator = lazyGate(
  (m) => m.FullAdderFromHalfAddersSimulator
);
