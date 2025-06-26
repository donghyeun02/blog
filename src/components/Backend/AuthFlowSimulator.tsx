'use client';
import React, { useState, useRef, useEffect } from 'react';
import CookieVulnerabilityVisualizer from './CookieVulnerabilityVisualizer';

const MODES = [
  { id: 'none', label: '쿠키/세션 없음' },
  { id: 'cookie', label: '쿠키 인증' },
  { id: 'session', label: '세션 인증' },
];

const STEPS = {
  none: [
    { label: '로그인', action: 'login' },
    { label: '요청', action: 'request' },
    { label: '로그아웃', action: 'logout' },
  ],
  cookie: [
    { label: '로그인', action: 'login' },
    { label: '요청', action: 'request' },
    { label: '로그아웃', action: 'logout' },
  ],
  session: [
    { label: '로그인', action: 'login' },
    { label: '요청', action: 'request' },
    { label: '로그아웃', action: 'logout' },
  ],
};

const ARROWS_HORIZONTAL = { login: '➡️', request: '➡️', logout: '⬅️' };
const ARROWS_VERTICAL = { login: '⬇️', request: '⬇️', logout: '⬆️' };

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 640);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);
  return isMobile;
}

export default function AuthFlowSimulator() {
  const [mode, setMode] = useState('none');
  const [step, setStep] = useState(0);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [cookie, setCookie] = useState<string | null>(null);
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [serverSession, setServerSession] = useState<{
    id: string;
    user: string;
    data: { isLoggedIn: boolean };
  } | null>(null);
  const [log, setLog] = useState<string[]>([]);
  const [showCookieVuln, setShowCookieVuln] = useState(false);
  const [completed, setCompleted] = useState(false);
  const logRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();
  const ARROWS = isMobile ? ARROWS_VERTICAL : ARROWS_HORIZONTAL;

  useEffect(() => {
    if (logRef.current) {
      logRef.current.scrollTop = logRef.current.scrollHeight;
    }
  }, [log]);

  useEffect(() => {
    // 상태 초기화 시 step도 0으로
    setStep(0);
    setIsLoggedIn(false);
    setCookie(null);
    setSessionId(null);
    setServerSession(null);
    setLog([]);
    setShowCookieVuln(false); // 모드 바뀌면 시각화 숨김
  }, [mode]);

  // 단계별 동작
  const handleStep = (action: string) => {
    if (completed) return;
    if (action === 'login') {
      if (mode === 'none') {
        setIsLoggedIn(true);
        setLog((prev) => [
          ...prev,
          '🔓 로그인 성공! (상태 유지 안 됨)',
          'ℹ️ 새로고침하면 다시 로그인해야 해요.',
        ]);
      } else if (mode === 'cookie') {
        setIsLoggedIn(true);
        setCookie('userId=User01');
        setLog((prev) => [
          ...prev,
          '🔓 로그인 성공! (쿠키에 내 정보 저장)',
          '📋 서버가 쿠키를 브라우저에 보냄 (userId=User01)',
          '💾 브라우저: 쿠키 저장 완료',
        ]);
        setShowCookieVuln(true); // 로그인 시 시각화 표시
      } else if (mode === 'session') {
        setIsLoggedIn(true);
        const sid = 'sess_' + Math.random().toString(36).substr(2, 8);
        setSessionId(sid);
        setServerSession({
          id: sid,
          user: 'User01',
          data: { isLoggedIn: true },
        });
        setCookie(`sessionId=${sid}`);
        setLog((prev) => [
          ...prev,
          '🔓 로그인 성공! (서버에 내 정보 저장)',
          `🍪 서버가 세션ID를 쿠키로 보냄 (sessionId=${sid})`,
          `🗄️ 서버: 세션 저장소에 내 정보 저장 (ID: ${sid})`,
        ]);
      }
    } else if (action === 'request') {
      if (mode === 'none') {
        setLog((prev) => [
          ...prev,
          '📤 요청: 로그인 기록 없음',
          '❌ 서버: 누가 요청했는지 몰라서, 다시 로그인하라고 해요.',
        ]);
      } else if (mode === 'cookie') {
        if (cookie) {
          setLog((prev) => [
            ...prev,
            `📤 요청: 쿠키와 함께 서버에 요청 (${cookie})`,
            '✅ 서버: 쿠키로 사용자를 확인, 로그인 유지!',
          ]);
        } else {
          setLog((prev) => [
            ...prev,
            '📤 요청: 쿠키 없음',
            '❌ 서버: 쿠키가 없어서, 다시 로그인하라고 해요.',
          ]);
        }
      } else if (mode === 'session') {
        if (
          cookie &&
          sessionId &&
          serverSession &&
          cookie.includes(sessionId)
        ) {
          setLog((prev) => [
            ...prev,
            `📤 요청: 세션ID 쿠키와 함께 서버에 요청 (${cookie})`,
            `🗄️ 서버: 세션ID로 내 정보 확인 (ID: ${sessionId})`,
            '✅ 서버: 세션ID로 로그인 상태 유지!',
          ]);
        } else {
          setLog((prev) => [
            ...prev,
            '📤 요청: 세션ID 쿠키 없음',
            '❌ 서버: 세션ID가 없어서, 다시 로그인하라고 해요.',
          ]);
        }
      }
    } else if (action === 'logout') {
      if (mode === 'none') {
        setIsLoggedIn(false);
        setLog((prev) => [...prev, '🔒 로그아웃 (상태 유지 안 됨)']);
      } else if (mode === 'cookie') {
        setIsLoggedIn(false);
        setCookie(null);
        setLog((prev) => [...prev, '🔒 로그아웃', '🗑️ 브라우저: 쿠키 삭제']);
      } else if (mode === 'session') {
        setIsLoggedIn(false);
        setCookie(null);
        setSessionId(null);
        setServerSession(null);
        setLog((prev) => [
          ...prev,
          '🔒 로그아웃',
          '🗑️ 서버: 세션 삭제',
          '🗑️ 브라우저: 세션ID 쿠키 삭제',
        ]);
      }
      setCompleted(true); // 로그아웃 후 완료 처리
      return;
    }
    setStep((prev) =>
      Math.min(prev + 1, STEPS[mode as keyof typeof STEPS].length - 1)
    );
  };

  const reset = () => {
    setStep(0);
    setIsLoggedIn(false);
    setCookie(null);
    setSessionId(null);
    setServerSession(null);
    setLog([]);
    setShowCookieVuln(false);
    setCompleted(false);
  };

  // 설명
  const desc = {
    none: '쿠키/세션 없이 로그인하면, 상태가 유지되지 않아 요청마다 다시 인증해야 합니다.',
    cookie:
      '쿠키 인증은 브라우저에 사용자 정보를 저장해 자동 로그인/상태 유지를 할 수 있지만, 보안상 취약할 수 있습니다.',
    session:
      '세션 인증은 서버에 사용자 정보를 저장하고, 브라우저에는 세션ID만 저장해 더 안전하게 상태를 유지합니다.',
  };

  return (
    <div className="bg-white border border-neutral-200 rounded-xl p-6 w-full max-w-none mx-auto shadow-md">
      <h3
        className="text-xl font-bold mb-0 mt-0 pb-0 pt-0"
        style={{
          marginBottom: 12,
          marginTop: 0,
          paddingTop: 0,
          paddingBottom: 0,
        }}
      >
        인증 플로우 진행해보기
      </h3>
      <div
        className="flex gap-1 mb-2 mt-0 pt-0"
        style={{ marginTop: 0, paddingTop: 0 }}
      >
        {MODES.map((m) => (
          <button
            key={m.id}
            onClick={() => setMode(m.id)}
            className={`px-3 py-1 rounded text-sm font-mono border transition-colors ${
              mode === m.id
                ? 'bg-blue-600 text-white border-blue-700'
                : 'bg-neutral-100 text-neutral-700 border-neutral-300 hover:bg-blue-50'
            }`}
          >
            {m.label}
          </button>
        ))}
      </div>
      <div className="mb-3 text-sm text-blue-900 font-mono bg-blue-50 rounded p-2 border border-blue-100">
        {desc[mode as keyof typeof desc]}
      </div>
      {/* 시각적 플로우 */}
      <div
        className="flex flex-col items-center gap-1 mb-2 mt-0 pt-0"
        style={{ marginTop: 0, paddingTop: 0 }}
      >
        <div className="flex flex-col sm:flex-row items-center gap-4 w-full justify-center">
          {/* 브라우저 상태 */}
          <div className="flex flex-col items-center w-full sm:w-48 mb-4 sm:mb-0">
            <div className="rounded-xl border-2 border-blue-400 bg-blue-50 w-full p-4 mb-2">
              <div className="text-lg font-bold mb-2 flex items-center gap-2">
                🖥️ <span>브라우저</span>
              </div>
              <div className="text-xs mb-1">
                로그인:{' '}
                {isLoggedIn ? (
                  <span className="text-green-600">O</span>
                ) : (
                  <span className="text-red-500">X</span>
                )}
              </div>
              <div className="text-xs mb-1">
                쿠키:{' '}
                {cookie ? (
                  <span className="text-green-600">{cookie}</span>
                ) : (
                  <span className="text-neutral-400">(없음)</span>
                )}
              </div>
            </div>
          </div>
          {/* 화살표/메시지 */}
          <div className="flex flex-col items-center min-w-[80px]">
            <div className="text-3xl mb-1">
              {
                ARROWS[
                  STEPS[mode as keyof typeof STEPS][step]
                    ?.action as keyof typeof ARROWS
                ]
              }
            </div>
          </div>
          {/* 서버 상태 */}
          <div className="flex flex-col items-center w-full sm:w-48 mt-4 sm:mt-0">
            <div className="rounded-xl border-2 border-green-400 bg-green-50 w-full p-4 mb-2">
              <div className="text-lg font-bold mb-2 flex items-center gap-2">
                🗄️ <span>서버</span>
              </div>
              <div className="text-xs mb-1">
                세션:{' '}
                {serverSession ? (
                  <span className="text-green-600 break-all whitespace-pre-line">
                    {JSON.stringify(serverSession)}
                  </span>
                ) : (
                  <span className="text-neutral-400">(없음)</span>
                )}
              </div>
            </div>
          </div>
        </div>
        {/* 단계별 버튼 */}
        <div className="flex gap-2 mt-2">
          {(
            STEPS[mode as keyof typeof STEPS] as {
              label: string;
              action: string;
            }[]
          ).map((s, i) => (
            <button
              key={s.action}
              onClick={() => handleStep(s.action)}
              disabled={completed || step !== i}
              className={`px-4 py-2 rounded text-xs font-mono disabled:opacity-60 transition-colors ${
                step === i && !completed
                  ? 'bg-blue-700 text-white'
                  : 'bg-blue-600 text-white hover:bg-blue-700'
              }`}
            >
              {s.label}
            </button>
          ))}
        </div>
      </div>
      {/* 로그 */}
      <div
        ref={logRef}
        className="bg-neutral-50 rounded p-3 text-xs font-mono min-h-[80px] max-h-40 overflow-y-auto border border-neutral-200"
      >
        {log.length === 0 ? (
          <span className="text-neutral-400">
            (동작 로그가 여기에 표시됩니다)
          </span>
        ) : (
          log.map((l, i, arr) => {
            let icon = '';
            if (l.startsWith('🔓')) icon = '🔓';
            else if (l.startsWith('📋')) icon = '📋';
            else if (l.startsWith('💾')) icon = '💾';
            else if (l.startsWith('🗄️')) icon = '🗄️';
            else if (l.startsWith('🍪')) icon = '🍪';
            else if (l.startsWith('✅')) icon = '✅';
            else if (l.startsWith('❌')) icon = '❌';
            else if (l.startsWith('🗑️')) icon = '🗑️';
            else if (l.startsWith('📤')) icon = '📤';
            else if (l.startsWith('ℹ️')) icon = 'ℹ️';
            const isLast = i === arr.length - 1;
            return (
              <div
                key={i}
                className={
                  isLast
                    ? 'mb-1 px-2 py-1 bg-green-100 text-green-800 font-bold rounded'
                    : 'mb-1 px-2 py-1'
                }
              >
                {icon && <span className="mr-1">{icon}</span>}
                {l.replace(/홍길동/g, '사용자').replace(/^\S+\s/, '')}
              </div>
            );
          })
        )}
      </div>
      {/* 안내 박스: 쿠키/세션 없음/쿠키/세션 모드별 */}
      {mode === 'none' && (
        <div className="mt-4 bg-yellow-50 border border-yellow-200 rounded p-3 text-sm text-yellow-900">
          <b>❓ 왜 로그인해도 상태가 유지되지 않을까요?</b>
          <br />
          쿠키나 세션이 없으면, 로그인 성공 후에도{' '}
          <b>로그인했다는 사실이 브라우저나 서버에 저장되지 않아요.</b>
          <br />
          그래서 새로고침하거나, 다음 요청을 보낼 때 서버는 &quot;이 사용자가
          로그인한 적이 있는지&quot; 전혀 알 수 없습니다.
          <br />
          <b>즉, 매번 다시 로그인해야 하는 불편함</b>이 생깁니다.
          <br />
          <span className="text-xs text-yellow-700">
            실제 서비스에서는 반드시 쿠키나 세션 등으로 로그인 상태를
            저장합니다!
          </span>
        </div>
      )}
      {mode === 'cookie' && (
        <>
          <div className="mt-4 bg-blue-50 border border-blue-200 rounded p-3 text-sm text-blue-900">
            <b>🍪 쿠키 인증의 특징과 주의점</b>
            <br />
            쿠키는 브라우저에 직접 저장되어, 자동 로그인/상태 유지가 쉽습니다.
            <br />
            하지만{' '}
            <b>쿠키에 중요한 정보를 직접 저장하면 보안에 취약할 수 있습니다.</b>
            <br />
            <span className="text-xs text-blue-700">
              실제 서비스에서는 <b>HttpOnly, Secure, SameSite</b> 등 옵션을 꼭
              사용해야 합니다!
            </span>
          </div>
          {showCookieVuln && <CookieVulnerabilityVisualizer />}
        </>
      )}
      {mode === 'session' && (
        <div className="mt-4 bg-green-50 border border-green-200 rounded p-3 text-sm text-green-900">
          <b>🗄️ 세션 인증의 특징과 실무 팁</b>
          <br />
          세션은 서버에 사용자 정보를 저장하고, 브라우저에는 세션ID만
          저장합니다.
          <br />
          <b>세션ID만 노출되므로 쿠키 인증보다 보안이 더 강력합니다.</b>
          <br />
          <span className="text-xs text-green-700">
            서버 메모리/DB에 세션을 관리해야 하므로,{' '}
            <b>대규모 서비스에서는 세션 스토리지(예: Redis) 사용</b>을
            권장합니다!
          </span>
        </div>
      )}
      {completed && (
        <div className="mt-4 mb-2 text-center text-green-700 font-bold text-green-900">
          <span>
            다시 진행하려면 아래 &quot;초기화&quot; 버튼을 눌러주세요.
          </span>
        </div>
      )}
      <button
        onClick={reset}
        className="mt-2 px-4 py-2 bg-neutral-500 text-white rounded text-sm hover:bg-neutral-600 transition-colors"
      >
        🔄 초기화
      </button>
    </div>
  );
}
