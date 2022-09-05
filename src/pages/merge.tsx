import Spin from '@/components/common-loading'
import { useAWS } from '@/hooks/useAwsSdk'
import { useLXDiamandInfo } from '@/hooks/useLXDiamandContract'
import sleep from '@/utils/sleep'
import { Col, Progress, Row, Select } from 'antd'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import { Scrollbars } from 'react-custom-scrollbars'
import { history } from 'umi'
import BackIcon from '../assets/svg/back.svg'
import SupplyBox from '../assets/svg/box.svg'
import Diamand from '../assets/svg/diamand.svg'
import styles from './styles.less'

const { Option } = Select

const MergePage: React.FC = () => {
  const { diamandCount, toekn1Ids, burn, loading, refresh } = useLXDiamandInfo()
  const { uploadImage, uploadJson } = useAWS()

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
    <Spin spinning={loading} color="#fff">
      <div className={styles.merge_wrap}>
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
                style={{ height: 640, width: '100%' }}
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
        <div className={styles.middle}>
          <div className={styles.diamand}>
            <img src={Diamand} alt="" />
            <span>3</span>
          </div>
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
        <div className={styles.right}>
          <div
            className={styles.back}
            onClick={() => {
              history.back()
            }}
          >
            <img src={BackIcon} alt="" />
          </div>
          <div className={styles.traits}>CHARACTER TRAITS</div>
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
          <div className={styles.confirm}>CONFIRM</div>
        </div>

        {/* <img className={styles.bg} src={MergeBg}></img> */}
        <div className={styles.bg}></div>
        <div className={styles.bg1}></div>
      </div>
    </Spin>
  )
}

export default MergePage
