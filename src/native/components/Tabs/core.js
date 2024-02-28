import React from "react"
import { connect } from "react-redux"
import { BottomTabBar } from 'react-navigation-tabs'
import { View, TouchableWithoutFeedback } from "react-native"
import styles from "./styles"
import { config } from "../../styles/variables"

class TouchableWithoutFeedbackWrapper extends React.Component {
    render() {
        const {
            route,
            focused,
            onPress,
            onLongPress,
            testID,
            accessibilityLabel,
            accessibilityRole,
            accessibilityStates,
            ...rest
        } = this.props;

        return (
            <TouchableWithoutFeedback
                onPress={onPress}
                onLongPress={onLongPress}
                testID={testID}
                hitSlop={{ left: 15, right: 15, top: 0, bottom: 5 }}
                accessibilityLabel={accessibilityLabel}
                accessibilityRole={accessibilityRole}
                accessibilityStates={accessibilityStates}
            >
                <View {...rest} />
            </TouchableWithoutFeedback>
        );
    }
}

const _TabView = ({ influencer, isCustomApp, ...tabProps}) => {
    const tab_module = tabProps?.route?.key.replace("_tab", "");
    let supportedModules = []

    if (isCustomApp){
        supportedModules =[ "offers","courses", "chats", "articles", "marathons", "nutrition"]
    }else{
        supportedModules = ["courses", "chats", "articles", "marathons", "nutrition"]
    }
    const availableModules = []
    if (influencer && influencer.editableModules && influencer.editableModules) {
        supportedModules.forEach(module => {
            if (influencer.editableModules.indexOf(module) !== -1) {
                availableModules.push(module)
            }
        })
    }

    if (availableModules.includes(tab_module)){
        return <TouchableWithoutFeedbackWrapper {...tabProps}/>
    } else {
        return <View style={{ display: "none" }} />
    }
}

const TabView = connect(({ influencer, isCustomApp }) => ({ influencer, isCustomApp }))(_TabView)

const Tabs = ({ influencer, ...rest }) => {
    return <BottomTabBar 
        {...rest}
        style={styles["bottom-navigation-rectangle"]}
        tabStyle={styles["bottom-navigation__tab"]}
        labelStyle={styles["bottom-navigation__tab-text"]}
        getButtonComponent={({ route }) => TabView}
        keyboardHidesTabBar={false}
    />
}

export default connect(({ influencer }) => ({ influencer }))(Tabs)