import { useToggle } from 'ahooks'
import React from 'react'
import { history } from 'umi'
import Mintdetail from '../../assets/images/detail.png'
import MintDiamond from '../../assets/images/mint_diamond.png'
import SupplyBox from '../../assets/svg/box.svg'
import styles from './styles.less'
import DetailModal from './_detail'
import MergeModal from './_merge'

const Indoor: React.FC = () => {
  const [mergeModal, { set: setMergeModal }] = useToggle(false)
  const [detailModal, { set: setDetailModal }] = useToggle(false)

  return (
    <div className={styles.indoor_wrap}>
      <div className={styles.middle}>
        <img src={SupplyBox} alt="" onClick={() => setMergeModal(true)} />
        <img
          src={MintDiamond}
          alt=""
          style={{ width: '100px' }}
          onClick={() => {
            history.push('/diamond')
          }}
        />
        <img src={Mintdetail} alt="" style={{ width: '500px' }} onClick={() => setDetailModal(true)} />
        <MergeModal visible={mergeModal} set={setMergeModal} />
        <DetailModal visible={detailModal} set={setDetailModal} />
      </div>
      <div className={styles.bg}></div>
    </div>
  )
}

export default Indoor
