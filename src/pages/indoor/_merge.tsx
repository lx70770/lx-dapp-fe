import Spin from '@/components/common-loading'
import ImageLoader from '@/components/image-loader'
import { Col, Modal, Progress, Row, Select } from 'antd'
import cls from 'classnames'
import _ from 'lodash'
import mergeImages from 'merge-images'
import React, { useEffect, useState } from 'react'
import Scrollbars from 'react-custom-scrollbars'
import SupplyBox from '../../assets/svg/box.svg'
import Diamand from '../../assets/svg/diamand.svg'
import ModalClose from '../../assets/svg/modal_close.png'
import styles from './styles.less'

import { useAWS } from '@/hooks/useAwsSdk'
import { useLXDiamandInfo } from '@/hooks/useLXDiamandContract'
import useNotify from '@/hooks/useNotify'
import { backgrounds, faces, humans, ImageProps, judgeSex, scratchs } from '../../constants/decoration'

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
  const [mergeUrl, setMergedUrl] = useState<string>()

  const [percent, setPercent] = useState(0)
  const [merging, setMerging] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [sleType, setSleType] = useState('background')
  const [images, setImages] = useState(backgrounds)

  const [backgroundImg, setBackgroundImg] = useState<ImageProps | undefined>()
  const [faceImg, setFaceImg] = useState<ImageProps | undefined>()
  const [scratchsImg, setScratchsImg] = useState<ImageProps | undefined>()
  const { error } = useNotify()
  const { diamandCount, toekn1Ids, specials, merge: contractMerge, check, checkMerged, loading } = useLXDiamandInfo()
  const [seleTTG, setSeleTTG] = useState('')
  const { uploadImage, uploadJson } = useAWS()

  const clear = (ttg: string) => {
    setMergedUrl(judgeSex(ttg) ? humans.male : humans.female)
    setPercent(0)
    setMerging(false)
    setSleType('background')
    setImages(backgrounds)
    setBackgroundImg(undefined)
    setFaceImg(undefined)
    setScratchsImg(undefined)
  }

  useEffect(() => {
    if (visible) {
      setTimeout(() => {
        setPercent(75)
      }, 1000)
    }
  }, [visible])

  useEffect(() => {
    if (toekn1Ids.length > 0) {
      setSeleTTG(toekn1Ids[0])
      setMergedUrl(judgeSex(toekn1Ids[0]) ? humans.male : humans.female)
    }
  }, [toekn1Ids])

  useEffect(() => {
    merge()
  }, [backgroundImg, faceImg, scratchsImg])

  const merge = async () => {
    try {
      setMerging(true)
      const decos = _.compact([backgroundImg?.url, judgeSex(seleTTG) ? humans.male : humans.female, faceImg?.url, scratchsImg?.url])
      if (decos.length === 0) return
      const mergedUrl = await mergeImages(decos, { quality: 1 })
      setMergedUrl(mergedUrl)
    } catch (e) {
      console.log(`error: ${e}`)
    } finally {
      setMerging(false)
    }
  }

  const _contractMerge = async () => {
    try {
      if (!seleTTG) {
        error("You don't have ttg for generating NFTs")
        return
      }
      if (Number(diamandCount) <= 0) {
        error("You don't have diamonds for generating NFTs")
        return
      }
      const decos = _.compact([backgroundImg?.url, judgeSex(seleTTG) ? humans.male : humans.female, faceImg?.url, scratchsImg?.url])

      if (decos.length !== 4) {
        error('You have to select all kinds of pictures')
        return
      }
      setUploading(true)
      const checked = await check(Number(seleTTG))
      if (checked) {
        error('This ttg nft has been merged')
        return
      }
      const curStr = [backgroundImg!.tag, faceImg!.tag, scratchsImg!.tag].join('')
      console.log('curStr:' + curStr)
      const special_ = [backgroundImg!.name, faceImg!.name, scratchsImg!.name]
      console.log(special_)
      const checkMerged_ = await checkMerged(curStr)
      if (checkMerged_) {
        error('The images you selecte was been used')
        return
      }
      await contractMerge(curStr, Number(seleTTG), special_)
      await uploadImage(mergeUrl!, seleTTG)
      await uploadJson(seleTTG, backgroundImg!.name, faceImg!.name, scratchsImg!.name)
      error('Your exclusive nft has been generated')
    } catch (e) {
      console.log(`error: ${e}`)
    } finally {
      setUploading(false)
    }
  }

  const sleTypeCls = (type: string) => {
    return cls({
      [styles.type]: true,
      [styles.type_sele]: sleType === type,
    })
  }

  const imageCls = (name: string) => {
    if (sleType === 'background') {
      return cls({
        [styles.names]: true,
        [styles.names_sele]: backgroundImg?.name === name,
      })
    } else if (sleType === 'face') {
      return cls({
        [styles.names]: true,
        [styles.names_sele]: faceImg?.name === name,
      })
    } else if (sleType === 'scratch') {
      return cls({
        [styles.names]: true,
        [styles.names_sele]: scratchsImg?.name === name,
      })
    }
  }

  const handleClickImage = (item: { url: string; name: string; tag: string }) => {
    if (!mergeUrl) return
    if (merging) return
    if (sleType === 'background') {
      setBackgroundImg(item)
    } else if (sleType === 'face') {
      setFaceImg(item)
    } else if (sleType === 'scratch') {
      setScratchsImg(item)
    }
  }

  return (
    <Modal
      closable={false}
      visible={visible}
      footer={false}
      centered
      bodyStyle={merge_modal_style}
      maskClosable={false}
      maskStyle={mask_modal_style}
      width={1500}
      zIndex={100001}
    >
      <Spin spinning={loading || uploading} fontSize={32} color="#fff88a">
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
                <div
                  className={sleTypeCls('background')}
                  onClick={() => {
                    setSleType('background')
                    setImages(backgrounds)
                  }}
                >
                  background
                </div>
                <div
                  className={sleTypeCls('face')}
                  onClick={() => {
                    setSleType('face')
                    setImages(faces)
                  }}
                >
                  face
                </div>
                <div
                  className={sleTypeCls('scratch')}
                  onClick={() => {
                    setSleType('scratch')
                    setImages(scratchs)
                  }}
                >
                  scratch
                </div>
                {/* <div className={styles.type}></div>
              <div className={styles.type}></div>
              <div className={styles.type}></div> */}
              </div>
              <div className={styles.images}>
                <Scrollbars
                  style={{ height: 420, width: '100%' }}
                  renderTrackHorizontal={(props) => <div {...props} style={{ display: 'none' }} className="track-horizontal" />}
                >
                  <Row gutter={16}>
                    {images.map((item) => {
                      let left = 0
                      const count = specials.find((special) => special[0] === item.name)
                      if (count) {
                        left = count.num.toString()
                      }
                      return (
                        <Col span={8} key={item.name}>
                          <div className={styles.image}>
                            <div className={styles.img} onClick={Number(left) > 0 ? () => handleClickImage(item) : undefined}>
                              <ImageLoader height={110} src={item.url} />
                            </div>
                            <div className={imageCls(item.name)}>
                              <div className={styles.name}>{item.name}</div>
                              <div className={styles.num}>{left}/30</div>
                            </div>
                          </div>
                        </Col>
                      )
                    })}
                  </Row>
                </Scrollbars>
              </div>
            </div>
          </div>
          <div className={styles.right}>
            <div className={styles.diamand}>
              <div className={styles.dai_icon}>
                <img src={Diamand} alt="" />
                <span>{diamandCount}</span>
              </div>
              <img src={ModalClose} alt="" onClick={() => set(false)} />
            </div>
            <div className={styles.nft_wrap}>
              <div className={styles.image_wrap}>
                <Select
                  className={styles.dropdown}
                  value={seleTTG}
                  onChange={(value: string) => {
                    clear(value)
                    setSeleTTG(value)
                  }}
                >
                  {toekn1Ids.map((item) => {
                    return (
                      <Option key={item} value={item}>
                        TTG #{item}
                      </Option>
                    )
                  })}
                </Select>
                <div className={styles.preview_img}>{toekn1Ids.length > 0 ? <ImageLoader height={320} src={mergeUrl ?? ''} /> : null}</div>
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
            <div className={styles.confirm} onClick={_contractMerge}>
              CONFIRM
            </div>
          </div>
        </div>
      </Spin>
    </Modal>
  )
}

export default MergeModal
