/**
 * IPFS에서 MDX 파일을 다운로드해서 src/app/local-mdx/에 저장하는 스크립트
 * 실행: node scripts/download-mdx.mjs
 */

import { readFileSync, writeFileSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { ethers } from 'ethers';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');

function loadEnv() {
  const envPath = join(ROOT, '.env');
  if (!existsSync(envPath)) throw new Error('.env 파일을 찾을 수 없습니다.');
  const env = {};
  readFileSync(envPath, 'utf-8').split('\n').forEach((line) => {
    const eq = line.indexOf('=');
    if (eq > 0) env[line.slice(0, eq).trim()] = line.slice(eq + 1).trim();
  });
  return env;
}

function getSlugs() {
  const content = readFileSync(join(ROOT, 'src', 'components', 'postsMeta.ts'), 'utf-8');
  return [...content.matchAll(/slug:\s*['"]([^'"]+)['"]/g)].map((m) => m[1]);
}

const CONTRACT_ABI = [{
  inputs: [],
  name: 'getAllPosts',
  outputs: [{ internalType: 'string[]', name: '', type: 'string[]' }],
  stateMutability: 'view',
  type: 'function',
}];

const GATEWAYS = [
  'https://ipfs.io/ipfs/',
  'https://cloudflare-ipfs.com/ipfs/',
  'https://dweb.link/ipfs/',
  'https://gateway.pinata.cloud/ipfs/',
];

async function fetchCid(cid) {
  for (const gw of GATEWAYS) {
    try {
      const res = await fetch(`${gw}${cid}`, { signal: AbortSignal.timeout(25000) });
      if (res.ok) {
        console.log(`   → ${gw}`);
        return await res.text();
      }
      console.warn(`  ⚠ ${gw} → ${res.status}`);
    } catch (e) {
      console.warn(`  ⚠ ${gw} → ${e.message}`);
    }
  }
  return null;
}

async function main() {
  const env = loadEnv();
  const rpcUrl = env['NEXT_PUBLIC_POLYGON_RPC_URL'];
  const contractAddress = env['NEXT_PUBLIC_CONTRACT_ADDRESS'];
  if (!rpcUrl || !contractAddress) throw new Error('RPC_URL 또는 CONTRACT_ADDRESS 없음');

  console.log('📡 블록체인에서 CID 목록 가져오는 중...');
  const provider = new ethers.providers.JsonRpcProvider(rpcUrl);
  const contract = new ethers.Contract(contractAddress, CONTRACT_ABI, provider);
  const cids = await contract.getAllPosts();
  console.log(`✅ CID ${cids.length}개\n`);

  const slugs = getSlugs();
  const outDir = join(ROOT, 'src', 'app', 'local-mdx');

  for (let i = 0; i < slugs.length; i++) {
    const slug = slugs[i];
    const cid = cids[i];
    const outPath = join(outDir, `${slug}.mdx`);

    if (existsSync(outPath)) { console.log(`⏭  ${slug}.mdx — 건너뜀`); continue; }
    if (!cid) { console.warn(`⚠  ${slug} — CID 없음`); continue; }

    console.log(`⬇  ${slug} (${cid.slice(0, 20)}...)`);
    const content = await fetchCid(cid);
    if (content) {
      writeFileSync(outPath, content, 'utf-8');
      console.log(`   ✅ 저장됨`);
    } else {
      console.error(`   ❌ 실패`);
    }
  }
  console.log('\n🎉 완료!');
}

main().catch((e) => { console.error('오류:', e.message); process.exit(1); });
