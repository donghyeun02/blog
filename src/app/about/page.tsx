export default function AboutPage() {
  return (
    <main className="max-w-2xl mx-auto px-4 py-12">
      <div className="flex justify-center mb-6">
        <img
          src="/profile.jpg"
          alt="프로필 사진"
          className="w-40 h-40 rounded-full object-cover shadow-md border border-neutral-200"
        />
      </div>
      <h1 className="text-3xl font-bold mb-4">소개</h1>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2">
          안녕하세요, 백엔드 개발자 신동현입니다 👋
        </h2>
        <p className="text-neutral-700 leading-relaxed">
          <br />
          백엔드 개발자이자 <b>Go</b>, <b>Java</b> 중심으로 다양한 기술과 컴퓨터
          과학을 탐구하고 있습니다.
          <br />
          <br />
          이 블로그는 단순한 개발 기록이 아닌,
          <br />
          <b>CS 지식(논리회로, 자료구조, 알고리즘 등)</b>과 <b>백엔드 기술</b>을
          <br />
          <b>직접 실습하고 시각화하며 체화하는 기술 콘텐츠</b>를 공유하기 위해
          만들었습니다.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-semibold mb-2">다루는 내용</h2>
        <ul className="list-disc pl-6 text-neutral-700">
          <li>Go, Java 기반 백엔드 개발</li>
          <li>CS (논리회로, 자료구조, 알고리즘 등)</li>
          <li>클린 코드, 테스트, 시스템 설계</li>
          <li>개발 생산성 및 자동화</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-semibold mb-2">기술 스택</h2>
        <ul className="list-disc pl-6 text-neutral-700">
          <li>Backend: Go, Java(Spring), Node.js</li>
          <li>DB: MySQL, PostgreSQL</li>
          <li>DevOps: Docker, Vercel</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-semibold mb-2">연락처 & SNS</h2>
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
      </section>

      <section>
        <h2 className="text-lg font-semibold mb-2">블로그 목적</h2>
        <p className="text-neutral-700 leading-relaxed">
          이 블로그는 <b>지식의 체화</b>와 <b>공유</b>를 통해 더 깊이 있는
          개발자로 성장하고,
          <br />
          <b>직접 실습하고 시각화할 수 있는 콘텐츠</b>를 제공해 다른 개발자들과
          함께 성장하는 장을 만드는 것이 목표입니다.
          <br />
          <br />
          방문해주셔서 감사합니다!
        </p>
      </section>
    </main>
  );
}
