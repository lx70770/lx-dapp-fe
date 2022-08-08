import useWallte from '@/hooks/useWallet'
import React, { useEffect } from 'react'
import { Outlet } from 'umi'
import '../global.less'
import Header from './header'
import styles from './index.less'

const Layout: React.FC = () => {
  const { connectEagerly } = useWallte()

  useEffect(() => {
    connectEagerly()
  }, [])
  return (
    <div className={styles.layout}>
      <Header />
      <Outlet />
    </div>
  )
}

export default Layout
