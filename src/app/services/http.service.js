import axios from 'axios';
import { toast } from 'react-toastify';
import configFile from '../config.json';

// create axios instance
// base URl will be used with all axios requests - get, put,..

const http = axios.create({
    baseURL: configFile.apiEndpoint
});

// base URl will be used with all axios requests - get, put,..
// axios.defaults.baseURL = configFile.apiEndpoint;

http.interceptors.request.use(
    function (config) {
        if (configFile.isFireBase) {
            const containSlash = /\/$/gi.test(config.url);
            config.url = (containSlash ? config.url.slice(0, -1) : config.url) + '.json';
        }
        return config;
    }, function (error) {
        return Promise.reject(error);
    }
);

// pattern of using HTTP  Request methods + catch errors

function transformData(data) {
    return data
        ? Object.keys(data).map(key => ({ ...data[key] }))
        : [];
}

http.interceptors.response.use(
    (res) => {
        console.log('httpservice_res1', res);
        if (configFile.isFireBase) {
            res.data = { content: transformData(res.data) };
            console.log('httpservice_res2', res.data);
        }
        return res;
    },
    function (error) {
        const expectedErrors =
            error.response &&
            error.response.status >= 400 &&
            error.response.status < 500;
        if (!expectedErrors) {
            toast.info('Error info here');
            toast.error('Unexpected errors we have');
        }
        return Promise.reject(error);
    }
);

const httpService = {
    get: http.get,
    post: http.post,
    put: http.put,
    delete: http.delete
};

export default httpService;
