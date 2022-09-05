import sleep from '@/utils/sleep'
import { Progress } from 'antd'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import { history } from 'umi'
import BackIcon from '../assets/svg/back.svg'
import styles from './styles.less'

const MergePage: React.FC = () => {
  const [percent, setPercent] = useState(0)

  useEffect(() => {
    const unblock = history.block(async (tx) => {
      let url = tx.location.pathname
      // @ts-ignore
      window._transitionAniRef.play()
      await sleep()
      console.log(`you want to go to ${url}?`)
      unblock()
      tx.retry()
    })
  }, [])

  useLayoutEffect(() => {
    setTimeout(() => {
      setPercent(75)
    }, 1000)
  }, [])

  return (
    <div className={styles.detail_wrap}>
      <div className={styles.middle}>
        <div className={styles.left}>
          <div className={styles.title}>TTG: #1234</div>
          <div className={styles.img}>
            <img src="https://lx-cssofer.s3.ap-south-1.amazonaws.com/lx-step1-images/virgin_1.png" alt="" />
          </div>
        </div>
        <div className={styles.right}>
          <div className={styles.top}>
            <div className={styles.owner}>OWNER: ADASDJ12kjLk1</div>
            <div
              className={styles.back}
              onClick={() => {
                history.back()
              }}
            >
              <img src={BackIcon} alt="" />
            </div>
          </div>
          <div className={styles.weapons}>
            <div className={styles.weapon}></div>
            <div className={styles.weapon}></div>
            <div className={styles.weapon}></div>
            <div className={styles.weapon}></div>
            <div className={styles.weapon}></div>
          </div>
          <div className={styles.nums}>
            <div className={styles.scores}>
              <div className={styles.score}>
                <div className={styles.title}>score</div>
                <div className={styles.count}>69</div>
              </div>
              <div className={styles.score}>
                <div className={styles.title}>rank</div>
                <div className={styles.count}>4568</div>
              </div>
            </div>
            <div className={styles.bars}>
              <div className={styles.trails}>
                <span>TRAITS1</span>
                <Progress strokeLinecap="butt" percent={percent} showInfo={false} strokeColor="#FFF88A" trailColor="rgba(255, 255, 255, 0.7)" />
              </div>
              <div className={styles.trails}>
                <span>TRAITS2</span>
                <Progress strokeLinecap="butt" percent={percent} showInfo={false} strokeColor="#FFF88A" trailColor="rgba(255, 255, 255, 0.7)" />
              </div>
              <div className={styles.trails}>
                <span>TRAITS3</span>
                <Progress strokeLinecap="butt" percent={percent} showInfo={false} strokeColor="#FFF88A" trailColor="rgba(255, 255, 255, 0.7)" />
              </div>
              <div className={styles.trails}>
                <span>TRAITS4</span>
                <Progress strokeLinecap="butt" percent={percent} showInfo={false} strokeColor="#FFF88A" trailColor="rgba(255, 255, 255, 0.7)" />
              </div>
              <div className={styles.trails}>
                <span>TRAITS5</span>
                <Progress strokeLinecap="butt" percent={percent} showInfo={false} strokeColor="#FFF88A" trailColor="rgba(255, 255, 255, 0.7)" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.bg}></div>
    </div>
  )
}

export default MergePage
