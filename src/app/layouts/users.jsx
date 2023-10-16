import React from 'react';
import { useParams } from 'react-router-dom';
import UserGeneralPage from '../components/page/usersGeneralPage/';
import UserChangePage from '../components/ui/userChangePage';
import UserMainPage from '../components/page/userPage/userMainPage';
import { useSelector } from 'react-redux';
import { getCurrentUserId } from '../store/users';
import UsersLoader from '../components/ui/hoc/usersLoader';

const Users = () => {
    const { userId, edit } = useParams();
    // const { currentUser } = useAuth();
    const currentUserId = useSelector(getCurrentUserId());

    // console.log('users_userID', userId);
    // console.log('users_currentUser', currentUser._id);

    return (
        <>
            <UsersLoader>
                {userId
                    ? ((edit && currentUserId === userId)
                        ? (<UserChangePage userId={userId}/>)
                        : (<UserMainPage userId={userId}/>))
                    : (<UserGeneralPage/>)
                }
            </UsersLoader>
        </>
    );
};

export default Users;
