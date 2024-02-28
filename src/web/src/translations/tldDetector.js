export default {
    name: 'tldDetector',
  
    lookup(options) {
        console.log("lookup ",options)
        let tld = location.hostname.split('.').pop();
        console.log("tld ",tld);
        if(tld=="com"){
            return 'en';
        }else{
            return 'ru';
        }
    },
  
    cacheUserLanguage(lng, options) {
        console.log("cacheUserLanguage ",lng,options);
        // options -> are passed in options
        // lng -> current language, will be called after init and on changeLanguage
        // store it
    }
  };