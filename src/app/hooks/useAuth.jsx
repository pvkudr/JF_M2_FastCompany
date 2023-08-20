import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { toast } from 'react-toastify';
import userService from '../services/user.service';
import localStorageService, { setTokens } from '../services/localStorage.service';
import { useHistory } from 'react-router-dom/cjs/react-router-dom';

export const httpAuth = axios.create();
const AuthContext = React.createContext();

export const useAuth = () => {
    return useContext(AuthContext);
};

const AuthProvider = ({ children }) => {
    const history = useHistory();
    const [currentUser, setCurrentUser] = useState();
    const [error, setError] = useState(null);
    const [isLoading, setLoading] = useState(true);

    // GET CURRENT USER
    async function getUserData() {
        try {
            const { content } = await userService.getCurrentUser();
            // console.log('useAuth_getUserData', content);
            setCurrentUser(content);
        } catch (error) {
            errorCatcher();
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        if (localStorageService.getAccessToken()) {
            getUserData();
        } else {
            setLoading(false);
        }
    }, []);

    // SIGN IN (already reg)
    async function signIn({ email, password }) {
        const key = process.env.REACT_APP_FIREBASE_KEY;
        const url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${key}`;

        try {
            const { data } = await httpAuth.post(url, { email, password, returnSecureToken: true });
            console.log('dataUseAuth', data);
            setTokens(data);
            await getUserData();
        } catch (error) {
            errorCatcher(error);
            const { code, message } = error.response.data.error;
            // console.log('useAuth_signIn', code, message);
            if (code === 400) {
                if (message === 'EMAIL_NOT_FOUND') {
                    const errorObject = {
                        email: 'User is not exist. Please go to sign up section.'
                    };
                    throw errorObject;
                }
                if (message === 'INVALID_PASSWORD') {
                    const errorObject = {
                        password: 'Invalid password'
                    };
                    throw errorObject;
                }
                if (message === 'INVALID_EMAIL') {
                    const errorObject = {
                        email: 'Invalid email'
                    };
                    throw errorObject;
                }
            }
        }
    };
// SIGN UP (1st reg)
     async function signUp({ email, password, ...rest }) {
         const key = process.env.REACT_APP_FIREBASE_KEY;
         const url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${key}`;

         try {
             const { data } = await httpAuth.post(url, { email, password, returnSecureToken: true });
             // console.log('dataUseAuth', data.localId);
             setTokens(data);
             await createUser({
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
});
         } catch (error) {
             errorCatcher(error);
             const { code, message } = error.response.data.error;
             // console.log('useAuth', code, message);
             if (code === 400) {
                 if (message === 'EMAIL_EXISTS') {
                     const errorObject = {
                         email: 'User with this email already exists'
                     };
                     throw errorObject;
                 }
             }
         }
    };
    async function createUser(data) {
        try {
            const { content } = await userService.create(data);
            setCurrentUser(content);
            console.log('useAuth_createdUser', content);
        } catch (error) {
            errorCatcher(error);
            console.log('error', error);
        }
    };

     // SIGN OUT
     function logOut() {
        localStorageService.removeAuthData();
        setCurrentUser(null);
        history.push('/');
     }

     // UPDATE USER
    async function updateUserData(data) {
        try {
            const { content } = await userService.update(data);
            setCurrentUser(content);
            console.log('useAuth_updatedUser', content);
        } catch (error) {
            errorCatcher(error);
            console.log('error', error);
        }
    };

    function errorCatcher(error) {
        const { message } = error.response.data;
        setError(message);
    }
    useEffect(() => {
        if (error !== null) {
            toast(error);
            setError(null);
        }
    }, [error]);

    return (
        <AuthContext.Provider value={ { signUp, signIn, logOut, currentUser, updateUserData } }>
            {!isLoading ? children : 'Loading'}
        </AuthContext.Provider>
    );
};

AuthProvider.propTypes = {
    children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node])
};

export default AuthProvider;
