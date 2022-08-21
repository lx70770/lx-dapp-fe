import useWallte from '@/hooks/useWallet'
import { AnimeInstance } from 'animejs'
import React, { useEffect, useRef } from 'react'
import { history, Outlet } from 'umi'
import Logo from '../assets/images/logo.png'
import '../global.less'
import Header from './header'
import styles from './index.less'

const Layout: React.FC = () => {
  const loadingAniamtionRef = React.useRef<AnimeInstance | null>(null)

  const loadingRef = useRef<HTMLDivElement>(null)

  const { connectEagerly } = useWallte()

  useEffect(() => {
    connectEagerly()
    history.replace('/')
  }, [])

  return (
    <div className={styles.layout}>
      <img className={styles.logo} src={Logo} alt="logo" />
      <Header />
      <Outlet />
      {/* <div ref={loadingRef} className={styles.out_loading}>
        THE THREE GATES
      </div> */}
    </div>
  )
}

export default Layout
