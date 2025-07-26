import { ethers } from 'ethers';
import { getBlogRegistryContract } from '@/contracts/blogRegistry';
import { EthereumWindow, BlockchainError } from '@/types';

// MetaMask provider 생성
export function createWeb3Provider(): ethers.providers.Web3Provider {
  const ethWindow = window as EthereumWindow;
  if (!ethWindow.ethereum) {
    throw new Error('MetaMask가 설치되어 있지 않습니다.');
  }
  return new ethers.providers.Web3Provider(ethWindow.ethereum);
}

// JsonRPC provider 생성
export function createJsonRpcProvider(): ethers.providers.JsonRpcProvider {
  const rpcUrl = process.env.NEXT_PUBLIC_POLYGON_RPC_URL;
  if (!rpcUrl) {
    throw new Error('RPC URL이 설정되지 않았습니다.');
  }
  return new ethers.providers.JsonRpcProvider(rpcUrl);
}

// 블록체인 에러 처리
export function handleBlockchainError(error: unknown): BlockchainError {
  if (error instanceof Error) {
    return { message: error.message };
  }
  if (error && typeof error === 'object' && 'message' in error) {
    return {
      message: (error as { message?: string }).message || '알 수 없는 오류',
    };
  }
  return { message: '알 수 없는 오류가 발생했습니다.' };
}

// 컨트랙트 인스턴스 생성 (Web3Provider용)
export function createContractWithProvider(
  provider: ethers.providers.Web3Provider
) {
  return getBlogRegistryContract(provider);
}

// 컨트랙트 인스턴스 생성 (JsonRpcProvider용)
export function createContractWithJsonRpc(
  provider: ethers.providers.JsonRpcProvider
) {
  return getBlogRegistryContract(provider);
}

// 컨트랙트 인스턴스 생성 (Signer용)
export async function createContractWithSigner(signer: ethers.Signer) {
  return getBlogRegistryContract(signer);
}
