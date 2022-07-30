import { create, IPFS } from 'ipfs-core'
import { useEffect, useState } from 'react'

/*
 * A quick demo using React hooks to create an ipfs instance.
 *
 * Hooks are brand new at the time of writing, and this pattern
 * is intended to show it is possible. I don't know if it is wise.
 *
 * Next steps would be to store the ipfs instance on the context
 * so use-ipfs calls can grab it from there rather than expecting
 * it to be passed in.
 */
export default function useIpfsFactory() {
  const [ipfs, setIpfs] = useState<IPFS | undefined>(undefined)
  const [ipfsInitError, setIpfsInitError] = useState<any>(null)

  useEffect(() => {
    // The fn to useEffect should not return anything other than a cleanup fn,
    // So it cannot be marked async, which causes it to return a promise,
    // Hence we delegate to a async fn rather than making the param an async fn.

    startIpfs()
    return function cleanup() {
      if (ipfs && !!ipfs.stop) {
        console.log('Stopping IPFS')
        ipfs.stop().catch((err) => console.error(err))
        setIpfs(undefined)
      }
    }
  }, [])

  async function startIpfs() {
    if (ipfs) {
      console.log('IPFS already started')
    } else {
      try {
        console.time('IPFS Started')
        const ipfs = await create()
        setIpfs(ipfs)
        console.timeEnd('IPFS Started')
      } catch (error: any) {
        console.error('IPFS init error:', error)
        setIpfs(undefined)
      }
    }
  }

  return { ipfs, ipfsInitError }
}
