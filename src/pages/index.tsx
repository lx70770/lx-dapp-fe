import Spin from '@/components/common-loading'
import { useLXMFERInfo } from '@/hooks/useLXMFERContract'
import useWallet from '@/hooks/useWallet'
import Atropos from 'atropos/react'
import cls from 'classnames'
import React, { useCallback } from 'react'
import Particles from 'react-tsparticles'
import { loadFull } from 'tsparticles'
import type { Container, Engine } from 'tsparticles-engine'
import Door from '../assets/images/door.png'
import MintBtnDown from '../assets/images/mint_button_down.png'
import MintBtnTop from '../assets/images/mint_button_top.png'
import styles from './styles.less'

const MintButton: React.FC<{ disable: boolean; mintLoading: boolean; mint: () => void }> = ({ disable, mint, mintLoading }) => {
  const style = cls({
    [styles.button]: true,
    [styles.disable]: disable,
  })

  return (
    <button onClick={disable ? undefined : mint} className={style}>
      {mintLoading ? <Spin spinning color="#000" /> : null} mint now!
    </button>
  )
}

const App: React.FC = () => {
  const { totalSupply, balance, mint, mintLoading } = useLXMFERInfo()
  const { isActive, isNetworkNotSupport, account } = useWallet()

  const particlesInit = useCallback(async (engine: Engine) => {
    console.log(engine)

    // you can initialize the tsParticles instance (engine) here, adding custom shapes or presets
    // this loads the tsparticles package bundle, it's the easiest method for getting everything ready
    // starting from v2 you can add only the features you need reducing the bundle size
    await loadFull(engine)
  }, [])

  const particlesLoaded = useCallback(async (container: Container | undefined) => {
    console.log(container)
  }, [])

  return (
    <div className={styles.mint_wrap}>
      <Particles
        id="tsparticles"
        className={styles.tsparticles}
        width="100%"
        height="100%"
        options={{
          // background: {
          //   color: {
          //     value: ['#fdcf58', '#757676', '#f27d0c', '#800909', '#f07f13'],
          //   },
          // },
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
        loaded={particlesLoaded}
      />
      <div className={styles.step_one_bg}>
        <Atropos
          className={styles.my_atropos}
          onEnter={() => console.log('Enter')}
          onLeave={() => console.log('Leave')}
          activeOffset={0}
          rotateXMax={1}
          rotateYMax={1}
          shadow={false}
          highlight={false}
          onRotate={(x, y) => console.log('Rotate', x, y)}
        >
          <img src={Door} alt="" data-atropos-offset="-2" />
          <div className={styles.mint_button_down} data-atropos-offset="-2">
            <img src={MintBtnDown} alt="" />
          </div>
          <div className={styles.mint_button_top} data-atropos-offset="4">
            <img src={MintBtnTop} alt="" />
          </div>
          <div className={styles.mint_button_clip} data-atropos-offset="4">
            <img src={MintBtnTop} alt="" />
          </div>
        </Atropos>
      </div>

      {/* <GatesOne /> */}
      {/* <div>5000 utility-enabled goverened by the FOC DAO</div>
      <div>Powered by CC0 | FOC DAO</div>
      <div>1 free per wallet</div>
      <div>supply: {totalSupply ?? 0} / 5000</div>
      <MintButton mintLoading={mintLoading} disable={!isActive || isNetworkNotSupport || mintLoading || Number(balance) > 0} mint={() => mint(account)} />
      <AwsS3Page /> */}
    </div>
  )
}

export default App
