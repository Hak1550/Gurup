import React, {Component, Fragment} from "react";
import Logic from "./logic";

import {Modal, Image, Text, PriceText, Price, Time, Button} from './styles';

export default Logic(({t, Close, toggleModal})=>{
    return (
        <Modal>
            <Close/>
            <Image/>
            <Text>
                {t("subscribe_required")}
            </Text>
            <Button to="/settings/plan" onClick={()=>toggleModal()}>{t("subscribe")}</Button>
        </Modal>
    )
});
