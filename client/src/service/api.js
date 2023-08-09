import axios from 'axios';

import { API_NOTIFICATION_MESSAGES, SERVICE_URLS } from '../constants/config.js';
import { getAccessToken, getType } from '../utils/common-utils.js';

const API_URL = "http://localhost:8000";

const axiosInstance = axios.create({
    baseURL: API_URL, 
    timeout: 10000, // If API response gets delayed
    headers: {
        // "Accept": "application/json, multipart/form-data",
  "Content-Type": "application/json" // Update the header key to "Content-Type"
    }
});

// Interceptor for request
axiosInstance.interceptors.request.use(
    function (config){
        // console.log(config);
        if(config.TYPE.params){
            config.params = config.TYPE.params;
        }else if(config.TYPE.query){
            // console.log(config.TYPE.query);
            
            // config.url = config.url+'/'+config.TYPE.query;
            config.url = config.url;
            // console.log(config.url);
        }
        return config;
    },
    function(error){
        return Promise.reject(error);
    }
);

// Interceptor for response
// axiosInstance.interceptors.response.use(
//     function(response){
//         // Stop global loader here
//         return processResponse(response);
//     },
//     function(error){
//         // Stop global loader here
//         return Promise.reject(processError(error));
//     }
// );
axiosInstance.interceptors.response.use(
    function(response){
        // Stop global loader here
        return processResponse(response);
    },
    function(error){
        // Stop global loader here
        if (error.response && error.response.status === 500) {
            // Handle 500 Internal Server Error
            return Promise.reject({
                isError: true,
                msg: 'Internal Server Error',
                code: 500
            });
        } else {
            return Promise.reject(processError(error));
        }
    }
);

///////////////////
// If success -> return {isSuccess: true, data: Object}
// If fail -> return {isFailure: true, status: String, msg: string, code: int}
///////////////////
const processResponse = (response) => {
    if(response?.status === 200){
        return {isSuccess: true, data: response.data};
    } else {
        return {isFailure: true, status: response?.status, msg: response?.msg, code: response?.code};
    }
};

const processError = (error) => {
    if(error.response){
        // Request made and server responded with a status other than required 2.x.x
        console.log('ERROR IN RESPONSE: ', error.toJSON());
        return {
            isError: true,
            msg: API_NOTIFICATION_MESSAGES.responseFailure,
            code: error.response.status
        };
    } else if(error.request){
        // Request made but no response was received
        console.log('ERROR IN REQUEST: ', error.toJSON());
        return {
            isError: true,
            msg: API_NOTIFICATION_MESSAGES.requestFailure,
            code: ""
        };
    } else {
        // Something happened in setting up the request that triggered an error
        console.log('ERROR IN NETWORK: ', error.toJSON());
        return {
            isError: true,
            msg: API_NOTIFICATION_MESSAGES.networkError,
            code: ""
        };
    }
}

const API = {};

for (const [key, value] of Object.entries(SERVICE_URLS)) {
    // console.log(key, value);
    API[key] = (body, showUploadProgress, showDownloadProgress) => {
        // console.log(body);
        return axiosInstance({  // Add 'return' here
            method: value.method,
            url: value.url,
            data: body,
            responseType: value.responseType,
            headers:{
                authorization:getAccessToken()
            },
            TYPE: getType(value, body),
            onUploadProgress: function (progressEvent) {
                if (showUploadProgress) {
                    let percentageCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                    showUploadProgress(percentageCompleted);
                }
            },
            onDownloadProgress: function (progressEvent) {
                if (showDownloadProgress) {
                    let percentageCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                    showDownloadProgress(percentageCompleted);
                }
            },
        });
    };
}




export { API };
