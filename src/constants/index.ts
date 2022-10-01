import { AddEthereumChainParameter } from '@web3-react/types'

export const ETH_TEST_CHAIN_ID = 5
export const ETH_MAINNET_CHAIN_ID = 1

const rinkebyParams: AddEthereumChainParameter = {
  chainId: ETH_TEST_CHAIN_ID,
  rpcUrls: ['http://127.0.0.1:7545'],
  chainName: 'Ganache Network',
  nativeCurrency: {
    name: 'GanacheETH',
    symbol: 'ETH',
    decimals: 18,
  },
  blockExplorerUrls: [],
}

const goerliParams: AddEthereumChainParameter = {
  chainId: ETH_TEST_CHAIN_ID,
  rpcUrls: ['https://goerli.infura.io/v3/'],
  chainName: 'Goerli Network',
  nativeCurrency: {
    name: 'Goerli ETH',
    symbol: 'ETH',
    decimals: 18,
  },
  blockExplorerUrls: [],
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

// export const LX_TOKEN_ADDRESS = '0x756cEAccE6fe0006487813C5F722c43255C28862'
export const LX_MFER_ADDRESS = '0x17f2e92ae40ec5e1bee09ca7f59a8723364da6f6'
export const LX_DIAMADN_ADDRESS = '0x019fe010c37319030e77b1c71e1ad71636d3edd9'

// 最大的16进制数, 用于授权额度
export const MAX_HEX_NUMBER = '0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff'

// export const DEFAULT_JSON_PROVIDER = new JsonRpcProvider('https://mainnet.infura.io/v3/')

export const isProd = ENV === 'prod'

export const CURRENT_NEED_NETWORK = isProd ? ETH_MAINNET_CHAIN_ID : ETH_TEST_CHAIN_ID
export const CURRENT_NEED_NETWORK_PARAMS = isProd ? ethParams : goerliParams

export * from './chains'
