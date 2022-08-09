import { JsonRpcProvider } from '@ethersproject/providers'
import { URLS } from './chains'

export const ETH_TEST_CHAIN_ID = 4
export const ETH_MAINNET_CHAIN_ID = 1

export const LX_TOKEN_ADDRESS = '0xdFf2A70e99D2aa9762864dBa21cE239Da2b8c22d'
export const LX_MFER_ADDRESS = '0xbA8C7545d69D6aDBd0159685aFA2038512fEA779'

// 最大的16进制数, 用于授权额度
export const MAX_HEX_NUMBER = '0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff'

export const DEFAULT_JSON_PROVIDER = new JsonRpcProvider(URLS[3][0])

export const isProd = ENV === 'prod'

export const CURRENT_NEED_NETWORK = isProd ? ETH_MAINNET_CHAIN_ID : ETH_TEST_CHAIN_ID

export * from './chains'
