import React from 'react';
import { Link } from 'react-router-dom';
import Qualities from './qualities';
import PropTypes from 'prop-types';

const UserPage = ({ user }) => {
    console.log('user from user', user);
    return (
        <div>
            {user && user.name
                ? (
                    <div className="card w-50">
                        <ul className="list-group list-group-flush">
                            <li className="list-group-item "><h3>{user.name} </h3> </li>
                            <li className="list-group-item">Профессия: {user.profession.name}</li>
                            <li className="list-group-item">Качества:
                                <Qualities
                                    qualities={user.qualities}
                                /></li>
                            <li className="list-group-item">Встреч: {user.completedMeetings}</li>
                            <li className="list-group-item">Рейтинг {user.rate}</li>
                            <li className="list-group-item">В избранных: {user.bookmark.toString()}</li>
                        </ul>
                        <button
                            type="button"
                            className="btn btn-light"
                        >
                            <Link className="nav-link" to="/users">Все пользователи</Link>
                        </button>
                    </div>
            )
: (
                <div>Loading...</div>
            )}
        </div>
    );
};
UserPage.propTypes = {
    user: PropTypes.object.isRequired
};

export default UserPage;
