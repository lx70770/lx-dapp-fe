import React, { useEffect } from 'react'
import IpfsPage from './_ipfs'
import LXToken from './_lx_token'
import Metamask from './_metamask'
import Network from './_network'

const App: React.FC = () => {
  useEffect(() => {
    const env = process.env.DEVELOPMENT_ENV
    console.log('env', env)
  }, [])

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
