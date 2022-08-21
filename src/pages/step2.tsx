import Spin from '@/components/common-loading'
import { eyes, faces, hairs, mouses } from '@/constants/decoration'
import { useAWS } from '@/hooks/useAwsSdk'
import { useLXDiamandInfo } from '@/hooks/useLXDiamandContract'
import { useRequest } from 'ahooks'
import { Button, message, Select, Tabs } from 'antd'
import classnams from 'classnames'
import _ from 'lodash'
import mergeImages from 'merge-images'
import React, { useEffect, useState } from 'react'
import BaseImage from '../assets/background/base.png'
import styles from './styles.less'
import AwsS3Page from './_lx_aws_s3'

const { Option } = Select
const { TabPane } = Tabs

const Step2: React.FC = () => {
  const { diamandCount, toekn1Ids, burn, loading, refresh } = useLXDiamandInfo()
  const { uploadImage, uploadJson } = useAWS()

  const [tokenId, setTokenId] = useState('')
  const [eye, setEye] = useState('')
  const [face, setFace] = useState('')
  const [hair, setHair] = useState('')
  const [mouse, setMouse] = useState('')

  const [mergedUrl, setMergedUrl] = useState('')
  const [genLoading, setGenloading] = useState(false)

  const { runAsync } = useRequest(mergeImages, {
    manual: true,
  })

  const decoCls = (url: string, type: string) => {
    return classnams({
      [styles.deco_img]: true,
      [styles.deco_img_select]: url === type,
    })
  }

  const merge = async () => {
    try {
      const decos = _.compact([face, hair, eye, mouse])
      if (decos.length === 0) return
      console.log(decos)

      const mergedUrl = await mergeImages([BaseImage, ...decos], { quality: 1 })
      setMergedUrl(mergedUrl)
    } catch (e) {
      console.log(`error: ${e}`)
    }
  }

  useEffect(() => {
    merge()
  }, [eye, face, hair, mouse])

  useEffect(() => {
    if (toekn1Ids.length > 0) {
      setTokenId(toekn1Ids[0])
    }
  }, [toekn1Ids])

  const genRightNow = async () => {
    if (Number(diamandCount) <= 0) {
      message.error('你未拥有钻石，无法生成！')
      return
    }
    if (_.compact([face, hair, eye, mouse]).length !== 4) {
      message.error('每种配饰必须选择一个！')
      return
    }
    if (!mergedUrl) return
    console.log(tokenId)

    if (!toekn1Ids.includes(tokenId)) return
    try {
      setGenloading(true)
      // Todo 检查配件使用 是否已经合成过
      await uploadImage(mergedUrl, tokenId)
      await uploadJson(tokenId)
      await burn()
    } catch (e) {
    } finally {
      setGenloading(false)
      refresh()
    }
  }

  return (
    <Spin spinning={loading} color="#000">
      <div className={styles.step2}>
        <div className={styles.preview}>
          母图: {toekn1Ids.length} 钻石: {diamandCount} <br />
          {toekn1Ids.length > 0 ? (
            <>
              <Select defaultValue={toekn1Ids[0]} style={{ width: '100%' }} onChange={(value: string) => setTokenId(value)}>
                {toekn1Ids.map((item) => {
                  return (
                    <Option key={item} value={item}>
                      #{item}
                    </Option>
                  )
                })}
              </Select>
              <div className={styles.preview_img}>
                {mergedUrl ? <img src={mergedUrl} alt="" /> : <img src="https://lx-cssofer.s3.ap-south-1.amazonaws.com/lz-images/strange-line.png" alt="" />}
              </div>
            </>
          ) : (
            <span>您未拥有母图</span>
          )}
        </div>
        <div className={styles.choices}>
          <Tabs defaultActiveKey="1" onChange={undefined}>
            <TabPane tab="face" key="1">
              {faces.map((image) => {
                return (
                  <div key={image.name} className={decoCls(image.url, face)} onClick={() => setFace(image.url)}>
                    <img src={image.url} alt={image.name} />
                  </div>
                )
              })}
            </TabPane>
            <TabPane tab="eye" key="2">
              {eyes.map((image) => {
                return (
                  <div key={image.name} className={decoCls(image.url, eye)} onClick={() => setEye(image.url)}>
                    <img src={image.url} alt={image.name} />
                  </div>
                )
              })}
            </TabPane>
            <TabPane tab="hair" key="3">
              {hairs.map((image) => {
                return (
                  <div key={image.name} className={decoCls(image.url, hair)} onClick={() => setHair(image.url)}>
                    <img src={image.url} alt={image.name} />
                  </div>
                )
              })}
            </TabPane>
            <TabPane tab="mouse" key="4">
              {mouses.map((image) => {
                return (
                  <div key={image.name} className={decoCls(image.url, mouse)} onClick={() => setMouse(image.url)}>
                    <img src={image.url} alt={image.name} />
                  </div>
                )
              })}
            </TabPane>
          </Tabs>
          <Button loading={genLoading} onClick={genRightNow}>
            立即生成
          </Button>
        </div>
      </div>
      <AwsS3Page />
    </Spin>
  )
}

export default Step2
