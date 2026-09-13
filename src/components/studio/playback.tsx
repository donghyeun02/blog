'use client';

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  useSyncExternalStore,
} from 'react';
import type { FlowEdgeType, PlayMode } from './types';

export type Playback = {
  mode: PlayMode;
  /** 단계 재생 중 지금 흐르는 번호 */
  activeStep: number | null;
  /** 지금 단계의 선이 도착하는 노드 */
  activeNodes: ReadonlySet<string>;
  reducedMotion: boolean;
};

const NO_NODES: ReadonlySet<string> = new Set();

export const PAUSED: Playback = {
  mode: 'off',
  activeStep: null,
  activeNodes: NO_NODES,
  reducedMotion: false,
};

export const PlaybackContext = createContext<Playback>(PAUSED);

export const usePlayback = () => useContext(PlaybackContext);

const REDUCED_MOTION = '(prefers-reduced-motion: reduce)';

function subscribe(onChange: () => void) {
  const query = window.matchMedia(REDUCED_MOTION);
  query.addEventListener('change', onChange);
  return () => query.removeEventListener('change', onChange);
}

export function useReducedMotion(): boolean {
  return useSyncExternalStore(
    subscribe,
    () => window.matchMedia(REDUCED_MOTION).matches,
    () => false
  );
}

export const STEP_MS = 1800;

/** 선에 매긴 단계 번호로 재생 상태를 만든다. 편집기와 글 속 뷰어가 같이 쓴다. */
export function useStepPlayback(
  edges: readonly FlowEdgeType[],
  mode: PlayMode,
  paused = false
) {
  const reducedMotion = useReducedMotion();
  const [stepIndex, setStepIndex] = useState(0);

  const steps = useMemo(
    () =>
      [
        ...new Set(
          edges.flatMap((e) =>
            typeof e.data?.step === 'number' ? [e.data.step] : []
          )
        ),
      ].sort((a, b) => a - b),
    [edges]
  );

  useEffect(() => {
    if (paused || mode !== 'steps' || steps.length < 2) return;
    const timer = setInterval(
      () => setStepIndex((i) => (i + 1) % steps.length),
      STEP_MS
    );
    return () => clearInterval(timer);
  }, [paused, mode, steps.length]);

  const activeStep =
    mode === 'steps' && steps.length > 0
      ? steps[stepIndex % steps.length]
      : null;
  const activeNodes = useMemo(
    () =>
      activeStep === null
        ? NO_NODES
        : new Set(
            edges
              .filter((e) => e.data?.step === activeStep && !e.data?.blocked)
              .map((e) => e.target)
          ),
    [edges, activeStep]
  );
  const playback = useMemo<Playback>(
    () => (paused ? PAUSED : { mode, activeStep, activeNodes, reducedMotion }),
    [paused, mode, activeStep, activeNodes, reducedMotion]
  );

  return {
    playback,
    hasSteps: steps.length > 0,
    stepLabel:
      activeStep === null
        ? null
        : `${(stepIndex % steps.length) + 1} / ${steps.length} 단계`,
    resetSteps: () => setStepIndex(0),
  };
}
