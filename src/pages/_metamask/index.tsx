// import useBalance from '@/hooks/useBalance'
// import useWallte from '@/hooks/useWallet'
// import MetaMaskOnboarding from '@metamask/onboarding'
// import { Button, Descriptions, PageHeader, Spin } from 'antd'
// import React from 'react'

// const Metamask: React.FC = () => {
//   const { connect, disconnect, chainId, account, isActiviting, isActive } = useWallte()
//   const { balance } = useBalance()

//   const connectWallet = () => {
//     if (MetaMaskOnboarding.isMetaMaskInstalled()) {
//       connect()
//     } else {
//       new MetaMaskOnboarding().startOnboarding()
//     }
//   }

//   return (
//     <div className="site-page-header-ghost-wrapper">
//       <Spin spinning={isActiviting}>
//         <PageHeader
//           ghost={false}
//           title="钱包信息"
//           subTitle="Metamask & 账户基本信息"
//           extra={[
//             <Button key="3" onClick={() => (isActivitve ? undefined : connectWallet())}>
//               {isActivitve ? '已连接' : '链接钱包'}
//             </Button>,
//             <Button key="2" onClick={() => disconnect()}>
//               断开连接
//             </Button>,
//           ]}
//         >
//           <Descriptions size="small" column={3}>
//             <Descriptions.Item label="账户地址">{account}</Descriptions.Item>
//             <Descriptions.Item label="链ID">{chainId}</Descriptions.Item>
//             <Descriptions.Item label="账户余额">{balance} ETH</Descriptions.Item>
//           </Descriptions>
//         </PageHeader>
//       </Spin>
//     </div>
//   )
// }

// export default Metamask
