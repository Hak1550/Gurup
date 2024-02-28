import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import Logic from "../logic";

import {ModalWrap, Close} from '../styles';

export default (name) => WrapperComponent => Logic(({modal, toggleModal, ...rest}) => {
	return (
        <ModalWrap className={modal.name} isOpen={modal.name===name} onRequestClose={()=>toggleModal()}>
            <WrapperComponent
                {...rest}
				toggleModal={toggleModal}
                modal={modal}
				Close={()=><Close className="fas fa-times" onClick={()=>toggleModal()}/>}
            />
        </ModalWrap>
	);
})
