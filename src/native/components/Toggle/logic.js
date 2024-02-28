import React from 'react'
import { connect } from "react-redux";

export default (WrappedComponent) => {
    class Logic extends React.Component {
        constructor(props){
            super(props);
            if(props.options && props.options.length){
                this.state = {
                    activeSection: props.options[0].value
                }
            }
        }
        _toggleSection = (activeSection) => {
            const { onToggle } = this.props;
            if(onToggle){
                onToggle(activeSection)
            }
            this.setState({ activeSection })
        }

        render() {
            return <WrappedComponent 
                activeSection={this.state.activeSection} 
                toggleSection={this._toggleSection} 
                {...this.props} 
            />
        }
    }
    return connect(null)(Logic)
}