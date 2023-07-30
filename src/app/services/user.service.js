import httpService from './http.service';

const userEndpoint = 'user/';

const userService = {
    get: async () => {
        const { data } = await httpService.get(userEndpoint);
        // console.log('data from user_service', data);
        return data;
    }
};

export default userService;
