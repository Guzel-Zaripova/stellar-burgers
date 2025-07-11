import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { PROFILE_ORDERS_SLICE_NAME } from '../sliceNames';
import { TOrder } from '@utils-types';
import { getOrdersApi } from '@api';

export interface ProfileOrdersState {
  order: TOrder[];
  error: string | null;
}

const initialState: ProfileOrdersState = {
  order: [],
  error: null
};

export const getProfileOrders = createAsyncThunk(
  `${PROFILE_ORDERS_SLICE_NAME}/getProfileOrders`,
  async () => await getOrdersApi()
);

export const profileOrdersSlice = createSlice({
  name: PROFILE_ORDERS_SLICE_NAME,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getProfileOrders.pending, (state) => {
        state.error = null;
      })
      .addCase(getProfileOrders.fulfilled, (state, { payload }) => {
        state.order = payload;
      })
      .addCase(getProfileOrders.rejected, (state, action) => {
        state.error = action.error.message as string;
      });
  },
  selectors: {
    selectProfileOrders: (state) => state.order
  }
});

export const { selectProfileOrders } = profileOrdersSlice.selectors;
