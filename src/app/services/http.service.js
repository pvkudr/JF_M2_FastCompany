import axios from 'axios';
import { toast } from 'react-toastify';
import config from '../config.json';

// base URl will be used with all axios requests - get, put,..
axios.defaults.baseURL = config.apiEndpoint;

// pattern of using HTTP  Request methods + catch errors

axios.interceptors.response.use(
    (res) => res,
    function (error) {
        const expectedErrors =
            error.response &&
            error.response.status >= 400 &&
            error.response.status < 500;
        if (!expectedErrors) {
            console.log(error);
            toast.info('Error info here');
            toast.error('Unexpected errors we have');
        }
        return Promise.reject(error);
    }
);

const httpService = {
    get: axios.get,
    post: axios.post,
    put: axios.put,
    delete: axios.delete
};

export default httpService;
