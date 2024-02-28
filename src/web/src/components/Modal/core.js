import React, {Component, Fragment} from "react";
import Logic from "./logic";

import { ModalWrap, Modal, Close} from './styles';

export default Logic(({modal, close})=>{
    let name = modal.name || ""
    return (
        <ModalWrap className={name} isOpen={!!name} onRequestClose={close}>
            <Modal className={name}>
                <Close className="fas fa-times" onClick={close}/>
                {/* {name === "signup" ? (
                    <Signup data={modal}/>
                ) : name === "login" ? (
                    <Login data={modal}/>
                ) : null} */}
            </Modal>
        </ModalWrap>
    )
});
