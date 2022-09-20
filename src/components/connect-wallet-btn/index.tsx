import useWallet from '@/hooks/useWallet'
import MetaMaskOnboarding from '@metamask/onboarding'
import React, { MouseEventHandler } from 'react'
import Spin from '../common-loading'
import styles from './styles.less'

const ConnectWalletBtn: React.FC = () => {
  const { isActive, isActiviting, shortAccountAddress, isNetworkNotSupport, connect, disconnect } = useWallet()

  const gen_btn = (value: string | React.ReactNode, onclick?: MouseEventHandler) => {
    return (
      <div onClick={onclick} className={styles.button}>
        <div className={styles.left}></div>
        <div className={styles.right}></div>
        <div className={styles.content}>{value}</div>
      </div>
    )
  }

  const connectWallet = () => {
    if (MetaMaskOnboarding.isMetaMaskInstalled()) {
      connect()
    } else {
      new MetaMaskOnboarding().startOnboarding()
    }
  }

  if (isActiviting) {
    return gen_btn(
      <>
        <Spin spinning /> connectting...
      </>,
    )
  }

  if (isNetworkNotSupport) {
    return (
      <div className={styles.error_network} onClick={() => connectWallet()}>
        Network Error
      </div>
    )
  }

  if (isActive) {
    return gen_btn(shortAccountAddress)
  }

  return gen_btn('Connect Wallet', () => connectWallet())
}

export default ConnectWalletBtn
