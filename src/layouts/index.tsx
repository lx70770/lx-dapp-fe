import useWallte from '@/hooks/useWallet'
import anime, { AnimeInstance } from 'animejs'
import React, { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { history, Outlet } from 'umi'
import Logo from '../assets/images/logo.png'
import openseaIcon from '../assets/svg/opensea.svg'
import twitterIcon from '../assets/svg/twitter.svg'
import Loading from '../assets/videos/loading.mp4'
import '../global.less'
import Header from './header'
import styles from './index.less'

const Layout: React.FC = () => {
  const [visible, setVisible] = useState(true)
  const { connectEagerly } = useWallte()
  const videoRef = useRef<HTMLVideoElement | null>(null)
  const videoWrapAniRef = useRef<AnimeInstance | null>(null)
  const videoWrapRef = useRef<HTMLDivElement>(null)
  const transitionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    connectEagerly()
    history.replace('/')
  }, [])

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
    if (transitionRef.current) {
      // @ts-ignore
      window._transitionAniRef = anime({
        targets: transitionRef.current,
        easing: 'linear',
        opacity: {
          value: [0, 1],
          duration: 900,
          loop: 2,
          direction: 'alternate',
        },
        translateX: [document.body.getBoundingClientRect().width + 500, -document.body.getBoundingClientRect().width - 500],
        duration: 1800,
        autoplay: false,
        complete: () => {
          // transitionRef!.current!.style.display = 'none'
        },
      })
    }
  }, [])

  const onProgress = (anim: AnimeInstance) => {
    if (anim.progress === 100) {
      document.getElementById('root')!.style.overflowY = 'auto'
      setVisible(false)
      if (videoWrapRef) {
        videoWrapRef!.current!.style.display = 'none'
      }
    }
  }

  return (
    <div className={styles.layout}>
      <div ref={videoWrapRef} className={styles.video}>
        <video ref={videoRef} id="video" src={Loading} muted controls={false} autoPlay></video>
      </div>
      <div ref={transitionRef} className={styles.transitionRef}></div>
      {visible ? null : (
        <>
          <img className={styles.logo} src={Logo} alt="logo" />
          <Header />
          <div className={styles.urls}>
            <a href="https://www.twitter.com" target="_blank">
              <img src={twitterIcon} className={styles.twitterIcon} />
            </a>
            <a href="https://opensea.io/" target="_blank">
              <img src={openseaIcon} className={styles.openseaIcon} />
            </a>
          </div>
          <Outlet />
        </>
      )}
    </div>
  )
}

export default Layout
