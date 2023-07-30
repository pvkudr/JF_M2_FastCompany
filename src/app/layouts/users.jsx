import React from 'react';
import { useParams } from 'react-router-dom';
import UserGeneralPage from '../components/page/usersGeneralPage/';
import UserChangePage from '../components/ui/userChangePage';
import UserMainPage from '../components/page/userPage/userMainPage';
import UserProvider from '../hooks/useUsers';
// import UserProvider from '../hooks/useUsers';

const Users = () => {
    const { userId, edit } = useParams();

    return (
        <>
            <UserProvider>
                {userId
                    ? (edit
                        ? (<UserChangePage userId={userId}/>)
                        : (<UserMainPage userId={userId}/>))
                    : (<UserGeneralPage/>)
                }
            </UserProvider>
        </>
    );
};

export default Users;
