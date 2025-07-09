import { rootReducer } from './store';
import { BurgerConstructorState } from '../slices/burgerConstructor/burgerConstructor-slice';
import { FeedState } from '../slices/feed/feed-slice';
import { IngredientsState } from '../slices/ingredients/ingredients-slice';
import { OrderState } from '../slices/order/order-slice';
import { ProfileOrdersState } from '../slices/profileOrders/profileOrders-slice';
import { UserState } from '../slices/user/user-slice';

describe('rootReducer', () => {
  test('возвращение корректного начального состояния при вызове с undefined и UNKNOWN_ACTION', () => {
    const initialState = rootReducer(undefined, { type: 'UNKNOWN_ACTION' });

    expect(initialState).toEqual({
      ingredients: {
        data: [],
        isLoading: false,
        error: null
      } as IngredientsState,
      feed: {
        orders: [],
        total: 0,
        totalToday: 0,
        error: null
      } as FeedState,
      user: {
        isInit: false,
        user: null,
        error: null
      } as UserState,
      order: {
        order: null,
        orderModalData: null,
        orderRequest: false,
        error: null
      } as OrderState,
      burgerConstructor: {
        bun: null,
        ingredients: []
      } as BurgerConstructorState,
      profileOrders: {
        order: [],
        error: null
      } as ProfileOrdersState
    });
  });
});
