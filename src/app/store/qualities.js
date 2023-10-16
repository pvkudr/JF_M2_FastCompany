import { createSlice } from '@reduxjs/toolkit';
import qualityService from '../services/quality.service';

const qualitiesSlice = createSlice({
    name: 'qualities',
    initialState: {
        entities: null,
        isQualLoading: true,
        error: null,
        lastFetch: null
    },
    reducers: {
        qualitiesRequested: (state) => {
            state.isQualLoading = true;
        },
        qualitiesReceived: (state, action) => {
            state.entities = action.payload;
            state.lastFetch = Date.now();
            state.isQualLoading = false;
            console.log('from_qwualities', state.entities);
        },
        qualitiesRequestFailed: (state, action) => {
            state.error = action.payload;
            state.isQualLoading = false;
        }

    }
});

const { actions, reducer: qualitiesReducer } = qualitiesSlice;
const { qualitiesRequested, qualitiesReceived, qualitiesRequestFailed } = actions;

function isOutDated(date) {
    if ((Date.now() - date) > 10 * 60 * 1000) {
        return true;
    }
    return false;
}

export const loadQualitiesList = () => async (dispatch, getState) => {
    const { lastFetch } = getState().qualitiesReducer;
    if (isOutDated(lastFetch)) {
        dispatch(qualitiesRequested);
        try {
            const data = await qualityService.get();
            dispatch(qualitiesReceived(data.content));
        } catch (error) {
            dispatch(qualitiesRequestFailed(error.message));
        }
    }
};
export const getQualities = () => (state) => state.qualitiesReducer.entities;
export const getQualitiesLoadingStatus = () => (state) => state.qualitiesReducer.isQualLoading;

export const getQualityList = (arrayFromUsers) => (state) => {
    if (state.qualitiesReducer.entities) {
        const newArr = [];
        arrayFromUsers.forEach((id) => {
                const searchedQuality = state.qualitiesReducer.entities.find((q) => q._id === id);
                newArr.push(searchedQuality);
            }
        );
        return newArr; // array
    }
};

export default qualitiesReducer;
