const ERROR_CODES = {
    // can be visible in the app
    SIGN_USERNAME_BUSY: 'There are user with this username, please choose another username',
    ALREADY_REGISTERED: 'This user is already registered',
    INFLUENCER_NOT_FOUND:"Blogger not found. Please check the domain name",

    SIGN_EMAIL_BUSY: 'There are user with this email, please choose another email',
    SIGN_USER_NOT_VALIDATED: 'You are not validated user, check your email address',
    SIGN_USER_TO_RECOVERY_NOT_FOUND: 'The user you try to recover not found',
    WRONG_LOGIN: 'Username or password are incorrect',
    WRONG_USER_FIELDS: 'Wrong user fields',
    PASSWORDS_NOT_MATCHING: 'Password does not match the confirm password',
    USER_EMAIL_EXIST: 'There are user with this email, please choose another email',
    USERNAME_EXIST: 'There are another user with this username, please choose another one',

    FRIEND_ALREADY_ADDED: 'User is already your friend',
    FRIEND_REQUEST_NOT_EXIST: "The friend request is not found, maybe it be canceled by it's sender",
    DUPLICATE_FRIEND_INVITE: 'You already sent a friend invitation to this user',

    GROUP_NAME_EXIST: 'There are another group with this name, please choose another one',
    GROUP_TO_JOIN_NOT_FOUND: 'The group you are trying to join is not found',
    GROUP_TO_ABORT_JOIN_NOT_FOUND: 'The group you are trying to abort joining is not found',
    GROUP_TO_ACCEPT_JOIN_NOT_FOUND: 'The group you are adding to is not found',
    GROUP_JOIN_REQUEST_NOT_EXIST: "The group join request is not found, maybe it be canceled by it's owner",

    // general
    FILE_UPLOAD_REJECTED: "File was rejected.Please upload another file, it's size can be less than 10mb",
    PERMISSION_DENIED: "You haven't enough permissions to perform this action",
    DATABASE_ERROR: 'Database error has occured',
    INPUT_SIZE_LIMIT_OVER: 'Max input value length has exceeded',

    // backend responses
    WRONG_EMAIL_CONFIRMATION_CODE: 'WRONG_EMAIL_CONFIRMATION_CODE',
    NO_USER_TO_ACTIVATE: 'NO_USER_TO_ACTIVATE',
    WALL_NOT_EXIST: 'WALL_NOT_EXIST',
    WRONG_GROUP_MEMBER_ROLE_PROVIDED: 'WRONG_GROUP_MEMBER_ROLE_PROVIDED',
    FRIEND_INVITE_NOT_EXIST: 'FRIEND_INVITE_NOT_EXIST',
    USER_NOT_FOUND: 'USER_NOT_FOUND',
    GROUP_NOT_FOUND: 'GROUP_NOT_FOUND',

    // CHAT
    EMPTY_MESSAGE: "You can't send empty messages",
    WRONG_ANSWER:"Wrong answer."
}
import i18n, {initI18n} from '../native/i18n';

export default ({code, descr}, params) => {
    try{
        let transtated_message = i18n.t('errors:'+code);
        if( transtated_message && transtated_message.length && transtated_message!==code ){
            return transtated_message;
        } else if (descr) {
            return descr
        } else {
            return code
        }
    }catch(e){
        console.log("e ",e);
    }
    const text = ERROR_CODES[code];
    if(params && params.printAnyMessage){
        return code;
    }else{
        return text || 'Error: '+code
    }
}
