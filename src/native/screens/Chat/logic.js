import React, {Component} from "react";
import { getChat, loadMessages, loadNewMessages} from '../../../actions/chat'
import {connect} from 'react-redux'
import {compose} from 'redux'
import isLoading from "../../../hocs/isLoading";
import {withNamespaces} from "react-i18next";

export default (WrappedComponent) => {
    class Logic extends Component {
        state = {
            refreshing: false,
            uploadProgress: 0,
            loadingMore: false
        };

        async componentDidMount() {
            const {navigation, chat, dispatch} = this.props;
            if (navigation.state.params._id !== chat.info._id) {
               await dispatch(getChat(navigation.state.params._id, true));
            }
            this.checkMessagesInterval =  setInterval(()=> {
                dispatch(loadNewMessages({chat: navigation.state.params._id}))
            }, 50000);
        }

        componentWillUnmount() {
            clearTimeout(this.checkMessagesInterval);
        }

        refreshDialogs = () => {
            let {dispatch, navigation} = this.props;
            let self = this;
            // console.log('refreshDialog')
            this.setState({refreshing: true});
            dispatch(getChat(navigation.state.params._id)).then(() => {
                self.setState({refreshing: false});
            });
        };

        onAssetsProgress = ({total, loaded}) => {
            // console.log("UPLOAD PROGRESS!!!!", loaded/total);
            this.setState({uploadProgress : (loaded/total - 0.1) });
        }

        onAssetsEnd = () => {
            this.setState({uploadProgress: 0});
        }

        moreMessages = async () => {
            // const {page} = this.state;
            let {dispatch, navigation, chat: {prevPagesLoaded = 1, messages_prev_count = 0}} = this.props;

            // console.log("LOAD MESSAGES", prevPagesLoaded, messages_prev_count);
            this.setState({loadingMore: true});
            await dispatch(loadMessages({chat: navigation.state.params._id, params: {page: prevPagesLoaded + 1}}))
            this.setState({loadingMore: false});
        }
        render() {
            return <WrappedComponent
                state={this.state}
                moreMessages = {this.moreMessages}
                refreshDialogs={this.refreshDialogs}
                onAssetsProgress={this.onAssetsProgress}
                onAssetsEnd={this.onAssetsEnd}
                {...this.props}
            />
        }
    }

    return compose(
        withNamespaces(['app_chats'], {wait: true}),
        isLoading({
            status_path: ({status}) => ({status: status.chat}),
        }),
        connect(({chat, me}) => ({chat, me}))
    )(Logic)
}
