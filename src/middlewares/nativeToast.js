import Toast from 'react-native-root-toast';
import error from '../utils/error';

const showToast = (text) => Toast.show(text, {
    duration: Toast.durations.LONG,
    position: Toast.positions.BOTTOM,
    shadow: true,
    animation: true,
    hideOnPress: true,
    delay: 0
});

export default state => next => action => {
    // console.log("error middleware ",action);
    if (action.type === 'ERROR') {
        showToast(error(action));

        // if(action.descr){
        //     showToast(action.descr)
        // }else{
        //     showToast(error(action.code));
        // }
    }

    if (action.type === 'ALERT') {
        showToast(action.text);
    }

    if (action.type === 'NEW_MESSAGE') {

    }

    next(action);
}
