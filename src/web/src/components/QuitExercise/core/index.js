import React, {Component, Fragment} from "react";
import Logic from "../logic";

import {Modal, Image, Text, Note, Quit, Wrap} from '../styles';
import Button from 'components/Button';

export default Logic(({t, Close})=>{
    return (
        <Modal>
            <Close/>
            <Image/>
            <Text>
                Вы уверены, что хотите выйти?
            </Text>
            <Note>
                Если вы не завершите тренировку, весь прогресс будет потерян
            </Note>
            <Wrap>
                <Quit>Выйти из тренировки</Quit>
                <Button>Вернуться к тренировке</Button>
            </Wrap>
        </Modal>
    )
});
