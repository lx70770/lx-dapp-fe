import { Modal, Progress } from 'antd'
import React, { useEffect, useState } from 'react'
import ModalClose from '../../assets/svg/modal_close.png'
import styles from './styles.less'

interface MergeModal {
  visible: boolean
  set: (visible: boolean) => void
}

const merge_modal_style = {
  backgroundColor: 'transparent',
  border: 'none',
  borderRadius: '0',
}

const mask_modal_style = {
  backgroundColor: '#000',
}

const DetailModal: React.FC<MergeModal> = (props) => {
  const { visible, set } = props

  const [percent, setPercent] = useState(0)

  useEffect(() => {
    if (visible) {
      setTimeout(() => {
        setPercent(75)
      }, 1000)
    }
  }, [visible])

  return (
    <Modal
      closable={false}
      visible={visible}
      footer={false}
      centered
      bodyStyle={merge_modal_style}
      maskClosable={false}
      maskStyle={mask_modal_style}
      width={1400}
      zIndex={100001}
    >
      <div className={styles.detail_modal}>
        <div className={styles.left}>
          <div className={styles.title}>TTG #2354</div>
          <div className={styles.preview_img}>
            <img src="https://lx-cssofer.s3.ap-south-1.amazonaws.com/lx-step1-images/virgin_1.png" alt="" />
          </div>
        </div>
        <div className={styles.right}>
          <div className={styles.top}>
            <div className={styles.title}>OWNER: adasdijo1newjnfo23jn</div>
            <img src={ModalClose} alt="" onClick={() => set(false)} />
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
            </div>
          </div>
        </div>
      </div>
    </Modal>
  )
}

export default DetailModal
