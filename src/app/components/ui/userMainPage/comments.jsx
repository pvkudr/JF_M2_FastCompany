import React, { useEffect } from 'react';

import CommentNew from './commentNew';
import CommentList from './commentList';
import { orderBy } from 'lodash';
import { useDispatch, useSelector } from 'react-redux';
import {
    createComment,
    getComments,
    getCommentsLoadingStatus,
    loadCommentsList,
    removeCommnent
} from '../../../store/comments';
import { useParams } from 'react-router-dom';

function Comments() {
    const { userId } = useParams();

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(loadCommentsList(userId));
    }, [userId]);
    const isCommLoading = useSelector(getCommentsLoadingStatus());
    const comments = useSelector(getComments());

    const handleSubmit = (data) => {
        dispatch(createComment({ ...data, pageId: userId }));
    };

    const handleRemoveComment = (id) => {
        dispatch(removeCommnent(id));
    };

    const sortedComments = orderBy(comments, ['created_at'], ['desc']);

    return (
        <>
            <div className="card mb-2">
                <div className="card-body ">
                    <h2>New comment</h2>
                    <CommentNew
                        onSubmit = {handleSubmit}
                    />
                </div>
            </div>
            <div className="card mb-3">
                <div className="card-body ">
                    <h2>Comments</h2>
                    <hr/>
                    {!isCommLoading
                        ? <CommentList
                            comments={sortedComments}
                            onRemove = {handleRemoveComment}
                        />
                        : 'Loading'
                    }

                </div>
            </div>
        </>
    );
}

export default Comments;
