import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import API from '../../../api';

AddCommentForm.propTypes = {
    authorId: PropTypes.string,
    time: PropTypes.string,
    text: PropTypes.string,
    onRemove: PropTypes.func,
    id: PropTypes.string
};

function AddCommentForm({ authorId, time, text, onRemove, id }) {
    const [isLoading, setIsLoading] = useState(true);
    const [userToShow, setUserToShow] = useState();

    useEffect(() => {
        setIsLoading(true);
        API.users
            .getById(authorId)
            .then((data) => {
                setUserToShow(data);
                setIsLoading(false);
                }
            );
    }, []);

    if (!isLoading) {
        return (
            <div className="bg-light card-body  mb-3">
                <div className="row">
                    <div className="col">
                        <div className="d-flex flex-start ">
                            <img
                                src={`https://avatars.dicebear.com/api/avataaars/${(
                                    Math.random() + 1
                                )
                                    .toString(36)
                                    .substring(7)}.svg`}
                                className="rounded-circle shadow-1-strong me-3"
                                alt="avatar"
                                width="65"
                                height="65"
                            />
                            <div className="flex-grow-1 flex-shrink-1">
                                <div className="mb-4">
                                    <div className="d-flex justify-content-between align-items-center">
                                        <p className="mb-1 ">
                                            {userToShow.name}
                                            <span className="small">
                                            {'-' + time}
                                        </span>
                                        </p>
                                        <button className="btn btn-sm text-primary d-flex align-items-center">
                                            <i className="bi bi-x-lg" onClick={() => onRemove(id)}></i>
                                        </button>
                                    </div>
                                    <p className="small mb-0">{text}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    } else {
        return 'Loading...';
    }
}

export default AddCommentForm;
