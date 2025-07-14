import { feedSlice, getFeed } from '@slices';
import { TOrder } from '@utils-types';

describe('Проверка работы слайса feedSlice', () => {
  const initialState = {
    orders: [],
    total: 0,
    totalToday: 0,
    error: null
  };

  it('Должен иметь начальное состояние', () => {
    const result = feedSlice.reducer(undefined, { type: '' });
    expect(result).toEqual(initialState);
  });

  it('Должен обрабатывать getFeed.pending', () => {
    const action = getFeed.pending('getFeed', undefined);
    const state = feedSlice.reducer(initialState, action);
    expect(state.error).toBeNull();
  });

  it('Должен обрабатывать getFeed.fulfilled', () => {
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

    const action = getFeed.fulfilled(
      { success: true, orders: mockOrders, total: 2, totalToday: 1 },
      '',
      undefined
    );
    const state = feedSlice.reducer(initialState, action);
    expect(state.orders).toEqual(mockOrders);
    expect(state.total).toBe(2);
    expect(state.totalToday).toBe(1);
    expect(state.error).toBeNull();
  });

  it('Должен обрабатывать getFeed.rejected', () => {
    const action = getFeed.rejected(
      new Error('Ошибка получения данных'),
      '',
      undefined
    );
    const state = feedSlice.reducer(initialState, action);
    expect(state.error).toBe('Ошибка получения данных');
  });
});
