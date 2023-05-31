import React from 'react';
import { useParams } from 'react-router-dom';
import UserGeneralPage from '../components/page/usersGeneralPage/';
import UserChangePage from '../components/ui/userChangePage';
import UserMainPage from '../components/page/userPage/userMainPage';

const Users = () => {
    const { userId, edit } = useParams();

    return (
        <>
            {userId
                ? edit
                    ? <UserChangePage userId={userId}/>
                    : <UserMainPage userId={userId}/>
                : <UserGeneralPage/> }
        </>
    );
};

export default Users;
