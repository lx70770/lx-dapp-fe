import { useEffect } from 'react'
import { hooks, network } from '../connectors/network'

export default function useNetwork() {
  const { useChainId, useAccount, useAccounts, useENSName, useENSNames, useIsActivating, useIsActive, useProvider } = hooks

  const chainId = useChainId()
  const account = useAccount()
  const accounts = useAccounts()
  const ensName = useENSName()
  const ensNames = useENSNames()
  const isActiviting = useIsActivating()
  const isActivitve = useIsActive()
  const provider = useProvider()

  useEffect(() => {
    void network.activate().catch(() => {
      console.debug('Failed to connect to network')
    })
  }, [])

//   console.log(chainId)
//   console.log(account)
//   console.log(accounts)
//   console.log(ensName)
//   console.log(ensNames)
//   console.log(isActiviting)
//   console.log(isActivitve)
//   console.log(provider)

  return {
    chainId,
    account,
    accounts,
    ensName,
    ensNames,
    isActiviting,
    isActivitve,
    provider,
  }
}
