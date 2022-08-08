import useWallet from '@/hooks/useWallet'
import React, { MouseEventHandler } from 'react'
import Spin from '../common-loading'
import styles from './styles.less'

const ConnectWalletBtn: React.FC = () => {
  const { isActive, isActiviting, shortAccountAddress, isNetworkNotSupport, connect, disconnect } = useWallet()

  const gen_btn = (value: string | React.ReactNode, onclick?: MouseEventHandler) => {
    return (
      <button onClick={onclick} className={styles.button}>
        {value}
      </button>
    )
  }

  if (isActiviting) {
    return gen_btn(
      <>
        <Spin spinning /> connectting...
      </>,
    )
  }

  if (isNetworkNotSupport) {
    return <div className={styles.error_network}>Network Error</div>
  }

  if (isActive) {
    return gen_btn(shortAccountAddress)
  }

  return gen_btn('Connect Wallte', () => connect())
}

export default ConnectWalletBtn
