import { createSlice } from '@reduxjs/toolkit';
import professionService from '../services/profession.service';

const professionSlice = createSlice({
    name: 'professions',
    initialState: {
        entities: null,
        isProfLoading: true,
        error: null,
        lastFetch: null
    },
    reducers: {
        professionsRequested: (state) => {
            state.isProfLoading = true;
        },
        professionsReceived: (state, action) => {
            state.entities = action.payload;
            state.lastFetch = Date.now();
            state.isProfLoading = false;
            console.log('from_prof', state.entities);
        },
        professionsRequestFailed: (state, action) => {
            state.error = action.payload;
            state.isProfLoading = false;
        }

    }
});

const { actions, reducer: professionsReducer } = professionSlice;
const { professionsRequested, professionsReceived, professionsRequestFailed } = actions;

function isOutDated(date) {
    if ((Date.now() - date) > 10 * 60 * 1000) {
        return true;
    }
    return false;
}

export const getProfessionById = (id) => (state) => {
    if (!state.professionsReducer.isProfLoading) {
        return state.professionsReducer.entities.find((p) => p._id === id); // string
    }
};

export const loadProfessionsList = () => async (dispatch, getState) => {
    const { lastFetch } = getState().professionsReducer;
    if (isOutDated(lastFetch)) {
        dispatch(professionsRequested);
        try {
            const data = await professionService.get();
            dispatch(professionsReceived(data.content));
        } catch (error) {
            dispatch(professionsRequestFailed(error.message));
        }
    }
};
export const getProfessions = () => (state) => state.professionsReducer.entities;
export const getProfessionsLoadingStatus = () => (state) => state.professionsReducer.isProfLoading;

export default professionsReducer;
