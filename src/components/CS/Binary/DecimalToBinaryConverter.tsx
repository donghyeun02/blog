'use client';

import React, { useState, useEffect } from 'react';

const DecimalToBinaryConverter = () => {
  const [decimal, setDecimal] = useState<string>('');
  const [binary, setBinary] = useState<string>('00000000');

  // 십진수가 변경될 때마다 이진수 업데이트
  useEffect(() => {
    const num = parseInt(decimal) || 0;
    if (num >= 0 && num <= 255) {
      const binaryStr = num.toString(2).padStart(8, '0');
      setBinary(binaryStr);
    }
  }, [decimal]);

  // 입력 처리
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // 숫자만 입력 가능하도록
    if (value === '' || /^\d+$/.test(value)) {
      const num = parseInt(value) || 0;
      if (num <= 255) {
        setDecimal(value);
      }
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
      <div className="mb-6">
        <div className="bg-blue-50 dark:bg-blue-900/50 p-3 rounded-lg">
          <p className="text-gray-900 dark:text-gray-100 mt-2 mb-2">
            <span className="text-base sm:text-lg font-medium">
              십진수 값을 입력하여 이진수로 변환해보세요!
            </span>
            <br />
            <span className="text-sm sm:text-base">
              0부터 255까지의 숫자를 입력하면 8비트 이진수로 변환됩니다.
            </span>
          </p>
        </div>
      </div>
      <div className="mb-2">
        <input
          type="text"
          value={decimal}
          onChange={handleInputChange}
          placeholder="십진수를 입력하세요 (0-255)"
          className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-base bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
        />
      </div>

      {decimal && (
        <div className="animate-fade-in">
          <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-gray-100">
            이진수 결과:
          </h3>
          <div className="grid grid-cols-8 gap-1">
            {binary.split('').map((bit, index) => (
              <div
                key={index}
                className="flex flex-col items-center border border-gray-200 dark:border-gray-600 rounded p-2 bg-gray-50 dark:bg-gray-700"
              >
                <div className="text-xs text-gray-500 dark:text-gray-400">
                  2<sup>{7 - index}</sup>
                </div>
                <div className="text-xl font-mono text-gray-900 dark:text-gray-100">
                  {bit}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default DecimalToBinaryConverter;
