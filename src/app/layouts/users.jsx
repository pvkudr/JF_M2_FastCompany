import React from 'react';
import { useParams } from 'react-router-dom';
import UserGeneralPage from '../components/page/usersGeneralPage/';
import UserChangePage from '../components/ui/userChangePage';
import UserMainPage from '../components/page/userPage/userMainPage';
import UserProvider from '../hooks/useUsers';
import { useAuth } from '../hooks/useAuth';

const Users = () => {
    const { userId, edit } = useParams();
    const { currentUser } = useAuth();
    // console.log('users_userID', userId);
    // console.log('users_currentUser', currentUser._id);

    return (
        <>
            <UserProvider>
                {userId
                    ? ((edit && currentUser._id === userId)
                        ? (<UserChangePage userId={userId}/>)
                        : (<UserMainPage userId={userId}/>))
                    : (<UserGeneralPage/>)
                }
            </UserProvider>
        </>
    );
};

export default Users;
