import React, { FunctionComponent, useEffect } from 'react'
import FocusLock from 'react-focus-lock'
import ReactDOM from 'react-dom'

import { WrapperModal, Backdrop } from './modal.style'

export interface ModalProps {
  isShown: boolean
  hide: () => void
  modalContent?: JSX.Element
}

export const Modal: FunctionComponent<ModalProps> = ({
  isShown,
  hide,
  modalContent,
}) => {
  const onKeyDown = (event: KeyboardEvent) => {
    if (event.keyCode === 27 && isShown) {
      hide()
    }
  }

  useEffect(() => {
    isShown
      ? (document.body.style.overflow = 'hidden')
      : (document.body.style.overflow = 'unset')
    document.addEventListener('keydown', onKeyDown, false)
    return () => {
      document.removeEventListener('keydown', onKeyDown, false)
    }
  }, [isShown])

  const modal = (
    <React.Fragment>
      <Backdrop onClick={hide} />
      <FocusLock>
        <WrapperModal>{modalContent}</WrapperModal>
      </FocusLock>
    </React.Fragment>
  )

  return isShown ? ReactDOM.createPortal(modal, document.body) : null
}
