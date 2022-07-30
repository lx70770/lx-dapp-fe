import React from 'react'
import IpfsPage from './_ipfs'
import LXToken from './_lx_token'
import Metamask from './_metamask'
import Network from './_network'

const App: React.FC = () => {
  return (
    <>
      <Network />
      <Metamask />
      <LXToken />
      <IpfsPage />
    </>
  )
}

export default App
