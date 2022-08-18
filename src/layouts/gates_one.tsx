import useWallte from '@/hooks/useWallet'
import { useToggle } from 'ahooks'
import anime, { AnimeInstance } from 'animejs'
import React, { useLayoutEffect, useRef } from 'react'
import styles from './index.less'

const GatesOne: React.FC = () => {
  const [visible, { toggle }] = useToggle(false)
  const animationLeftRef = React.useRef<AnimeInstance | null>(null)
  const animationRightRef = React.useRef<AnimeInstance | null>(null)
  const doorRef = React.useRef<AnimeInstance | null>(null)
  const lineRef = React.useRef<AnimeInstance | null>(null)

  const doorLeft = useRef<HTMLDivElement>(null)
  const doorRight = useRef<HTMLDivElement>(null)
  const door = useRef<HTMLDivElement>(null)
  const line = useRef<HTMLDivElement>(null)

  const {} = useWallte()

  useLayoutEffect(() => {
    if (doorLeft.current && doorRight.current) {
      animationLeftRef.current = anime({
        targets: doorLeft.current,
        translateX: -150,
        easing: 'easeInOutSine',
        autoplay: false,
      })
      animationRightRef.current = anime({
        targets: doorRight.current,
        translateX: 150,
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
        translateX: '100%',
        loop: true,
        duration: 8000,
        easing: 'easeInOutSine',
      })
    }
  }, [])

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
      <div className={styles.gates_one_door}>
        <div ref={doorLeft} className={styles.gates_one_door_left}>
          1234
        </div>
        <div ref={doorRight} className={styles.gates_one_door_right}>
          4567
        </div>
      </div>
      <button
        onClick={() => {
          document.getElementById('root')!.style.overflow = 'hidden'
          animationLeftRef.current?.play()
          animationRightRef.current?.play()
          doorRef.current?.play()
        }}
      >
        open
      </button>
      <div ref={line} className={styles.gates_one_line}></div>
    </div>
  )
}

export default GatesOne
