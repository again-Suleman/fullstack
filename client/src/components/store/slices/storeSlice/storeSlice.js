import { createSlice } from '@reduxjs/toolkit';

import { addStore, fetchStores, deleteStore } from './extraReducers';


// Slice
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

      // Fetching the Store
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
      })

      // Adding the Store
      .addCase(addStore.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(addStore.fulfilled, (state, action) => {
        state.status = 'succeeded';
        console.log(action.payload)
        state.stores.push(action.payload.result);
      })
      .addCase(addStore.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });


  },
});

export default storesSlice.reducer;
export { addStore, fetchStores, deleteStore };
