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
    <div className="w-full max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <div className="mb-6">
        <div className="bg-blue-50 p-3 rounded-lg">
          <p className="text-gray-900 mt-2 mb-2">
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
          className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-base"
        />
      </div>

      {decimal && (
        <div className="animate-fade-in">
          <h3 className="text-lg font-semibold mb-2">이진수 결과:</h3>
          <div className="grid grid-cols-8 gap-1">
            {binary.split('').map((bit, index) => (
              <div
                key={index}
                className="flex flex-col items-center border rounded p-2 bg-gray-50"
              >
                <div className="text-xs text-gray-500">
                  2<sup>{7 - index}</sup>
                </div>
                <div className="text-xl font-mono">{bit}</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default DecimalToBinaryConverter;
