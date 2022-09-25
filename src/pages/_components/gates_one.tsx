import { useLXMFERInfo } from '@/hooks/useLXMFERContract'
import useWallet from '@/hooks/useWallet'
import MetaMaskOnboarding from '@metamask/onboarding'
import anime, { AnimeInstance } from 'animejs'
import { message } from 'antd'
import Atropos from 'atropos/react'
import React, { useCallback, useLayoutEffect, useRef } from 'react'
import { loadFull } from 'tsparticles'
import type { Engine } from 'tsparticles-engine'
import { history } from 'umi'
import MintBtnDown from '../../assets/images/mint_button_down.png'
import MintBtnTop from '../../assets/images/mint_button_top.png'
import styles from '../styles.less'

const GatesOne: React.FC = () => {
  const doorRef = React.useRef<AnimeInstance | null>(null)
  const door = useRef<HTMLDivElement>(null)

  const { account, isActive, isActiviting, shortAccountAddress, isNetworkNotSupport, connect, disconnect } = useWallet()

  const { balance, totalSupply, mint, loading } = useLXMFERInfo()

  console.log(balance, totalSupply, loading)

  useLayoutEffect(() => {
    if (door.current) {
      doorRef.current = anime({
        targets: door.current,
        easing: 'easeInExpo',
        scale: {
          value: 6,
          duration: 1000,
        },
        opacity: {
          value: 0,
          delay: 500,
          duration: 500,
        },
        autoplay: false,
        update: onProgress,
      })
    }
  }, [])

  const onProgress = (anim: AnimeInstance) => {
    if (anim.progress === 100) {
      if (door.current) {
        document.getElementById('root')!.style.overflowX = 'auto'
        door.current.style.display = 'none'
      }
      history.replace('/indoor')
    }
  }

  const particlesInit = useCallback(async (engine: Engine) => {
    await loadFull(engine)
  }, [])

  const connectWallet = () => {
    if (MetaMaskOnboarding.isMetaMaskInstalled()) {
      connect()
    } else {
      new MetaMaskOnboarding().startOnboarding()
    }
  }

  const firstButton = () => {
    if (isActiviting || loading) {
      message.warn('network is loading, please wait a moment.')
      return
    }

    if (Number(balance) > 0) {
      document.getElementById('root')!.style.overflowX = 'hidden'
      doorRef.current?.play()
      return
    }

    if (!account || !isActive) {
      connectWallet()
    }

    if (Number(balance) <= 0) {
      mint(account)
      return
    }
  }

  return (
    <div ref={door} className={styles.gate_one}>
      <div className={styles.bg}></div>

      {/* <Particles
        id="tsparticles"
        className={styles.tsparticles}
        width="100%"
        height="100%"
        options={{
          backgroundMode: false,
          fpsLimit: 120,
          particles: {
            color: {
              value: '#fff',
            },
            collisions: {
              enable: false,
            },
            move: {
              enable: true,
              outModes: {
                default: 'out',
              },
              random: false,
              direction: 'outside',
              speed: 5,
              straight: true,
            },
            number: {
              density: {
                enable: true,
                area: 1000,
              },
              value: 180,
            },
            opacity: {
              value: 0.8,
            },
            shape: {
              type: 'edge',
            },
            size: {
              value: { min: 1, max: 2 },
            },
          },
          detectRetina: true,
        }}
        init={particlesInit}
      /> */}

      <div className={styles.step_one_bg}>
        <Atropos className={styles.my_atropos} activeOffset={0} rotateXMax={1} rotateYMax={1} shadow={false} highlight={false}>
          <div className={styles.door} data-atropos-offset="-2" />
          <div className={styles.mint_button_down} data-atropos-offset="-2">
            <img src={MintBtnDown} alt="" />
          </div>
          <div className={styles.mint_button_top} onClick={firstButton}>
            <img src={MintBtnTop} alt="" />
          </div>
          {loading || totalSupply === '0' ? null : (
            <div className={styles.mint_account} onClick={firstButton}>
              <span className={styles.balance}>{totalSupply}/</span>
              <span className={styles.total}>{5000}</span>
            </div>
          )}
        </Atropos>
      </div>
    </div>
  )
}

export default GatesOne
