import useWallet from '@/hooks/useWallet'
import { makeLXMFERContract } from '@/utils/make_contract'
import { message } from 'antd'
import { useEffect, useState } from 'react'

export function useLXMFERInfo() {
  const { provider, account } = useWallet()
  const [loading, setLoading] = useState(false)
  const [mintLoading, setMintLoading] = useState(false)
  const [balance, setBalance] = useState('0')
  const [totalSupply, setTotalSupply] = useState('0')

  async function getLXStapOneInfo() {
    try {
      setLoading(true)
      const contract = makeLXMFERContract(provider, account)

      const balance = await contract.balanceOf(account)
      const totalSupply = await contract.totalSupply()
      setBalance(balance.toString())
      setTotalSupply(totalSupply.toString())
    } catch (e: any) {
      console.error('get mfer info failed', e.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (account && provider) {
      getLXStapOneInfo()
    }
  }, [account, provider])

  useEffect(() => {
    if (!(account && provider)) return

    const contract = makeLXMFERContract(provider, account)
    const fromMe = contract.filters.Transfer(null, account)

    contract.on(fromMe, (from, to, amount, event) => {
      console.log('Transfer|mint', { from, to, amount, event })
      getLXStapOneInfo()
    })
    return () => {
      contract.removeAllListeners(fromMe)
    }
  }, [account, provider])

  async function mint(address: string) {
    try {
      setMintLoading(true)
      const contract = makeLXMFERContract(provider, account)
      const tx = await contract.mint(address)
      const result = await tx.wait()
      message.success(`mint success`)
    } catch (e: any) {
      message.error(`mint error`)
      console.error('mint失败', e.message)
    } finally {
      setMintLoading(false)
    }
  }

  return {
    balance,
    totalSupply,
    loading,
    mintLoading,
    mint,
    refresh: getLXStapOneInfo,
  }
}
