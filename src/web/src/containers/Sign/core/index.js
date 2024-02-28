import React, { Component, Fragment } from "react"
import Logic from "../logic"
import {Wrapper, Content} from '../styles'
import Footer from "components/Footer";

export default WrappedComponent => Logic((props) => (
            <Wrapper>
                <Content>
                    <WrappedComponent {...props}/>
                </Content>
                <Footer/>
            </Wrapper>
        )
);
