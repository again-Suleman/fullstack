import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../config/axiosConfig';

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
