import React, { FunctionComponent, useEffect } from 'react'
import FocusLock from 'react-focus-lock'
import ReactDOM from 'react-dom'

import {
  WrapperModal,
  Header,
  CloseButton,
  Content,
  Backdrop,
  Picture,
  Recipe,
} from './modal.style'
import styled from 'styled-components'

export interface ModalProps {
  isShown: boolean
  hide: () => void
  modalContent?: JSX.Element
  headerText: string
}

export const Modal: FunctionComponent<ModalProps> = ({
  isShown,
  hide,
  modalContent,
  headerText,
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
        <WrapperModal>
          <Header>
            {headerText}
            <CloseButton onClick={hide}>X</CloseButton>
          </Header>
          <Picture
            src={
              'https://brands-a.prod.onewp.net/app/uploads/sites/4/2018/09/Pizzaboller.jpg'
            }
          />
          <Content>heieheiiehei</Content>
          <Recipe>yoyo</Recipe>
        </WrapperModal>
      </FocusLock>
    </React.Fragment>
  )

  return isShown ? ReactDOM.createPortal(modal, document.body) : null
}
