'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Github, ExternalLink, Hexagon, Users } from 'lucide-react';

interface Project {
  title: string;
  description: string;
  category: string;
  technologies: string[];
  image: string;
  github: string;
  demo?: string;
  contributors: number;
  date: string;
  icon: React.ReactElement;
  details?: {
    story: string;
    features: string[];
    challenges: string[];
    learnings: string[];
  };
}

export default function ProjectsPage() {
  const [isClient, setIsClient] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isStoryExpanded, setIsStoryExpanded] = useState(false);

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

  const projects = [
    {
      title: '개인 블로그',
      description:
        'Web3 기술로 구축된 블록체인 기반 블로그. IPFS 분산 저장소와 스마트컨트랙트를 활용한 무결성 보장 시스템을 구현했습니다.',
      category: 'web',
      technologies: [
        'Next.js',
        'React',
        'Tailwind CSS',
        'TypeScript',
        'Solidity',
        'IPFS',
        'Polygon',
      ],
      image:
        'https://donghyeun-blog-images.s3.us-east-1.amazonaws.com/%E1%84%87%E1%85%A6%E1%84%89%E1%85%B3%E1%84%90%E1%85%B3%E1%84%89%E1%85%A6%E1%86%AF%E1%84%85%E1%85%A5.png',
      github: 'https://github.com/donghyeun02/blog',
      demo: undefined,
      contributors: 1,
      date: '2025',
      icon: <Hexagon className="w-6 h-6" />,
    },
  ];

  const categories = [
    { id: 'all', name: '전체', color: 'from-blue-500 to-cyan-500' },
    { id: 'web', name: '웹 개발', color: 'from-green-500 to-emerald-500' },
    { id: 'backend', name: '백엔드', color: 'from-purple-500 to-pink-500' },
    { id: 'study', name: '학습', color: 'from-orange-500 to-red-500' },
  ];

  const filteredProjects =
    selectedCategory === 'all'
      ? projects
      : projects.filter(
          (project) => project.category.toLowerCase() === selectedCategory
        );

  const openModal = (project: Project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedProject(null);
  };

  return (
    <div className="min-h-screen bg-white relative overflow-hidden">
      <div className="relative z-10 container mx-auto px-4 py-8">
        {/* Category Filter */}
        <motion.div
          className="flex flex-wrap justify-center gap-1.5 sm:gap-2 lg:gap-3 mb-4 sm:mb-6 px-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          {categories.map((category) => (
            <motion.button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`group relative px-3 sm:px-4 lg:px-6 py-2 sm:py-3 rounded-lg font-medium transition-all duration-300 text-xs sm:text-sm lg:text-base ${
                selectedCategory === category.id
                  ? 'text-white shadow-lg'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {selectedCategory === category.id && (
                <motion.div
                  className="absolute inset-0 bg-gray-900 rounded-lg"
                  layoutId="projectCategoryBackground"
                  transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                />
              )}
              <span className="relative z-10">{category.name}</span>
            </motion.button>
          ))}
        </motion.div>

        {/* Projects Grid */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8 px-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 + 0.6 }}
            >
              <motion.article
                className="group relative h-full bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer"
                whileHover={{
                  y: -4,
                  scale: 1.01,
                }}
                onClick={() => openModal(project)}
              >
                {/* Project Background Glow */}
                <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-gray-100 opacity-0 group-hover:opacity-100 transition-opacity" />

                {/* Header */}
                <div className="p-4 sm:p-6 relative z-10">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className="text-blue-600">{project.icon}</div>
                      <span className="px-3 py-1 text-xs font-medium bg-blue-100 text-blue-700 rounded-full border border-blue-200">
                        {project.category}
                      </span>
                    </div>
                    <span className="text-xs text-gray-500">
                      {project.date}
                    </span>
                  </div>

                  {/* Title with Contributors */}
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-xl font-semibold text-gray-900 group-hover:text-gray-800 transition-colors">
                      {project.title}
                    </h3>
                    <div className="flex items-center space-x-1 text-xs text-gray-500">
                      <Users className="w-3 h-3" />
                      <span>{project.contributors}명</span>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-gray-600 text-sm mb-6 line-clamp-3">
                    {project.description}
                  </p>

                  {/* Technologies */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded border border-gray-200 group-hover:bg-gray-300 group-hover:text-gray-800 group-hover:border-gray-400"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Links */}
                  <div className="flex items-center space-x-3 mb-4">
                    <motion.a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center space-x-2 px-4 py-2 bg-gray-100 border border-gray-200 rounded-lg text-gray-700 hover:text-gray-900 hover:bg-gray-200 hover:border-gray-300 transition-all duration-300"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={(e) => e.stopPropagation()}
                    >
                      <Github className="w-4 h-4" />
                      <span className="text-sm">GitHub</span>
                    </motion.a>
                    {project.demo && project.demo !== '#' && (
                      <motion.a
                        href={project.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center space-x-2 px-4 py-2 bg-blue-100 border border-blue-200 rounded-lg text-blue-700 hover:text-blue-900 hover:bg-blue-200 hover:border-blue-300 transition-all duration-300"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={(e) => e.stopPropagation()}
                      >
                        <ExternalLink className="w-4 h-4" />
                        <span className="text-sm">Demo</span>
                      </motion.a>
                    )}
                  </div>

                  {/* Click to view details */}
                  {project.title === '개인 블로그' && (
                    <div className="text-center pt-2">
                      <span className="text-xs text-blue-600 hover:text-blue-700 transition-colors">
                        클릭하여 상세 정보 보기
                      </span>
                    </div>
                  )}
                </div>
              </motion.article>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Project Detail Modal */}
      {isModalOpen && selectedProject && (
        <motion.div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={closeModal}
        >
          <motion.div
            className="bg-white dark:bg-gray-800 rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="text-blue-600 dark:text-blue-400">
                    {selectedProject.icon}
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                      {selectedProject.title}
                    </h2>
                    <p className="text-gray-600 dark:text-gray-400">
                      {selectedProject.description}
                    </p>
                  </div>
                </div>
                <button
                  onClick={closeModal}
                  className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
            </div>

            {/* Modal Content */}
            <div className="p-6">
              {selectedProject.title === '개인 블로그' ? (
                <div className="space-y-8">
                  {/* Introduction */}
                  <section>
                    <div className="text-gray-700 dark:text-gray-300 leading-relaxed space-y-4">
                      <p>
                        이 블로그는{' '}
                        <b>Web3 기술로 구축된 블록체인 기반 블로그</b>입니다.
                        <br />
                        단순한 기술 블로그가 아니라,{' '}
                        <b>
                          &ldquo;위변조 방지, 소유권 증명, 그리고
                          탈중앙화&rdquo;
                        </b>
                        를 실제로 구현한 실험적 블로그입니다.
                      </p>

                      <button
                        onClick={() => setIsStoryExpanded(!isStoryExpanded)}
                        className="flex items-center gap-2 text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 transition-colors font-medium"
                      >
                        <span>{isStoryExpanded ? '▼' : '▶'}</span>
                        {isStoryExpanded
                          ? '스토리 접기'
                          : '왜 이런 블로그를 만들게 되었을까요?'}
                      </button>

                      {isStoryExpanded && (
                        <div className="space-y-4 mt-4">
                          <p className="text-lg font-medium text-center italic font-semibold text-gray-900 dark:text-gray-100">
                            &ldquo;이런 기능에 굳이 Web3가 필요한가요?&rdquo;
                          </p>
                          <p className="text-gray-700 dark:text-gray-300">
                            사실, 글을 쓰고 저장하고 보여주는 기능은 Web2
                            기술만으로도 충분히 구현 가능할 수 있습니다.
                            <br />
                            IPFS, 스마트컨트랙트, 메타마스크 — 기능만 보면 굳이
                            필요없고, 오히려 과하다고 느껴질 수도 있습니다.
                          </p>
                          <p className="text-gray-700 dark:text-gray-300">
                            하지만 이 프로젝트는 단순한 블로그 개발이 아니라,
                            <br />
                            <b>
                              Web3 기술이 실제 서비스에서 어떻게 작동할 수
                              있을지 직접 실험해본 경험
                            </b>
                            이었습니다.
                          </p>
                          <p className="text-gray-700 dark:text-gray-300">
                            공부를 하면서 늘 이런 생각을 가지고 있었습니다.
                          </p>
                          <p className="text-lg font-medium text-center italic font-semibold text-gray-900 dark:text-gray-100">
                            &ldquo;이론은 알겠는데… 이게 실제로는 어떻게
                            돌아가지?&rdquo;
                          </p>
                          <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300">
                            <li>블록체인은 정말 안전하게 데이터를 기록할까?</li>
                            <li>IPFS는 분산 저장을 어떻게 유지할까?</li>
                            <li>
                              스마트컨트랙트는 실제 서비스에서 어떻게 쓰일까?
                            </li>
                          </ul>
                          <p className="text-gray-700 dark:text-gray-300">
                            책이나 강의로는 이 질문들에 대한 실감이 없었습니다.
                            <br />
                            그래서 직접 만들어보며 부딪혀 보기로 했습니다.
                          </p>
                          <p className="text-gray-700 dark:text-gray-300">
                            그 과정에서 IPFS 정책 변경, RPC 연결 불안정, 지갑
                            연동 문제 등
                            <br />
                            <b>
                              단순한 학습으론 절대 마주칠 수 없는 현실적인
                              문제들
                            </b>
                            을 경험했습니다.
                          </p>
                          <p className="text-gray-700 dark:text-gray-300 italic text-center text-base sm:text-lg mb-6 font-semibold">
                            &ldquo;Web3는 붙이는 게 아니라, 통합하는
                            것이다.&rdquo;
                          </p>
                          <p className="text-gray-700 dark:text-gray-300">
                            이 블로그는 그 통합 과정을 작게나마{' '}
                            <b>끝까지 구현해본 실전 기록</b>입니다.
                            <br />
                            단순히 기술을 배우는 데 그치지 않고,
                            <br />
                            <b>
                              Web3의 구조적 한계와 가능성을 직접 체감하며 만든
                              의미있는 시도
                            </b>
                            였습니다.
                          </p>
                        </div>
                      )}
                    </div>
                  </section>

                  {/* Blog Features */}
                  <section>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
                      이 블로그의 특징
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-4 rounded-lg hover:border-gray-300 dark:hover:border-gray-600 transition-colors">
                        <h4 className="font-semibold mb-2 text-gray-900 dark:text-gray-100">
                          무결성 보장
                        </h4>
                        <p className="text-gray-600 dark:text-gray-400 text-sm">
                          모든 글은 IPFS에 저장되고 블록체인에 해시가 등록되어
                          위변조가 불가능합니다.
                        </p>
                      </div>
                      <div className="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-4 rounded-lg hover:border-gray-300 dark:hover:border-gray-600 transition-colors">
                        <h4 className="font-semibold mb-2 text-gray-900 dark:text-gray-100">
                          소유권 증명
                        </h4>
                        <p className="text-gray-600 dark:text-gray-400 text-sm">
                          스마트컨트랙트를 통해 글의 작성자와 작성 시점이
                          블록체인에 영구 기록됩니다.
                        </p>
                      </div>
                      <div className="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-4 rounded-lg hover:border-gray-300 dark:hover:border-gray-600 transition-colors">
                        <h4 className="font-semibold mb-2 text-gray-900 dark:text-gray-100">
                          탈중앙화
                        </h4>
                        <p className="text-gray-600 dark:text-gray-400 text-sm">
                          중앙 서버에 의존하지 않고 IPFS와 블록체인으로 분산
                          저장됩니다.
                        </p>
                      </div>
                      <div className="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-4 rounded-lg hover:border-gray-300 dark:hover:border-gray-600 transition-colors">
                        <h4 className="font-semibold mb-2 text-gray-900 dark:text-gray-100">
                          투명성
                        </h4>
                        <p className="text-gray-600 dark:text-gray-400 text-sm">
                          모든 글의 무결성을 실시간으로 검증할 수 있습니다.
                        </p>
                      </div>
                    </div>
                  </section>

                  {/* How it works */}
                  <section>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
                      이 블로그의 작동 방식
                    </h3>
                    <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                      <div className="space-y-4">
                        <div className="flex items-center gap-3">
                          <span className="bg-blue-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold flex-shrink-0">
                            1
                          </span>
                          <div>
                            <h4 className="font-semibold text-sm text-gray-900 dark:text-gray-100">
                              글 작성
                            </h4>
                            <p className="text-xs text-gray-600 dark:text-gray-400">
                              MDX 형식으로 글을 작성하고 IPFS에 업로드
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="bg-blue-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold flex-shrink-0">
                            2
                          </span>
                          <div>
                            <h4 className="font-semibold text-sm text-gray-900 dark:text-gray-100">
                              블록체인 등록
                            </h4>
                            <p className="text-xs text-gray-600 dark:text-gray-400">
                              IPFS CID를 Polygon 블록체인에 등록
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="bg-blue-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold flex-shrink-0">
                            3
                          </span>
                          <div>
                            <h4 className="font-semibold text-sm text-gray-900 dark:text-gray-100">
                              무결성 검증
                            </h4>
                            <p className="text-xs text-gray-600 dark:text-gray-400">
                              실시간으로 글의 무결성을 검증
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="bg-blue-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold flex-shrink-0">
                            4
                          </span>
                          <div>
                            <h4 className="font-semibold text-sm text-gray-900 dark:text-gray-100">
                              분산 저장
                            </h4>
                            <p className="text-xs text-gray-600 dark:text-gray-400">
                              IPFS 네트워크에 분산 저장되어 가용성 보장
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </section>

                  {/* Blog Value */}
                  <section>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
                      이 블로그의 가치
                    </h3>
                    <div className="text-gray-700 dark:text-gray-300 leading-relaxed space-y-3">
                      <p className="text-sm">
                        <b>기술적 실험</b> : Web3 기술을 실제 서비스 수준에서
                        구현해보는 실험적 블로그입니다.
                      </p>
                      <p className="text-sm">
                        <b>투명성과 신뢰</b> : 모든 글이 블록체인에 기록되어
                        위변조가 불가능하고, 작성 시점과 작성자가 영구적으로
                        보장됩니다.
                      </p>
                      <p className="text-sm">
                        <b>탈중앙화</b>: 중앙 서버에 의존하지 않고 IPFS와
                        블록체인으로 분산 저장되어 서비스 중단 위험이 없습니다.
                      </p>
                      <p className="text-sm">
                        <b>실전 경험</b> : Web3 기술의 실제 구현 과정과 도전
                        과제를 투명하게 공유하는 개발 블로그입니다.
                      </p>
                    </div>
                  </section>

                  {/* Project Documentation */}
                  <section>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
                      프로젝트 문서
                    </h3>
                    <div className="space-y-4">
                      <p className="text-gray-700 dark:text-gray-300 text-sm">
                        이 Web3 블로그 프로젝트의 상세한 개발 과정과 회고를
                        노션에서 확인할 수 있습니다.
                      </p>

                      <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-gray-400 dark:hover:border-gray-600 hover:shadow-md dark:hover:shadow-gray-900/20 transition-all duration-200">
                        <h4 className="font-semibold mb-2 text-gray-900 dark:text-gray-100">
                          프로젝트 개요
                        </h4>
                        <p className="text-gray-600 dark:text-gray-400 mb-3 text-sm">
                          프로젝트 목적, 기술 스택, 주요 기능 요약
                        </p>
                        <motion.a
                          href="https://donghyeun02.notion.site/Web3-23c2ee104c6680eaa1d2c377e781427f"
                          className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 font-medium text-sm"
                          target="_blank"
                          rel="noopener noreferrer"
                          whileHover={{ scale: 1.02 }}
                        >
                          노션에서 보기
                          <span>→</span>
                        </motion.a>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="bg-white dark:bg-gray-800 p-3 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-gray-400 dark:hover:border-gray-600 hover:shadow-md dark:hover:shadow-gray-900/20 transition-all duration-200">
                          <h5 className="font-semibold mb-2 text-gray-900 dark:text-gray-100 text-sm">
                            개발 이슈
                          </h5>
                          <p className="text-gray-600 dark:text-gray-400 mb-3 text-xs leading-relaxed">
                            개발 중 겪은 실제 문제들과 해결 로그 기록
                          </p>
                          <motion.a
                            href="https://donghyeun02.notion.site/Web3-23c2ee104c6680129082cce97e0a1519"
                            className="inline-flex items-center gap-1 text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 font-medium text-xs"
                            target="_blank"
                            rel="noopener noreferrer"
                            whileHover={{ scale: 1.02 }}
                          >
                            노션에서 보기
                            <span>→</span>
                          </motion.a>
                        </div>
                        <div className="bg-white dark:bg-gray-800 p-3 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-gray-400 dark:hover:border-gray-600 hover:shadow-md dark:hover:shadow-gray-900/20 transition-all duration-200">
                          <h5 className="font-semibold mb-2 text-gray-900 dark:text-gray-100 text-sm">
                            프로젝트 회고
                          </h5>
                          <p className="text-gray-600 dark:text-gray-400 mb-3 text-xs leading-relaxed">
                            4L 방식으로 정리한 기술적/심리적 인사이트
                          </p>
                          <motion.a
                            href="https://donghyeun02.notion.site/Web3-feat-4L-23c2ee104c6680679da5ea58ef1ee0df#23c2ee104c668162be16eb458471bd61"
                            className="inline-flex items-center gap-1 text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 font-medium text-xs"
                            target="_blank"
                            rel="noopener noreferrer"
                            whileHover={{ scale: 1.02 }}
                          >
                            노션에서 보기
                            <span>→</span>
                          </motion.a>
                        </div>
                        <div className="bg-white dark:bg-gray-800 p-3 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-gray-400 dark:hover:border-gray-600 hover:shadow-md dark:hover:shadow-gray-900/20 transition-all duration-200">
                          <h5 className="font-semibold mb-2 text-gray-900 dark:text-gray-100 text-sm">
                            왜 Web3 블로그?
                          </h5>
                          <p className="text-gray-600 dark:text-gray-400 mb-3 text-xs leading-relaxed">
                            블로그에 Web3를 적용한 이유와 가치에 대한 설명
                          </p>
                          <motion.a
                            href="https://donghyeun02.notion.site/Web3-23e2ee104c668044a3d2c9bb3b08a173"
                            className="inline-flex items-center gap-1 text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 font-medium text-xs"
                            target="_blank"
                            rel="noopener noreferrer"
                            whileHover={{ scale: 1.02 }}
                          >
                            노션에서 보기
                            <span>→</span>
                          </motion.a>
                        </div>
                      </div>
                    </div>
                  </section>

                  {/* Tech Stack */}
                  <section>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
                      기술 스택
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <h4 className="font-semibold mb-2 text-sm text-gray-900 dark:text-gray-100">
                          Frontend
                        </h4>
                        <ul className="list-disc pl-4 text-gray-700 dark:text-gray-300 space-y-1 text-sm">
                          <li>Next.js</li>
                          <li>TailwindCSS</li>
                          <li>TypeScript</li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-2 text-sm text-gray-900 dark:text-gray-100">
                          Blockchain
                        </h4>
                        <ul className="list-disc pl-4 text-gray-700 dark:text-gray-300 space-y-1 text-sm">
                          <li>Ethers.js</li>
                          <li>Solidity</li>
                          <li>Polygon Network</li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-2 text-sm text-gray-900 dark:text-gray-100">
                          Storage
                        </h4>
                        <ul className="list-disc pl-4 text-gray-700 dark:text-gray-300 space-y-1 text-sm">
                          <li>IPFS (Pinata)</li>
                          <li>CID (Content Identifier)</li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-2 text-sm text-gray-900 dark:text-gray-100">
                          Deployment
                        </h4>
                        <ul className="list-disc pl-4 text-gray-700 dark:text-gray-300 space-y-1 text-sm">
                          <li>Vercel</li>
                          <li>MetaMask</li>
                        </ul>
                      </div>
                    </div>
                  </section>

                  {/* Contact & Links */}
                  <section>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
                      연락처 & 링크
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <h4 className="font-semibold mb-2 text-sm text-gray-900 dark:text-gray-100">
                          연락처
                        </h4>
                        <ul className="space-y-1 text-sm">
                          <li className="text-gray-700 dark:text-gray-300">
                            Email :{' '}
                            <a
                              href="mailto:donghyeun02@gmail.com"
                              className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 transition-colors font-medium hover:underline"
                            >
                              donghyeun02@gmail.com
                            </a>
                          </li>
                          <li className="text-gray-700 dark:text-gray-300">
                            GitHub :{' '}
                            <a
                              href="https://github.com/donghyeun02"
                              className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 transition-colors font-medium hover:underline"
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              donghyeun02
                            </a>
                          </li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-2 text-sm text-gray-900 dark:text-gray-100">
                          블로그 관련 깃허브
                        </h4>
                        <ul className="space-y-1 text-sm">
                          <li className="text-gray-700 dark:text-gray-300">
                            프론트엔드 :{' '}
                            <a
                              href="https://github.com/donghyeun02/blog"
                              className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 transition-colors font-medium hover:underline"
                            >
                              blog
                            </a>
                          </li>
                          <li className="text-gray-700 dark:text-gray-300">
                            스마트컨트랙트 :{' '}
                            <a
                              href="https://github.com/donghyeun02/blog-registry"
                              className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 transition-colors font-medium hover:underline"
                            >
                              blog-registry
                            </a>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </section>
                </div>
              ) : (
                <div className="text-center py-8">
                  <p className="text-gray-600">상세 정보가 없습니다.</p>
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="p-6 border-t border-gray-200 flex justify-end space-x-3">
              <motion.a
                href={selectedProject.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Github className="w-4 h-4" />
                <span>GitHub</span>
              </motion.a>
              {selectedProject.demo !== '#' && (
                <motion.a
                  href={selectedProject.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <ExternalLink className="w-4 h-4" />
                  <span>Demo</span>
                </motion.a>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}
