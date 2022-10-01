import { PayableOverrides } from '@ethersproject/contracts'
import { JsonRpcProvider, Provider, Web3Provider } from '@ethersproject/providers'
import { BigNumber, Contract, ContractInterface, ContractTransaction, Signer } from 'ethers'
import LXDiamandAbi from '../abi/lx_diamand'
import LXMFERAbi from '../abi/lx_mfer'
import { LX_DIAMADN_ADDRESS, LX_MFER_ADDRESS } from './../constants/index'
export function makeContract<T extends Contract>(address: string, abi: ContractInterface, library: Web3Provider | JsonRpcProvider, account?: string) {
  const signerOrProvider: Signer | Provider = account ? library.getSigner(account) : library
  return new Contract(address, abi, signerOrProvider) as T
}

export interface LXTokenContract extends Contract {
  balanceOf: (address: string) => Promise<BigNumber>
  totalSupply: () => Promise<BigNumber>
  decimals: () => Promise<number>
  symbol: () => Promise<string>
  transfer: (account: string, amount: string) => Promise<ContractTransaction>
  allowance: (
    accountAddress: string, // 用户账户地址
    spenderAddress: string, // 要授权的合约的地址
  ) => Promise<BigNumber>
  approve: (address: string, amount: string) => Promise<ContractTransaction> // 授权
}

// export function makeLXTokenContract(provider: Web3Provider | JsonRpcProvider, account?: string) {
//   return makeContract<LXTokenContract>(LX_TOKEN_ADDRESS, LXTokenAbi, provider, account)
// }

export interface LXMFERContract extends Contract {
  balanceOf: (address: string) => Promise<BigNumber>
  totalSupply: () => Promise<BigNumber>
  mint: (address: string, overrides?: PayableOverrides) => Promise<ContractTransaction>
  // setPaused: (_paused: boolean) => Promise<ContractTransaction>
  tokenOfOwnerByIndex: (address: string, index: string) => Promise<BigNumber>
}

export function makeLXMFERContract(provider: Web3Provider | JsonRpcProvider, account?: string) {
  return makeContract<LXMFERContract>(LX_MFER_ADDRESS, LXMFERAbi, provider, account)
}

export interface LXDiamandContract extends Contract {
  balanceOf: (address: string, id: string) => Promise<BigNumber>
  totalSupply: (id: string) => Promise<BigNumber>
  mint: (address: string, overrides?: PayableOverrides) => Promise<ContractTransaction>
  getNums: (specials: Array<string>) => Promise<Array<any>>
  unpause: () => Promise<ContractTransaction>
  check: (tnum: number) => Promise<boolean>
  checkMerged: (curStr: string) => Promise<boolean>
  merge: (curStr: string, tnum: number, specials: Array<string>) => Promise<ContractTransaction>
}

export function makeLXDiamandContract(provider: Web3Provider | JsonRpcProvider, account?: string) {
  return makeContract<LXDiamandContract>(LX_DIAMADN_ADDRESS, LXDiamandAbi, provider, account)
}
