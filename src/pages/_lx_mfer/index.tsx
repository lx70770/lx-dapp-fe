// import { LX_TOKEN_ADDRESS } from '@/constants'
// import { useLXMFERInfo } from '@/hooks/useLXMFERContract'
// import { Button, Descriptions, Input, PageHeader, Spin } from 'antd'
// import React, { useState } from 'react'

// const LXToken: React.FC = () => {
//   const [value, setValue] = useState('')
//   const [cost, setCost] = useState('')
//   const { mint, loading } = useLXMFERInfo()

//   return (
//     <div className="site-page-header-ghost-wrapper">
//       <Spin spinning={loading}>
//         <PageHeader
//           ghost={false}
//           title="LXMFER信息"
//           extra={[
//             <Input
//               placeholder="请输入mint费用 单位ETH"
//               value={cost}
//               key="cost"
//               onChange={(e) => {
//                 setCost(e.target.value)
//               }}
//             />,
//             <Input
//               placeholder="请输入mint地址"
//               key="value"
//               value={value}
//               onChange={(e) => {
//                 setValue(e.target.value)
//               }}
//             />,
//             <Button key="1" onClick={() => mint(value)}>
//               mint
//             </Button>,
//           ]}
//         >
//           <Descriptions size="small" column={3}>
//             <Descriptions.Item label="合约地址">{LX_TOKEN_ADDRESS}</Descriptions.Item>
//           </Descriptions>
//         </PageHeader>
//       </Spin>
//     </div>
//   )
// }

// export default LXToken
