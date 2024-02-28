import React, { Component } from 'react';
import { connect } from 'react-redux';


export default ({
    status_path,
    loading_branch = 'loading',
}) => WrappedComponent => {
    class IsLoading extends Component {
        render() {
            const { status } = this.props;

            const merge = {
                [loading_branch]: status == null || status === 'initial' || status === 'is_loading',
            };
            return <WrappedComponent {...this.props} {...merge} />
        }
    }

    return connect(status_path)(IsLoading)
}
