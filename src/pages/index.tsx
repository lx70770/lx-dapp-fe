import Spin from '@/components/common-loading'
import { useLXMFERInfo } from '@/hooks/useLXMFERContract'
import useWallet from '@/hooks/useWallet'
import GatesOne from '@/pages/_components/gates_one'
import cls from 'classnames'
import React from 'react'
import StepOneBg from '../assets/images/step_one_bg.png'
import styles from './styles.less'

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
      <div className={styles.step_one_bg}>
      </div>

      <GatesOne />
      {/* <div>5000 utility-enabled goverened by the FOC DAO</div>
      <div>Powered by CC0 | FOC DAO</div>
      <div>1 free per wallet</div>
      <div>supply: {totalSupply ?? 0} / 5000</div>
      <MintButton mintLoading={mintLoading} disable={!isActive || isNetworkNotSupport || mintLoading || Number(balance) > 0} mint={() => mint(account)} />
      <AwsS3Page /> */}
    </div>
  )
}

export default App
