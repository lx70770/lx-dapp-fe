import React from 'react'
import styles from './styles.less'
import GatesOne from './_components/gates_one'

const App: React.FC = () => {
  return (
    <div className={styles.mint_wrap}>
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
