import axios from 'axios';
import { toast } from 'react-toastify';
import configFile from '../config.json';
import localStorageService from './localStorage.service';
import authService from './auth.service';

// create axios instance
// base URl will be used with all axios requests - get, put,..

const http = axios.create({
    baseURL: configFile.apiEndpoint
});

// base URl will be used with all axios requests - get, put,..
// axios.defaults.baseURL = configFile.apiEndpoint;

http.interceptors.request.use(
    async function (config) { // config = url
        if (configFile.isFireBase) {
            const containSlash = /\/$/gi.test(config.url);
            config.url = (containSlash ? config.url.slice(0, -1) : config.url) + '.json';

            // check token refresh date & update
            const expiresDate = localStorageService.getTokenExpiresDate();
            const refreshToken = localStorageService.getRefreshToken();
            if (refreshToken && expiresDate < Date.now()) {
                const { data } = await authService.refresh();
                localStorageService.setTokens({
                    refreshToken: data.refresh_token,
                    idToken: data.id_token,
                    localId: data.user_id,
                    expiresIn: data.expires_in
                });
            }
            // CHECK IF USER IS REGISTERED
            const accessToken = localStorageService.getAccessToken();
            if (accessToken) {
                config.params = { ...config.params, auth: accessToken };
            }
        }
        return config;
    }, function (error) {
        return Promise.reject(error);
    }
);

// pattern of using HTTP  Request methods + catch errors

function transformData(data) {
    return data && !data._id
        ? Object.keys(data).map(key => ({ ...data[key] }))
        : data;
}

http.interceptors.response.use(
    (res) => {
        // console.log('httpservice_res1', res);
        if (configFile.isFireBase) {
            res.data = { content: transformData(res.data) };
            // console.log('httpservice_res2', res.data);
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
    delete: http.delete,
    patch: http.patch
};

export default httpService;
