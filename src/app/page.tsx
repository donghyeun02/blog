'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Code,
  Database,
  Zap,
  Hexagon,
  Shield,
  Brain,
  ArrowRight,
  Moon,
  Sun,
} from 'lucide-react';
import { setCookie, getCookie } from '@/utils/cookies';

export default function HomePage() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isClient, setIsClient] = useState(false);
  const [activeConnections, setActiveConnections] = useState(342);
  const [systemLoad, setSystemLoad] = useState(23.5);
  const [codeLines, setCodeLines] = useState('12.4k');
  const [isDarkMode, setIsDarkMode] = useState<boolean | null>(null);

  useEffect(() => {
    setIsClient(true);

    // 다크모드 설정 로드 (쿠키 우선, localStorage 백업)
    const cookieMode = getCookie('darkMode');
    if (cookieMode) {
      setIsDarkMode(cookieMode === 'true');
    } else {
      const savedMode = localStorage.getItem('darkMode');
      if (savedMode) {
        setIsDarkMode(JSON.parse(savedMode));
      }
    }

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    // 일반적인 개발 지표 시뮬레이션
    const updateSystemData = () => {
      setActiveConnections((prev) => prev + Math.floor(Math.random() * 10 - 5));
      setSystemLoad((prev) =>
        Math.max(10, Math.min(90, prev + (Math.random() - 0.5) * 5))
      );

      // 코드 라인 수 변화
      const variations = ['12.4k', '12.5k', '12.3k', '12.6k'];
      setCodeLines(variations[Math.floor(Math.random() * variations.length)]);
    };

    const interval = setInterval(updateSystemData, 3000);
    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      clearInterval(interval);
    };
  }, []);

  // 다크모드 적용
  useEffect(() => {
    if (isDarkMode !== null) {
      if (isDarkMode) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
      // 쿠키와 localStorage 모두에 저장
      setCookie('darkMode', isDarkMode.toString(), 365);
      localStorage.setItem('darkMode', JSON.stringify(isDarkMode));
    }
  }, [isDarkMode]);

  if (!isClient) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-900 flex items-center justify-center transition-colors">
        <div className="text-gray-900 dark:text-white text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 relative overflow-hidden flex items-center justify-center transition-colors">
      {/* Tech Network Background */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.02)_1px,transparent_1px)] bg-[size:60px_60px]" />

        {/* System Architecture Visualization */}
        <svg className="absolute inset-0 w-full h-full opacity-30">
          <defs>
            <radialGradient id="nodeGradient" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#000" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#000" stopOpacity="0" />
            </radialGradient>
          </defs>
          {Array.from({ length: 12 }).map((_, i) => (
            <motion.g key={i}>
              <motion.circle
                cx={`${10 + i * 8}%`}
                cy={`${20 + Math.sin(i) * 30}%`}
                r="3"
                fill="url(#nodeGradient)"
                animate={{
                  opacity: [0.2, 0.6, 0.2],
                  scale: [1, 1.2, 1],
                }}
                transition={{
                  duration: 3 + i * 0.2,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              />
              {i < 11 && (
                <motion.line
                  x1={`${10 + i * 8}%`}
                  y1={`${20 + Math.sin(i) * 30}%`}
                  x2={`${18 + i * 8}%`}
                  y2={`${20 + Math.sin(i + 1) * 30}%`}
                  stroke="#000"
                  strokeWidth="0.5"
                  opacity="0.2"
                  animate={{
                    opacity: [0.1, 0.4, 0.1],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: i * 0.1,
                  }}
                />
              )}
            </motion.g>
          ))}
        </svg>

        {/* System Metrics */}
        <div className="absolute top-2 sm:top-4 right-2 sm:right-4 font-mono text-xs text-gray-400 dark:text-gray-500 space-y-1">
          <motion.div
            animate={{ opacity: [0.3, 0.8, 0.3] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="text-xs sm:text-sm"
          >
            Connections: {activeConnections}
          </motion.div>
          <motion.div
            animate={{ opacity: [0.3, 0.8, 0.3] }}
            transition={{ duration: 2.5, repeat: Infinity }}
            className="text-xs sm:text-sm"
          >
            Load: {systemLoad.toFixed(1)}%
          </motion.div>
          <motion.div
            animate={{ opacity: [0.3, 0.8, 0.3] }}
            transition={{ duration: 3, repeat: Infinity }}
            className="text-xs sm:text-sm"
          >
            Lines: {codeLines}
          </motion.div>
        </div>

        {/* Dark Mode Toggle */}
        <div className="absolute top-2 sm:top-4 left-2 sm:left-4">
          <button
            onClick={() =>
              setIsDarkMode(isDarkMode === null ? true : !isDarkMode)
            }
            className="p-2 rounded-lg text-gray-600 hover:text-gray-900 hover:bg-gray-100 dark:text-gray-300 dark:hover:text-white dark:hover:bg-gray-700 transition-colors"
          >
            {isDarkMode ? (
              <Sun className="w-6 h-6" />
            ) : (
              <Moon className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 container mx-auto px-4 pt-16 sm:pt-16 lg:pt-20">
        {/* Hero Section */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.h1
            className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-bold mb-8 text-gray-900 dark:text-white relative"
            style={{
              transform: `perspective(1000px) rotateX(${(mousePosition.y - window.innerHeight / 2) * 0.01}deg) rotateY(${(mousePosition.x - window.innerWidth / 2) * 0.01}deg)`,
            }}
          >
            donghyeun02
            {/* Tech decorations */}
            <Code className="absolute -top-2 -right-8 sm:-top-4 sm:-right-12 w-4 h-4 sm:w-8 sm:h-8 text-gray-300 opacity-50" />
            <Database className="absolute -bottom-1 -left-4 sm:-bottom-2 sm:-left-8 w-3 h-3 sm:w-6 sm:h-6 text-gray-300 opacity-30" />
          </motion.h1>

          <motion.div
            className="mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <p className="text-lg sm:text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-2 px-4">
              &ldquo;배운 것, 만든 것, 그리고 배울 것들&rdquo;
            </p>
            <div className="flex flex-col sm:flex-row justify-center items-center space-y-1 sm:space-y-0 sm:space-x-2 text-xs sm:text-sm text-gray-400 dark:text-gray-500 font-mono px-4">
              <span>Backend Developer</span>
              <span className="hidden sm:inline">•</span>
              <span>Computer Science</span>
              <span className="hidden sm:inline">•</span>
              <span>Web3 Explorer</span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6 }}
          >
            <Link href="/blog">
              <motion.button
                className="group relative inline-flex items-center px-6 sm:px-8 py-3 sm:py-4 bg-gray-900 text-white font-semibold rounded-lg overflow-hidden shadow-lg hover:bg-gray-800 transition-all duration-300 text-sm sm:text-base"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="relative z-10">블로그 탐험하기</span>
                <ArrowRight className="ml-2 relative z-10 group-hover:translate-x-1 transition-transform w-4 h-4 sm:w-5 sm:h-5" />
                {/* Subtle tech pattern in button */}
                <div className="absolute inset-0 opacity-10">
                  <Code className="absolute top-1 left-2 w-3 h-3 sm:w-4 sm:h-4" />
                  <Database className="absolute bottom-1 right-2 w-3 h-3 sm:w-4 sm:h-4" />
                </div>
              </motion.button>
            </Link>
          </motion.div>
        </motion.div>

        {/* Enhanced System Network Visualization */}
        <motion.div
          className="flex justify-center items-center mb-12 sm:mb-16 px-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9 }}
        >
          <div className="relative">
            {/* Main system architecture */}
            <div className="flex items-center space-x-2 sm:space-x-4">
              {Array.from({ length: 7 }).map((_, i) => (
                <motion.div key={i} className="relative">
                  <motion.div
                    className="w-3 h-3 sm:w-4 sm:h-4 bg-gray-900 dark:bg-white rounded-full relative z-10"
                    animate={{
                      scale: [1, 1.2, 1],
                      opacity: [0.6, 1, 0.6],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      delay: i * 0.2,
                    }}
                  />
                  {/* Data flow lines */}
                  {i < 6 && (
                    <motion.div
                      className="absolute top-1.5 sm:top-2 left-3 sm:left-4 w-3 sm:w-4 h-px bg-gray-400 dark:bg-gray-500"
                      animate={{
                        opacity: [0.3, 0.8, 0.3],
                      }}
                      transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        delay: i * 0.1,
                      }}
                    />
                  )}
                  {/* Data packets */}
                  <motion.div
                    className="absolute top-1 sm:top-1.5 left-3 sm:left-4 w-0.5 sm:w-1 h-0.5 sm:h-1 bg-green-500 rounded-full"
                    animate={{
                      x: [0, 12, 0],
                      opacity: [0, 1, 0],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      delay: i * 0.3,
                    }}
                  />
                </motion.div>
              ))}
            </div>

            {/* System branch */}
            <div className="absolute top-6 sm:top-8 left-8 sm:left-12">
              <motion.div
                className="w-6 sm:w-8 h-px bg-gray-300 dark:bg-gray-600 rotate-45"
                animate={{
                  opacity: [0.2, 0.6, 0.2],
                }}
                transition={{ duration: 3, repeat: Infinity }}
              />
              <motion.div
                className="w-2 h-2 sm:w-3 sm:h-3 bg-gray-700 dark:bg-gray-300 rounded-full absolute -right-0.5 sm:-right-1 -top-0.5 sm:-top-1"
                animate={{
                  scale: [0.8, 1.1, 0.8],
                }}
                transition={{ duration: 2.5, repeat: Infinity }}
              />
            </div>
          </div>
        </motion.div>

        {/* Features Section */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 px-4"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2 }}
        >
          {[
            {
              icon: <Database className="w-8 h-8" />,
              title: 'Backend Development',
              description:
                '확장 가능한 서버 아키텍처와 데이터베이스 설계, API 개발',
              tech: 'Node.js • Go • PostgreSQL • Java',
            },
            {
              icon: <Brain className="w-8 h-8" />,
              title: 'Computer Science',
              description: '알고리즘, 자료구조, 컴퓨터 구조',
              tech: 'Algorithms • Data Structures • System Design',
            },
            {
              icon: <Shield className="w-8 h-8" />,
              title: 'Web3 & Blockchain',
              description: '탈중앙화 기술과 스마트 컨트랙트',
              tech: 'Solidity • DeFi • Layer 2 Solutions',
            },
          ].map((feature, index) => (
            <motion.div
              key={index}
              className="group relative p-6 sm:p-8 bg-gray-50/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl border border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 transition-all duration-300 overflow-hidden"
              whileHover={{
                y: -5,
                rotateX: 2,
                rotateY: 2,
              }}
              style={{
                transformStyle: 'preserve-3d',
              }}
            >
              {/* Tech pattern background */}
              <div className="absolute top-2 right-2 opacity-5">
                <Hexagon className="w-12 h-12 sm:w-16 sm:h-16" />
              </div>
              <div className="absolute bottom-2 left-2 opacity-5">
                <Code className="w-8 h-8 sm:w-12 sm:h-12" />
              </div>

              <div className="absolute inset-0 bg-gradient-to-br from-gray-100/50 dark:from-gray-700/50 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative z-10">
                <div className="text-gray-900 dark:text-white mb-4 group-hover:scale-110 transition-transform flex items-center">
                  <div className="w-6 h-6 sm:w-8 sm:h-8">{feature.icon}</div>
                  <Zap className="w-3 h-3 sm:w-4 sm:h-4 ml-2 opacity-50" />
                </div>
                <h3 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white mb-3">
                  {feature.title}
                </h3>
                <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">
                  {feature.description}
                </p>
                <div className="text-xs font-mono text-gray-400 dark:text-gray-500 border-t border-gray-200 dark:border-gray-600 pt-3">
                  {feature.tech}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Footer Tech Info */}
        <motion.div
          className="text-center mt-12 sm:mt-16 px-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
        >
          <div className="text-xs font-mono text-gray-400 dark:text-gray-500 space-y-1">
            <div className="text-center">
              <span className="block sm:inline">System Uptime: 99.98%</span>
              <span className="hidden sm:inline"> • </span>
              <span className="block sm:inline">Last Deploy: 2h ago</span>
            </div>
            <div className="flex justify-center items-center space-x-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              <span>All Systems Operational</span>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
