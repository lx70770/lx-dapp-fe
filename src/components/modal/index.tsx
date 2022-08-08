import CloseIcon from '@assets/svg/close.svg'
import { Modal as AModal, ModalProps } from 'antd'
import { ReactNode } from 'react'

interface Props extends ModalProps {
  children: ReactNode
}

export default function Modal(props: Props) {
  const defaultCloseIcon = <img src={CloseIcon} style={{ width: '14px' }} />
  const closeIcon = props.closeIcon || defaultCloseIcon
  return (
    <AModal {...props} closeIcon={closeIcon} footer={false}>
      {props.children}
    </AModal>
  )
}
