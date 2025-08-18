'use client';

import React, { useState, useEffect } from 'react';

const TextToBinaryConverter = () => {
  const [text, setText] = useState<string>('');
  const [conversions, setConversions] = useState<
    Array<{
      char: string;
      ascii: number;
      binary: string;
    }>
  >([]);

  // 텍스트를 ASCII 코드와 2진수로 변환
  const convertTextToBinary = (inputText: string) => {
    const results = [];
    for (let i = 0; i < inputText.length; i++) {
      const char = inputText[i];
      const ascii = char.charCodeAt(0);
      const binary = ascii.toString(2).padStart(8, '0');
      results.push({ char, ascii, binary });
    }
    return results;
  };

  // 텍스트가 변경될 때마다 변환
  useEffect(() => {
    if (text) {
      const results = convertTextToBinary(text);
      setConversions(results);
    } else {
      setConversions([]);
    }
  }, [text]);

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value.length <= 20) {
      // 최대 20자로 제한
      setText(value);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-3 sm:p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
      <div className="mb-3 sm:mb-6">
        <div className="bg-blue-50 dark:bg-blue-900/50 p-2 sm:p-3 rounded-lg">
          <p className="text-gray-900 dark:text-gray-100 mt-1 mb-1 sm:mt-2 sm:mb-2">
            <span className="text-sm sm:text-base md:text-lg font-medium">
              텍스트가 어떻게 0과 1로 변환되는지 확인해보세요!
            </span>
            <br />
            <span className="text-xs sm:text-sm md:text-base">
              입력한 문자가 ASCII 코드를 거쳐 2진수로 변환되는 과정을 실시간으로
              보여줍니다.
            </span>
          </p>
        </div>
      </div>

      {/* 텍스트 입력 */}
      <div className="mb-3 sm:mb-6">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          텍스트 입력 (최대 20자)
        </label>
        <input
          type="text"
          value={text}
          onChange={handleTextChange}
          placeholder="변환할 텍스트를 입력하세요"
          className="w-full px-3 py-2 sm:px-4 sm:py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
        />
      </div>

      {/* 변환 결과 */}
      {conversions.length > 0 && (
        <div className="space-y-2">
          <h3 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-gray-100">
            변환 결과:
          </h3>

          {/* 변환 테이블 */}
          <div className="overflow-x-auto -mx-2 sm:mx-0">
            <div className="min-w-full px-2 sm:px-0">
              <table className="w-full border-collapse border border-gray-300 dark:border-gray-600 mb-0 mt-0 min-w-[300px]">
                <thead>
                  <tr className="bg-gray-50 dark:bg-gray-700">
                    <th className="border border-gray-300 dark:border-gray-600 px-2 sm:px-3 py-1 sm:py-2 text-center text-xs sm:text-sm text-gray-900 dark:text-gray-100">
                      문자
                    </th>
                    <th className="border border-gray-300 dark:border-gray-600 px-2 sm:px-3 py-1 sm:py-2 text-center text-xs sm:text-sm text-gray-900 dark:text-gray-100">
                      ASCII
                    </th>
                    <th className="border border-gray-300 dark:border-gray-600 px-2 sm:px-3 py-1 sm:py-2 text-center text-xs sm:text-sm text-gray-900 dark:text-gray-100">
                      2진수
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {conversions.map((conversion, index) => (
                    <tr
                      key={index}
                      className="hover:bg-gray-50 dark:hover:bg-gray-700"
                    >
                      <td className="border border-gray-300 dark:border-gray-600 px-2 sm:px-3 py-1 sm:py-2 text-center font-bold text-sm sm:text-base text-gray-900 dark:text-gray-100">
                        &apos;{conversion.char}&apos;
                      </td>
                      <td className="border border-gray-300 dark:border-gray-600 px-2 sm:px-3 py-1 sm:py-2 text-center text-sm sm:text-base text-gray-900 dark:text-gray-100">
                        {conversion.ascii}
                      </td>
                      <td className="border border-gray-300 dark:border-gray-600 px-2 sm:px-3 py-1 sm:py-2 text-center font-mono text-xs sm:text-sm text-gray-900 dark:text-gray-100">
                        {conversion.binary}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* 전체 2진수 결과 */}
          <div className="mt-3 sm:mt-4">
            <h4 className="text-sm sm:text-md font-semibold mb-2 text-gray-900 dark:text-gray-100">
              전체 2진수 표현:
            </h4>
            <div className="bg-gray-100 dark:bg-gray-700 p-2 sm:p-3 rounded-lg">
              <div className="font-mono text-xs sm:text-sm break-all text-gray-900 dark:text-gray-100">
                {conversions.map((c) => c.binary).join(' ')}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TextToBinaryConverter;
