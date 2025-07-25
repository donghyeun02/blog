import { ethers } from 'ethers';

export const CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS;
export const CONTRACT_ABI = [
  {
    inputs: [
      {
        internalType: 'string',
        name: 'cid',
        type: 'string',
      },
    ],
    name: 'deletePost',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'author',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'string',
        name: 'cid',
        type: 'string',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'timestamp',
        type: 'uint256',
      },
    ],
    name: 'PostDeleted',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'author',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'string',
        name: 'cid',
        type: 'string',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'timestamp',
        type: 'uint256',
      },
    ],
    name: 'PostRegistered',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'author',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'string',
        name: 'oldCid',
        type: 'string',
      },
      {
        indexed: false,
        internalType: 'string',
        name: 'newCid',
        type: 'string',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'timestamp',
        type: 'uint256',
      },
    ],
    name: 'PostUpdated',
    type: 'event',
  },
  {
    inputs: [
      {
        internalType: 'string',
        name: 'cid',
        type: 'string',
      },
    ],
    name: 'registerPost',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'string',
        name: 'oldCid',
        type: 'string',
      },
      {
        internalType: 'string',
        name: 'newCid',
        type: 'string',
      },
    ],
    name: 'updatePost',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    name: 'allPosts',
    outputs: [
      {
        internalType: 'string',
        name: '',
        type: 'string',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'getAllPosts',
    outputs: [
      {
        internalType: 'string[]',
        name: '',
        type: 'string[]',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'getPostCount',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'string',
        name: 'cid',
        type: 'string',
      },
    ],
    name: 'getPostInfo',
    outputs: [
      {
        components: [
          {
            internalType: 'string',
            name: 'cid',
            type: 'string',
          },
          {
            internalType: 'address',
            name: 'author',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: 'timestamp',
            type: 'uint256',
          },
          {
            internalType: 'bool',
            name: 'exists',
            type: 'bool',
          },
        ],
        internalType: 'struct BlogRegistry.PostInfo',
        name: '',
        type: 'tuple',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'user',
        type: 'address',
      },
    ],
    name: 'getUserPostCount',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'user',
        type: 'address',
      },
    ],
    name: 'getUserPosts',
    outputs: [
      {
        internalType: 'string[]',
        name: '',
        type: 'string[]',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'string',
        name: '',
        type: 'string',
      },
    ],
    name: 'postDetails',
    outputs: [
      {
        internalType: 'string',
        name: 'cid',
        type: 'string',
      },
      {
        internalType: 'address',
        name: 'author',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: 'timestamp',
        type: 'uint256',
      },
      {
        internalType: 'bool',
        name: 'exists',
        type: 'bool',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'string',
        name: 'cid',
        type: 'string',
      },
    ],
    name: 'postExists',
    outputs: [
      {
        internalType: 'bool',
        name: '',
        type: 'bool',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    name: 'userPosts',
    outputs: [
      {
        internalType: 'string',
        name: '',
        type: 'string',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
];

export function getBlogRegistryContract(
  signerOrProvider: ethers.Signer | ethers.providers.Web3Provider
) {
  return new ethers.Contract(CONTRACT_ADDRESS!, CONTRACT_ABI, signerOrProvider);
}
