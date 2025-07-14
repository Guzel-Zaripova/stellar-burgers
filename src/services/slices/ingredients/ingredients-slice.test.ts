import { ingredientsSlice, fetchIngredients } from '@slices';
import { TIngredient } from '@utils-types';
import { IngredientsState } from './ingredients-slice';

describe('Проверка работы слайса ingredientsSlice', () => {
  const initialState: IngredientsState = {
    data: [],
    isLoading: false,
    error: null
  };

  it('Должен иметь начальное состояние', () => {
    const state = ingredientsSlice.reducer(undefined, { type: '' });
    expect(state).toEqual(initialState);
  });

  it('Должен обрабатывать fetchIngredients.pending', () => {
    const action = fetchIngredients.pending('', undefined);
    const state = ingredientsSlice.reducer(initialState, action);
    expect(state.isLoading).toBe(true);
    expect(state.error).toBeNull();
  });

  it('Должен обрабатывать fetchIngredients.fulfilled', () => {
    const mockIngredients: TIngredient[] = [
      {
        _id: '1',
        name: 'Ингредиент 1',
        type: 'bun',
        proteins: 44,
        fat: 26,
        carbohydrates: 85,
        calories: 643,
        price: 988,
        image: 'https://code.s3.yandex.net/react/code/bun-01.png',
        image_mobile: 'https://code.s3.yandex.net/react/code/bun-01-mobile.png',
        image_large: 'https://code.s3.yandex.net/react/code/bun-01-large.png'
      }
    ];

    const action = fetchIngredients.fulfilled(mockIngredients, '', undefined);
    const state = ingredientsSlice.reducer(initialState, action);
    expect(state.data).toEqual(mockIngredients);
    expect(state.isLoading).toBe(false);
    expect(state.error).toBeNull();
  });

  it('Должен обрабатывать fetchIngredients.rejected', () => {
    const action = fetchIngredients.rejected(
      new Error('Ошибка загрузки'),
      '',
      undefined
    );
    const state = ingredientsSlice.reducer(initialState, action);
    expect(state.isLoading).toBe(false);
    expect(state.error).toBe('Ошибка загрузки');
  });
});
