import { useToggle } from 'ahooks'
import React, { useLayoutEffect } from 'react'
import { ApplicationNFT } from '../../utils/applicationNFT'
import styles from './styles.less'
import DetailModal from './_detail'
import MergeModal from './_merge'

const Indoor: React.FC = () => {
  const threeEle = React.useRef<HTMLDivElement | null>(null)

  const [mergeModal, { set: setMergeModal }] = useToggle(false)
  const [detailModal, { set: setDetailModal }] = useToggle(false)

  useLayoutEffect(() => {
    if (threeEle && threeEle.current) {
      console.log(12345)

      new ApplicationNFT(threeEle.current)
    }
  }, [])

  return (
    <div className={styles.indoor_wrap}>
      <div ref={threeEle} className={styles.middle}>
        {/* <img src={SupplyBox} alt="" onClick={() => setMergeModal(true)} />
        <img
          src={MintDiamond}
          alt=""
          style={{ width: '100px' }}
          onClick={() => {
            history.push('/diamond')
          }}
        />
        <img src={Mintdetail} alt="" style={{ width: '500px' }} onClick={() => setDetailModal(true)} /> */}
        <MergeModal visible={mergeModal} set={setMergeModal} />
        <DetailModal visible={detailModal} set={setDetailModal} />
      </div>
    </div>
  )
}

export default Indoor
