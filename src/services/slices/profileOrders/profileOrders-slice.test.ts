import { getProfileOrders, profileOrdersSlice } from '@slices';
import { TOrder } from '@utils-types';

describe('Проверка работы слайса profileOrdersSlice', () => {
  const initialState = {
    order: [],
    error: null
  };

  it('Должен иметь начальное состояние', () => {
    const result = profileOrdersSlice.reducer(undefined, { type: '' });
    expect(result).toEqual(initialState);
  });

  it('Должен обрабатывать getProfileOrders.pending', () => {
    const action = getProfileOrders.pending('getProfileOrders', undefined);
    const state = profileOrdersSlice.reducer(initialState, action);
    expect(state.error).toBeNull();
  });

  it('Должен обрабатывать getProfileOrders.fulfilled', () => {
    const mockOrders: TOrder[] = [
      {
        _id: '686c08895a54df001b6dc43e',
        status: 'done',
        name: 'Флюоресцентный био-марсианский антарианский бургер',
        createdAt: '2025-06-22T16:16:57.227Z',
        updatedAt: '2025-06-25T09:59:09.362Z',
        number: 83746,
        ingredients: ['ingredient1', 'ingredient2']
      },
      {
        _id: '687c08895a54df001b6dc43e',
        status: 'pending',
        name: 'Краторный био-марсианский антарианский бургер',
        createdAt: '2025-06-22T16:16:57.227Z',
        updatedAt: '2025-06-25T09:59:09.362Z',
        number: 83747,
        ingredients: ['ingredient3', 'ingredient4']
      }
    ];

    const action = getProfileOrders.fulfilled(mockOrders, '', undefined);
    const state = profileOrdersSlice.reducer(initialState, action);
    expect(state.order).toEqual(mockOrders);
    expect(state.error).toBeNull();
  });

  it('Должен обрабатывать getProfileOrders.rejected', () => {
    const action = getProfileOrders.rejected(
      new Error('Ошибка получения заказов'),
      '',
      undefined
    );
    const state = profileOrdersSlice.reducer(initialState, action);
    expect(state.error).toBe('Ошибка получения заказов');
  });
});
