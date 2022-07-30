import { JsonRpcProvider, Provider, Web3Provider } from '@ethersproject/providers'
import { BigNumber, Contract, ContractInterface, ContractTransaction, Signer } from 'ethers'
import LXTokenAbi from '../abi/lx_token'
import { LX_TOKEN_ADDRESS } from './../constants/index'

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

export function makeLXTokenContract(provider: Web3Provider | JsonRpcProvider, account?: string) {
  return makeContract<LXTokenContract>(LX_TOKEN_ADDRESS, LXTokenAbi, provider, account)
}
