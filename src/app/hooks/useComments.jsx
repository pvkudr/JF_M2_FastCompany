import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import { useParams } from 'react-router-dom';
import { useAuth } from './useAuth';
import { nanoid } from 'nanoid';
import commentService from '../services/comment.service';

const CommentsContext = React.createContext();

export const useComments = () => {
    return useContext(CommentsContext);
};

const CommentsProvider = ({ children }) => {
    const { userId } = useParams();
    const { currentUser } = useAuth();

    const [comments, setComments] = useState([]);
    const [isCommLoading, setIsCommLoading] = useState(true);
    const [error, setError] = useState(null);

    async function createComment(data) {
        const comment = {
            ...data,
            pageId: userId,
            created_at: Date.now(),
            userId: currentUser._id,
            _id: nanoid()
        };
        console.log('useComments', comment);

        try {
            const { content } = await commentService.create(comment);
            console.log('useComments_content', content);
        } catch (error) {
            errorCatcher(error);
        }
    }
    async function getComments() {
        try {
            const { content } = await commentService.get(userId);
            setComments(content);
            console.log('useComments_content', content);
        } catch (error) {
            errorCatcher(error);
        } finally {
            setIsCommLoading(false);
        }
    }

    useEffect(() => {
        getComments();
    }, []);

    function errorCatcher(error) {
        const { message } = error.response.data;
        setError(message);
    }
    useEffect(() => {
        if (error !== null) {
            toast(error);
            setError(null);
        }
    }, [error]);

    return (
        <CommentsContext.Provider
            value={{ comments, isCommLoading, createComment }}
        >
            {children}
        </CommentsContext.Provider>
    );
};
CommentsProvider.propTypes = {
    children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node])
};

export default CommentsProvider;
