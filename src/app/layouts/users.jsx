import React from 'react';
import { useParams } from 'react-router-dom';
import UserPage from '../components/userPage';
import AllContent from '../components/allContent';

const Users = () => {
    const params = useParams();
    const { userId } = params;

    return (
        <>
            {userId
                ? <UserPage userId={userId}/>
                : <AllContent/> }
        </>
    );
};

export default Users;
