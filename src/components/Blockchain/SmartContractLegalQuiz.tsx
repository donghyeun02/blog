'use client';

import React, { useState } from 'react';

interface QuizCase {
  question: string;
  choices: { label: string; correct: boolean; explanation: string }[];
}

const cases: QuizCase[] = [
  {
    question:
      'A와 B가 스마트컨트랙트에 1 ETH씩 예치하고, <br />"비가 오면 A가, 아니면 B가 모두 가져간다"는 조건을 코드로 작성해 배포했습니다.<br /> 이 스마트컨트랙트는 법적 계약으로 인정될 수 있을까요?',
    choices: [
      {
        label: '계약으로 인정된다 (조건이 충족되었기 때문)',
        correct: true,
        explanation:
          '계약의 3요소(당사자, 목적, 의사표시)가 모두 충족되고, 조건과 실행이 명확하므로 실제로 법적 계약으로 인정될 가능성이 높습니다. 다만, 국가별로 해석이 다를 수 있습니다.',
      },
      {
        label: '계약으로 인정되지 않는다 (코드만으로는 부족)',
        correct: false,
        explanation:
          '일부 국가에서는 코드만으로는 계약 성립을 인정하지 않을 수 있지만, 최근에는 스마트컨트랙트도 계약의 한 형태로 보는 경향이 늘고 있습니다.',
      },
    ],
  },
  {
    question:
      'C가 DAO에 참여하며, DAO의 스마트컨트랙트에 따라 투표 결과에 따라 자금이 자동 분배됩니다. <br />이때 C는 법적으로 DAO의 구성원(조합원)으로 인정받을 수 있을까요?',
    choices: [
      {
        label: '구성원으로 인정될 수 있다 (참여와 의사표시가 명확하므로)',
        correct: true,
        explanation:
          '미국 와이오밍주 등 일부 지역에서는 DAO를 법인(LLC)으로 인정하고, 스마트컨트랙트 참여자도 구성원으로 간주합니다. 하지만 한국 등 대부분의 국가는 아직 명확한 법적 지위가 없습니다.',
      },
      {
        label: '구성원으로 인정받기 어렵다 (법적 근거가 부족하므로)',
        correct: false,
        explanation:
          '법적 해석이 국가마다 다르지만, 최근에는 DAO의 법인격을 인정하는 움직임이 늘고 있습니다.',
      },
    ],
  },
  {
    question:
      'F와 G가 스마트컨트랙트로 자동 분배되는 복권을 만들었습니다. <br />당첨 결과에 이의가 있으면 법적으로 다툴 수 있을까요?',
    choices: [
      {
        label:
          '다툴 수 있다 (스마트컨트랙트도 법적 분쟁의 대상이 될 수 있으므로)',
        correct: true,
        explanation:
          '스마트컨트랙트의 실행 결과에 불복하는 경우, 실제로 법원에 소송을 제기할 수 있습니다. 다만, 법원이 코드를 계약으로 인정할지, 결과를 번복할 수 있을지는 국가와 상황에 따라 다릅니다.',
      },
      {
        label: '다툴 수 없다 (코드가 곧 법이므로)',
        correct: false,
        explanation:
          '일부에서는 "코드가 곧 법"이라는 입장을 취하지만, 현실에서는 법적 분쟁이 발생할 수 있고, 법원이 개입할 여지가 있습니다.',
      },
    ],
  },
];

export default function SmartContractLegalQuiz() {
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);

  const quiz = cases[current];
  const isLast = current === cases.length - 1;

  const handleSelect = (idx: number) => {
    setSelected(idx);
  };

  const handleNext = () => {
    setSelected(null);
    setCurrent((prev) => prev + 1);
  };

  const handleRestart = () => {
    setSelected(null);
    setCurrent(0);
  };

  return (
    <div className="max-w-2xl mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 space-y-4 border border-gray-200 dark:border-gray-700 text-center mb-6">
      <div
        className="mb-4 text-base font-medium text-gray-900 dark:text-gray-100"
        dangerouslySetInnerHTML={{ __html: quiz.question }}
      />
      <div className="flex flex-col gap-3 mb-2">
        {quiz.choices.map((choice, idx) => (
          <button
            key={idx}
            className={`py-2 rounded border font-semibold transition text-sm
              ${
                selected === idx
                  ? choice.correct
                    ? 'bg-green-100 dark:bg-green-900/50 border-green-400 dark:border-green-600 text-green-800 dark:text-green-200'
                    : 'bg-red-100 dark:bg-red-900/50 border-red-400 dark:border-red-600 text-red-800 dark:text-red-200'
                  : 'bg-gray-50 dark:bg-gray-700 border-gray-200 dark:border-gray-600 hover:bg-blue-50 dark:hover:bg-blue-900/50 text-gray-900 dark:text-gray-100'
              }
            `}
            onClick={() => handleSelect(idx)}
          >
            {choice.label}
          </button>
        ))}
      </div>
      {selected !== null && (
        <div className="mt-2 text-sm text-left bg-gray-50 dark:bg-gray-700 rounded p-3 text-gray-900 dark:text-gray-100">
          <b>해설:</b> {quiz.choices[selected].explanation}
        </div>
      )}
      {selected !== null &&
        (isLast ? (
          <button
            className="mt-4 w-full bg-blue-600 dark:bg-blue-700 text-white py-2 rounded hover:bg-blue-700 dark:hover:bg-blue-800"
            onClick={handleRestart}
          >
            다시하기
          </button>
        ) : (
          <button
            className="mt-4 w-full bg-blue-600 dark:bg-blue-700 text-white py-2 rounded hover:bg-blue-700 dark:hover:bg-blue-800"
            onClick={handleNext}
          >
            다음 문제
          </button>
        ))}
      <div className="mt-4 text-xs text-gray-500 dark:text-gray-400">
        여러분의 생각은 어떤가요?
      </div>
    </div>
  );
}
