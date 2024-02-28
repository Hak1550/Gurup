import React from 'react';
import styled from "styled-components"
import ReactModal from 'react-modal';

function ReactModalAdapter ({ className, modalClassName, ...props }) {
  return (
    <ReactModal
      className={modalClassName}
      portalClassName={className}
      {...props}
    />
  )
}

export const ModalWrap = styled(ReactModalAdapter).attrs({
    overlayClassName: 'Overlay',
    modalClassName: 'Modal'
})`
    .Modal {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 90%;
        max-width: 467px;
        &:focus {
            outline: none;
        }
    }
    &.chats_pay {
        .Modal {
            max-width: 467px;
        }
    }
    &.quit_exercise {
        .Modal {
            max-width: 506px;
        }
    }
    .Overlay {
        position: fixed;
        top: 0px;
        left: 0px;
        right: 0px;
        bottom: 0px;
        background-color: rgba(0, 0, 0, 0.7);
        z-index: 9999;
    }
`

export const Close = styled.i`
    position: absolute;
    right: 15px;
    top: 15px;
    color: black;
    font-size: 19px;
    cursor: pointer;
`
