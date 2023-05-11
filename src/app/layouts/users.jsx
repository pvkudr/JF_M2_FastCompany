import React from 'react';
import { useParams } from 'react-router-dom';
import UserPage from '../components/page/userPage';
import UserGeneralPage from '../components/page/userGeneralPage/';
import UserChangePage from '../components/ui/userChangePage';

const Users = () => {
    const { userId, edit } = useParams();

    return (
        <>
            {userId
                ? edit
                    ? <UserChangePage userId={userId}/>
                    : <UserPage userId={userId}/>
                : <UserGeneralPage/> }
        </>
    );
};

export default Users;
