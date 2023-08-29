import { createSlice } from '@reduxjs/toolkit';
import qualityService from '../services/quality.service';

const qualitiesSlice = createSlice({
    name: 'qualities',
    initialState: {
        entities: null,
        isQualLoading: true,
        error: null
    },
    reducers: {
        qualitiesRequested: (state) => {
            state.isQualLoading = true;
        },
        qualitiesReceived: (state, action) => {
            state.entities = action.payload;
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

export const loadQualitiesList = () => async (dispatch) => {
    dispatch(qualitiesRequested);
    try {
        const data = await qualityService.get();
        dispatch(qualitiesReceived(data.content));
    } catch (error) {
        dispatch(qualitiesRequestFailed(error.message));
    }
};
export const getQualities = () => (state) => state.qualities;
export const getQualitiesLoadingStatus = () => (state) => state.qualities;

export default qualitiesReducer;
