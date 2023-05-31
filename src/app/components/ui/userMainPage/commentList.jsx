import React from 'react';
import PropTypes from 'prop-types';
import AddCommentForm from './addCommentForm';
import { displayDate } from '../../../utils/displayDate';

CommentList.propTypes = {
    comments: PropTypes.array,
    onRemove: PropTypes.func
};

function CommentList({ onRemove, comments }) {
    return (<>
                {comments.map((comment, index) => (
                    <AddCommentForm
                        key = {comment.created_at + index}
                        authorId={comment.userId}
                        time = {displayDate(comment.created_at)}
                        text = {comment.content}
                        onRemove = {onRemove}
                        id = {comment._id}
                    />
                ))}
            </>
    );
}

export default CommentList;
