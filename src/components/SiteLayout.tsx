'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Code, Database, Globe, Menu, X, Moon, Sun } from 'lucide-react';
import { setCookie, getCookie } from '@/utils/cookies';

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const pathname = usePathname();

  const shouldShowHeader = pathname !== '/';

  const navigation = [
    { name: '홈', href: '/', icon: Code },
    { name: '블로그', href: '/blog', icon: Database },
    { name: '프로젝트', href: '/projects', icon: Globe },
    { name: '소개', href: '/about', icon: Code },
    { name: '연락처', href: '/contact', icon: Database },
  ];

  useEffect(() => {
    // 다크모드 설정 로드 (쿠키 우선, localStorage 백업)
    const cookieMode = getCookie('darkMode');
    if (cookieMode) {
      setIsDarkMode(cookieMode === 'true');
    } else {
      const savedMode = localStorage.getItem('darkMode');
      if (savedMode) {
        setIsDarkMode(JSON.parse(savedMode));
      } else {
        setIsDarkMode(false); // Default to light mode
      }
    }
  }, []);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    // 쿠키와 localStorage 모두에 저장
    setCookie('darkMode', isDarkMode.toString(), 365);
    localStorage.setItem('darkMode', JSON.stringify(isDarkMode));
  }, [isDarkMode]);

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 font-sans text-gray-900 dark:text-gray-100 transition-colors">
      {/* Header - Only show on non-home pages */}
      {shouldShowHeader && (
        <motion.header
          className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-gray-800/80 backdrop-blur-md border-b border-gray-200/50 dark:border-gray-700/50 transition-colors"
          initial={{ y: -100 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between h-16">
              {/* Logo */}
              <Link href="/" className="flex items-center space-x-2">
                <motion.div
                  className="w-8 h-8 bg-gray-900 rounded-lg flex items-center justify-center"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <span className="text-white font-bold text-sm">D</span>
                </motion.div>
                <span className="text-xl font-bold text-gray-900 dark:text-white">
                  donghyeun02
                </span>
              </Link>

              {/* Desktop Navigation */}
              <nav className="hidden lg:flex items-center space-x-8">
                {navigation.map((item) => {
                  const Icon = item.icon;
                  const isActive =
                    pathname === item.href ||
                    (item.href !== '/' && pathname.startsWith(item.href));

                  return (
                    <Link key={item.name} href={item.href}>
                      <motion.div
                        className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-300 ${
                          isActive
                            ? 'bg-gray-900/20 dark:bg-gray-100/20 text-gray-900 dark:text-white border border-gray-900/30 dark:border-gray-100/30'
                            : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700'
                        }`}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Icon className="w-4 h-4" />
                        <span className="whitespace-nowrap">{item.name}</span>
                      </motion.div>
                    </Link>
                  );
                })}
              </nav>

              {/* Desktop Dark Mode Toggle */}
              <button
                onClick={() => setIsDarkMode(!isDarkMode)}
                className="hidden lg:block p-2 rounded-lg text-gray-600 hover:text-gray-900 hover:bg-gray-100 dark:text-gray-300 dark:hover:text-white dark:hover:bg-gray-700 transition-colors"
              >
                {isDarkMode ? (
                  <Sun className="w-6 h-6" />
                ) : (
                  <Moon className="w-6 h-6" />
                )}
              </button>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden p-2 rounded-lg text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              >
                {isMobileMenuOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMobileMenuOpen && (
            <motion.div
              className="lg:hidden bg-white/95 dark:bg-gray-800/95 backdrop-blur-md border-t border-gray-200/50 dark:border-gray-700/50 transition-colors"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="container mx-auto px-4 py-4">
                <nav className="flex flex-col space-y-2">
                  {navigation.map((item) => {
                    const Icon = item.icon;
                    const isActive =
                      pathname === item.href ||
                      (item.href !== '/' && pathname.startsWith(item.href));

                    return (
                      <Link key={item.name} href={item.href}>
                        <motion.div
                          className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-300 ${
                            isActive
                              ? 'bg-gray-900/20 dark:bg-gray-100/20 text-gray-900 dark:text-white border border-gray-900/30 dark:border-gray-100/30'
                              : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700'
                          }`}
                          whileHover={{ x: 5 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          <Icon className="w-5 h-5" />
                          <span>{item.name}</span>
                        </motion.div>
                      </Link>
                    );
                  })}

                  {/* Mobile Dark Mode Toggle */}
                  <motion.div
                    className="flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-300 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                    whileHover={{ x: 5 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      setIsDarkMode(!isDarkMode);
                      setIsMobileMenuOpen(false);
                    }}
                  >
                    {isDarkMode ? (
                      <Sun className="w-5 h-5" />
                    ) : (
                      <Moon className="w-5 h-5" />
                    )}
                    <span>{isDarkMode ? '라이트 모드' : '다크 모드'}</span>
                  </motion.div>
                </nav>
              </div>
            </motion.div>
          )}
        </motion.header>
      )}

      {/* Main Content */}
      <main className={shouldShowHeader ? 'pt-16' : ''}>{children}</main>

      {/* Footer */}
      <footer className="bg-gray-100/50 dark:bg-gray-800/50 border-t border-gray-200/50 dark:border-gray-700/50 mt-20 transition-colors">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <p className="text-gray-500 dark:text-gray-400 text-sm">
              © 2025 donghyeun02.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
