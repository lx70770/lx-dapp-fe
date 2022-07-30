import { JsonRpcProvider } from '@ethersproject/providers'
import { URLS } from './chains'

export const LX_TOKEN_ADDRESS = '0xdFf2A70e99D2aa9762864dBa21cE239Da2b8c22d'

// 最大的16进制数, 用于授权额度
export const MAX_HEX_NUMBER = '0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff'

export const DEFAULT_JSON_PROVIDER = new JsonRpcProvider(URLS[3][0])

export * from './chains'
