import {config} from '../styles/variables'
export default function() {
    // console.log('conif appdomin', config.appDomain);
    if(config.appDomain) {
        return 'custom'
    } else {
        return 'core'
    }
}