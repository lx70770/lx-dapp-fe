import useWallet from '@/hooks/useWallet'
import { makeLXMFERContract } from '@/utils/make_contract'
import { BigNumber } from '@ethersproject/bignumber'
import { message } from 'antd'
import { useEffect, useState } from 'react'

export function useLXMFERInfo() {
  const { provider, account } = useWallet()
  const [loading, setLoading] = useState(false)
  const [mintedAccount, setMintedAccount] = useState('')

  async function getLXMFERInfo() {
    try {
      setLoading(true)
      const contract = makeLXMFERContract(provider, account)

      const balance = await contract.mintedAccount(account)
      setMintedAccount(balance.toString())
    } catch (e: any) {
      console.error('获取LX Token信息失败', e.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (account && provider) {
      getLXMFERInfo()
    }
  }, [account, provider])

  useEffect(() => {
    if (!(account && provider)) return

    const contract = makeLXMFERContract(provider, account)
    const fromMe = contract.filters.Transfer(null, account)

    contract.on(fromMe, (from, to, amount, event) => {
      console.log('Transfer|mint', { from, to, amount, event })
      getLXMFERInfo()
    })
    return () => {
      contract.removeAllListeners(fromMe)
    }
  }, [account, provider])

  async function mint(address: string, cost: BigNumber) {
    console.log(`cost: ${cost.toString()}`)

    try {
      setLoading(true)
      const contract = makeLXMFERContract(provider, account)
      const tx = await contract.mint(address, {
        value: cost,
      })
      const result = await tx.wait()
    } catch (e: any) {
      message.error(`mint failed ${e.message || ''}`)
      console.error('mint失败', e.message)
    } finally {
      setLoading(false)
    }
  }

  return {
    mintedAccount,
    loading,
    mint,
    refresh: getLXMFERInfo,
  }
}
