'use client';

import Image from 'next/image';
import { useState } from 'react';

export default function AboutPage() {
  const [isStoryExpanded, setIsStoryExpanded] = useState(false);

  return (
    <main className="max-w-2xl mx-auto px-4 py-12">
      <div className="flex justify-center mb-6">
        <Image
          src="https://donghyeun-blog-images.s3.us-east-1.amazonaws.com/profile.jpg"
          alt="프로필 사진"
          width={160}
          height={160}
          className="w-24 h-24 sm:w-40 sm:h-40 rounded-full object-cover shadow-md border border-neutral-200"
        />
      </div>
      <h1 className="text-2xl sm:text-3xl font-bold mb-4">소개</h1>

      <section className="mb-12">
        <h2 className="text-lg sm:text-xl font-semibold mb-6">
          안녕하세요, 백엔드 개발자 신동현입니다 👋
        </h2>

        <div className="text-neutral-700 leading-relaxed space-y-6">
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
              <p>저는 어떤 공부를 하던 하다가 보면 늘 이런 순간이 옵니다.</p>

              <p className="text-lg font-medium text-center italic">
                &quot;이론은 진짜 알겠는데… 이게 어떻게 돌아가는 건데?&quot;
              </p>

              <p>
                이런 사고방식으로 개발 공부를 하면서도, 자꾸만 더 깊이 파고들게
                됐습니다.
                <br />
                &quot;왜 이 코드가 더 빠른지&quot;,
                <br />
                &quot;이 프레임워크는 내부적으로 어떻게 동작하는지&quot;,
                <br />
                &quot;왜 이렇게 설계되었는지&quot;,
                <br />
                이런 것들이 궁금했습니다.
              </p>

              <p>
                그런데 문서를 읽거나, 구글링을 해보고, 글을 찾고, 강의를 들어도…
                <br />
                뭔가 와닿지 않았습니다.
              </p>

              <p>
                과거 학원에서 학생들을 가르치는 알바를 했을 때, <br />
                그리고 학생으로서 수업을 들으며 느꼈던 경험을 바탕으로 생각을
                해보면
                <br />
                <b>
                  말로만 하는 설명은 머릿속을 스쳐 지나가지만, 직접 해보면 훨씬
                  오래 기억에 남더라고요.
                </b>
              </p>

              <p>
                그리고 이 경험은 지금 제가 개발을 공부할 때도 그대로
                이어졌습니다. <br />
                단순히 읽고 듣는 것보다{' '}
                <b>코드를 쳐보고 과정과 결과를 내가 직접 확인해 봐야</b>
                <br />
                비로소 &apos;아, 이해가 된다&apos;라는 소리가 나오듯이요.
              </p>

              <p>
                글을 쓸 때{' '}
                <b>글이나 말로만 설명하는 데에는 늘 아쉬움이 있었습니다.</b>{' '}
                <br />
                다른 개발자들처럼 멋진 블로그 글을 써보려고도 했지만, <br />
                항상 글을 쓰다 보면, 어느 순간 이런 생각이 들었습니다. <br />
                <b>&quot;이 설명이 다른 사람에게도 잘 전달이 될까...?&quot;</b>
                라는 생각이 들며 막히곤 했습니다.
              </p>

              <p>
                그래서 저는 설명만으론 부족하다고 느꼈고,
                <br />
                <b>
                  읽는 사람이 조작이나 버튼 클릭으로 과정을 확인할 수 있는
                  콘텐츠
                </b>
                를 만들기로 했습니다.
                <br />
                이게 저에겐 더 자연스럽고 효과적인 방식이었으니까요.
                <br />백 번 설명하는 것보다,{' '}
                <b>한 번 직접 해보는 게 더 깊이 남는다고 생각합니다.</b>
              </p>

              <p>
                그렇게 하나씩 만들다 보니, 이 블로그도 단순한 기록 공간이 아니라
                <br />
                <b>&quot;클릭하거나 조작하여 확인하는 공간&quot;</b>으로
                자연스럽게 방향이 잡혔습니다.
              </p>

              <p className="text-neutral-700 italic text-center text-base sm:text-lg mb-6">
                그냥 읽는 건 재미없잖아요. 그래서 저는 &apos;직접 해볼 수 있는
                개발 블로그&apos;를 만들었습니다.
              </p>

              <ul className="list-disc pl-6 space-y-1">
                <li>개념을 직접 코드로 구현해 보고,</li>
                <li>동작 과정을 시각적으로 따라가보고,</li>
                <li>여러 방법들을 실제로 비교해 봤습니다.</li>
              </ul>
            </div>
          )}

          <p className="text-lg font-medium text-center italic">
            &quot;직접 경험을 해야 지식이 된다.&quot;
          </p>

          <p>
            이 블로그는 단순한 저의 기술 정리 공간이 아닙니다.
            <br />
            제가 진짜 이해하고 싶은 것들을 직접 실습하고, 시각화하고, 체화하면서
            <br />
            <b>
              혼자만 이해하고 끝나는 공부가 아니라, 제 글을 읽는 누군가와 함께
              나누며 더 성장하는 공부를 하고 싶습니다.
            </b>
          </p>
        </div>
      </section>

      <hr className="border-gray-300 my-8" />

      <section className="mb-8">
        <h2 className="text-lg font-semibold mb-4">
          그래서 이 블로그는 다릅니다
        </h2>

        <div className="text-neutral-700 leading-relaxed space-y-4">
          <p>
            <b>읽는 블로그가 아니라, 직접 경험하는 블로그</b>를 지향합니다.
          </p>

          <ul className="list-disc pl-6 space-y-2">
            <li>복잡한 개념을 직접 조작해 볼 수 있는 도구</li>
            <li>이론을 실제로 구현해 보며 이해하는 시뮬레이터</li>
            <li>추상적인 과정을 단계별로 체험할 수 있는 데모</li>
          </ul>

          <p>
            이런 콘텐츠를 통해, 저 스스로도 공부가 더 깊어지고,
            <br />
            같이 공부하는 사람들에게도 더 재미있게 전달되길 바랍니다.
          </p>
        </div>
      </section>

      <hr className="border-gray-300 my-8" />

      <section className="mb-8">
        <h2 className="text-lg font-semibold mb-4">
          이 블로그에서 다루는 내용
        </h2>
        <ul className="list-disc pl-6 text-neutral-700 space-y-1">
          <li>
            <b>CS 기초</b>: 논리회로, 자료구조, 알고리즘
          </li>
          <li>
            <b>백엔드 개발</b>: Go, Java(Spring), 시스템 설계
          </li>
          <li>
            <b>인프라 & DevOps</b>: Docker, 클라우드, 모니터링
          </li>
          <li>
            <b>개발 철학</b>: 클린 코드, 테스트, 생산성
          </li>
        </ul>
      </section>

      <hr className="border-gray-300 my-8" />

      <section className="mb-8">
        <h2 className="text-lg font-semibold mb-6">About Me</h2>

        <div className="mb-6">
          <h3 className="font-semibold mb-2">간단 소개</h3>
          <div className="text-neutral-700 text-sm space-y-1">
            <p>영남대학교 컴퓨터공학과 재학 중 (2021-2027)</p>
            <p>Integration Co. ECP팀 백엔드 개발 인턴 (2023.06 - 2023.09)</p>
          </div>
        </div>

        <div className="mb-6">
          <h3 className="font-semibold mb-2">기술 스택</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h4 className="font-medium mb-2">Backend</h4>
              <ul className="list-disc pl-6 text-neutral-700">
                <li>Go (Gin, Fiber)</li>
                <li>Java (Spring)</li>
                <li>Node.js (Express)</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-2">Database</h4>
              <ul className="list-disc pl-6 text-neutral-700">
                <li>MySQL, PostgreSQL</li>
                <li>MongoDB</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-2">DevOps</h4>
              <ul className="list-disc pl-6 text-neutral-700">
                <li>Docker</li>
                <li>AWS, Vercel</li>
                <li>GitHub Actions</li>
              </ul>
            </div>
          </div>
        </div>

        <div>
          <h3 className="font-semibold mb-2">연락처 & SNS</h3>
          <ul className="list-disc pl-6 text-neutral-700">
            <li>
              Email:{' '}
              <a
                href="mailto:donghyeun02@gmail.com"
                className="text-blue-600 underline"
              >
                donghyeun02@gmail.com
              </a>
            </li>
            <li>
              GitHub:{' '}
              <a
                href="https://github.com/donghyeun02"
                className="text-blue-600 underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                donghyeun02
              </a>
            </li>
          </ul>
        </div>
      </section>

      <section>
        <h2 className="text-lg font-semibold mb-2">함께 성장해요</h2>
        <div className="text-neutral-700 leading-relaxed space-y-4">
          <p>
            이 블로그는 <b>지식의 체화</b>와 <b>공유</b>를 통해 더 깊이 있는
            개발자로 성장하고, <b>직접 실습하고 시각화할 수 있는 콘텐츠</b>를
            제공해 다른 개발자들과 함께 성장하는 장을 만드는 것이 목표입니다.
          </p>

          <p>
            <b>
              &quot;읽기만 하는 글이 아닌, 직접 클릭을 해보고 체험할 수 있는
              글&quot;
            </b>
            을 통해 함께 성장해나가길 희망합니다.
          </p>

          <p className="text-center font-medium">방문해주셔서 감사합니다! 🙇‍♂️</p>
        </div>
      </section>
    </main>
  );
}
