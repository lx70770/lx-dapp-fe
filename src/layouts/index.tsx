import useWallte from '@/hooks/useWallet'
import React, { useEffect } from 'react'
import { history, Outlet } from 'umi'
import Logo from '../assets/images/logo.png'
import '../global.less'
import Header from './header'
import styles from './index.less'

const Layout: React.FC = () => {
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
    </div>
  )
}

export default Layout
