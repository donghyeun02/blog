'use client';

import React, { useState, useEffect } from 'react';

const ElectricSignalSimulator = () => {
  const [isOn, setIsOn] = useState(false);
  const [voltage, setVoltage] = useState(0);

  useEffect(() => {
    setVoltage(isOn ? 5 : 0);
  }, [isOn]);

  return (
    <div className="w-full max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <div className="mb-6">
        <div className="bg-blue-50 p-3 rounded-lg">
          <p className="text-gray-900 mt-2 mb-2">
            <span className="text-base sm:text-lg font-medium">
              전기 신호의 ON/OFF 상태를 직접 체험해보세요!
            </span>
            <br />
            <span className="text-sm sm:text-base">
              스위치를 클릭하면 전압이 변하면서 0과 1이 결정됩니다.
            </span>
          </p>
        </div>
      </div>

      <div className="flex flex-col items-center space-y-6">
        {/* 스위치 */}
        <div className="flex items-center space-x-4">
          <span className="text-lg font-medium">전기 스위치:</span>
          <button
            onClick={() => setIsOn(!isOn)}
            className={`relative w-16 h-8 rounded-full transition-colors duration-300 ${
              isOn ? 'bg-green-500' : 'bg-gray-300'
            }`}
          >
            <div
              className={`absolute top-1 left-1 w-6 h-6 bg-white rounded-full shadow-md transform transition-transform duration-300 ${
                isOn ? 'translate-x-8' : 'translate-x-0'
              }`}
            />
          </button>
        </div>

        {/* 전압 미터 */}
        <div className="w-full max-w-md">
          <div className="mb-2">
            <span className="text-lg font-medium">전압: {voltage}V</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-4">
            <div
              className={`h-4 rounded-full transition-all duration-300 ${
                isOn ? 'bg-green-500' : 'bg-gray-400'
              }`}
              style={{ width: `${(voltage / 5) * 100}%` }}
            />
          </div>
        </div>

        {/* 전기 선 애니메이션 */}
        <div className="w-full max-w-md h-16 bg-gray-100 rounded-lg relative overflow-hidden">
          <div className="absolute top-1/2 left-0 right-0 h-1 bg-gray-300 transform -translate-y-1/2" />
          {isOn && (
            <div className="absolute top-1/2 left-0 h-1 bg-yellow-400 transform -translate-y-1/2 animate-pulse">
              <div className="w-full h-full bg-gradient-to-r from-yellow-400 to-yellow-600 animate-bounce" />
            </div>
          )}
          <div className="absolute top-2 left-2 text-xs text-gray-600">
            {isOn ? '전류 흐름 ⚡' : '전류 없음 ❌'}
          </div>
        </div>

        {/* 결과 표시 */}
        <div className="text-center">
          <div className="text-2xl font-bold mb-2">
            디지털 값: {isOn ? '1' : '0'}
          </div>
          <div className="text-sm text-gray-600">
            {isOn ? 'ON (High) = 1' : 'OFF (Low) = 0'}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ElectricSignalSimulator;
