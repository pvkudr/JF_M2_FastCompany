import React from 'react';
import UserCard from '../../ui/userMainPage/userCard';
import QualitiesCard from '../../ui/userMainPage/qualitiesCard';
import MeetingCard from '../../ui/userMainPage/meetingCard';
import PropTypes from 'prop-types';
import Comments from '../../ui/userMainPage/comments';
import { useUser } from '../../../hooks/useUsers';
import CommentsProvider from '../../../hooks/useComments';

UserMainPage.propTypes = {
    userId: PropTypes.string
};

function UserMainPage({ userId }) {
    const { getUserById } = useUser();
    const user = getUserById(userId);
    console.log('userMainPage', user);

    if (user) {
        return (
            <div className="container">
                <div className="row gutters-sm">
                    <div className="col-md-4 mb-3">
                        <UserCard user={user}/>
                        <QualitiesCard qualities={user.qualities}/>
                        <MeetingCard meetings={user.completedMeetings}/>
                    </div>
                    <div className="col-md-8">
                        <CommentsProvider>
                            <Comments/>
                        </CommentsProvider>
                    </div>
                </div>
            </div>
        );
    } else {
        return <h1>Loading..</h1>;
    }
}

export default UserMainPage;
