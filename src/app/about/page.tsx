'use client';

import { useState } from 'react';

export default function AboutPage() {
  const [isStoryExpanded, setIsStoryExpanded] = useState(false);

  return (
    <main className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8 text-center">About This Blog</h1>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-6">
          안녕하세요, 개발자 신동현입니다 👋
        </h2>
        <div className="text-neutral-700 leading-relaxed space-y-6">
          <p>
            이 블로그는 <b>Web3 기술로 구축된 블록체인 기반 블로그</b>입니다.
            <br />
            단순한 기술 블로그가 아니라,{' '}
            <b>&quot;위변조 방지, 소유권 증명, 그리고 탈중앙화&quot;</b>를
            실제로 구현한 실험적 블로그입니다.
          </p>

          <button
            onClick={() => setIsStoryExpanded(!isStoryExpanded)}
            className="flex items-center gap-2 text-blue-600 hover:text-blue-800 transition-colors font-medium"
          >
            <span>{isStoryExpanded ? '▼' : '▶'}</span>
            {isStoryExpanded
              ? '스토리 접기'
              : '왜 이런 블로그를 만들게 되었을까요?'}
          </button>

          {isStoryExpanded && (
            <div className="space-y-6 mt-6">
              <p>저는 항상 이런 순간이 옵니다.</p>
              <p className="text-lg font-medium text-center italic font-semibold">
                &quot; 이론은 진짜 알겠는데… 이게 어떻게 실제로 돌아가는 건데 ?
                &quot;
              </p>
              <p>
                Web3 기술을 공부하면서도 마찬가지였습니다. <br />
                <br />
                <li>&quot;블록체인이 어떻게 작동하는지&quot;,</li>
                <li>&quot;스마트컨트랙트는 어떻게 배포되는지&quot;,</li>
                <li>&quot;IPFS는 어떻게 파일을 저장하는지&quot;, ...</li>
                <br />
                이런 것들이 궁금했습니다.
              </p>
              <p>
                그런데 문서를 읽거나, 강의를 들어도 뭔가 와닿지 않았습니다.
                <br />
                <b>직접 해보지 않으면 진짜 이해가 안 된다</b>는 걸 깨달았습니다.
              </p>
              <p>
                그래서 저는 <b>&quot;실제로 작동하는 Web3 블로그&quot;</b> 를
                만들기로 했습니다.
                <br />
                이론만 배우는 게 아니라, 실제로 블록체인에 글을 올리고,
                <br />
                IPFS에 저장하고, 무결성을 검증하는 시스템을 구축해보기로
                했습니다.
              </p>
              <p className="text-neutral-700 italic text-center text-base sm:text-lg mb-6 font-semibold">
                &quot;Web3는 붙이는 게 아니라 &apos;통합&apos;하는 것이다&quot;
              </p>
              <ul className="list-disc pl-6 space-y-1">
                <li>
                  블록체인, IPFS, 프론트엔드가 유기적으로 연결되어야 실제
                  서비스가 된다
                </li>
                <li>
                  모든 컴포넌트 사이에서 실패 가능성을 예측하고 설계하는 게
                  중요하다
                </li>
                <li>
                  스마트컨트랙트는 &apos;누구나 호출할 수 있다&apos;는 사실을
                  잊지 말자
                </li>
              </ul>
            </div>
          )}
        </div>
      </section>

      <hr className="border-gray-300 my-8" />

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-6">이 블로그의 특징</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-blue-50 p-6 rounded-lg">
            <h3 className="font-semibold mb-3 text-blue-800">🔒 무결성 보장</h3>
            <p className="text-blue-700">
              모든 글은 IPFS에 저장되고 블록체인에 해시가 등록되어 위변조가
              불가능합니다.
            </p>
          </div>
          <div className="bg-green-50 p-6 rounded-lg">
            <h3 className="font-semibold mb-3 text-green-800">
              👤 소유권 증명
            </h3>
            <p className="text-green-700">
              스마트컨트랙트를 통해 글의 작성자와 작성 시점이 블록체인에 영구
              기록됩니다.
            </p>
          </div>
          <div className="bg-purple-50 p-6 rounded-lg">
            <h3 className="font-semibold mb-3 text-purple-800">🌐 탈중앙화</h3>
            <p className="text-purple-700">
              중앙 서버에 의존하지 않고 IPFS와 블록체인으로 분산 저장됩니다.
            </p>
          </div>
          <div className="bg-orange-50 p-6 rounded-lg">
            <h3 className="font-semibold mb-3 text-orange-800">🔍 투명성</h3>
            <p className="text-orange-700">
              모든 글의 무결성을 실시간으로 검증할 수 있습니다.
            </p>
          </div>
        </div>
      </section>

      <hr className="border-gray-300 my-8" />

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-6">
          이 블로그에서 다루는 내용
        </h2>
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <span>
              <b>- CS 기초</b> : 논리회로, 자료구조, 알고리즘
            </span>
          </div>
          <div className="flex items-center gap-3">
            <span>
              <b>- 백엔드 개발</b> : Go, Java(Spring), 시스템 설계
            </span>
          </div>
          <div className="flex items-center gap-3">
            <span>
              <b>- 인프라 & DevOps</b> : Docker, 클라우드, 모니터링
            </span>
          </div>
          <div className="flex items-center gap-3">
            <span>
              <b>- 블록체인(Blockchain)</b> : 스마트컨트랙트, Web3, 탈중앙화
            </span>
          </div>
          <div className="flex items-center gap-3">
            <span>
              <b>- Dev(개발 일반)</b> : 클린 코드, 테스트, 생산성
            </span>
          </div>
        </div>
      </section>

      <hr className="border-gray-300 my-8" />

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-6">이 블로그의 작동 방식</h2>
        <div className="bg-gray-50 p-6 rounded-lg">
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <span className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mt-2">
                1
              </span>
              <div>
                <h4 className="font-semibold">글 작성</h4>
                <p className="text-sm text-gray-600">
                  MDX 형식으로 글을 작성하고 IPFS에 업로드
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mt-2">
                2
              </span>
              <div>
                <h4 className="font-semibold">블록체인 등록</h4>
                <p className="text-sm text-gray-600">
                  IPFS CID를 Polygon 블록체인에 등록
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mt-2">
                3
              </span>
              <div>
                <h4 className="font-semibold">무결성 검증</h4>
                <p className="text-sm text-gray-600">
                  실시간으로 글의 무결성을 검증
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mt-2">
                4
              </span>
              <div>
                <h4 className="font-semibold">분산 저장</h4>
                <p className="text-sm text-gray-600">
                  IPFS 네트워크에 분산 저장되어 가용성 보장
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <hr className="border-gray-300 my-8" />

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-6">이 블로그의 가치</h2>
        <div className="text-neutral-700 leading-relaxed space-y-4">
          <p>
            <b>기술적 실험</b> : Web3 기술을 실제 서비스 수준에서 구현해보는
            실험적 블로그입니다.
          </p>
          <p>
            <b>투명성과 신뢰</b> : 모든 글이 블록체인에 기록되어 위변조가
            불가능하고, 작성 시점과 작성자가 영구적으로 보장됩니다.
          </p>
          <p>
            <b>탈중앙화</b>: 중앙 서버에 의존하지 않고 IPFS와 블록체인으로 분산
            저장되어 서비스 중단 위험이 없습니다.
          </p>
          <p>
            <b>실전 경험</b> : Web3 기술의 실제 구현 과정과 도전 과제를 투명하게
            공유하는 개발 블로그입니다.
          </p>
        </div>
      </section>

      <hr className="border-gray-300 my-8" />

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-6">프로젝트 문서</h2>
        <div className="space-y-6">
          <p className="text-neutral-700">
            이 Web3 블로그 프로젝트의 상세한 개발 과정과 회고를 노션에서 확인할
            수 있습니다.
          </p>

          {/* 메인 프로젝트 개요 */}
          <div className="bg-white p-6 rounded-lg border border-gray-200 hover:border-blue-300 transition-colors">
            <h3 className="font-semibold mb-3 text-blue-800 text-lg">
              📋 프로젝트 개요
            </h3>
            <p className="text-gray-600 mb-4">
              프로젝트 목적, 기술 스택, 주요 기능 요약
            </p>
            <a
              href="https://donghyeun02.notion.site/Web3-23c2ee104c6680eaa1d2c377e781427f"
              className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 font-medium"
              target="_blank"
              rel="noopener noreferrer"
            >
              노션에서 보기
              <span>→</span>
            </a>
          </div>

          {/* 하위 3개 섹션 */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-5 rounded-lg border border-gray-200 hover:border-orange-300 transition-colors">
              <h4 className="font-semibold mb-3 text-orange-700">
                🐛 개발 이슈
              </h4>
              <p className="text-gray-600 mb-4 text-sm leading-relaxed">
                개발 중 겪은 실제 문제들과 해결 로그 기록
              </p>
              <a
                href="https://donghyeun02.notion.site/Web3-23c2ee104c6680129082cce97e0a1519"
                className="inline-flex items-center gap-1 text-orange-600 hover:text-orange-800 font-medium text-sm"
                target="_blank"
                rel="noopener noreferrer"
              >
                노션에서 보기
                <span>→</span>
              </a>
            </div>
            <div className="bg-white p-5 rounded-lg border border-gray-200 hover:border-green-300 transition-colors">
              <h4 className="font-semibold mb-3 text-green-700">
                📝 프로젝트 회고
              </h4>
              <p className="text-gray-600 mb-4 text-sm leading-relaxed">
                4L 방식으로 정리한 기술적/심리적 인사이트
              </p>
              <a
                href="https://donghyeun02.notion.site/Web3-feat-4L-23c2ee104c6680679da5ea58ef1ee0df#23c2ee104c668162be16eb458471bd61"
                className="inline-flex items-center gap-1 text-green-600 hover:text-green-800 font-medium text-sm"
                target="_blank"
                rel="noopener noreferrer"
              >
                노션에서 보기
                <span>→</span>
              </a>
            </div>
            <div className="bg-white p-5 rounded-lg border border-gray-200 hover:border-purple-300 transition-colors">
              <h4 className="font-semibold mb-3 text-purple-700">
                💡 왜 Web3 블로그?
              </h4>
              <p className="text-gray-600 mb-4 text-sm leading-relaxed">
                블로그에 Web3를 적용한 이유와 가치에 대한 설명
              </p>
              <a
                href="https://donghyeun02.notion.site/Web3-23e2ee104c668044a3d2c9bb3b08a173"
                className="inline-flex items-center gap-1 text-purple-600 hover:text-purple-800 font-medium text-sm"
                target="_blank"
                rel="noopener noreferrer"
              >
                노션에서 보기
                <span>→</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      <hr className="border-gray-300 my-8" />

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-6">기술 스택</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-semibold mb-3">Frontend</h3>
            <ul className="list-disc pl-6 text-neutral-700 space-y-1">
              <li>Next.js</li>
              <li>TailwindCSS</li>
              <li>TypeScript</li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-3">Blockchain</h3>
            <ul className="list-disc pl-6 text-neutral-700 space-y-1">
              <li>Ethers.js</li>
              <li>Solidity</li>
              <li>Polygon Network</li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-3">Storage</h3>
            <ul className="list-disc pl-6 text-neutral-700 space-y-1">
              <li>IPFS (Pinata)</li>
              <li>CID (Content Identifier)</li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-3">Deployment</h3>
            <ul className="list-disc pl-6 text-neutral-700 space-y-1">
              <li>Vercel</li>
              <li>MetaMask</li>
            </ul>
          </div>
        </div>
      </section>

      <hr className="border-gray-300 my-8" />

      <section>
        <h2 className="text-xl font-semibold mb-6">연락처 & 링크</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-semibold mb-3">개인 정보</h3>
            <ul className="space-y-2 text-sm">
              <li>
                Email :{' '}
                <a
                  href="mailto:donghyeun02@gmail.com"
                  className="text-gray-600 hover:text-blue-600 transition-colors font-medium hover:underline"
                >
                  donghyeun02@gmail.com
                </a>
              </li>
              <li>
                GitHub :{' '}
                <a
                  href="https://github.com/donghyeun02"
                  className="text-gray-600 hover:text-blue-600 transition-colors font-medium hover:underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  donghyeun02
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-3">블로그 관련 깃허브</h3>
            <ul className="space-y-2 text-sm">
              <li>
                프론트엔드 :{' '}
                <a
                  href="https://github.com/donghyeun02/blog"
                  className="text-gray-600 hover:text-blue-600 transition-colors font-medium hover:underline"
                >
                  blog
                </a>
              </li>
              <li>
                스마트컨트랙트 :{' '}
                <a
                  href="https://github.com/donghyeun02/blog-registry"
                  className="text-gray-600 hover:text-blue-600 transition-colors font-medium hover:underline"
                >
                  blog-registry
                </a>
              </li>
            </ul>
          </div>
        </div>
      </section>
    </main>
  );
}
