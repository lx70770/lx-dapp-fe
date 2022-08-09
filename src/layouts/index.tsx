import 'animate.css'
import classnames from 'classnames'
import React, { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { history, Outlet } from 'umi'
import '../global.less'
import Header from './header'
import styles from './index.less'

const Layout: React.FC = () => {
  const [open, setOpen] = useState(false)
  const [disable, setDisable] = useState(false)
  // const { connectEagerly } = useWallte()
  const left_node = useRef<HTMLDivElement>(null)
  const right_node = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // connectEagerly()
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

  const cls_left = classnames({
    [styles.enter_page_left]: true,
    animate__animated: true,
    animate__fadeOutLeft: open,
    animate__slow: true,
  })

  const cls_right = classnames({
    [styles.enter_page_right]: true,
    animate__animated: true,
    animate__fadeOutRight: open,
    animate__slow: true,
  })

  const cls_enter_button = classnames({
    [styles.enter_button]: true,
    animate__animated: true,
    animate__fadeIn: true,
    animate__slow: true,
    animate__fadeOut: open,
  })

  const cls_wrap_page = classnames({
    [styles.wrap_page]: true,
    animate__animated: true,
    animate__zoomIn: open,
  })

  return (
    <div className={styles.layout}>
      {disable ? null : <div className={cls_left} ref={left_node}></div>}
      {disable ? null : <div className={cls_right} ref={right_node}></div>}

      <button onClick={() => setOpen(true)} className={cls_enter_button}>
        open
      </button>
      <div className={cls_wrap_page}>
        <Header />
        <Outlet />
      </div>
    </div>
  )
}

export default Layout
