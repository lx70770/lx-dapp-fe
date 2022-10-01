import { image_names } from '@/constants/decoration'
import useWallet from '@/hooks/useWallet'
import { makeLXDiamandContract, makeLXMFERContract } from '@/utils/make_contract'
import MutilTasks from '@/utils/mutil_task'
import { useEffect, useState } from 'react'
import useNotify from './useNotify'

export function useLXDiamandInfo() {
  const { provider, account } = useWallet()
  const [loading, setLoading] = useState(false)

  const [step1Count, setStep1Count] = useState('0')
  const [diamandCount, setDiamandCount] = useState('0')

  const [toekn1Ids, setToekn1Ids] = useState<Array<string>>([])
  const [specials, setSpecials] = useState<Array<any>>([])
  const { error } = useNotify()

  async function getLXStepTwoInfo() {
    try {
      setLoading(true)
      const diaContract = makeLXDiamandContract(provider!, account)
      const step1contract = makeLXMFERContract(provider!, account)

      const balance = await diaContract.balanceOf(account, '0')
      const step1balance = await step1contract.balanceOf(account)

      setDiamandCount(balance.toString())
      setStep1Count(step1balance.toString())
      const mutilTask = new MutilTasks()

      for (let i = 0; i < Number(step1balance.toString()); i++) {
        mutilTask.add(step1contract.tokenOfOwnerByIndex(account, `${i}`))
      }
      const results = await mutilTask.run()

      setToekn1Ids(results.map((item) => item.toString()))
      console.log(results.map((item) => item.toString()))
      await getSpecials()
    } catch (e: any) {
      console.log(e)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (account && provider) {
      getLXStepTwoInfo()
    }
  }, [account, provider])

  async function getSpecials() {
    try {
      const contract = makeLXDiamandContract(provider!, account)
      const specials = await contract.getNums(image_names)
      // const specials = await contract.mint(account, { value: etherToWei('0.01') })

      setSpecials(specials)
      console.log(specials)
    } catch (e: any) {
      console.error('specials', e.message)
    }
  }

  async function check(tnum: number): Promise<boolean> {
    try {
      const contract = makeLXDiamandContract(provider!, account)
      const check = await contract.check(tnum)
      console.log('check')
      console.log(check)
      return check
    } catch (e: any) {
      console.error('checkMerged', e.message)
      return true
    }
  }

  async function checkMerged(curStr: string) {
    try {
      const contract = makeLXDiamandContract(provider!, account)
      const checkMerged = await contract.checkMerged(curStr)
      console.log('checkMerged')
      console.log(checkMerged)
      return checkMerged
    } catch (e: any) {
      console.error('checkMerged', e.message)
      return true
    }
  }

  async function merge(curStr: string, tnum: number, specials_: Array<string>) {
    try {
      setLoading(true)
      const contract = makeLXDiamandContract(provider!, account)
      error("start merge, please don't close this page")
      const tx = await contract.merge(curStr, tnum, specials_)
      const result = await tx.wait()
    } catch (e: any) {
      console.error(e.message)
    } finally {
      setLoading(false)
      getLXStepTwoInfo()
    }
  }

  return {
    check,
    checkMerged,
    specials,
    diamandCount,
    toekn1Ids,
    loading,
    merge,
    refresh: getLXStepTwoInfo,
  }
}
