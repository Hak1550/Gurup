import EStyleSheet from 'react-native-extended-stylesheet';
import { Screen320 } from "../../../utils";

export default EStyleSheet.create({
    "article__title": {
        fontSize: 16,
        marginBottom: 10,
        paddingHorizontal: 16,
        lineHeight: 24,
        fontFamily: "Main-Regular",
        color: "$textColor",
    },
    "article__update-time":{
        color: "$textColor",
        fontSize: 12,
        marginBottom: 5,
        paddingHorizontal: 16,
    },  
    "article__navigation": {
        flexDirection: "row",
        paddingHorizontal: 16
    },
    "article__navigation_prev": {
        marginRight: "auto"
    },
    "article__navigation_next": {
        // alignSelf: "flex-end",
        marginLeft: "auto"
    }
});
