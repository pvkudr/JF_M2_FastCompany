import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import userService from '../services/user.service';
import { toast } from 'react-toastify';
import { useAuth } from './useAuth';

const UserContext = React.createContext();

export const useUser = () => {
    return useContext(UserContext);
};

 const UserProvider = ({ children }) => {
    const [users, setUsers] = useState([]);
    const [isLoading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // update users in case current user was changed in userChangePage
    const { currentUser } = useAuth();
    useEffect(() => {
        if (!isLoading) {
            const newUsers = [...users];
            const indexUser = users.findIndex(u => u._id === currentUser._id);
            newUsers[indexUser] = currentUser;
            setUsers(newUsers);
        }
    }, [currentUser]);
    // end

    useEffect(() => {
        getUsers();
    }, []);

    useEffect(() => {
        if (error !== null) {
            toast(error);
            setError(null);
        }
    }, [error]);

    async function getUsers() {
        try {
            const { content } = await userService.get();
            setUsers(content);
            setLoading(false);
        } catch (error) {
            errorCatcher(error);
        }
    }
     function getUserById(userId) {
        return users.find((user) => user._id === userId);
     }

    function errorCatcher(error) {
        const { message } = error.response.data;
        setError(message);
    }

    return (
        <UserContext.Provider value={{ users, getUserById }}>
             {!isLoading ? children : 'Loading'}
        </UserContext.Provider>
    );
};
UserProvider.propTypes = {
    children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node])
};

export default UserProvider;
