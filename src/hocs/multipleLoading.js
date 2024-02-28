import React, { Component } from "react";
import { connect } from "react-redux";
import {compose} from "redux";
import withForwardingRef from "hocs/withForwardingRef";
export default ({
  loading_branch = "loading",
  branches = []
}) => WrappedComponent => {
  class MultiLoading extends Component {
    render() {
      const { status } = this.props;
      let multipleLoad = {};
      for(let stat in status) {
        multipleLoad[stat] = status[stat] == null || status[stat] === "initial" || status[stat] === "is_loading";
      }

      const merge = {
        [loading_branch]: multipleLoad
      };

      return <WrappedComponent {...this.props} {...merge}  />;
    }
  }

  return compose(
      withForwardingRef,
      connect(({status}) => {
        let passedBranches = {};
        for(let stat in status) {
          if(branches.includes(stat)){
            passedBranches[stat] = status[stat];
          }
        }
        return({status:passedBranches})
      }),
  )(MultiLoading);
};
