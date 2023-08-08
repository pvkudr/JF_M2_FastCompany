import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { toast } from 'react-toastify';
import userService from '../services/user.service';
import { setTokens } from '../services/localStorage.service';

const httpAuth = axios.create();
const AuthContext = React.createContext();

export const useAuth = () => {
    return useContext(AuthContext);
};

const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState();
    const [error, setError] = useState(null);

    // SIGN IN (already reg)
    async function signIn({ email, password }) {
        const key = process.env.REACT_APP_FIREBASE_KEY;
        const url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${key}`;

        try {
            const { data } = await httpAuth.post(url, { email, password, returnSecureToken: true });
            console.log('dataUseAuth', data.localId);
            setTokens(data);
        } catch (error) {
            errorCatcher(error);
            const { code, message } = error.response.data.error;
            console.log('useAuth_signIn', code, message);
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
             console.log('dataUseAuth', data.localId);
             setTokens(data);
             await createUser({ _id: data.localId, email, ...rest });
         } catch (error) {
             errorCatcher(error);
             const { code, message } = error.response.data.error;
             console.log('useAuth', code, message);
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
            const { content } = userService.create(data);
            setCurrentUser(content);
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
        <AuthContext.Provider value={ { signUp, signIn, currentUser } }>
            {children}
        </AuthContext.Provider>
    );
};

AuthProvider.propTypes = {
    children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node])
};

export default AuthProvider;
