import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { INGREDIENTS_SLICE_NAME } from '../sliceNames';
import { TIngredient } from '@utils-types';
import { getIngredientsApi } from '@api';

export interface IngredientsState {
  data: TIngredient[];
  isLoading: boolean;
  error: string | null;
}

const initialState: IngredientsState = {
  data: [],
  isLoading: false,
  error: null
};

export const fetchIngredients = createAsyncThunk(
  `${INGREDIENTS_SLICE_NAME}/fetchIngredients`,
  async () => await getIngredientsApi()
);

export const ingredientsSlice = createSlice({
  name: INGREDIENTS_SLICE_NAME,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchIngredients.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchIngredients.fulfilled, (state, { payload }) => {
        state.data = payload;
        state.isLoading = false;
      })
      .addCase(fetchIngredients.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message as string;
      });
  },
  selectors: {
    selectIngredients: (state) => state.data,
    selectIsLoading: (state) => state.isLoading
  }
});

export const { selectIngredients, selectIsLoading } =
  ingredientsSlice.selectors;
