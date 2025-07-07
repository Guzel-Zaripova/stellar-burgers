import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';
import { ORDER_SLICE_NAME } from '../sliceNames';
import { getOrderByNumberApi, orderBurgerApi } from '@api';

interface OrderState {
  order: TOrder | null;
  orderModalData: TOrder | null;
  orderRequest: boolean;
  error: string | null;
}

const initialState: OrderState = {
  order: null,
  orderModalData: null,
  orderRequest: false,
  error: null
};

export const orderBurger = createAsyncThunk(
  `${ORDER_SLICE_NAME}/orderBurger`,
  async (data: string[]) => await orderBurgerApi(data)
);

export const getOrderByNumber = createAsyncThunk(
  `${ORDER_SLICE_NAME}/getOrderByNumber`,
  async (data: number) => await getOrderByNumberApi(data)
);

export const orderSlice = createSlice({
  name: ORDER_SLICE_NAME,
  initialState,
  reducers: {
    resetOrder: () => initialState
  },
  extraReducers: (builder) => {
    builder
      .addCase(orderBurger.pending, (state) => {
        state.orderRequest = true;
        state.error = null;
      })
      .addCase(orderBurger.fulfilled, (state, { payload }) => {
        state.orderRequest = false;
        state.order = payload.order;
        state.orderModalData = payload.order;
      })
      .addCase(orderBurger.rejected, (state, action) => {
        state.orderRequest = false;
        state.error = action.error.message as string;
      })
      .addCase(getOrderByNumber.pending, (state) => {
        state.orderRequest = true;
        state.error = null;
      })
      .addCase(getOrderByNumber.fulfilled, (state, { payload }) => {
        state.orderRequest = false;
        state.orderModalData = payload.orders[0];
      })
      .addCase(getOrderByNumber.rejected, (state, action) => {
        state.orderRequest = false;
        state.error = action.error.message as string;
      });
  },
  selectors: {
    selectOrder: (state) => state.order,
    selectOrderModalData: (state) => state.orderModalData,
    selectOrderRequest: (state) => state.orderRequest
  }
});

export const { resetOrder } = orderSlice.actions;
export const { selectOrder, selectOrderModalData, selectOrderRequest } =
  orderSlice.selectors;
