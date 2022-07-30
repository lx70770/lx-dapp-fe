import useNetwork from '@/hooks/useNetwork'
import useWallet from '@/hooks/useWallet'
import { Descriptions, PageHeader, Spin } from 'antd'
import React from 'react'

const Network: React.FC = () => {
  const { isActivitve, isActiviting } = useNetwork()
  const { chainId } = useWallet()

  const fromatConnect = () => {
    if (chainId !== 3) return '钱包链接非Ropsten网络'
    if (isActiviting) return '连接中...'
    if (isActivitve) return '已连接'
    return '连接失败'
  }

  return (
    <div className="site-page-header-ghost-wrapper">
      <Spin spinning={isActiviting}>
        <PageHeader ghost={false} title="网络信息" subTitle="Metamask & 网络基本信息">
          <Descriptions size="small" column={3}>
            <Descriptions.Item label="Ropsten网络连接状态">{fromatConnect()}</Descriptions.Item>
            <Descriptions.Item label="chainId">{chainId}</Descriptions.Item>
          </Descriptions>
        </PageHeader>
      </Spin>
    </div>
  )
}

export default Network
