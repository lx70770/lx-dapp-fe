import { useAWS } from '@/hooks/useAwsSdk'
import { etherToWei } from '@/utils/format_bignumber'
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
            <Button key="4" onClick={() => uploadJson()}>
              uploadJson
            </Button>,
            <Button key="2" onClick={() => createAlbums('lz')}>
              createAlbums1
            </Button>,
            <Button key="3" onClick={() => createAlbums('lz-images')}>
              createAlbums1
            </Button>,
          ]}
        >
          <Descriptions size="small" column={3}>
            <Descriptions.Item label="合约地址">{etherToWei('0.01').toString()}</Descriptions.Item>
          </Descriptions>
        </PageHeader>
      </Spin>
    </div>
  )
}

export default AwsS3Page
