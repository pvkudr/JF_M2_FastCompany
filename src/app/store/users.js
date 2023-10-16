import { createAction, createSlice } from '@reduxjs/toolkit';
import userService from '../services/user.service';
import authService from '../services/auth.service';
import localStorageService, { setTokens } from '../services/localStorage.service';
import history from '../utils/history';
import { generateAuthError } from '../utils/generateAuthError';

const initialState = localStorageService.getAccessToken()
? {
        entities: null,
        isLoading: true,
        error: null,
        auth: { userId: localStorageService.getUserId() },
        isLoggedIn: true,
        dataLoaded: false
    }
: {
        entities: null,
        isLoading: false,
        error: null,
        auth: null,
        isLoggedIn: false,
        dataLoaded: false

};

const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        usersRequested: (state) => {
            state.isLoading = true;
        },
        usersReceived: (state, action) => {
            state.entities = action.payload;
            state.isLoading = false;
            state.dataLoaded = true;
            console.log('from_users', state.entities);
        },
        usersRequestFailed: (state, action) => {
            state.error = action.payload;
            state.isLoading = false;
        },
        authRequestSuccess: (state, action) => {
            state.auth = action.payload;
            state.isLoggedIn = true;
        },
        authRequestFailed: (state, action) => {
            state.error = action.payload;
            // state.isLoggedIn = true;
        },
        userCreated: (state, action) => {
            if (!Array.isArray(state.entities)) {
                state.entities = [];
            }
            state.entities.push(action.payload);
        },
        userLoggedOut: (state) => {
            state.entities = null;
            state.isLoggedIn = false;
            state.auth = null;
            state.dataLoaded = false;
        },
        userUpdateSuccess: (state, action) => {
            state.entities[state.entities.findIndex(u =>
                u._id === action.payload._id)] = action.payload;
        },
        authRequested: (state) => {
            state.error = null;
        }
        }
});

const { actions, reducer: usersReducer } = usersSlice;

// actions
const {
    usersRequested,
    usersReceived,
    usersRequestFailed,
    authRequestSuccess,
    authRequestFailed,
    userCreated,
    userLoggedOut,
    userUpdateSuccess
} = actions;
const authRequested = createAction('users/authRequested');
const userCreateRequested = createAction('users/userCreateRequested');
const userCreateFailed = createAction('users/userCreateFailed');
const userUpdateRequested = createAction('users/userUpdateRequested');
const userUpdateFailed = createAction('users/userUpdateFailed');

// useUsers
export const loadUsersList = () => async (dispatch) => {
        dispatch(usersRequested);
        try {
            const data = await userService.get();
            dispatch(usersReceived(data.content));
        } catch (error) {
            dispatch(usersRequestFailed(error.message));
        }
};

export const getUserById = (id) => (state) => {
    if (state.usersReducer.entities) {
        return state.usersReducer.entities.find((user) => user._id === id); // string
    }
};

// ************************* useAuth

// LOGIN

export const login = ({ payload, redirect }) => async (dispatch) => {
    const { email, password } = payload;
    dispatch(authRequested());
    try {
        const data = await authService.login({ email, password });
        dispatch(authRequestSuccess({ userId: data.localId }));
        setTokens(data);

        history.push(redirect);
    } catch (error) {
        const { code, message } = error.response.data.error;
        if (code === 400) {
            const errorMessage = generateAuthError(message);
            dispatch(authRequestFailed(errorMessage));
        } else {
            dispatch(authRequestFailed(error.message));
        }
    }
};

// SIGNUP
export const signUp = ({ email, password, ...rest }) => async (dispatch) => {
    dispatch(authRequested());
    try {
        const data = await authService.register({ email, password });
        setTokens(data);
        dispatch(authRequestSuccess({ userId: data.localId }));
        dispatch(createUser({
            _id: data.localId,
            email,
            rate: 0,
            completedMeetings: 0,
            image: `https://avatars.dicebear.com/api/avataaars/${(
                Math.random() + 1
            )
                .toString(36)
                .substring(7)}.svg`,
            ...rest
        }));
    } catch (error) {
        dispatch(authRequestFailed(error.message));
    }
};
// CREATE USER
function createUser(payload) {
   return async function (dispatch) {
        dispatch(userCreateRequested());
        try {
            const { content } = await userService.create(payload);
            dispatch(userCreated(content));
            history.push('/users');
        } catch (error) {
            dispatch(userCreateFailed(error.message));
        }
    };
}

// LOG OUT
export const logOut = () => (dispatch) => {
    localStorageService.removeAuthData();
    dispatch(userLoggedOut());
};

// UPDATE USER
export const updateUser = (payload) => async (dispatch) => {
    dispatch(userUpdateRequested());
    try {
        const { content } = await userService.update(payload);
        dispatch(userUpdateSuccess(content));
        history.push(`/users/${content._id}`);
    } catch (error) {
        dispatch(userUpdateFailed(error.message));
    }
};

// selectors

export const getCurrentUsertData = () => (state) => {
    if (!state.usersReducer.entities) {
        return null;
    }
    return state.usersReducer.entities.find(u => u._id === state.usersReducer.auth.userId);
};

export const getUsers = () => (state) => state.usersReducer.entities;
export const getIsLoggedIn = () => state => state.usersReducer.isLoggedIn;
export const getDataStatus = () => state => state.usersReducer.dataLoaded;
export const getCurrentUserId = () => state => state.usersReducer.auth.userId;
export const getUsersLoadingStatus = () => state => state.usersReducer.isLoading;
export const getAuthErrors = () => state => state.usersReducer.error;

export default usersReducer;
