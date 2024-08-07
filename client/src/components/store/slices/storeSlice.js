import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchStores = createAsyncThunk('stores/fetchStores', async (_, { getState }) => {
    const state = getState();
    const token = state.auth.token;
  
    const response = await axios.get('http://localhost:3001/api/store/', {
      headers: {
        Authorization: `${token}`,
      },
    });
  
    return response.data;
  });



const storesSlice = createSlice({
  name: 'stores',
  initialState: {
    stores: [],
    status: 'idle',
    error: null,
  },

  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchStores.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchStores.fulfilled, (state, action) => {
        state.status = 'succeeded';
        const response = action.payload.result;
        console.log(response)
        state.stores = response;
      })
      .addCase(fetchStores.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });



  },
});

export default storesSlice.reducer;
