#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import readline from 'readline';
import { execSync } from 'child_process';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const question = (query) =>
  new Promise((resolve) => rl.question(query, resolve));

function createSlug(title) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9가-힣\s-]/g, '')
    .replace(/\s+/g, ' ')
    .trim()
    .split(' ')
    .map((word, index) =>
      index === 0 ? word : word.charAt(0).toUpperCase() + word.slice(1)
    )
    .join('');
}

function formatDate(date) {
  return date.toISOString().split('T')[0];
}

function createPageTsx(slug) {
  const componentName = slug.charAt(0).toUpperCase() + slug.slice(1);

  return `import { createMDXPage } from '@/components/MDXPage';

const { generateMetadata, default: ${componentName}Page } = createMDXPage('${slug}');

export { generateMetadata };
export default ${componentName}Page;
`;
}

function createContentMdx(templateType, title, summary) {
  return ` 여기 글 ! `;
}

function updatePostsMeta(slug, category, title, summary, tags) {
  const postsMetaPath = path.join('src', 'components', 'postsMeta.ts');
  let content = fs.readFileSync(postsMetaPath, 'utf8');

  const tagsArray = tags
    .split(',')
    .map((tag) => `'${tag.trim()}'`)
    .join(', ');

  const newPost = `  {
    title: '${title}',
    path: '/mdx/${slug}',
    date: '${formatDate(new Date())}',
    summary: '${summary}',
    tags: [${tagsArray}],
    category: '${category}',
    thumbnail: '/file.svg',
  },`;

  const insertPattern = /(  },\s*\];)(\s*)$/;
  content = content.replace(insertPattern, `  },\n${newPost}\n];$2`);

  fs.writeFileSync(postsMetaPath, content);
  console.log('✅ postsMeta.ts가 업데이트되었습니다!');
}

async function main() {
  console.log('🚀 새로운 블로그 포스트 생성기\n');

  const title = await question('📝 글 제목을 입력하세요: ');
  const summary = await question('📋 글 요약을 입력하세요 (1-2줄): ');
  const tags = await question('🏷️  태그를 입력하세요 (쉼표로 구분): ');

  const categories = ['CS', 'Backend', 'Blockchain', 'Java', 'Go', 'Dev'];
  console.log('\n📂 카테고리를 선택하세요:');
  categories.forEach((cat, index) => {
    console.log(`${index + 1}. ${cat}`);
  });

  const categoryChoice = await question('\n선택 (1-6): ');
  const selectedCategory = categories[parseInt(categoryChoice) - 1] || 'CS';

  const selectedTemplate = 'default';

  const createBranch = await question(
    '\n🌿 새 Git 브랜치를 생성하시겠습니까? (y/n): '
  );

  const slug = createSlug(title);
  const basePath = path.join('src', 'app', 'mdx', slug);

  if (fs.existsSync(basePath)) {
    console.error(`❌ 이미 같은 이름의 글이 존재합니다: ${slug}`);
    rl.close();
    process.exit(1);
  }

  if (createBranch.toLowerCase() === 'y') {
    try {
      execSync(`git checkout -b feature/blog-${slug}`, { stdio: 'pipe' });
      console.log(`✅ Git 브랜치 생성됨: feature/blog-${slug}`);
    } catch (error) {
      console.log('⚠️ Git 브랜치 생성 실패 (계속 진행)');
    }
  }

  fs.mkdirSync(basePath, { recursive: true });

  fs.writeFileSync(path.join(basePath, 'page.tsx'), createPageTsx(slug));

  fs.writeFileSync(
    path.join(basePath, 'content.mdx'),
    createContentMdx(selectedTemplate, title, summary)
  );

  console.log('🔄 postsMeta.ts 업데이트 중...');
  updatePostsMeta(slug, selectedCategory, title, summary, tags);

  console.log('\n🎉 블로그 포스트 생성 완료!');
  console.log(`📁 경로: ${basePath}`);
  console.log(`🔗 URL: /mdx/${slug}`);
  console.log(`📂 카테고리: ${selectedCategory}`);

  if (createBranch.toLowerCase() === 'y') {
    console.log(`🌿 브랜치: feature/blog-${slug}`);
  }

  console.log('\n📝 다음 단계:');
  console.log(
    `1. ${path.join(basePath, 'content.mdx')} 파일을 열어서 글을 작성하세요`
  );
  console.log('2. 작성 완료 후 커밋하고 배포하세요');
  console.log('\n💡 블로그 홈페이지에 자동으로 등록되었습니다!');

  rl.close();
}

main().catch((error) => {
  console.error('❌ 오류 발생:', error);
  rl.close();
  process.exit(1);
});
