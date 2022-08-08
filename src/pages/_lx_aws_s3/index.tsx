import { LX_TOKEN_ADDRESS } from '@/constants'
import { useAWS } from '@/hooks/useAwsSdk'
import { Button, Descriptions, PageHeader, Spin } from 'antd'
import React from 'react'

const AwsS3Page: React.FC = () => {
  const { createAlbums, uploadImage, uploadJson, loading } = useAWS()

  return (
    <div className="site-page-header-ghost-wrapper">
      <Spin spinning={loading}>
        <PageHeader
          ghost={false}
          title="AwsS3Page信息"
          extra={[
            <Button key="1" onClick={() => uploadImage()}>
              uploadImage
            </Button>,
            <Button key="4" onClick={() => uploadJson()}>
              uploadJson
            </Button>,
            <Button key="2" onClick={() => createAlbums('lx-json')}>
              createAlbums1
            </Button>,
            <Button key="3" onClick={() => createAlbums('lx-images')}>
              createAlbums1
            </Button>,
          ]}
        >
          <Descriptions size="small" column={3}>
            <Descriptions.Item label="合约地址">{LX_TOKEN_ADDRESS}</Descriptions.Item>
          </Descriptions>
        </PageHeader>
        <img src="https://lx-cssofer.s3.ap-south-1.amazonaws.com/lx-images/blue_red.png" alt="" />
      </Spin>
    </div>
  )
}

export default AwsS3Page
