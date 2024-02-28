import React from "react";
import {LayoutAnimation} from "react-native";
import {withNamespaces} from 'react-i18next'

export default (WrappedComponent) => {
    class Logic extends React.Component {
        constructor(props) {
            super(props);
            this.state = {
                files: props.files
            }
        }

        componentWillReceiveProps(nextProps) {
            if (this.state.files.length !== nextProps.files.length) {
                LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
                this.setState({ files: nextProps.files });
            }
        }
        onFilePick = (...args) => {
            const {onFilePick} = this.props;
            this.setState({
                loading: false
            })
            if (onFilePick){
                onFilePick(args)
            }
        }
        progressFile = (file) => {
            this.setState({
                loading: true
            })
        }
        render() {
            const { files = [] } = this.state;
            let imageFormats = ['png', 'jpg', 'jpeg', 'bmp', 'gif', 'webp'];
            return <WrappedComponent
                state={this.state}
                files={files}
                progressFile={this.progressFile}
                imageFormats={imageFormats}
                {...this.props}/>
        }
    }

    return  withNamespaces('app_basic', {wait: true})(Logic)
}


