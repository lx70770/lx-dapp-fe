// import { getProperty } from 'dot-prop'
// import { IPFS } from 'ipfs-core'
// import { useEffect, useState } from 'react'
// // dot-prop: used to obtain a property of an object when the name of property is a string
// // here we get ipfs.id when calling dotProp.get(ipfs, cmd), with cmd = 'id'
// // and we get ipfs.hash when calling with cmd = 'hash' etc.

// /*
//  * Pass the command you'd like to call on an ipfs instance.
//  *
//  * callIpfs uses setState write the response as a state variable, so that your component
//  * will re-render when the result 'res' turns up from the call await ipfsCmd.
//  *
//  */
// export default function useIpfs(ipfs: IPFS | undefined, cmd: string) {
//   const [res, setRes] = useState(null)
//   useEffect(() => {
//     callIpfs(ipfs, cmd, setRes)
//   }, [ipfs, cmd])
//   return res
// }

// async function callIpfs(ipfs: IPFS | undefined, cmd: string, setRes: Function) {
//   if (!ipfs) return null
//   console.log(`Call ipfs.${cmd}`)
//   const ipfsCmd = getProperty(ipfs, cmd)
//   console.log(ipfsCmd)
//   if (ipfsCmd) {
//     const res = await ipfsCmd()
//   }
//   //   console.log(`Result ipfs.${cmd}`, res)
//   //   setRes(res)
// }
