import { createJsonRpcProvider } from '@/utils/blockchain';
import { getBlogRegistryContract } from '@/contracts/blogRegistry';

export interface IntegrityResult {
  isValid: boolean;
  checks: {
    cidValid: boolean;
    blockchainValid: boolean;
    hashValid: boolean;
    timestampValid: boolean;
  };
  details: {
    cid?: string;
    blockchainCid?: string;
    contentHash?: string;
    expectedHash?: string;
    timestamp?: number;
    blockchainTimestamp?: number;
    author?: string;
  };
  errors: string[];
}

export function validateCidFormat(cid: string): boolean {
  if (!cid || typeof cid !== 'string') {
    return false;
  }

  // IPFS CID v0: Qm으로 시작하는 46자리 문자열
  // IPFS CID v1: bafy로 시작하는 59자리 문자열
  const cidV0Pattern = /^Qm[1-9A-HJ-NP-Za-km-z]{44}$/;
  const cidV1Pattern = /^bafy[a-z2-7]{55}$/;
  const cidV1OtherPattern = /^baf[a-z2-7]{55}$/; // bafy 외의 다른 baf 접두사
  const cidV1LegacyPattern = /^baf[a-z2-7]{54}$/; // 58자리 CID

  return (
    cidV0Pattern.test(cid) ||
    cidV1Pattern.test(cid) ||
    cidV1OtherPattern.test(cid) ||
    cidV1LegacyPattern.test(cid) ||
    /^[1-9A-HJ-NP-Za-km-z]{44,}$/.test(cid) // 44자 이상의 base58 문자열
  );
}

export async function calculateContentHash(content: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(content);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');
  return hashHex;
}

export async function fetchIpfsContent(cid: string): Promise<string> {
  const gateway =
    process.env.NEXT_PUBLIC_IPFS_GATEWAY ||
    'https://gateway.pinata.cloud/ipfs/';
  const response = await fetch(gateway + cid);

  if (!response.ok) {
    throw new Error(`IPFS 콘텐츠를 가져올 수 없습니다: ${response.status}`);
  }

  return await response.text();
}

export async function getBlockchainCidInfo(cid: string): Promise<{
  exists: boolean;
  author: string;
  timestamp: number;
} | null> {
  try {
    const provider = createJsonRpcProvider();
    const contract = getBlogRegistryContract(provider);

    const postInfo = await contract.getPostInfo(cid);

    if (!postInfo.exists) {
      return null;
    }

    return {
      exists: true,
      author: postInfo.author,
      timestamp: postInfo.timestamp.toNumber(),
    };
  } catch (error) {
    console.error('블록체인에서 CID 정보를 가져오는 중 오류:', error);
    return null;
  }
}

export async function verifyIntegrity(
  cid: string,
  expectedContent?: string
): Promise<IntegrityResult> {
  const result: IntegrityResult = {
    isValid: true,
    checks: {
      cidValid: false,
      blockchainValid: false,
      hashValid: false,
      timestampValid: false,
    },
    details: {},
    errors: [],
  };

  try {
    result.checks.cidValid = validateCidFormat(cid);
    result.details.cid = cid;

    if (!result.checks.cidValid) {
      result.errors.push('CID 형식이 올바르지 않습니다.');
      result.isValid = false;
    }

    const blockchainInfo = await getBlockchainCidInfo(cid);
    result.checks.blockchainValid = blockchainInfo !== null;

    if (blockchainInfo) {
      result.details.blockchainCid = cid;
      result.details.author = blockchainInfo.author;
      result.details.blockchainTimestamp = blockchainInfo.timestamp;
    } else {
      result.errors.push('블록체인에서 CID를 찾을 수 없습니다.');
      result.isValid = false;
    }

    if (expectedContent && result.checks.cidValid) {
      try {
        const actualContent = await fetchIpfsContent(cid);
        const actualHash = await calculateContentHash(actualContent);
        const expectedHash = await calculateContentHash(expectedContent);

        result.checks.hashValid = actualHash === expectedHash;
        result.details.contentHash = actualHash;
        result.details.expectedHash = expectedHash;

        if (!result.checks.hashValid) {
          result.errors.push('콘텐츠 해시가 일치하지 않습니다.');
          result.isValid = false;
        }
      } catch (error) {
        result.errors.push(
          `IPFS 콘텐츠 검증 실패: ${error instanceof Error ? error.message : '알 수 없는 오류'}`
        );
        result.isValid = false;
      }
    }

    if (blockchainInfo) {
      const currentTime = Math.floor(Date.now() / 1000);
      const timeDiff = currentTime - blockchainInfo.timestamp;

      result.checks.timestampValid = timeDiff < 365 * 24 * 60 * 60;
      result.details.timestamp = currentTime;

      if (!result.checks.timestampValid) {
        result.errors.push('타임스탬프가 너무 오래되었습니다.');
        result.isValid = false;
      }
    }
  } catch (error) {
    result.errors.push(
      `무결성 검증 중 오류 발생: ${error instanceof Error ? error.message : '알 수 없는 오류'}`
    );
    result.isValid = false;
  }

  return result;
}

export async function quickIntegrityCheck(cid: string): Promise<{
  isValid: boolean;
  error?: string;
}> {
  try {
    const blockchainInfo = await getBlockchainCidInfo(cid);
    if (!blockchainInfo) {
      return { isValid: false, error: '블록체인에 등록되지 않은 CID' };
    }

    return { isValid: true };
  } catch (error) {
    console.error('Quick integrity check error:', error);
    return {
      isValid: false,
      error: error instanceof Error ? error.message : '알 수 없는 오류',
    };
  }
}
