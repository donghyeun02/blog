'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Mail,
  MapPin,
  Github,
  MessageSquare,
  Send,
  Instagram,
} from 'lucide-react';

export default function ContactPage() {
  const [isClient, setIsClient] = useState(false);
  const [formData, setFormData] = useState({
    subject: '',
    message: '',
  });

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const subject = encodeURIComponent(formData.subject);
    const body = encodeURIComponent(`
메시지:
${formData.message}
    `);

    window.location.href = `mailto:donghyeun02@gmail.com?subject=${subject}&body=${body}`;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  if (!isClient) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-900 flex items-center justify-center">
        <div className="text-gray-900 dark:text-gray-100 text-xl">
          Loading...
        </div>
      </div>
    );
  }

  const contactInfo = [
    {
      icon: <Mail className="w-6 h-6" />,
      title: '이메일',
      value: 'donghyeun02@gmail.com',
      href: 'mailto:donghyeun02@gmail.com',
    },
    {
      icon: <MapPin className="w-6 h-6" />,
      title: '위치',
      value: '울산, 대한민국',
      href: '#',
    },
    {
      icon: <MessageSquare className="w-6 h-6" />,
      title: '소셜',
      value: 'GitHub, Instagram',
      href: '#',
    },
  ];

  const socialLinks = [
    { icon: Github, href: 'https://github.com/donghyeun02', label: 'GitHub' },
    {
      icon: Instagram,
      href: 'https://www.instagram.com/donghyeun_02',
      label: 'Instagram',
    },
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 relative overflow-hidden">
      <div className="relative z-10 container mx-auto px-4 py-12 sm:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 items-start">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <motion.div
              className="bg-white dark:bg-gray-800 rounded-xl p-6 sm:p-8 border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-lg transition-all duration-300 h-full"
              whileHover={{
                y: -3,
                scale: 1.01,
              }}
            >
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4 sm:mb-6">
                메시지 보내기
              </h2>
              <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
                <div>
                  <label
                    htmlFor="subject"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                  >
                    제목
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:border-gray-900 dark:focus:border-gray-400 focus:ring-1 focus:ring-gray-900 dark:focus:ring-gray-400 transition-all duration-300"
                    placeholder="제목을 입력하세요"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                  >
                    메시지
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={6}
                    className="w-full px-4 py-3 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:border-gray-900 dark:focus:border-gray-400 focus:ring-1 focus:ring-gray-900 dark:focus:ring-gray-400 transition-all duration-300 resize-none"
                    placeholder="메시지를 입력하세요"
                    required
                  />
                </div>
                <motion.button
                  type="submit"
                  className="w-full flex items-center justify-center space-x-2 px-6 py-4 bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 font-semibold rounded-lg hover:bg-gray-800 dark:hover:bg-gray-200 transition-all duration-300"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Send className="w-5 h-5" />
                  <span>메시지 보내기</span>
                </motion.button>
              </form>
            </motion.div>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="flex flex-col h-full"
          >
            {/* Contact Information */}
            <motion.div
              className="bg-white dark:bg-gray-800 rounded-xl p-6 sm:p-8 border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-lg transition-all duration-300 flex-1"
              whileHover={{
                y: -3,
                scale: 1.01,
              }}
            >
              <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6">
                연락 정보
              </h2>
              <div className="space-y-6">
                {contactInfo.map((info, index) => (
                  <motion.div
                    key={info.title}
                    className="flex items-center space-x-4"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 + 0.6 }}
                  >
                    <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 border border-blue-200 dark:border-blue-700 rounded-lg flex items-center justify-center text-blue-600 dark:text-blue-400">
                      {info.icon}
                    </div>
                    <div>
                      <h3 className="text-gray-900 dark:text-gray-100 font-medium">
                        {info.title}
                      </h3>
                      <a
                        href={info.href}
                        className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                      >
                        {info.value}
                      </a>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Social Links */}
            <motion.div
              className="bg-white dark:bg-gray-800 rounded-xl p-8 border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-lg transition-all duration-300 mt-8"
              whileHover={{
                y: -5,
                scale: 1.02,
              }}
            >
              <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-6">
                소셜 미디어
              </h3>
              <div className="flex space-x-4">
                {socialLinks.map((social, index) => {
                  const Icon = social.icon;
                  return (
                    <motion.a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-14 h-14 bg-gray-100 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg flex items-center justify-center text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/50 hover:border-blue-300 dark:hover:border-blue-600 transition-all duration-300"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 + 0.8 }}
                    >
                      <Icon className="w-6 h-6" />
                    </motion.a>
                  );
                })}
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Call to Action */}
        <motion.div
          className="text-center mt-20"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
        >
          <motion.div
            className="bg-white dark:bg-gray-800 rounded-xl p-12 border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-lg transition-all duration-300 max-w-4xl mx-auto"
            whileHover={{
              y: -5,
              scale: 1.02,
            }}
          >
            <MessageSquare className="w-12 h-12 text-blue-600 dark:text-blue-400 mx-auto mb-6" />
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6">
              프로젝트 제안은 언제든 환영입니다
            </h2>
            <p className="text-gray-600 dark:text-gray-400 text-lg leading-relaxed mb-8">
              웹 개발과 백엔드 기술에 대한 협업 제안이 있으시면 언제든
              연락주세요.
            </p>
            <motion.a
              href="mailto:donghyeun02@gmail.com"
              className="inline-flex items-center space-x-2 px-8 py-4 bg-blue-600 dark:bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-700 dark:hover:bg-blue-600 transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Mail className="w-5 h-5" />
              <span>이메일로 연락하기</span>
            </motion.a>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
