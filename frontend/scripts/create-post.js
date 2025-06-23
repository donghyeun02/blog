import fs from 'fs';
import path from 'path';

const postName = process.argv[2];

if (!postName) {
  console.error(
    '❌ 글 제목(slug)을 입력하세요. 예: npm run create-post logic-gates'
  );
  process.exit(1);
}

const basePath = path.join('src', 'app', 'mdx', postName);

if (fs.existsSync(basePath)) {
  console.error('❌ 이미 같은 이름의 글이 존재합니다.');
  process.exit(1);
}

fs.mkdirSync(basePath, { recursive: true });

fs.writeFileSync(
  path.join(basePath, 'page.tsx'),
  `import Content from "./content.mdx";

export default function Page() {
  return (
    <article className="prose dark:prose-invert max-w-3xl mx-auto py-10">
      <Content />
    </article>
  );
}`
);

fs.writeFileSync(
  path.join(basePath, 'content.mdx'),
  `# ${postName.replace(/-/g, ' ').toUpperCase()}

여기에 글 내용을 작성하세요.
`
);

console.log(`✅ 글 템플릿 생성 완료: ${basePath}`);
