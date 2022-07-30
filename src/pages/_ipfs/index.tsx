import { PeerId } from 'ipfs-core/dist/src/ipns'
import { useEffect, useState } from 'react'
import useIpfsFactory from '../../hooks/useIpfsFactory'

export interface VersionResult {
  version: string
  commit?: string
  repo?: string
  system?: string
  golang?: string
  'ipfs-core'?: string
  'interface-ipfs-core'?: string
  'ipfs-http-client'?: string
}

export interface IDResult {
  id: PeerId
  publicKey: string
  addresses: any[]
  agentVersion: string
  protocolVersion: string
  protocols: string[]
}

function IpfsPage() {
  const { ipfs, ipfsInitError } = useIpfsFactory()
  //   const id = useIpfs(ipfs, 'id')
  const [version, setVersion] = useState<VersionResult | undefined>(undefined)
  const [idResult, setIdresult] = useState<IDResult | undefined>(undefined)

  useEffect(() => {
    if (!ipfs) return
    const getVersion = async () => {
      const nodeVersion = await ipfs.version()
      const nodeId = await ipfs.id()
        ipfs.add
      setVersion(nodeVersion)
      console.log(nodeId.id.toString())
      console.log(ipfs.block)
      console.log(ipfs.codecs.listCodecs())
    }

    getVersion().catch((err) => console.log('version err: ' + err))
  }, [ipfs])

  return (
    <div className="sans-serif">
      <header className="flex items-center pa3 bg-navy bb bw3 b--aqua">
        <a href="https://ipfs.io" title="home">
          logo
        </a>

        <h1 className="flex-auto ma0 tr f3 fw2 montserrat aqua">IPFS React</h1>
      </header>
      <main>
        {ipfsInitError && <div className="bg-red pa3 mw7 center mv3 white">Error: {ipfsInitError.message || ipfsInitError}</div>}
        {idResult ||
          (version && (
            <section className="bg-snow mw7 center mt5">
              <h1 className="f3 fw4 ma0 pv3 aqua montserrat tc" data-test="title">
                Connected to IPFS
              </h1>
              <div className="pa4">
                {idResult && <IpfsId obj={idResult} keys={['id', 'agentVersion']} />}
                {version && <IpfsId obj={version} keys={['version']} />}
              </div>
            </section>
          ))}
      </main>
    </div>
  )
}

const Title = ({ children }: { children: any }) => {
  return <h2 className="f5 ma0 pb2 aqua fw4 montserrat">{children}</h2>
}

const IpfsId = ({ keys, obj }: { keys: Array<any>; obj: any }) => {
  if (!obj || !keys || keys.length === 0) return null
  return (
    <>
      {keys?.map((key) => (
        <div className="mb4" key={key}>
          <Title>{key}</Title>
          <div className="bg-white pa2 br2 truncate monospace" data-test={key}>
            {obj[key].toString()}
          </div>
        </div>
      ))}
    </>
  )
}

export default IpfsPage
