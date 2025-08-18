'use client';

import React, { useState, useEffect } from 'react';

const ColorToBinaryConverter = () => {
  const [selectedColor, setSelectedColor] = useState<string>('#ff0000');
  const [rgbValues, setRgbValues] = useState({ r: 255, g: 0, b: 0 });
  const [binaryValues, setBinaryValues] = useState({
    r: '11111111',
    g: '00000000',
    b: '00000000',
  });

  // 색상이 변경될 때마다 RGB와 2진수 값 업데이트
  useEffect(() => {
    // hex 색상을 RGB로 변환
    const hex = selectedColor.replace('#', '');
    const r = parseInt(hex.substr(0, 2), 16);
    const g = parseInt(hex.substr(2, 2), 16);
    const b = parseInt(hex.substr(4, 2), 16);

    setRgbValues({ r, g, b });
    setBinaryValues({
      r: r.toString(2).padStart(8, '0'),
      g: g.toString(2).padStart(8, '0'),
      b: b.toString(2).padStart(8, '0'),
    });
  }, [selectedColor]);

  const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedColor(e.target.value);
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-3 sm:p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
      <div className="mb-3 sm:mb-6">
        <div className="bg-blue-50 dark:bg-blue-900/50 p-2 sm:p-3 rounded-lg">
          <p className="text-gray-900 dark:text-gray-100 mt-1 mb-1 sm:mt-2 sm:mb-2">
            <span className="text-sm sm:text-base md:text-lg font-medium">
              색상이 어떻게 RGB 값과 2진수로 표현되는지 확인해보세요 !
            </span>
            <br />
            <span className="text-xs sm:text-sm md:text-base">
              색상을 선택하면 RGB 각 값이 2진수로 어떻게 변환되는지 보여줍니다.
            </span>
          </p>
        </div>
      </div>

      {/* 색상 선택기 */}
      <div className="mb-3 sm:mb-6">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          색상 선택
        </label>
        <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 space-y-2 sm:space-y-0">
          <input
            type="color"
            value={selectedColor}
            onChange={handleColorChange}
            className="w-12 h-12 sm:w-16 sm:h-16 rounded-lg border-2 border-gray-300 cursor-pointer"
          />
          <div className="flex-1">
            <div className="text-sm sm:text-base md:text-lg font-medium mb-2 text-gray-900 dark:text-gray-100">
              선택된 색상: RGB({rgbValues.r}, {rgbValues.g}, {rgbValues.b}),{' '}
              {selectedColor.toUpperCase()}
            </div>
            <div
              className="w-full h-6 sm:h-8 md:h-10 rounded-lg border"
              style={{ backgroundColor: selectedColor }}
            />
          </div>
        </div>
      </div>

      {/* RGB → 2진수 변환 결과 */}
      <div className="space-y-2">
        <h3 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-gray-100">
          RGB → 2진수 변환:
        </h3>

        {/* 빨간색 */}
        <div className="bg-red-50 dark:bg-red-900/50 p-2 sm:p-3 rounded-lg border border-red-200 dark:border-red-700">
          <div className="flex items-center sm:grid sm:grid-cols-4 gap-2 sm:gap-3">
            <div className="flex items-center space-x-2 w-20 sm:w-auto">
              <div
                className="w-6 h-6 sm:w-12 sm:h-12 rounded border-2 border-red-300"
                style={{ backgroundColor: `rgb(${rgbValues.r}, 0, 0)` }}
              />
              <div className="text-xs sm:text-sm text-red-600 dark:text-red-400 font-medium">
                Red
              </div>
            </div>
            <div className="text-center hidden sm:block">
              <div className="text-sm text-gray-600 dark:text-gray-400">→</div>
            </div>
            <div className="text-center w-16 sm:w-auto">
              <div className="text-xs sm:text-sm text-red-600 dark:text-red-400 font-medium">
                10진수
              </div>
              <div className="text-sm sm:text-xl font-bold text-gray-900 dark:text-gray-100">
                {rgbValues.r}
              </div>
            </div>
            <div className="text-right sm:text-center flex-1 sm:flex-none">
              <div className="text-xs sm:text-sm text-red-600 dark:text-red-400 font-medium">
                2진수
              </div>
              <div className="text-xs sm:text-md font-mono bg-white dark:bg-gray-700 pl-0 pr-0.5 py-0.5 sm:px-2 sm:py-1 rounded border border-gray-300 dark:border-gray-600 ml-6 sm:ml-0 text-gray-900 dark:text-gray-100">
                {binaryValues.r}
              </div>
            </div>
          </div>
        </div>

        {/* 초록색 */}
        <div className="bg-green-50 dark:bg-green-900/50 p-2 sm:p-3 rounded-lg border border-green-200 dark:border-green-700">
          <div className="flex items-center sm:grid sm:grid-cols-4 gap-2 sm:gap-3">
            <div className="flex items-center space-x-2 w-20 sm:w-auto">
              <div
                className="w-6 h-6 sm:w-12 sm:h-12 rounded border-2 border-green-300"
                style={{ backgroundColor: `rgb(0, ${rgbValues.g}, 0)` }}
              />
              <div className="text-xs sm:text-sm text-green-600 dark:text-green-400 font-medium">
                Green
              </div>
            </div>
            <div className="text-center hidden sm:block">
              <div className="text-sm text-gray-600 dark:text-gray-400">→</div>
            </div>
            <div className="text-center w-16 sm:w-auto">
              <div className="text-xs sm:text-sm text-green-600 dark:text-green-400 font-medium">
                10진수
              </div>
              <div className="text-sm sm:text-xl font-bold text-gray-900 dark:text-gray-100">
                {rgbValues.g}
              </div>
            </div>
            <div className="text-right sm:text-center flex-1 sm:flex-none">
              <div className="text-xs sm:text-sm text-green-600 dark:text-green-400 font-medium">
                2진수
              </div>
              <div className="text-xs sm:text-md font-mono bg-white dark:bg-gray-700 pl-0 pr-0.5 py-0.5 sm:px-2 sm:py-1 rounded border border-gray-300 dark:border-gray-600 ml-6 sm:ml-0 text-gray-900 dark:text-gray-100">
                {binaryValues.g}
              </div>
            </div>
          </div>
        </div>

        {/* 파란색 */}
        <div className="bg-blue-50 dark:bg-blue-900/50 p-2 sm:p-3 rounded-lg border border-blue-200 dark:border-blue-700">
          <div className="flex items-center sm:grid sm:grid-cols-4 gap-2 sm:gap-3">
            <div className="flex items-center space-x-2 w-20 sm:w-auto">
              <div
                className="w-6 h-6 sm:w-12 sm:h-12 rounded border-2 border-blue-300"
                style={{ backgroundColor: `rgb(0, 0, ${rgbValues.b})` }}
              />
              <div className="text-xs sm:text-sm text-blue-600 dark:text-blue-400 font-medium">
                Blue
              </div>
            </div>
            <div className="text-center hidden sm:block">
              <div className="text-sm text-gray-600 dark:text-gray-400">→</div>
            </div>
            <div className="text-center w-16 sm:w-auto">
              <div className="text-xs sm:text-sm text-blue-600 dark:text-blue-400 font-medium">
                10진수
              </div>
              <div className="text-sm sm:text-xl font-bold text-gray-900 dark:text-gray-100">
                {rgbValues.b}
              </div>
            </div>
            <div className="text-right sm:text-center flex-1 sm:flex-none">
              <div className="text-xs sm:text-sm text-blue-600 dark:text-blue-400 font-medium">
                2진수
              </div>
              <div className="text-xs sm:text-md font-mono bg-white dark:bg-gray-700 pl-0 pr-0.5 py-0.5 sm:px-2 sm:py-1 rounded border border-gray-300 dark:border-gray-600 ml-6 sm:ml-0 text-gray-900 dark:text-gray-100">
                {binaryValues.b}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ColorToBinaryConverter;
