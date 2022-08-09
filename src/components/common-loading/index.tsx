import { LoadingOutlined } from '@ant-design/icons'
import { Spin as ASpin, SpinProps } from 'antd'

interface Props extends SpinProps {
  color?: string
}
export default function Spin(props: Props) {
  const antIcon = <LoadingOutlined style={{ fontSize: 14, color: props.color || '#fff' }} spin />
  return <ASpin {...props} indicator={antIcon}></ASpin>
}
