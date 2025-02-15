import React, { FunctionComponent, useEffect } from "react";
import FocusLock from "react-focus-lock";
import ReactDOM from "react-dom";

import {
    Wrapper1,
    Header,
    StyledModal,
    HeaderText,
    CloseButton,
    Content,
    Backdrop
  } from "./modal.style";
  
  export interface ModalProps {
    isShown: boolean;
    hide: () => void;
    modalContent: JSX.Element;
    headerText: string;
  }
  
  export const Modal: FunctionComponent<ModalProps> = ({
    isShown,
    hide,
    modalContent,
    headerText
  }) => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.keyCode === 27 && isShown) {
        hide();
      }
    };
  
    useEffect(() => {
      isShown
        ? (document.body.style.overflow = "hidden")
        : (document.body.style.overflow = "unset");
      document.addEventListener("keydown", onKeyDown, false);
      return () => {
        document.removeEventListener("keydown", onKeyDown, false);
      };
    }, [isShown]);
  
    const modal = (
      <React.Fragment>
        <Backdrop onClick={hide} />
        <FocusLock>
          <Wrapper1
            aria-modal
            aria-labelledby={headerText}
            tabIndex={-1}
            role="dialog"
          >
            <StyledModal>
              <Header>
                <HeaderText>{headerText}</HeaderText>
                <CloseButton onClick={hide}>X</CloseButton>
              </Header>
              <Content>{modalContent}</Content>
            </StyledModal>
          </Wrapper1>
        </FocusLock>
      </React.Fragment>
    );
  
    return isShown ? ReactDOM.createPortal(modal, document.body) : null;
  };
  