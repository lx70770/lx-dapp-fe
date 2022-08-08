import * as Ipfs from 'ipfs-core'
import { useEffect, useState } from 'react'

const COMMON_DICTIONARY = '/lx/nfts/abc/'
const REPO = 'ipfs-' + 'QmaDM5mY5J2KaBaYN6WfQBnWiMKZip9TVFyjuJBCh4JYDgf'

export function useIpfs() {
  const [loading, setLoading] = useState(false)
  const [ipfsIns, setIpfsIns] = useState<Ipfs.IPFS | undefined>(undefined)

  useEffect(() => {
    initIpfs()
  }, [])

  const initIpfs = async () => {
    try {
      setLoading(true)

      console.log(`begin create dic ${COMMON_DICTIONARY}:`)

      const ipfs = await Ipfs.create({ repo: REPO })
      await ipfs.files.mkdir(COMMON_DICTIONARY, { parents: true })
      console.log(`success create dic ${COMMON_DICTIONARY}:`)

      const result = await ipfs.files.stat(COMMON_DICTIONARY, { hash: true })
      console.log('dic stat:')
      console.log(result.cid?.toString())
      setIpfsIns(ipfs)
    } catch (e) {
      console.log('init ipfs error')
      console.log(e)
    } finally {
      setLoading(false)
    }
  }

  const uploadFile1 = async () => {
    if (ipfsIns) {
      const files1 = {
        path: COMMON_DICTIONARY + 'abc.txt',
        content: 'ABC',
      }
      setLoading(true)
      const result = await ipfsIns.add(files1)
      console.log('add result1')
      console.log(result.cid.toString())
      const stat = await ipfsIns.files.stat(COMMON_DICTIONARY, { hash: true })
      console.log(stat.cid.toString())

      setLoading(false)
    }
  }

  const uploadFile2 = async () => {
    if (ipfsIns) {
      setLoading(true)

      const files2 = {
        path: COMMON_DICTIONARY + 'def.txt',
        content: 'DEF',
      }
      const result = await ipfsIns.add(files2)
      console.log('add result2')
      console.log(result.cid.toString())
      const stat = await ipfsIns.files.stat(COMMON_DICTIONARY, { hash: true })
      console.log(stat.cid.toString())

      setLoading(false)
    }
  }

  return { uploadFile1, uploadFile2, loading }
}
