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
    },
    update: async (payload) => {
        const { data } = await httpService.patch(userEndpoint + localStorageService.getUserId(), payload);
        return data;
    },

    // todo :need?
    getUserById: async (userId) => {
        const { data } = await httpService.get(
            userEndpoint + userId
        );
        // console.log('data from user_service', data);
        return data;
    }

};

export default userService;
