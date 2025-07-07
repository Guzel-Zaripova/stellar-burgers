import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TConstructorIngredient, TIngredient } from '@utils-types';
import { BURGER_CONSTRUCTOR_SLICE_NAME } from '../sliceNames';
import { v4 as uuidv4 } from 'uuid';

interface BurgerConstructorState {
  bun: TConstructorIngredient | null;
  ingredients: TConstructorIngredient[];
}

const initialState: BurgerConstructorState = {
  bun: null,
  ingredients: []
};

export const BurgerConstructorSlice = createSlice({
  name: BURGER_CONSTRUCTOR_SLICE_NAME,
  initialState,
  reducers: {
    addToConstructor: {
      reducer: (state, { payload }: PayloadAction<TConstructorIngredient>) => {
        if (payload.type === 'bun') {
          state.bun = payload;
        } else {
          state.ingredients.push(payload);
        }
      },
      prepare: (ingredient: TIngredient) => ({
        payload: { ...ingredient, id: uuidv4() }
      })
    },
    removeIngredient: (state, { payload }: PayloadAction<number>) => {
      state.ingredients.splice(payload, 1);
    },
    moveIngredient: (
      state,
      { payload }: PayloadAction<{ up: number; down: number }>
    ) => {
      const { up, down } = payload;
      const ingredients = [...state.ingredients];
      ingredients.splice(down, 0, ingredients.splice(up, 1)[0]);
      state.ingredients = ingredients;
    },
    resetConstructor: () => initialState
  },
  selectors: {
    selectBunConstructor: (state) => state.bun,
    selectIngredientsConstructor: (state) => state.ingredients,
    selectBurgerConstructor: (state) => state
  }
});

export const {
  addToConstructor,
  removeIngredient,
  moveIngredient,
  resetConstructor
} = BurgerConstructorSlice.actions;
export const {
  selectBunConstructor,
  selectIngredientsConstructor,
  selectBurgerConstructor
} = BurgerConstructorSlice.selectors;
