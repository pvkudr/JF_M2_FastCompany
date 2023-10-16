import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getProfessionById, getProfessionsLoadingStatus } from '../../../store/professions';
import { getCurrentUserId } from '../../../store/users';

UserCard.propTypes = {
user: PropTypes.object
};

function UserCard({ user }) {
    const currentUserId = useSelector(getCurrentUserId());
    const isProfLoading = useSelector(getProfessionsLoadingStatus());

    // console.log('user_card', [currentUser, isProfLoading, getProfessionById(currentUser.profession)]);

    if (!isProfLoading) {
        return (
            <div className="card mb-3">
                <div className="card-body">
                    {currentUserId === user._id &&
                        (<button className="position-absolute top-0 end-0 btn btn-light btn-sm">
                            <Link to={'/users/' + user._id + '/edit'}>
                                <i className="bi bi-gear"></i>
                            </Link>
                        </button>)
                    }

                    <div className="d-flex flex-column align-items-center text-center position-relative">
                        <img
                            src={user.image}
                            className="rounded-circle shadow-1-strong me-3"
                            alt="avatar"
                            width="65"
                            height="65"
                        />
                        <div className="mt-3">
                            <h4>{user.name}</h4>
                              <p className="text-secondary mb-1">{useSelector(getProfessionById(user.profession)).name}</p>
                            <div className="text-muted">
                                <i className="bi bi-caret-down-fill text-primary" role="button"></i>
                                <i className="bi bi-caret-up text-secondary" role="button"></i>
                                <span className="ms-2">{user.rate}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>);
    } else {
        return 'Loading';
}
}

export default UserCard;
