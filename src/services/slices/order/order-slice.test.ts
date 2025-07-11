import { TOrder } from '@utils-types';
import {
  OrderState,
  getOrderByNumber,
  orderBurger,
  orderSlice,
  resetOrder
} from './order-slice';

describe('Проверка работы слайса orderSlice', () => {
  const initialState: OrderState = {
    order: null,
    orderModalData: null,
    orderRequest: false,
    error: null
  };

  let state: OrderState;

  beforeEach(() => {
    state = { ...initialState };
  });

  it('Проверка начального состояния', () => {
    const state = orderSlice.reducer(undefined, { type: '' });
    expect(state).toEqual(initialState);
  });

  describe('orderBurger', () => {
    it('Должен обрабатывать orderBurger.pending', () => {
      const action = orderBurger.pending('orderBurger', []);
      const newState = orderSlice.reducer(state, action);
      expect(newState.orderRequest).toBe(true);
      expect(newState.error).toBeNull();
    });

    it('Должен обрабатывать orderBurger.fulfilled', () => {
      const mockOrder: TOrder = {
        _id: '686c08895a54df001b6dc43e',
        status: 'done',
        name: 'Флюоресцентный био-марсианский антарианский бургер',
        createdAt: '2025-06-22T16:16:57.227Z',
        updatedAt: '2025-06-25T09:59:09.362Z',
        number: 83746,
        ingredients: ['ingredient1', 'ingredient2']
      };

      const action = orderBurger.fulfilled(
        {
          success: true,
          order: mockOrder,
          name: 'Флюоресцентный био-марсианский антарианский бургер'
        },
        '',
        ['ingredient1', 'ingredient2']
      );
      const newState = orderSlice.reducer(state, action);
      expect(newState.orderRequest).toBe(false);
      expect(newState.order).toEqual(mockOrder);
      expect(newState.orderModalData).toEqual(mockOrder);
      expect(newState.error).toBeNull();
    });

    it('Должен обрабатывать orderBurger.rejected', () => {
      const action = orderBurger.rejected(new Error('Ошибка заказа'), '', []);
      const newState = orderSlice.reducer(state, action);
      expect(newState.orderRequest).toBe(false);
      expect(newState.error).toBe('Ошибка заказа');
      expect(newState.order).toBeNull();
      expect(newState.orderModalData).toBeNull();
    });
  });

  describe('getOrderByNumber', () => {
    it('Должен обрабатывать getOrderByNumber.pending', () => {
      const action = getOrderByNumber.pending('getOrderByNumber', 1);
      const newState = orderSlice.reducer(state, action);
      expect(newState.orderRequest).toBe(true);
      expect(newState.error).toBeNull();
    });

    it('Должен обрабатывать getOrderByNumber.fulfilled', () => {
      const mockOrder: TOrder = {
        _id: '686c08895a54df001b6dc43e',
        status: 'done',
        name: 'Флюоресцентный био-марсианский антарианский бургер',
        createdAt: '2025-06-22T16:16:57.227Z',
        updatedAt: '2025-06-25T09:59:09.362Z',
        number: 83746,
        ingredients: ['ingredient1', 'ingredient2']
      };

      const action = getOrderByNumber.fulfilled(
        { success: true, orders: [mockOrder] },
        '',
        83746
      );
      const newState = orderSlice.reducer(state, action);
      expect(newState.orderRequest).toBe(false);
      expect(newState.orderModalData).toEqual(mockOrder);
      expect(newState.error).toBeNull();
    });

    it('Должен обрабатывать getOrderByNumber.rejected', () => {
      const action = getOrderByNumber.rejected(
        new Error('Ошибка получения заказа'),
        '',
        83746
      );
      const newState = orderSlice.reducer(state, action);
      expect(newState.orderRequest).toBe(false);
      expect(newState.error).toBe('Ошибка получения заказа');
      expect(newState.order).toBeNull();
      expect(newState.orderModalData).toBeNull();
    });
  });

  it('Должен сбрасывать состояние при вызове resetOrder', () => {
    const action = resetOrder();
    const newState = orderSlice.reducer(state, action);
    expect(newState).toEqual(initialState);
  });
});
