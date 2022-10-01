import useWallte from '@/hooks/useWallet'
import anime, { AnimeInstance } from 'animejs'
import React, { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { history, Outlet, useLocation } from 'umi'
import openseaIcon from '../assets/svg/opensea.png'
import roadMapIcon from '../assets/svg/roadmap.svg'
import twitterIcon from '../assets/svg/twitter.png'
import Loading from '../assets/videos/loading.mp4'
import '../global.less'
import Header from './header'
import styles from './index.less'

const Layout: React.FC = () => {
  const location = useLocation()
  const [visible, setVisible] = useState(true)
  const { connectEagerly } = useWallte()
  const videoRef = useRef<HTMLVideoElement | null>(null)
  const videoWrapAniRef = useRef<AnimeInstance | null>(null)
  const videoWrapRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    connectEagerly()
    if (!location.pathname.includes('/tg')) {
      history.replace('/')
    }
  }, [])

  if (location.pathname.includes('/tg')) {
    return <Outlet />
  }

  useLayoutEffect(() => {
    document.getElementById('root')!.style.overflowY = 'hidden'
    if (videoWrapRef.current) {
      videoWrapAniRef.current = anime({
        targets: videoWrapRef.current,
        easing: 'easeInExpo',
        opacity: 0,
        duration: 1000,
        autoplay: false,
        update: onProgress,
      })
    }
    if (videoRef.current) {
      videoRef!.current?.play()
      videoRef!.current!.onended = function () {
        videoWrapAniRef.current!.play()
      }
    }
  }, [])

  const onProgress = (anim: AnimeInstance) => {
    if (anim.progress === 100) {
      document.getElementById('root')!.style.overflowY = 'auto'
      document.getElementById('root')!.style.minWidth = '1400px'
      setVisible(false)
      if (videoWrapRef) {
        videoWrapRef!.current!.style.display = 'none'
      }
    }
  }

  return (
    <div className={styles.layout}>
      {/* <div ref={videoWrapRef} className={styles.video}>
        <video ref={videoRef} id="video" src={Loading} muted controls={false} autoPlay></video>
      </div>
      {visible ? null : ( */}
        <>
          <Header />
          <div className={styles.urls}>
            <a href={window.location.origin + '/tg'} target="_blank">
              <img src={roadMapIcon} />
            </a>
            <a href="https://www.twitter.com" target="_blank">
              <img src={twitterIcon} />
            </a>
            <a href="https://opensea.io/" target="_blank">
              <img src={openseaIcon} />
            </a>
          </div>
          <div className={styles.outlet}>
            <Outlet />
          </div>
        </>
      
    </div>
  )
}

export default Layout
