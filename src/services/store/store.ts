import { combineSlices, configureStore } from '@reduxjs/toolkit';
import {
  ingredientsSlice,
  BurgerConstructorSlice,
  userSlice,
  orderSlice,
  feedSlice,
  profileOrdersSlice
} from '@slices';

import {
  TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook
} from 'react-redux';

export const rootReducer = combineSlices(
  ingredientsSlice,
  BurgerConstructorSlice,
  userSlice,
  orderSlice,
  feedSlice,
  profileOrdersSlice
);

const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production'
});

export type RootState = ReturnType<typeof rootReducer>;

export type AppDispatch = typeof store.dispatch;

export const useDispatch: () => AppDispatch = () => dispatchHook();
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;

export default store;
