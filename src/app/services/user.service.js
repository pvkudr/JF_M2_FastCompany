import httpService from './http.service';
import localStorageService from './localStorage.service';

const userEndpoint = 'user/';

const userService = {
    get: async () => {
        const { data } = await httpService.get(userEndpoint);
        // console.log('data from user_service', data);
        return data;
    },
    create: async (payload) => {
        const { data } = await httpService.put(userEndpoint + payload._id, payload);
        return data;
    },
    getCurrentUser: async () => {
        const { data } = await httpService.get(
            userEndpoint + localStorageService.getUserId()
        );
        // console.log('data from user_service', data);
        return data;
    }

};

export default userService;
