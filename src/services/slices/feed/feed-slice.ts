import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { FEED_SLICE_NAME } from '../sliceNames';
import { TOrder } from '@utils-types';
import { getFeedsApi } from '@api';

interface FeedState {
  orders: TOrder[];
  total: number;
  totalToday: number;
  error: string | null;
}

const initialState: FeedState = {
  orders: [],
  total: 0,
  totalToday: 0,
  error: null
};

export const getFeed = createAsyncThunk(
  `${FEED_SLICE_NAME}/getFeed`,
  async () => await getFeedsApi()
);

export const feedSlice = createSlice({
  name: FEED_SLICE_NAME,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getFeed.pending, (state) => {
        state.error = null;
      })
      .addCase(getFeed.fulfilled, (state, { payload }) => {
        state.orders = payload.orders;
        state.total = payload.total;
        state.totalToday = payload.totalToday;
      })
      .addCase(getFeed.rejected, (state, action) => {
        state.error = action.error.message as string;
      });
  },
  selectors: {
    selectOrdersInFeed: (state) => state.orders,
    selectTotalInFeed: (state) => state.total,
    selectTotalTodayInFeed: (state) => state.totalToday,
    selectFeed: (state) => state
  }
});

export const {
  selectOrdersInFeed,
  selectTotalInFeed,
  selectTotalTodayInFeed,
  selectFeed
} = feedSlice.selectors;
