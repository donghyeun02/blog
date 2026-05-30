import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FAFAFA]">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-[#1D1D1F] mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-[#3C3C43] mb-4">
          페이지를 찾을 수 없습니다
        </h2>
        <p className="text-[#6E6E73] mb-8">
          요청하신 페이지가 존재하지 않거나 이동되었을 수 있습니다.
        </p>
        <Link
          href="/"
          className="inline-flex items-center px-4 py-2 bg-[#1D1D1F] text-[#FAFAFA] hover:bg-[#3C3C43] transition-[background-color] duration-150"
        >
          홈으로 돌아가기
        </Link>
      </div>
    </div>
  );
}
