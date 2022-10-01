import { useToggle } from 'ahooks'
import React from 'react'
import SupplyBox from '../../assets/svg/box.png'
import styles from './styles.less'
import MergeModal from './_merge'

const Indoor: React.FC = () => {
  const [mergeModal, { set: setMergeModal }] = useToggle(false)

  return (
    <div className={styles.indoor_wrap}>
      <div className={styles.middle}>
        <img src={SupplyBox} width={215} alt="" onClick={() => setMergeModal(true)} />
        {/* <img src={SupplyBox} width={215} alt="" onClick={() => setMergeModal(true)} /> */}
      </div>
      <MergeModal visible={mergeModal} set={setMergeModal} />
      <div className={styles.bg}></div>
    </div>
  )
}

export default Indoor
