import { Col, Modal, Progress, Row, Select } from 'antd'
import React, { useEffect, useState } from 'react'
import Scrollbars from 'react-custom-scrollbars'
import SupplyBox from '../../assets/svg/box.svg'
import Diamand from '../../assets/svg/diamand.svg'
import ModalClose from '../../assets/svg/modal_close.png'
import styles from './styles.less'

const { Option } = Select

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

const MergeModal: React.FC<MergeModal> = (props) => {
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
      <div className={styles.merge_modal}>
        <div className={styles.left}>
          <div className={styles.top_box}>
            <img src={SupplyBox} alt="" />
            <div className={styles.texts}>
              <div className={styles.big}>SUPPLY BOX</div>
              <div className={styles.small}>ARM YOURSELF TO OPEN THE SECOND DOOR</div>
            </div>
          </div>
          <div className={styles.accessories}>
            <div className={styles.types}>
              <div className={styles.type}>HEAD</div>
              <div className={styles.type}>BODY</div>
              <div className={styles.type}>EAR</div>
              <div className={styles.type}>DACE</div>
              <div className={styles.type}></div>
              <div className={styles.type}></div>
            </div>
            <div className={styles.images}>
              <Scrollbars
                style={{ height: 420, width: '100%' }}
                renderTrackHorizontal={(props) => <div {...props} style={{ display: 'none' }} className="track-horizontal" />}
              >
                <Row gutter={16}>
                  <Col span={8}>
                    <div className={styles.image}>
                      <div className={styles.img}></div>
                      <div className={styles.names}>
                        <div className={styles.name}>123</div>
                        <div className={styles.num}>[1/30]</div>
                      </div>
                    </div>
                  </Col>
                  <Col span={8}>
                    <div className={styles.image}>
                      <div className={styles.img}></div>
                      <div className={styles.names}>
                        <div className={styles.name}>123</div>
                        <div className={styles.num}>[1/30]</div>
                      </div>
                    </div>
                  </Col>
                  <Col span={8}>
                    <div className={styles.image}>
                      <div className={styles.img}></div>
                      <div className={styles.names}>
                        <div className={styles.name}>123</div>
                        <div className={styles.num}>[1/30]</div>
                      </div>
                    </div>
                  </Col>
                  <Col span={8}>
                    <div className={styles.image}>
                      <div className={styles.img}></div>
                      <div className={styles.names}>
                        <div className={styles.name}>123</div>
                        <div className={styles.num}>[1/30]</div>
                      </div>
                    </div>
                  </Col>
                  <Col span={8}>
                    <div className={styles.image}>
                      <div className={styles.img}></div>
                      <div className={styles.names}>
                        <div className={styles.name}>123</div>
                        <div className={styles.num}>[1/30]</div>
                      </div>
                    </div>
                  </Col>
                  <Col span={8}>
                    <div className={styles.image}>
                      <div className={styles.img}></div>
                      <div className={styles.names}>
                        <div className={styles.name}>123</div>
                        <div className={styles.num}>[1/30]</div>
                      </div>
                    </div>
                  </Col>
                  <Col span={8}>
                    <div className={styles.image}>
                      <div className={styles.img}></div>
                      <div className={styles.names}>
                        <div className={styles.name}>123</div>
                        <div className={styles.num}>[1/30]</div>
                      </div>
                    </div>
                  </Col>
                  <Col span={8}>
                    <div className={styles.image}>
                      <div className={styles.img}></div>
                      <div className={styles.names}>
                        <div className={styles.name}>123</div>
                        <div className={styles.num}>[1/30]</div>
                      </div>
                    </div>
                  </Col>
                  <Col span={8}>
                    <div className={styles.image}>
                      <div className={styles.img}></div>
                      <div className={styles.names}>
                        <div className={styles.name}>123</div>
                        <div className={styles.num}>[1/30]</div>
                      </div>
                    </div>
                  </Col>
                  <Col span={8}>
                    <div className={styles.image}>
                      <div className={styles.img}></div>
                      <div className={styles.names}>
                        <div className={styles.name}>123</div>
                        <div className={styles.num}>[1/30]</div>
                      </div>
                    </div>
                  </Col>
                  <Col span={8}>
                    <div className={styles.image}>
                      <div className={styles.img}></div>
                      <div className={styles.names}>
                        <div className={styles.name}>123</div>
                        <div className={styles.num}>[1/30]</div>
                      </div>
                    </div>
                  </Col>
                  <Col span={8}>
                    <div className={styles.image}>
                      <div className={styles.img}></div>
                      <div className={styles.names}>
                        <div className={styles.name}>123</div>
                        <div className={styles.num}>[1/30]</div>
                      </div>
                    </div>
                  </Col>
                </Row>
              </Scrollbars>
            </div>
          </div>
        </div>
        <div className={styles.right}>
          <div className={styles.diamand}>
            <div className={styles.dai_icon}>
              <img src={Diamand} alt="" />
              <span>3</span>
            </div>
            <img src={ModalClose} alt="" onClick={() => set(false)} />
          </div>
          <div className={styles.nft_wrap}>
            <div className={styles.image_wrap}>
              <Select className={styles.dropdown}>
                <Option value="jack">TTG #123</Option>
                <Option value="lucy">TTG #124</Option>
                <Option value="disabled">TTG #125</Option>
                <Option value="Yiminghe">TTG #126</Option>
              </Select>
              <div className={styles.preview_img}>
                <img src="https://lx-cssofer.s3.ap-south-1.amazonaws.com/lx-step1-images/virgin_1.png" alt="" />
              </div>
            </div>
            <div className={styles.character}>
              <div className={styles.title}>CHARACTER TRAITS</div>
              <div className={styles.nums}>
                <div className={styles.scores}>
                  <div className={styles.score}>
                    <div className={styles.key}>score</div>
                    <div className={styles.count}>69</div>
                  </div>
                  <div className={styles.score}>
                    <div className={styles.key}>rank</div>
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
          <div className={styles.confirm}>CONFIRM</div>
        </div>
      </div>
    </Modal>
  )
}

export default MergeModal
