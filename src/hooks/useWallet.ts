import { CURRENT_NEED_NETWORK, DEFAULT_JSON_PROVIDER } from '@/constants'
import sliceAddress from '@/utils/slice_address'
import { useMemo } from 'react'
import { hooks, metaMask } from '../connectors/metamask'

export default function useWallet() {
  const { useChainId, useAccount, useAccounts, useENSName, useENSNames, useIsActivating, useIsActive, useProvider } = hooks

  const chainId = useChainId()
  const account = useAccount()
  const accounts = useAccounts()
  const ensName = useENSName()
  const ensNames = useENSNames()
  const isActiviting = useIsActivating()
  const isActive = useIsActive()
  const provider = useProvider()

  const connect = (chainId: number = 4) => {
    return metaMask.activate(chainId)
  }

  const connectEagerly = () => {
    return metaMask.connectEagerly()
  }

  const disconnect = () => {
    return metaMask.resetState()
  }

  const shortAccountAddress = useMemo(() => sliceAddress(account), [account])

  const isNetworkNotSupport = useMemo(() => Number(chainId) !== CURRENT_NEED_NETWORK && !!chainId, [chainId])

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
    isActive,
    isNetworkNotSupport,
    provider: provider || DEFAULT_JSON_PROVIDER,
    shortAccountAddress,
  }
}
