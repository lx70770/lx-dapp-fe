import useWallte from '@/hooks/useWallet'
import { weiToEther } from '@/utils/format_bignumber'
import { useEffect, useState } from 'react'

export default function useBalance() {
  const { provider, account } = useWallte()
  const [balance, setBalance] = useState('0')
  const [balanceRow, setBalanceRow] = useState('0')

  useEffect(() => {
    if (provider && account) {
      provider
        .getBalance(account)
        .then((result) => {
          setBalanceRow(result.toString())
          setBalance(weiToEther(result))
        })
        .catch(() => console.log('获取余额失败'))
    }
  }, [provider, account])

  return { balance, balanceRow }
}
