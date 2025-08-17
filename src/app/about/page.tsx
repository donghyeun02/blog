'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Code,
  Database,
  Globe,
  Zap,
  Calendar,
  MapPin,
  Award,
  Github,
  Mail,
} from 'lucide-react';

export default function AboutPage() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-gray-900 text-xl">Loading...</div>
      </div>
    );
  }

  const skills = [
    { name: 'Node.js', level: 82, color: 'from-green-500 to-emerald-500' },
    { name: 'Java', level: 55, color: 'from-orange-500 to-red-500' },
    { name: 'Go', level: 42, color: 'from-purple-500 to-pink-500' },
    { name: 'Solidity', level: 38, color: 'from-blue-500 to-cyan-500' },
  ];

  const experience = [
    {
      year: '2024 ~ ',
      title: '컴퓨터공학과 재학',
      company: '영남대학교',
      description:
        'B.S. in Computer Science, Yeungnam University (Expected 2027)',
      icon: <Code className="w-5 h-5" />,
    },
    {
      year: '2023',
      title: 'Backend Developer Intern',
      company: 'Integration Co. ECP(E-Commerce Platform)팀',
      description: '2023. 06 ~ 2023. 08, Backend Developer Intern',
      icon: <Globe className="w-5 h-5" />,
    },
    {
      year: '2021',
      title: '컴퓨터공학과 입학',
      company: '영남대학교',
      description: 'B.S. in Computer Science, Yeungnam University',
      icon: <Database className="w-5 h-5" />,
    },
  ];

  return (
    <div className="min-h-screen bg-white relative overflow-hidden">
      <div className="relative z-10 container mx-auto px-4 py-12 sm:py-20">
        {/* Profile Section */}
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 mb-12 sm:mb-20"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          {/* Profile Info */}
          <div className="space-y-8">
            <motion.div
              className="bg-gray-100/50 backdrop-blur-sm rounded-xl p-6 sm:p-8 border border-gray-200"
              whileHover={{
                y: -3,
                rotateX: 1,
                rotateY: 1,
              }}
              style={{
                transformStyle: 'preserve-3d',
              }}
            >
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6">
                개발자 정보
              </h2>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Calendar className="w-5 h-5 text-gray-900" />
                  <span className="text-gray-600">2002. 08. 01</span>
                </div>
                <div className="flex items-center space-x-3">
                  <MapPin className="w-5 h-5 text-gray-900" />
                  <span className="text-gray-600">울산, 대한민국</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Award className="w-5 h-5 text-gray-900" />
                  <span className="text-gray-600">컴퓨터공학 전공</span>
                </div>
              </div>
            </motion.div>

            {/* Contact */}
            <motion.div
              className="bg-gray-100/50 backdrop-blur-sm rounded-xl p-8 border border-gray-200"
              whileHover={{
                y: -5,
                rotateX: 2,
                rotateY: 2,
              }}
              style={{
                transformStyle: 'preserve-3d',
              }}
            >
              <h3 className="text-xl font-bold text-gray-900 mb-6">연락처</h3>
              <div className="flex space-x-4">
                {[
                  {
                    icon: Github,
                    href: 'https://github.com/donghyeun02',
                    label: 'GitHub',
                  },
                  {
                    icon: Mail,
                    href: 'mailto:donghyeun02@gmail.com',
                    label: 'Email',
                  },
                ].map((social) => {
                  const Icon = social.icon;
                  return (
                    <motion.a
                      key={social.label}
                      href={social.href}
                      className="w-12 h-12 bg-gray-200/50 border border-gray-300/50 rounded-lg flex items-center justify-center text-gray-600 hover:text-gray-900 hover:border-gray-900/50 transition-all duration-300"
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <Icon className="w-6 h-6" />
                    </motion.a>
                  );
                })}
              </div>
            </motion.div>
          </div>

          {/* Skills */}
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-8">기술 스택</h2>
            {skills.map((skill, index) => (
              <motion.div
                key={skill.name}
                className="space-y-2"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="flex justify-between items-center">
                  <span className="text-gray-700 font-medium">
                    {skill.name}
                  </span>
                  <span className="text-gray-900 text-sm">{skill.level}%</span>
                </div>
                <div className="w-full bg-gray-200/50 rounded-full h-2 overflow-hidden">
                  <motion.div
                    className={`h-full bg-gradient-to-r ${skill.color} rounded-full`}
                    initial={{ width: 0 }}
                    animate={{ width: `${skill.level}%` }}
                    transition={{ delay: index * 0.1 + 0.5, duration: 1 }}
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Experience Timeline */}
        <motion.div
          className="mb-20"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
            경력
          </h2>
          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-gray-900 to-gray-600" />

            <div className="space-y-12">
              {experience.map((exp, index) => (
                <motion.div
                  key={exp.year}
                  className="relative flex items-start space-x-8"
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.2 + 0.6 }}
                >
                  {/* Timeline Dot */}
                  <div className="relative z-10">
                    <div className="w-16 h-16 bg-gradient-to-r from-gray-900 to-gray-600 rounded-full flex items-center justify-center text-white font-bold">
                      {exp.year}
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-r from-gray-900 to-gray-600 rounded-full blur-lg opacity-50" />
                  </div>

                  {/* Content */}
                  <motion.div
                    className="flex-1 bg-gray-100/50 backdrop-blur-sm rounded-xl p-6 border border-gray-200"
                    whileHover={{
                      y: -5,
                      rotateX: 2,
                      rotateY: 2,
                    }}
                    style={{
                      transformStyle: 'preserve-3d',
                    }}
                  >
                    <div className="flex items-center space-x-3 mb-4">
                      <div className="text-gray-900">{exp.icon}</div>
                      <h3 className="text-xl font-bold text-gray-900">
                        {exp.title}
                      </h3>
                    </div>
                    <p className="text-gray-700 font-medium mb-2">
                      {exp.company}
                    </p>
                    <p className="text-gray-600">{exp.description}</p>
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Philosophy */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          <motion.div
            className="bg-gray-100/50 backdrop-blur-sm rounded-xl p-12 border border-gray-200 max-w-4xl mx-auto"
            whileHover={{
              y: -5,
              rotateX: 2,
              rotateY: 2,
            }}
            style={{
              transformStyle: 'preserve-3d',
            }}
          >
            <Zap className="w-12 h-12 text-gray-900 mx-auto mb-6" />
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              &ldquo;If it ain&apos;t broke, don&apos;t fix it&rdquo;
            </h2>
            <p className="text-gray-600 text-lg leading-relaxed">
              검증된 코드의 안정성을 존중하며, 시스템의 안정성과 유지보수성을
              최우선으로 하는 개발 철학을 가지고 있습니다.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
