import { isProd } from '@/constants'
import React from 'react'

const App: React.FC = () => {
  return (
    <>
      <h1>{isProd ? '正式环境' : '测试环境'}</h1>
    </>
  )
}

export default App
