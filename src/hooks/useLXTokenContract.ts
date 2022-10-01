// import useWallet from '@/hooks/useWallet'
// import { weiToEther } from '@/utils/format_bignumber'
// import isTransationSuccess from '@/utils/is_transation_success'
// import { makeLXTokenContract } from '@/utils/make_contract'
// import MutilTasks from '@/utils/mutil_task'
// import { BigNumber } from '@ethersproject/bignumber'
// import { useEffect, useState } from 'react'
// import { LX_TOKEN_ADDRESS, MAX_HEX_NUMBER } from './../constants/index'

// export function useLXTokenInfo() {
//   const { provider, account } = useWallet()

//   const [loading, setLoading] = useState(false)
//   const [approveLoading, setApproveLoading] = useState(false)
//   const [transferLoading, setTransferLoading] = useState(false)

//   const [balance, setBalance] = useState('')
//   const [balanceRaw, setBalanceRaw] = useState<BigNumber>(BigNumber.from(0))
//   const [symbol, setSymbol] = useState('')
//   const [decimal, setDecimal] = useState(0)
//   const [totalSupply, setTotalSupply] = useState('')
//   const [allowance, setAllowance] = useState('')

//   async function getLXTokenInfo() {
//     try {
//       setLoading(true)
//       const contract = makeLXTokenContract(provider, account)

//       const mutilTask = new MutilTasks()
//       mutilTask.add(contract.balanceOf(account))
//       mutilTask.add(contract.symbol())
//       mutilTask.add(contract.decimals())
//       mutilTask.add(contract.totalSupply())
//       mutilTask.add(contract.allowance(account, LX_TOKEN_ADDRESS))
//       const [balance, symbol, decimal, totalSupply, allowance] = await mutilTask.run()
//       setBalanceRaw(balance)
//       setBalance(weiToEther(balance))
//       setSymbol(symbol)
//       setDecimal(decimal)
//       setTotalSupply(weiToEther(totalSupply))
//       setAllowance(weiToEther(allowance))
//     } catch (e: any) {
//       console.error('获取LX Token信息失败', e.message)
//     } finally {
//       setLoading(false)
//     }
//   }

//   useEffect(() => {
//     if (account && provider) {
//       getLXTokenInfo()
//     }
//   }, [account, provider])

//   useEffect(() => {
//     if (!(account && provider)) return

//     const contract = makeLXTokenContract(provider, account)
//     const fromMe = contract.filters.Transfer(account, null)
//     const toMe = contract.filters.Transfer(null, account)
//     const approval = contract.filters.Approval(account, null)

//     contract.on(fromMe, (from, to, amount, event) => {
//       console.log('Transfer|send', { from, to, amount, event })
//       getLXTokenInfo()
//     })
//     contract.on(toMe, (from, to, amount, event) => {
//       console.log('Transfer|received', { from, to, amount, event })
//       getLXTokenInfo()
//     })
//     contract.on(approval, (from, to, amount, event) => {
//       console.log('Approval', { from, to, amount, event })
//       getLXTokenInfo()
//     })
//     return () => {
//       contract.removeAllListeners(fromMe)
//       contract.removeAllListeners(toMe)
//       contract.removeAllListeners(approval)
//     }
//   }, [account, provider])

//   async function approve(amount: string = MAX_HEX_NUMBER) {
//     try {
//       setApproveLoading(true)
//       const contract = makeLXTokenContract(provider, account)
//       const tx = await contract.approve(LX_TOKEN_ADDRESS, amount)
//       const result = await tx.wait()
//     } catch (e: any) {
//       console.error('授权失败', e.masseage)
//     } finally {
//       setApproveLoading(false)
//     }
//   }

//   async function unApprove() {
//     try {
//       setApproveLoading(true)
//       const contract = makeLXTokenContract(provider, account)
//       const tx = await contract.approve(LX_TOKEN_ADDRESS, '0')
//       const result = await tx.wait()
//       if (!isTransationSuccess(result)) {
//       }
//     } catch (e: any) {
//       console.error('取消授权失败', e.masseage)
//     } finally {
//       setApproveLoading(false)
//     }
//   }

//   async function transfer(to: string, value: string) {
//     try {
//       setTransferLoading(true)
//       const contract = makeLXTokenContract(provider, account)
//       const tx = await contract.transfer(to, value)
//       const result = await tx.wait()
//     } catch (e: any) {
//       console.error('转账失败', e.masseage)
//     } finally {
//       setTransferLoading(false)
//     }
//   }

//   return {
//     balance,
//     balanceRaw,
//     symbol,
//     decimal,
//     totalSupply,
//     allowance,
//     loading,
//     approveLoading,
//     unApprove,
//     approve,
//     transferLoading,
//     transfer,
//     refresh: getLXTokenInfo,
//   }
// }
