import useWallte from '@/hooks/useWallet'
import classnames from 'classnames'
import React, { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { history, Outlet } from 'umi'
import '../global.less'
import GatesOne from './gates_one'
import Header from './header'
import styles from './index.less'

const Layout: React.FC = () => {
  const [open, setOpen] = useState(false)
  const [disable, setDisable] = useState(false)
  const { connectEagerly } = useWallte()
  const left_node = useRef<HTMLDivElement>(null)
  const right_node = useRef<HTMLDivElement>(null)

  useEffect(() => {
    connectEagerly()
    history.replace('/')
  }, [])

  useLayoutEffect(() => {
    function handleAnimationEnd(event: Event) {
      event.stopPropagation()
      console.log('handleAnimationEnd')
      setDisable(true)
    }
    if (left_node.current && right_node.current) {
      left_node.current.addEventListener('animationend', handleAnimationEnd, { once: true })
      right_node.current.addEventListener('animationend', handleAnimationEnd, { once: true })
    }
  }, [])

  const cls_wrap_page = classnames({
    [styles.wrap_page]: true,
    animate__animated: true,
    animate__zoomIn: open,
  })

  return (
    <div className={styles.layout}>
      <Header />

      <div className={cls_wrap_page}>
        <Outlet />
        <GatesOne />
      </div>
    </div>
  )
}

export default Layout
