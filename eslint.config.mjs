import nextCoreWebVitals from 'eslint-config-next/core-web-vitals';
import nextTypescript from 'eslint-config-next/typescript';

// eslint-config-next 16부터 네이티브 flat config를 내보내므로
// FlatCompat 없이 그대로 펼쳐 쓴다.
const eslintConfig = [
  { ignores: ['.next/**', 'node_modules/**', 'public/**'] },
  ...nextCoreWebVitals,
  ...nextTypescript,
  {
    // CommonJS 설정 파일은 require()가 정상이다.
    files: ['*.config.js', '*.config.cjs'],
    rules: { '@typescript-eslint/no-require-imports': 'off' },
  },
];

export default eslintConfig;
