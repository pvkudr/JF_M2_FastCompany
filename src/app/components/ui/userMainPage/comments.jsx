import React from 'react';

import CommentNew from './commentNew';
import CommentList from './commentList';
import { orderBy } from 'lodash';
import { useComments } from '../../../hooks/useComments';

function Comments() {
    const { comments, createComment } = useComments();

    // useEffect(() => {
    //     api.comments
    //         .fetchCommentsForUser(userId)
    //         .then((data) => setComments(data));
    // }, []);

    const handleSubmit = (data) => {
        createComment(data);
        // api.comments
        //     .add({ ...data, pageId: userId })
        //     .then((data) => { setComments([...comments, data]); });
    };

    const handleRemoveComment = (id) => {
        // api.comments
        //     .remove(id)
        //     .then((id) => setComments(comments.filter((x) => x._id !== id)));
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
                    <CommentList
                        comments={sortedComments}
                        onRemove = {handleRemoveComment}
                    />
                </div>
            </div>
        </>
    );
}

export default Comments;
