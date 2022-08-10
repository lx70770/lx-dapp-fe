import Spin from '@/components/common-loading'
import { useLXMFERInfo } from '@/hooks/useLXMFERContract'
import useWallet from '@/hooks/useWallet'
import cls from 'classnames'
import React from 'react'
import styles from './styles.less'
import AwsS3Page from './_lx_aws_s3'

const MintButton: React.FC<{ disable: boolean; mintLoading: boolean; mint: () => void }> = ({ disable, mint, mintLoading }) => {
  const style = cls({
    [styles.button]: true,
    [styles.disable]: disable,
  })

  return (
    <button onClick={disable ? undefined : mint} className={style}>
      {mintLoading ? <Spin spinning color="#000" /> : null} mint now!
    </button>
  )
}

const App: React.FC = () => {
  const { totalSupply, balance, mint, mintLoading } = useLXMFERInfo()
  const { isActive, isNetworkNotSupport, account } = useWallet()

  return (
    <div className={styles.mint}>
      <div>5000 utility-enabled goverened by the FOC DAO</div>
      <div>Powered by CC0 | FOC DAO</div>
      <div>1 free per wallet</div>
      <div>supply: {totalSupply ?? 0} / 5000</div>
      <MintButton mintLoading={mintLoading} disable={!isActive || isNetworkNotSupport || mintLoading || Number(balance) > 0} mint={() => mint(account)} />
      <AwsS3Page />
    </div>
  )
}

export default App
