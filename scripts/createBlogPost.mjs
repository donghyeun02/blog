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

const templates = {
  default: {
    name: '블로그 포스트',
    description: 'Calculator 스타일의 구조화된 블로그 글',
  },
};

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

function createPageTsx(title, summary, slug) {
  const componentName = slug.charAt(0).toUpperCase() + slug.slice(1);

  return `'use client';

import { metadata } from './meta';
import BlogPostLayout from '@/components/BlogPostLayout';
import ${componentName}Content from './content.mdx';
import { postsMeta } from '@/components/postsMeta';

function MDXContentWithProvider() {
  return <${componentName}Content />;
}

export default function ${componentName}Page() {
  const currentPath = '/mdx/${slug}';
  const idx = postsMeta.findIndex((p) => p.path === currentPath);
  const prevPost = idx > 0 ? postsMeta[idx - 1] : undefined;
  const nextPost = idx < postsMeta.length - 1 ? postsMeta[idx + 1] : undefined;
  return (
    <BlogPostLayout {...metadata} prevPost={prevPost} nextPost={nextPost}>
      <MDXContentWithProvider />
    </BlogPostLayout>
  );
}
`;
}

function createMetaTs(title, summary, tags, slug, category) {
  const tagsArray = tags
    .split(',')
    .map((tag) => `'${tag.trim()}'`)
    .join(', ');

  return `export const metadata = {
  title: '${title}',
  summary:
    '${summary}',
  date: '${formatDate(new Date())}',
  tags: [${tagsArray}],
  category: '${category}',
  thumbnail:
    '/file.svg',
};
`;
}

function createContentMdx(templateType, title, summary) {
  return `
## 기본 개념 이해하기

먼저 핵심 개념부터 이해해보겠습니다.

### 주요 구성 요소

이 시스템의 주요 구성 요소들:

- **요소 1**: 설명
- **요소 2**: 설명
- **요소 3**: 설명

### 동작 원리

기본적인 동작 원리를 단계별로 살펴보면:

1. **단계 1**: 첫 번째 과정
2. **단계 2**: 두 번째 과정
3. **단계 3**: 세 번째 과정

---

## 실제 동작 살펴보기

이제 실제로 어떻게 동작하는지 확인해보겠습니다.

### 예시 1: 기본 사례

간단한 예시를 통해 이해해보겠습니다.

\`\`\`
예시 코드 또는 설명
\`\`\`

### 예시 2: 복잡한 사례

좀 더 복잡한 상황에서는 어떻게 동작할까요?

> 💡 **팁**: 여기에 중요한 포인트나 주의사항을 작성하세요.

---

## 심화 내용

### 내부 구조 분석

시스템의 내부 구조를 자세히 분석해보겠습니다.

#### 구조적 특징

- 특징 1에 대한 설명
- 특징 2에 대한 설명

#### 성능과 효율성

성능 측면에서 고려해야 할 사항들:

| 항목 | 설명 | 비고 |
|------|------|------|
| 항목1 | 설명1 | 비고1 |
| 항목2 | 설명2 | 비고2 |

---

## 마무리

정리하자면,

> 단순해 보이는 것도 내부를 들여다보면 정교한 구조를 가지고 있다.

핵심 포인트들:

- 포인트 1
- 포인트 2  
- 포인트 3
`;
}

function updateBlogHome(slug, category, title) {
  const blogHomePath = path.join('src', 'components', 'BlogHome.tsx');
  let content = fs.readFileSync(blogHomePath, 'utf8');

  // slug가 이미 camelCase이므로 그대로 사용
  const camelCaseSlug = slug;

  // 1. import 문 추가
  const importPattern =
    /(import { metadata as calculatorMeta } from '@\/app\/mdx\/calculator\/meta';)/;
  const newImport = `import { metadata as ${camelCaseSlug}Meta } from '@/app/mdx/${slug}/meta';`;

  if (!content.includes(newImport)) {
    content = content.replace(importPattern, `$1\n${newImport}`);
  }

  // 2. 카테고리에 포스트 추가
  const categoryLower = category.toLowerCase();
  let categoryPattern;

  if (categoryLower === 'cs') {
    categoryPattern =
      /(id: 'cs',\s*name: 'CS',\s*icon: '📁',\s*posts: \[[\s\S]*?)(],\s*},)/;
  } else if (categoryLower === 'backend') {
    categoryPattern =
      /(id: 'backend',\s*name: 'Backend',\s*icon: '📁',\s*posts: \[[\s\S]*?)(],\s*},)/;
  } else if (categoryLower === 'java') {
    categoryPattern =
      /(id: 'java',\s*name: 'Java',\s*icon: '📁',\s*posts: \[)(],\s*},)/;
  } else if (categoryLower === 'go') {
    categoryPattern =
      /(id: 'go',\s*name: 'Go',\s*icon: '📁',\s*posts: \[)(],\s*},)/;
  }

  const newPost = `      {
        ...${camelCaseSlug}Meta,
        path: '/mdx/${slug}',
        category: '${category}',
      },`;

  if (categoryPattern && content.match(categoryPattern)) {
    content = content.replace(categoryPattern, (match, start, end) => {
      if (!match.includes(`${camelCaseSlug}Meta`)) {
        // 빈 배열인 경우와 기존 포스트가 있는 경우를 구분
        if (end === '],\n    },') {
          return `${start}\n${newPost}\n    ${end}`;
        } else {
          return `${start}\n${newPost}${end}`;
        }
      }
      return match;
    });
  }

  fs.writeFileSync(blogHomePath, content);
  console.log('✅ BlogHome.tsx가 업데이트되었습니다!');
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

  // 배열의 마지막 항목 뒤에 새 포스트 추가
  const insertPattern = /(  },\s*\];)(\s*)$/;
  content = content.replace(insertPattern, `  },\n${newPost}\n];$2`);

  fs.writeFileSync(postsMetaPath, content);
  console.log('✅ postsMeta.ts가 업데이트되었습니다!');
}

async function main() {
  console.log('🚀 새로운 블로그 포스트 생성기\n');

  // 1. 기본 정보 수집
  const title = await question('📝 글 제목을 입력하세요: ');
  const summary = await question('📋 글 요약을 입력하세요 (1-2줄): ');
  const tags = await question('🏷️  태그를 입력하세요 (쉼표로 구분): ');

  // 2. 카테고리 선택
  const categories = ['CS', 'Backend', 'Java', 'Go'];
  console.log('\n📂 카테고리를 선택하세요:');
  categories.forEach((cat, index) => {
    console.log(`${index + 1}. ${cat}`);
  });

  const categoryChoice = await question('\n선택 (1-4): ');
  const selectedCategory = categories[parseInt(categoryChoice) - 1] || 'CS';

  // 3. 기본 템플릿 사용
  const selectedTemplate = 'default';

  // 4. Git 브랜치 생성 여부
  const createBranch = await question(
    '\n🌿 새 Git 브랜치를 생성하시겠습니까? (y/n): '
  );

  const slug = createSlug(title);
  const basePath = path.join('src', 'app', 'mdx', slug);

  // 5. 디렉토리 확인
  if (fs.existsSync(basePath)) {
    console.error(`❌ 이미 같은 이름의 글이 존재합니다: ${slug}`);
    rl.close();
    process.exit(1);
  }

  // 6. Git 브랜치 생성
  if (createBranch.toLowerCase() === 'y') {
    try {
      execSync(`git checkout -b feature/blog-${slug}`, { stdio: 'pipe' });
      console.log(`✅ Git 브랜치 생성됨: feature/blog-${slug}`);
    } catch (error) {
      console.log('⚠️ Git 브랜치 생성 실패 (계속 진행)');
    }
  }

  // 7. 디렉토리 및 파일 생성
  fs.mkdirSync(basePath, { recursive: true });

  // 파일 생성
  fs.writeFileSync(
    path.join(basePath, 'page.tsx'),
    createPageTsx(title, summary, slug)
  );

  fs.writeFileSync(
    path.join(basePath, 'meta.ts'),
    createMetaTs(title, summary, tags, slug, selectedCategory)
  );

  fs.writeFileSync(
    path.join(basePath, 'content.mdx'),
    createContentMdx(selectedTemplate, title, summary)
  );

  // 8. BlogHome.tsx 업데이트
  console.log('\n🔄 블로그 홈 업데이트 중...');
  updateBlogHome(slug, selectedCategory, title);

  // 9. postsMeta.ts 업데이트
  console.log('🔄 postsMeta.ts 업데이트 중...');
  updatePostsMeta(slug, selectedCategory, title, summary, tags);

  // 10. 완료 메시지
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
  console.log(
    `2. 필요시 ${path.join(basePath, 'meta.ts')}에서 메타데이터를 수정하세요`
  );
  console.log('3. 작성 완료 후 커밋하고 배포하세요');
  console.log('\n💡 블로그 홈페이지에 자동으로 등록되었습니다!');

  rl.close();
}

main().catch((error) => {
  console.error('❌ 오류 발생:', error);
  rl.close();
  process.exit(1);
});
