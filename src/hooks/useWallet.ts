import { CURRENT_NEED_NETWORK, CURRENT_NEED_NETWORK_PARAMS } from '@/constants'
import sliceAddress from '@/utils/slice_address'
import { useMemo } from 'react'
import { hooks, metaMask } from '../connectors/metamask'
import useNotify from './useNotify'

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
  const { error } = useNotify()

  const connect = () => {
    return metaMask.activate(CURRENT_NEED_NETWORK_PARAMS).catch((e) => {
      console.log(e)
      if (e?.code < 0) {
        error(e?.message ?? 'Something wrong, Please wait.')
      }
    })
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
    provider: provider,
    shortAccountAddress,
  }
}
