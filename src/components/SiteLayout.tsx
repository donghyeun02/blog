'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Github, Instagram } from 'lucide-react';

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const shouldShowHeader = true;

  const socialLinks = [
    {
      name: 'GitHub',
      href: 'https://github.com/donghyeun02',
      icon: Github,
    },
    {
      name: 'Instagram',
      href: 'https://instagram.com/donghyeun_02',
      icon: Instagram,
    },
  ];

  return (
    <div className="min-h-screen bg-[#181A1B] text-[#E2E6E9] transition-colors">
      {/* Header - Only show on non-home pages */}
      {shouldShowHeader && (
        <motion.header
          className="fixed top-0 left-0 right-0 z-50 bg-[#181A1B]/95 backdrop-blur-sm border-b border-[#1D1F22] transition-colors"
          initial={{ y: -100 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="container mx-auto px-4 sm:px-6">
            <div className="flex items-center justify-between h-14 sm:h-16">
              {/* Logo */}
              <Link href="/" className="flex items-center space-x-2">
                <motion.div
                  className="w-7 h-7 sm:w-8 sm:h-8 bg-[#1D1F22] flex items-center justify-center border border-[#1D1F22]"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <span className="text-[#FFFFFF] font-heading font-bold text-xs sm:text-sm">
                    D
                  </span>
                </motion.div>
                <span className="text-lg sm:text-xl font-heading font-bold text-[#FFFFFF]">
                  donghyeun02
                </span>
              </Link>

              {/* Social Links */}
              <nav className="flex items-center space-x-4 sm:space-x-6">
                {socialLinks.map((item) => {
                  const Icon = item.icon;
                  return (
                    <a
                      key={item.name}
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#E2E6E9] hover:text-[#FFFFFF] transition-colors"
                    >
                      <motion.div
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
                      </motion.div>
                    </a>
                  );
                })}
              </nav>
            </div>
          </div>
        </motion.header>
      )}

      {/* Main Content */}
      <main className={shouldShowHeader ? 'pt-14 sm:pt-16' : ''}>{children}</main>

      {/* Footer */}
      <footer className="bg-[#181A1B] border-t border-[#1D1F22] mt-12 sm:mt-20 transition-colors">
        <div className="container mx-auto px-4 sm:px-6 py-8 sm:py-12">
          <div className="text-center flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4">
            <p className="text-[#E2E6E9] text-xs sm:text-sm">
              이 블로그의 모든 글은 스마트컨트랙트를 통해 검증됩니다.
            </p>
            <span className="hidden sm:inline text-[#1D1F22]">|</span>
            <p className="text-[#E2E6E9] text-xs sm:text-sm">© 2025 donghyeun02.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
