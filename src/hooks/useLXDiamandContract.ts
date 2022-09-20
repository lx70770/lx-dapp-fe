import useWallet from '@/hooks/useWallet'
import { makeLXDiamandContract, makeLXMFERContract } from '@/utils/make_contract'
import { message } from 'antd'
import { useEffect, useState } from 'react'
import { etherToWei } from './../utils/format_bignumber'

export function useLXDiamandInfo() {
  const { provider, account } = useWallet()
  const [loading, setLoading] = useState(false)
  const [mintLoading, setMintLoading] = useState(false)

  const [diamandCount, setDiamandCount] = useState('0')
  const [totalSupply, setTotalSupply] = useState('0')

  // const [toekn1Ids, setToekn1Ids] = useState<Array<string>>([])

  async function getLXStepTwoInfo() {
    try {
      setLoading(true)

      const diaContract = makeLXDiamandContract(provider, account)
      // const step1contract = makeLXMFERContract(provider, account)

      const balance = await diaContract.balanceOf(account, '0')
      // const step1balance = await step1contract.balanceOf(account)
      const totalSupply = await diaContract.totalSupply('0')

      setDiamandCount(balance.toString())
      setTotalSupply(totalSupply.toString())
      // const mutilTask = new MutilTasks()

      // for (let i = 0; i < Number(step1balance.toString()); i++) {
      //   mutilTask.add(step1contract.tokenOfOwnerByIndex(account, `${i}`))
      // }
      // const results = await mutilTask.run()
      // setToekn1Ids(results.map((item) => item.toString()))
    } catch (e: any) {
      console.error('get mfer info failed', e.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (account && provider) {
      getLXStepTwoInfo()
    }
  }, [account, provider])

  async function burn() {
    try {
      setMintLoading(true)
      const contract = makeLXDiamandContract(provider, account)
      const tx = await contract.burn(account, '0', '1')
      const result = await tx.wait()
      console.log(`burn success`)
    } catch (e: any) {
      console.error('burn失败', e.message)
    } finally {
      setMintLoading(false)
    }
  }

  async function mint() {
    try {
      setMintLoading(true)
      const contract = makeLXDiamandContract(provider, account)
      message.info('start mint, please wait a moment.')
      const tx = await contract.mint(account, { value: etherToWei('0.01') })
      const result = await tx.wait()
      console.log(`mint success`)
    } catch (e: any) {
      message.error(e.message)
    } finally {
      setMintLoading(false)
      getLXStepTwoInfo()
    }
  }

  return {
    burn,
    mint,
    diamandCount,
    totalSupply,
    // toekn1Ids,
    loading,
    mintLoading,
    refresh: getLXStepTwoInfo,
  }
}
