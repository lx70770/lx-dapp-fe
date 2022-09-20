import { JsonRpcProvider } from '@ethersproject/providers'
import { AddEthereumChainParameter } from '@web3-react/types'
import { URLS } from './chains'

export const ETH_TEST_CHAIN_ID = 4
export const ETH_MAINNET_CHAIN_ID = 1

const rinkebyParams: AddEthereumChainParameter = {
  chainId: ETH_TEST_CHAIN_ID,
  rpcUrls: ['https://rinkeby.infura.io/v3/'],
  chainName: 'Rinkeby Network',
  nativeCurrency: {
    name: 'RinkebyETH',
    symbol: 'RinkebyETH',
    decimals: 18,
  },
  blockExplorerUrls: ['https://rinkeby.etherscan.io/'],
}

const ethParams: AddEthereumChainParameter = {
  chainId: ETH_MAINNET_CHAIN_ID,
  rpcUrls: ['https://mainnet.infura.io/v3/'],
  chainName: 'Ethereum Network',
  nativeCurrency: {
    name: 'ETH',
    symbol: 'ETH',
    decimals: 18,
  },
  blockExplorerUrls: ['https://etherscan.io'],
}

export const LX_TOKEN_ADDRESS = '0x756cEAccE6fe0006487813C5F722c43255C28862'
export const LX_MFER_ADDRESS = '0xeBC1C15bd4e3c79EE1273f60b64Ad68d94076a6a'
export const LX_DIAMADN_ADDRESS = '0x756cEAccE6fe0006487813C5F722c43255C28862'

// 最大的16进制数, 用于授权额度
export const MAX_HEX_NUMBER = '0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff'

export const DEFAULT_JSON_PROVIDER = new JsonRpcProvider(URLS[3][0])

export const isProd = ENV === 'prod'

export const CURRENT_NEED_NETWORK = isProd ? ETH_MAINNET_CHAIN_ID : ETH_TEST_CHAIN_ID
export const CURRENT_NEED_NETWORK_PARAMS = isProd ? ethParams : rinkebyParams

export * from './chains'
