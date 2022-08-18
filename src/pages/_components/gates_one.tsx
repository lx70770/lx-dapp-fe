import useWallte from '@/hooks/useWallet'
import { useToggle } from 'ahooks'
import anime, { AnimeInstance } from 'animejs'
import { debounce } from 'lodash'
import React, { useEffect, useLayoutEffect, useRef } from 'react'
import FuckBg from '../../assets/images/fuck_bg.png'
import GateOneLeft from '../../assets/images/gate_one_left.png'
import GateOneRight from '../../assets/images/gate_one_right.png'
import Trigger from '../../assets/svg/trigger.svg'
import styles from '../styles.less'

const GatesOne: React.FC = () => {
  const [visible, { toggle }] = useToggle(false)
  const animationLeftRef = React.useRef<AnimeInstance | null>(null)
  const animationRightRef = React.useRef<AnimeInstance | null>(null)
  const doorRef = React.useRef<AnimeInstance | null>(null)
  const lineRef = React.useRef<AnimeInstance | null>(null)
  const lightRef = React.useRef<AnimeInstance | null>(null)

  const doorLeft = useRef<HTMLDivElement>(null)
  const doorRight = useRef<HTMLDivElement>(null)
  const door = useRef<HTMLDivElement>(null)
  const line = useRef<HTMLDivElement>(null)
  const light = useRef<HTMLDivElement>(null)

  const {} = useWallte()

  useLayoutEffect(() => {
    if (doorLeft.current && doorRight.current) {
      animationLeftRef.current = anime({
        targets: doorLeft.current,
        translateX: 150,
        easing: 'easeInOutSine',
        autoplay: false,
      })
      animationRightRef.current = anime({
        targets: doorRight.current,
        translateX: -150,
        easing: 'easeInOutSine',
        autoplay: false,
      })
    }

    if (door.current) {
      doorRef.current = anime({
        targets: door.current,
        easing: 'easeInExpo',
        scale: {
          value: 6,
          delay: 1000,
          duration: 1000,
        },
        opacity: {
          value: 0,
          delay: 1500,
          duration: 500,
        },
        autoplay: false,
        update: onProgress,
      })
    }

    if (line.current) {
      lineRef.current = anime({
        targets: line.current,
        translateX: document.body.getBoundingClientRect().width - 25,
        loop: true,
        duration: 3500,
        easing: 'easeInOutSine',
      })
    }

    if (light.current) {
      lightRef.current = anime({
        targets: light.current,
        opacity: [0.2, 1],
        loop: true,
        duration: 800,
        direction: 'alternate',
        easing: 'linear',
      })
    }
  }, [])

  useEffect(() => {
    document.body.addEventListener('resize', debounce(update, 1000))
  }, [])

  const update = () => {
    if (lineRef.current && lineRef.current.update) {
      lineRef.current.update(
        anime({
          targets: line.current,
          translateX: document.body.getBoundingClientRect().width - 25,
          loop: true,
          duration: 3500,
          easing: 'easeInOutSine',
        }),
      )
    }
  }

  const onProgress = (anim: AnimeInstance) => {
    if (anim.progress > 90) {
      document.getElementById('root')!.style.overflow = 'auto'
    }
    if (anim.progress === 100) {
      toggle()
    }
  }

  if (visible) {
    return null
  }

  return (
    <div ref={door} className={styles.gates_one}>
      <img className={styles.fuck_bg} src={FuckBg} alt=""></img>
      <div className={styles.light_in} />
      <div ref={doorLeft} className={styles.gates_one_door_left}>
        <img src={GateOneRight} alt="" />
      </div>
      <div ref={doorRight} className={styles.gates_one_door_right}>
        <img src={GateOneLeft} alt="" />
      </div>
      <div className={styles.gate_one} />
      <div className={styles.symbol_top}>THREE GATES</div>
      <div className={styles.symbol_middle}>MINT TO ENTER THE FORST DOOR</div>
      <div className={styles.video_modal}>TRAILER</div>
      <div ref={light} className={styles.light_out}></div>
      <div className={styles.mint_wrap}>
        <img className={styles.trigger} src={Trigger} alt="" />
        <span>1231/5000</span>
        <div
          className={styles.mint}
          onClick={() => {
            document.getElementById('root')!.style.overflowX = 'hidden'
            animationLeftRef.current?.play()
            animationRightRef.current?.play()
            doorRef.current?.play()
          }}
        >
          <div className={styles.left}></div>
          <div className={styles.right}></div>
          <div className={styles.content}>FREE MINT NOW</div>
        </div>
      </div>
      <div ref={line} className={styles.gates_one_line}></div>
    </div>
  )
}

export default GatesOne
