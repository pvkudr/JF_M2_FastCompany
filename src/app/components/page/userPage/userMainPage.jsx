import React, { useEffect, useState } from 'react';
import UserCard from '../../ui/userMainPage/userCard';
import QualitiesCard from '../../ui/userMainPage/qualitiesCard';
import MeetingCard from '../../ui/userMainPage/meetingCard';
import PropTypes from 'prop-types';
import API from '../../../api';
import Comments from '../../ui/userMainPage/comments';

UserMainPage.propTypes = {
    userId: PropTypes.string
};

function UserMainPage({ userId }) {
   const [user, setUser] = useState({});

    useEffect(() => {
        API.users.getById(userId).then((data) => setUser(data));
    }, []);

    if (Object.keys(user).length > 0) {
    return (
        <div className="container">
            <div className="row gutters-sm">
                <div className="col-md-4 mb-3">
                    <UserCard user={user}/>
                    <QualitiesCard qualities={user.qualities}/>
                    <MeetingCard meetings={user.completedMeetings}/>
                </div>
                <div className="col-md-8">
                 <Comments/>
                </div>
            </div>
        </div>

    );
    } else {
        return 'Loading..';
    }
}

export default UserMainPage;
