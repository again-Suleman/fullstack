import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../../config/axiosConfig';



// Fetching from Store
export const fetchStores = createAsyncThunk('stores/fetchStores', async (_, { getState }) => {
    const state = getState();
    const token = state.auth.token;

    const response = await axiosInstance.get('/store/', {
        headers: {
            Authorization: `${token}`,
        },
    });

    return response.data;
});

// Adding into the Store
export const addStore = createAsyncThunk('stores/addStore', async (storeData, { getState }) => {
    const state = getState();
    const token = state.auth.token;
    console.log(storeData)

    try {
        const response = await axiosInstance.post('/store/add', storeData, {
            headers: {
                Authorization: `${token}`,
            },
        });

        return response.data;
    } catch (error) {
        console.error("Error in addStore action:", error);
        throw error;
    }
});


export const deleteStore = createAsyncThunk('stores/deleteStore', async (storeData, { getState }) => {
    const state = getState();
    const token = state.auth.token;

    const response = await axiosInstance.delete('/store/delete', {
        headers: {
            Authorization: `${token}`,
        },
        data: storeData,
    });

    return response.data;

});