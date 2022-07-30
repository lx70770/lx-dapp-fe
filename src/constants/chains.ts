// import { AddEthereumChainParameter } from '@web3-react/types'

// interface BasicChainInformation {
//   urls: string[]
//   name: string
// }

// interface ExtendedChainInformation extends BasicChainInformation {
//   nativeCurrency?: AddEthereumChainParameter['nativeCurrency']
//   blockExplorerUrls?: AddEthereumChainParameter['blockExplorerUrls']
// }

export const URLS: { [chainId: number]: string[] } = {
  3: ['https://ropsten.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161'],
}
