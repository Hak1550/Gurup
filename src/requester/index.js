import axios from 'axios';
import { baseURL, options } from './config-production';

export const requestWrap = function (status_branch) {
  return (action) =>
    new Promise(async (resolve) => {
      const { dispatch } = this.props;
      dispatch({
        type: 'SET_STATUS',
        [status_branch]: 'is_loading',
      });
      const data = await dispatch(action);

      dispatch({
        type: 'SET_STATUS',
        [status_branch]: 'is_ready',
      });
      resolve(data);
    });
};

let requester = axios.create({
  withCredentials: true,
  baseURL,
});

requester.interceptors.request.use((request) => {
  console.log('Starting Request', request.baseURL + request.url);
  return request;
});

export default requester;

export const getInfluencerRequester = ({
  subdomain = 'app',
  influencerId,
  env,
}) => {
  let influencerRequesterOptions = {
    headers: {},
  };
  if (options && options.domain) {
    influencerRequesterOptions.baseURL = `${
      options.secure ? 'https' : 'http'
    }://${subdomain}.${options.domain}/api`;
  } else {
    console.log(
      'set subdomain ',
      'https://' + subdomain + (env ? '.' + env : '') + '.gurucan.ru/api'
    );
    influencerRequesterOptions.baseURL =
      'https://' + subdomain + (env ? '.' + env : '') + '.gurucan.ru/api';
  }
  if (influencerId) {
    influencerRequesterOptions.headers['influencer-id'] = influencerId;
  }
  console.log('BASE URL', influencerRequesterOptions);
  return axios.create(influencerRequesterOptions);
};

export const defaultRequester = axios.create({});

export const updateBaseUrl = ({
  subdomain = 'app',
  influencerId,
  env = null,
}) => {
  if (subdomain) {
    // axios.defaults.baseURL = "https://"+subdomain+".gurucan.ru/api/";
    console.log('updateBaseUrl subdomain ', subdomain, '  env=', env);
    if (options && options.domain) {
      console.log('set domain');
      requester.defaults.baseURL = `${
        options.secure ? 'https' : 'http'
      }://${subdomain}.${env ? env + '.' : ''}${options.domain}/api`;
    } else {
      console.log(
        'set subdomain ',
        'https://' + subdomain + (env ? '.' + env : '') + '.gurucan.ru/api'
      );
      requester.defaults.baseURL =
        'https://' + subdomain + (env ? '.' + env : '') + '.gurucan.ru/api';
    }
    if (influencerId) {
      requester.defaults.headers.common['influencer-id'] = influencerId;
    }
    console.log('set requester.defaults.baseURL  ', requester.defaults);
    // requester = axios.create({
    // baseURL:"https://"+subdomain+".gurucan.ru/api/"
    // });
  }
};

export const switchDomain = (domain) => {
  console.log('switchDomain ', domain);
  let currentUrl = 'https://app.gurucan.ru/api';
  console.log('requester.defaults.baseURL ', currentUrl);
  currentUrl = currentUrl.replace('.gurucan', '.' + domain + '.gurucan');
  console.log('requester.defaults.baseURL ', currentUrl);
  requester.defaults.baseURL = currentUrl;
};
export const switchToDev = () => {
  let currentUrl = requester.defaults.baseURL;
  console.log('requester.defaults.baseURL ', currentUrl);
  currentUrl = currentUrl.replace('.staging', '');
  currentUrl = currentUrl.replace('.beta', '');
  currentUrl = currentUrl.replace('.dev', '');

  if (currentUrl.indexOf('.dev.gurucan') === -1) {
    currentUrl = currentUrl.replace('.gurucan', '.dev.gurucan');
  }
  console.log('requester.defaults.baseURL ', currentUrl);
  requester.defaults.baseURL = currentUrl;
};

export const switchToBeta = () => {
  let currentUrl = requester.defaults.baseURL;
  console.log('requester.defaults.baseURL ', currentUrl);
  currentUrl = currentUrl.replace('.staging', '');
  currentUrl = currentUrl.replace('.beta', '');
  currentUrl = currentUrl.replace('.dev', '');

  if (currentUrl.indexOf('.dev.gurucan') === -1) {
    currentUrl = currentUrl.replace('.gurucan', '.beta.gurucan');
  }
  console.log('requester.defaults.baseURL ', currentUrl);
  requester.defaults.baseURL = currentUrl;
};
export const switchToProd = () => {
  let currentUrl = requester.defaults.baseURL;
  console.log('requester.defaults.baseURL ', currentUrl);
  currentUrl = currentUrl.replace('.staging', '');
  currentUrl = currentUrl.replace('.beta', '');
  currentUrl = currentUrl.replace('.dev', '');
  console.log('requester.defaults.baseURL ', currentUrl);
  requester.defaults.baseURL = currentUrl;
};
export const switchToStaging = () => {
  let currentUrl = requester.defaults.baseURL;
  console.log('requester.defaults.baseURL ', currentUrl);
  currentUrl = currentUrl.replace('.staging', '');
  currentUrl = currentUrl.replace('.beta', '');
  currentUrl = currentUrl.replace('.dev', '');

  if (currentUrl.indexOf('.staging.gurucan') === -1) {
    currentUrl = currentUrl.replace('.gurucan', '.staging.gurucan');
  }
  console.log('requester.defaults.baseURL ', currentUrl);
  requester.defaults.baseURL = currentUrl;
};

const argsParser = (args) => {
  if (!args || !args.length) {
    return '';
  }
  return args
    .map((a) => {
      switch (typeof a) {
        case 'number':
        case 'string':
          return a;
        case 'array':
        case 'object':
          try {
            return JSON.stringify(a);
          } catch (e) {
            return '';
          }
      }
    })
    .join('');
};
/*
console.log = function(args){
 	requester.post('/misc/log',{
 		//text:args.map((a)=>{return ""+a}).join('')
		text:argsParser(args)
 	})
};
*/

//Error reporting

const consoleFactory = function (oldCons, tags, params) {
  return {
    ...oldCons,
    log: function (...args) {
      try {
        requester.post('/misc/log', {
          type: 'log',
          text: argsParser(args),
        });
        oldCons.log(...args);
      } catch (e) {
        try {
          oldCons.log('log error ', ...args);
        } catch (e) {}
      }
    },
    error: function (...args) {
      try {
        requester.post('/misc/log', {
          type: 'error',
          text: argsParser(args),
        });
        oldCons.error(...args);
      } catch (e) {
        try {
          oldCons.log('error error ', ...args);
          oldCons.log('stack ', e.stack);
        } catch (e) {}
      }
    },
    warn: function (...args) {
      try {
        requester.post('/misc/log', {
          type: 'warn',
          text: argsParser(args),
        });
        oldCons.warn(...args);
      } catch (e) {
        try {
          oldCons.log('warn error ', ...args);
        } catch (e) {}
      }
    },
  };
};

setTimeout(() => {
  try {
    // console = consoleFactory(console)
  } catch (e) {
    // console.error("e ",e)
  }
}, 1000);

export const request = (promise) =>
  new Promise(async (resolve, reject) => {
    const res = await promise;
    if (!res) return reject({ code: 'INTERNET_ERROR' });
    const { data } = res;
    if (data.status === 200 || data.status === 'ok') {
      resolve(data);
    } else {
      reject(data);
    }
  });
