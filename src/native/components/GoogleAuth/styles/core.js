import EStyleSheet from 'react-native-extended-stylesheet';

export default EStyleSheet.create({
    'google-button': {
        borderRadius: 5,
        backgroundColor: "#2c98F0",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row",
        height: 50,
        // width: 280
    },
    'google-button__text': {
        color: "#fff",
        fontSize: 16
    },
    'google-button__icon': {
        color: "#fff",
        fontSize: 16,
        marginRight: 10
    }
});
