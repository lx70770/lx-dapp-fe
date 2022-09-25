import ConnectWalletBtn from '@/components/connect-wallet-btn'
import useWallte from '@/hooks/useWallet'
import classnames from 'classnames'
import React from 'react'
import { history, useLocation } from 'umi'
import Logo from '../assets/svg/logo.png'
import '../global.less'
import styles from './index.less'

interface RouteProps {
  menu: Array<{ name: string; path: string }>
}

const route_map = [
  {
    name: 'mint',
    path: '/',
  },
  {
    name: 'step2',
    path: '/step2',
  },
  {
    name: 'route map',
    path: '/route-map',
  },
]

const Menu: React.FC<RouteProps> = ({ menu }) => {
  const location = useLocation()

  const routeCls = (path: string) => {
    return classnames({
      [styles.indicator]: true,
      [styles.indicator_select]: path === location.pathname,
    })
  }

  return (
    <div className={styles.menu}>
      {menu.map((item) => (
        <li key={item.path} className={styles.item} onClick={() => history.push(item.path)}>
          <span>{item.name}</span>
          <div className={routeCls(item.path)}></div>
        </li>
      ))}
    </div>
  )
}

const Header: React.FC = () => {
  const {} = useWallte()

  return (
    <div className={styles.header}>
      <img className={styles.logo} src={Logo} alt="logo" />

      <ConnectWalletBtn />
      {/* <div className={styles.right}>
        <Menu menu={route_map} />
        
      </div> */}
    </div>
  )
}

export default Header
