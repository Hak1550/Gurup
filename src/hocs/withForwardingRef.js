import React from "react";
const withForwardingRef = WrappedComponent => React.forwardRef((props, ref) => {
    return (<WrappedComponent {...props} forwardedRef={ref} />)
});
export default withForwardingRef;
