import { LX_TOKEN_ADDRESS } from '@/constants'
import { useLXTokenInfo } from '@/hooks/useLXTokenContract'
import { etherToWei } from '@/utils/format_bignumber'
import { Button, Descriptions, PageHeader, Spin } from 'antd'
import React from 'react'

const LXToken: React.FC = () => {
  const { balance, symbol, decimal, totalSupply, allowance, refresh, approveLoading, unApprove, approve, transferLoading, transfer, loading } = useLXTokenInfo()

  return (
    <div className="site-page-header-ghost-wrapper">
      <Spin spinning={loading}>
        <PageHeader
          ghost={false}
          title="LXToken信息"
          subTitle="打开控制台查看转账和接收转账事件监听 测试Jenkins"
          extra={[
            <Button key="1" onClick={() => refresh()}>
              获取余额
            </Button>,
            <Button key="2" loading={approveLoading} onClick={() => approve()}>
              授权
            </Button>,
            <Button key="3" loading={approveLoading} onClick={() => unApprove()}>
              取消授权
            </Button>,
            <Button key="4" loading={transferLoading} onClick={() => transfer('0xe65251230F218294482E512b1a358000c60Ae6C6', etherToWei('1').toString())}>
              转账
            </Button>,
          ]}
        >
          <Descriptions size="small" column={3}>
            <Descriptions.Item label="合约地址">{LX_TOKEN_ADDRESS}</Descriptions.Item>
            <Descriptions.Item label="Symbol">{symbol}</Descriptions.Item>
            <Descriptions.Item label="总供应量">{totalSupply}</Descriptions.Item>
            <Descriptions.Item label="精度">{decimal}</Descriptions.Item>
            <Descriptions.Item label="余额">{balance}</Descriptions.Item>
            <Descriptions.Item label="已授权额度">{allowance}</Descriptions.Item>
          </Descriptions>
        </PageHeader>
      </Spin>
    </div>
  )
}

export default LXToken
