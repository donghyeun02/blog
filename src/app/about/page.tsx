'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#181A1B] relative overflow-hidden transition-colors">
      <div className="relative z-10 container mx-auto px-4 sm:px-8 md:px-12 lg:px-16 py-12 sm:py-16 md:py-24 max-w-4xl">
        {/* Header */}
        <motion.div
          className="mb-16 sm:mb-20"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Link
            href="/"
            className="inline-block mb-6 text-sm text-[#E2E6E9] hover:text-[#FFFFFF] transition-colors"
          >
            ← 홈으로 돌아가기
          </Link>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-[#FFFFFF] mb-4">
            About
          </h1>
        </motion.div>

        {/* Content */}
        <motion.div
          className="space-y-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="space-y-6 text-sm sm:text-base md:text-lg text-[#E2E6E9] leading-relaxed">
            <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-heading font-bold text-[#FFFFFF] mb-4">
              &quot;글을 왜 쓰는가?&quot;
            </p>
            <p>
              글을 쓰는 이유는 사람마다 다릅니다. 누군가는 정리하기 위해,
              누군가는 표현하기 위해, 그리고 어떤 사람은 단순히 자기 자신을 잊지
              않기 위해 씁니다.
            </p>
            <p>
              저에게 글은 그런 &apos;기록&apos;이었습니다. 돌아보면 예전 글들은 서툴고
              부끄럽습니다. 지금 보면 참 못 썼다고 느끼지만, 그때의 생각과
              시선이 담긴 흔적이라는 점에서 그 어떤 글보다 진짜 같았습니다.
            </p>
            <p>그래서 문득 궁금했습니다.</p>
            <p className="pl-4 border-l-2 border-[#FFFFFF]">
              &quot;이런 글들을 조금 더 &apos;기록&apos;답게, 사라지지 않는 형태로 남길 수는
              없을까?&quot;
            </p>
            <p>그 단순한 호기심이, 이 블로그의 출발점이었습니다.</p>

            <div className="my-12 border-t border-[#1D1F22]"></div>

            <h2 className="text-xl sm:text-2xl md:text-3xl font-heading font-bold text-[#FFFFFF] mb-4 sm:mb-6">
              글이 &apos;기록&apos;이 되는 순간
            </h2>
            <p>
              시간이 지나면 블로그 글은 바뀌고, 계정이 사라지면 함께 사라집니다.
              그 사실이 이상하게 아쉬웠습니다.
            </p>
            <p>
              어설프고 미완성이라도, 그때의 생각이 고스란히 남는{' '}
              <span className="font-heading font-bold text-[#FFFFFF]">
                &apos;기록&apos;
              </span>
              은 의미가 있다고 느꼈습니다. 그래서 고민했습니다.
            </p>
            <p className="pl-4 border-l-2 border-[#FFFFFF]">
              &quot;글을 단순히 저장하는 대신, 증명 가능한 형태로 남길 수는 없을까?&quot;
            </p>
            <p>그 질문에서, 이 프로젝트가 시작됐습니다.</p>

            <div className="my-12 border-t border-[#1D1F22]"></div>

            <h2 className="text-xl sm:text-2xl md:text-3xl font-heading font-bold text-[#FFFFFF] mb-4 sm:mb-6">
              블록체인 위의 글
            </h2>
            <p>
              저는 글을 단순한 &apos;데이터&apos;가 아닌 &apos;기록&apos;으로 다루기로 했습니다.
              글을 IPFS에 올리고, 그 해시(CID)를 Polygon 블록체인에
              등록했습니다.
            </p>
            <p>
              누가, 언제, 어떤 상태로 썼는지 시간이 지나도 증명할 수 있는 구조를
              만들고 싶었습니다.
            </p>
            <p>
              결국 글 하나하나가 하나의 트랜잭션, 이 블로그 전체가 하나의 체인이
              되었습니다.
            </p>
            <p>
              물론 말처럼 쉽지는 않았습니다. 예상치 못한 시행착오의 연속이었죠.
            </p>

            <div className="my-12 border-t border-[#1D1F22]"></div>

            <h2 className="text-xl sm:text-2xl md:text-3xl font-heading font-bold text-[#FFFFFF] mb-4 sm:mb-6">
              시행착오와 타협
            </h2>
            <p>
              처음엔 완벽한 자동화를 꿈꿨습니다. 글을 작성하면 자동으로 IPFS에
              업로드되고, 자동으로 블록체인에 등록되고, 무결성 검증까지 전부
              자동으로 되는 완벽한 시스템.
            </p>
            <p>
              하지만 현실은 달랐습니다. IPFS API 연동, 가스비 문제, RPC 오류,
              메타마스크 연결 실패… 예상하지 못한 변수들이 끝없이 등장했습니다.
            </p>
            <p>
              그래서 결국 타협했습니다. 완벽한 자동화보다, 작동하는 구조. 글
              업로드는 수동으로, 등록과 검증은 자동으로 처리하도록
              단순화했습니다.
            </p>
            <p>
              이렇게 하니 개발 속도도 빨라지고, 드디어 실제로 작동하는 Web3
              블로그가 완성됐습니다.
            </p>

            <div className="my-12 border-t border-[#1D1F22]"></div>

            <h2 className="text-xl sm:text-2xl md:text-3xl font-heading font-bold text-[#FFFFFF] mb-4 sm:mb-6">
              &quot;Web3는 기능이 아니라 신뢰를 설계하는 기술이다.&quot;
            </h2>
            <p>
              이 과정을 거치며 확실히 깨달았습니다. Web3는 기존 시스템 위에
              기능을 &apos;붙이는 기술&apos;이 아닙니다. 처음부터 신뢰의 구조를 다시
              설계하는 방식입니다.
            </p>
            <p>
              DB에는 &apos;삭제&apos;와 &apos;수정&apos;이 있지만, 블록체인에는 오직 &apos;추가&apos;만
              있습니다. 그 불편함이 곧 기록의 신뢰가 됩니다.
            </p>
            <p>
              Web3는 느리고, 복잡하고, 불편합니다. 하지만 그 불편함 속에{' '}
              <span className="font-heading font-bold text-[#FFFFFF]">
                &quot;변하지 않는 무언가&quot;
              </span>
              가 남습니다.
            </p>

            <div className="my-12 border-t border-[#1D1F22]"></div>

            <h2 className="text-xl sm:text-2xl md:text-3xl font-heading font-bold text-[#FFFFFF] mb-4 sm:mb-6">
              기록과 기술 사이에서
            </h2>
            <p>
              Web3 블로그를 만드는 과정은 흥미로웠지만, 아이러니하게도 블로그를
              완성하고 나니 정작 중요한{' '}
              <span className="font-heading font-bold text-[#FFFFFF]">
                &apos;글쓰기&apos;
              </span>
              를 미루게 되었습니다.
            </p>
            <p>
              IPFS 연동과 스마트컨트랙트 배포에 집중하느라 이 블로그의 본래
              목적을 잊고 있었던 거였죠.
            </p>
            <p>
              결국 기술보다 중요한 건, 그 기술로 무엇을 기록하느냐가 가장
              중요하단 걸 깨달았습니다.
            </p>
            <p>
              그래도 이번 프로젝트는 제게 분명한 의미가 있었습니다. 블록체인
              위에 내 개발 블로그의 글을 남긴다는 건, 일반적인 개발 과정에서는
              좀처럼 겪을 수 없는 경험이었습니다.
            </p>
            <p>
              이제는 기술보다 글 자체에 집중하려 합니다. 코드가 아니라 문장으로,
              트랜잭션이 아니라 이야기로 남기려 합니다.
            </p>

            <div className="my-12 border-t border-[#1D1F22]"></div>

            <h2 className="text-2xl sm:text-3xl font-heading font-bold text-[#FFFFFF] mb-4">
              프로젝트 문서
            </h2>
            <p className="mb-2">
              이 Web3 블로그 프로젝트의 상세한 개발 과정과 회고를 노션에서
              확인할 수 있습니다.
            </p>

            {/* 프로젝트 개요 - 위에 1개 */}
            <div className="mb-6 p-4 sm:p-6 border border-[#1D1F22] hover:border-[#FFFFFF]/20 transition-colors">
              <h3 className="text-lg sm:text-xl font-heading font-bold text-[#FFFFFF] mb-2 mt-0">
                프로젝트 개요
              </h3>
              <p className="text-sm sm:text-base text-[#E2E6E9] mb-4">
                프로젝트 목적, 기술 스택, 주요 기능 요약
              </p>
              <a
                href="https://donghyeun02.notion.site/Web3-23c2ee104c6680eaa1d2c377e781427f"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-sm text-[#E2E6E9] hover:text-[#FFFFFF] transition-colors"
              >
                노션에서 보기
                <span className="ml-2">→</span>
              </a>
            </div>

            {/* 나머지 3개 - 그리드 */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
              <div className="p-3 sm:p-4 border border-[#1D1F22] hover:border-[#FFFFFF]/20 transition-colors">
                <h3 className="text-base sm:text-lg font-heading font-bold text-[#FFFFFF] mb-2 mt-0">
                  개발 이슈
                </h3>
                <p className="text-xs sm:text-sm text-[#E2E6E9] mb-3">
                  개발 중 겪은 실제 문제들과 해결 로그 기록
                </p>
                <a
                  href="https://donghyeun02.notion.site/Web3-23c2ee104c6680129082cce97e0a1519"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-sm text-[#E2E6E9] hover:text-[#FFFFFF] transition-colors"
                >
                  노션에서 보기
                  <span className="ml-2">→</span>
                </a>
              </div>
              <div className="p-3 sm:p-4 border border-[#1D1F22] hover:border-[#FFFFFF]/20 transition-colors">
                <h3 className="text-base sm:text-lg font-heading font-bold text-[#FFFFFF] mb-2 mt-0">
                  프로젝트 회고
                </h3>
                <p className="text-xs sm:text-sm text-[#E2E6E9] mb-3">
                  4L 방식으로 정리한 기술적/심리적 인사이트
                </p>
                <a
                  href="https://donghyeun02.notion.site/Web3-feat-4L-23c2ee104c6680679da5ea58ef1ee0df#23c2ee104c668162be16eb458471bd61"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-sm text-[#E2E6E9] hover:text-[#FFFFFF] transition-colors"
                >
                  노션에서 보기
                  <span className="ml-2">→</span>
                </a>
              </div>
              <div className="p-3 sm:p-4 border border-[#1D1F22] hover:border-[#FFFFFF]/20 transition-colors">
                <h3 className="text-base sm:text-lg font-heading font-bold text-[#FFFFFF] mb-2 mt-0">
                  왜 Web3 블로그?
                </h3>
                <p className="text-xs sm:text-sm text-[#E2E6E9] mb-3">
                  블로그에 Web3를 적용한 이유와 가치에 대한 설명
                </p>
                <a
                  href="https://donghyeun02.notion.site/Web3-23e2ee104c668044a3d2c9bb3b08a173"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-sm text-[#E2E6E9] hover:text-[#FFFFFF] transition-colors"
                >
                  노션에서 보기
                  <span className="ml-2">→</span>
                </a>
              </div>
            </div>

            <div className="my-12 border-t border-[#1D1F22]"></div>

            <h2 className="text-xl sm:text-2xl md:text-3xl font-heading font-bold text-[#FFFFFF] mb-4 sm:mb-6">
              이 블로그의 특징
            </h2>
            <ul className="space-y-4 list-none">
              <li className="flex items-start">
                <span className="text-[#FFFFFF] mr-3">•</span>
                <div>
                  <span className="font-heading font-bold text-[#FFFFFF]">
                    무결성 보장
                  </span>
                  {' — '}
                  <span>
                    모든 글은 IPFS에 저장되고, 블록체인에 해시가 등록되어 위변조
                    불가능
                  </span>
                </div>
              </li>
              <li className="flex items-start">
                <span className="text-[#FFFFFF] mr-3">•</span>
                <div>
                  <span className="font-heading font-bold text-[#FFFFFF]">
                    소유권 증명
                  </span>
                  {' — '}
                  <span>
                    스마트컨트랙트를 통해 작성자와 작성 시점이 블록체인에 영구
                    기록
                  </span>
                </div>
              </li>
              <li className="flex items-start">
                <span className="text-[#FFFFFF] mr-3">•</span>
                <div>
                  <span className="font-heading font-bold text-[#FFFFFF]">
                    탈중앙화
                  </span>
                  {' — '}
                  <span>
                    중앙 서버에 의존하지 않고 IPFS와 블록체인으로 분산 저장
                  </span>
                </div>
              </li>
              <li className="flex items-start">
                <span className="text-[#FFFFFF] mr-3">•</span>
                <div>
                  <span className="font-heading font-bold text-[#FFFFFF]">
                    투명성
                  </span>
                  {' — '}
                  <span>모든 글의 무결성을 실시간으로 검증 가능</span>
                </div>
              </li>
            </ul>

            <div className="my-12 border-t border-[#1D1F22]"></div>

            <h2 className="text-xl sm:text-2xl md:text-3xl font-heading font-bold text-[#FFFFFF] mb-4 sm:mb-6">
              기술 스택
            </h2>
            <div className="space-y-3 text-base text-[#E2E6E9]">
              <p>
                <span className="font-heading font-bold text-[#FFFFFF]">
                  Frontend:
                </span>{' '}
                Next.js · TailwindCSS · TypeScript
              </p>
              <p>
                <span className="font-heading font-bold text-[#FFFFFF]">
                  Blockchain:
                </span>{' '}
                Solidity · Ethers.js · Polygon Network
              </p>
              <p>
                <span className="font-heading font-bold text-[#FFFFFF]">
                  Storage:
                </span>{' '}
                IPFS (Pinata) · CID
              </p>
              <p>
                <span className="font-heading font-bold text-[#FFFFFF]">
                  Deployment:
                </span>{' '}
                Vercel · MetaMask
              </p>
            </div>

            <div className="my-12 border-t border-[#1D1F22]"></div>

            <div className="space-y-4">
              <p>
                <span className="font-heading font-bold text-[#FFFFFF]">
                  Email:
                </span>{' '}
                <a
                  href="mailto:donghyeun02@gmail.com"
                  className="text-[#E2E6E9] hover:text-[#FFFFFF] transition-colors"
                >
                  donghyeun02@gmail.com
                </a>
              </p>
              <p>
                <span className="font-heading font-bold text-[#FFFFFF]">
                  GitHub:
                </span>{' '}
                <a
                  href="https://github.com/donghyeun02"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#E2E6E9] hover:text-[#FFFFFF] transition-colors"
                >
                  donghyeun02
                </a>
              </p>
              <div>
                <p className="font-heading font-bold text-[#FFFFFF] mb-2">
                  블로그 관련 깃허브:
                </p>
                <ul className="space-y-1 ml-4">
                  <li>
                    <a
                      href="https://github.com/donghyeun02/blog"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#E2E6E9] hover:text-[#FFFFFF] transition-colors"
                    >
                      blog
                    </a>
                    {' – 프론트엔드'}
                  </li>
                  <li>
                    <a
                      href="https://github.com/donghyeun02/blog-registry"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#E2E6E9] hover:text-[#FFFFFF] transition-colors"
                    >
                      blog-registry
                    </a>
                    {' – 스마트컨트랙트'}
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
