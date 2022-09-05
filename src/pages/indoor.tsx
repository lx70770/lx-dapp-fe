import sleep from '@/utils/sleep'
import React, { useEffect } from 'react'
import { history } from 'umi'

const Indoor: React.FC = () => {
  useEffect(() => {
    const unblock = history.block(async (tx) => {
      let url = tx.location.pathname
      // @ts-ignore
      window._transitionAniRef.play()
      await sleep()
      console.log(`you want to go to ${url}?`)
      unblock()
      tx.retry()
    })
  }, [])

  return (
    <div style={{ backgroundColor: 'red', width: '100%' }}>
      <div
        style={{ color: '#fff', textAlign: 'center', cursor: 'pointer', margin: '30px 0' }}
        onClick={() => {
          history.push('/merge')
        }}
      >
        武器库
      </div>
      <div
        style={{ color: '#fff', textAlign: 'center', cursor: 'pointer', margin: '30px 0' }}
        onClick={() => {
          history.push('/detail')
        }}
      >
        个人详情
      </div>
      <div
        style={{ color: '#fff', textAlign: 'center', cursor: 'pointer', margin: '30px 0' }}
        onClick={() => {
          history.push('/diamond')
        }}
      >
        钻石MINT
      </div>
    </div>
  )
}

export default Indoor
