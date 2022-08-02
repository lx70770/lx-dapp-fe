import { isProd } from '@/constants'
import React from 'react'
import LXMFER from './_lx_mfer'
import LXToken from './_lx_token'
import Metamask from './_metamask'
import Network from './_network'

const App: React.FC = () => {
  return (
    <>
      <h1>{isProd ? '正式环境' : '测试环境'}</h1>
      <Network />
      <Metamask />
      {/* <LXToken /> */}
      <LXMFER />
    </>
  )
}

export default App
