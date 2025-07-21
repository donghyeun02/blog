import { PinataSDK } from 'pinata';

export function getPinata() {
  return new PinataSDK({
    pinataJwt: process.env.PINATA_JWT!,
    pinataGateway: process.env.NEXT_PUBLIC_GATEWAY_URL!,
  });
}
