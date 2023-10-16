import { createAction, createSlice } from '@reduxjs/toolkit';
import commentService from '../services/comment.service';
import { nanoid } from 'nanoid';
import { getCurrentUserId } from './users';

const commentsSlice = createSlice({
    name: 'comments',
    initialState: {
        entities: null,
        isCommLoading: true,
        error: null
    },
    reducers: {
        commentsRequested: (state) => {
            state.isCommLoading = true;
        },
        commentsReceived: (state, action) => {
            state.entities = action.payload;
            state.isCommLoading = false;
            console.log('from_comm', state.entities);
        },
        commentsRequestFailed: (state, action) => {
            state.error = action.payload;
            state.isCommLoading = false;
        },
        commentCreated: (state, action) => {
            state.entities.push(action.payload);
        },
        commentRemoved: (state, action) => {
            state.entities = state.entities.filter(c => c._id !== action.payload);
        }
    }
});

const { actions, reducer: commentsReducer } = commentsSlice;
const { commentsRequested, commentsReceived, commentsRequestFailed, commentCreated, commentRemoved } = actions;
const addCommentRequested = createAction('comments/addCommentRequested');
const removeCommentRequested = createAction('comments/removeCommentRequested');

// load comments for user
export const loadCommentsList = (userId) => async (dispatch) => {
    dispatch(commentsRequested);
    try {
        const data = await commentService.get(userId);
            dispatch(commentsReceived(data.content));
        } catch (error) {
            dispatch(commentsRequestFailed(error.message));
        }
};

// create comment
export const createComment = (payload) => async (dispatch, getState) => {
    // const currentUserId = useSelector(getCurrentUserId());

    dispatch(addCommentRequested(payload));
    const comment = {
        ...payload,
        // pageId: userId,
        created_at: Date.now(),
        userId: getCurrentUserId()(getState()),
        _id: nanoid()
    };
    try {
        const { content } = await commentService.create(comment);
        dispatch(commentCreated(content));
    } catch (error) {
        dispatch(commentsRequestFailed(error.message));
    }
};

// remove comment
export const removeCommnent = (commentId) => async (dispatch) => {
    dispatch(removeCommentRequested());
    try {
        const { content } = await commentService.remove(commentId);
        console.log('comments_content_remove', content);
        if (content === null) {
            dispatch(commentRemoved(commentId));
        }
    } catch (error) {
        dispatch(commentsRequestFailed(error.message));
    }
};

export const getComments = () => (state) => state.commentsReducer.entities;
export const getCommentsLoadingStatus = () => (state) => state.commentsReducer.isProfLoading;

export default commentsReducer;
