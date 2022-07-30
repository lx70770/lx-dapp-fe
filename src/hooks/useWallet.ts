import { DEFAULT_JSON_PROVIDER } from '@/constants'
import { hooks, metaMask } from '../connectors/metamask'

export default function useWallet() {
  const { useChainId, useAccount, useAccounts, useENSName, useENSNames, useIsActivating, useIsActive, useProvider } = hooks

  const chainId = useChainId()
  const account = useAccount()
  const accounts = useAccounts()
  const ensName = useENSName()
  const ensNames = useENSNames()
  const isActiviting = useIsActivating()
  const isActivitve = useIsActive()
  const provider = useProvider()

  const connect = (chainId: number = 3) => {
    return metaMask.activate(chainId)
  }

  const connectEagerly = () => {
    return metaMask.connectEagerly()
  }

  const disconnect = () => {
    return metaMask.resetState()
  }

  // console.log(chainId)
  // console.log(account)
  // console.log(accounts)
  // console.log(ensName)
  // console.log(ensNames)
  // console.log(isActiviting)
  // console.log(isActivitve)
  // console.log(provider)

  return {
    connect,
    connectEagerly,
    disconnect,
    chainId,
    account: account || '',
    accounts,
    ensName,
    ensNames,
    isActiviting,
    isActivitve,
    provider: provider || DEFAULT_JSON_PROVIDER,
  }
}
