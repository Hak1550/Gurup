import { toast } from 'react-toastify';
import error from "utils/error-web";

export default state => next => action => {
    if (action.type === 'ERROR') {
        toast(error(action.code, action.type), {
            type: 'error',
        })
    }

    if (action.type === 'SUCCESS') {
        toast(error(action.code, action.type), {
            type: 'success',
        })
    }
    next(action);
}
