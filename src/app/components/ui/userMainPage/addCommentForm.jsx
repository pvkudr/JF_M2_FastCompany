import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { getCurrentUserId, getUserById } from '../../../store/users';

AddCommentForm.propTypes = {
    authorId: PropTypes.string,
    time: PropTypes.string,
    text: PropTypes.string,
    onRemove: PropTypes.func,
    id: PropTypes.string
};

function AddCommentForm({ time, text, onRemove, id, authorId }) {
    const currentUserId = useSelector(getCurrentUserId());
    const user = useSelector(getUserById(authorId));
    console.log('add_comment-=USER', user);

        return (
            <div className="bg-light card-body  mb-3">
                <div className="row">
                    <div className="col">
                        <div className="d-flex flex-start ">
                            <img
                                src={user.image}
                                className="rounded-circle shadow-1-strong me-3"
                                alt="avatar"
                                width="65"
                                height="65"
                            />
                            <div className="flex-grow-1 flex-shrink-1">
                                <div className="mb-4">
                                    <div className="d-flex justify-content-between align-items-center">
                                        <p className="mb-1 ">
                                            {user.name}
                                            <span className="small">
                                            {'-' + time}
                                        </span>
                                        </p>
                                        {currentUserId === authorId && (
                                            <button className="btn btn-sm text-primary d-flex align-items-center">
                                                <i className="bi bi-x-lg" onClick={() => onRemove(id)}></i>
                                            </button>
                                        ) }
                                    </div>
                                    <p className="small mb-0">{text}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
}

export default AddCommentForm;
