import Image from 'next/image';
import styles from './page.module.css';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gray-100">
      <h1 className="text-4xl font-bold text-blue-600 underline">
        TailwindCSS 적용 성공!
      </h1>
    </main>
  );
}
