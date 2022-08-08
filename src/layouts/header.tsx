import ConnectWalletBtn from '@/components/connect-wallet-btn'
import useWallte from '@/hooks/useWallet'
import React from 'react'
import { history } from 'umi'
import openseaIcon from '../assets/svg/opensea.svg'
import twitterIcon from '../assets/svg/twitter.svg'
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
  return (
    <div className={styles.menu}>
      {menu.map((item) => (
        <li key={item.path} className={styles.item} onClick={() => history.push(item.path)}>
          {item.name}
        </li>
      ))}
    </div>
  )
}

const Header: React.FC = () => {
  const {} = useWallte()

  return (
    <div className={styles.header}>
      <div className={styles.left}>
        <span>FUCK FED</span>
        <Menu menu={route_map} />
      </div>
      <div className={styles.right}>
        <div className={styles.urls}>
          <a href="https://www.twitter.com" target="_blank">
            <img src={twitterIcon} className={styles.twitterIcon} />
          </a>
          <a href="https://opensea.io/" target="_blank">
            <img src={openseaIcon} className={styles.openseaIcon} />
          </a>
        </div>
        <ConnectWalletBtn />
      </div>
    </div>
  )
}

export default Header
