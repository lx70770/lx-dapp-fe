// import { LX_TOKEN_ADDRESS } from '@/constants'
// import { useIpfs } from '@/hooks/useIpfs'
// import { Button, Descriptions, PageHeader, Spin } from 'antd'
// import React from 'react'

// const IPFSPage: React.FC = () => {
//   const { uploadFile1, uploadFile2, loading } = useIpfs()

//   return (
//     <div className="site-page-header-ghost-wrapper">
//       <Spin spinning={loading}>
//         <PageHeader
//           ghost={false}
//           title="IPFSPage信息"
//           extra={[
//             <Button key="1" onClick={() => uploadFile1()}>
//               uploadFile1
//             </Button>,
//             <Button key="2" onClick={() => uploadFile2()}>
//               uploadFile2
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

// export default IPFSPage
