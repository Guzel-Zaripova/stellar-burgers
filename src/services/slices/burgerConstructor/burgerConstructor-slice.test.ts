import {
  BurgerConstructorSlice,
  addToConstructor,
  removeIngredient,
  moveIngredient,
  initialState
} from '@slices';
import { TIngredient } from '@utils-types';
import { BurgerConstructorState } from './burgerConstructor-slice';

describe('Проверка работы слайса BurgerConstructorSlice', () => {
  let initialStateWithIngredients: BurgerConstructorState;

  beforeEach(() => {
    initialStateWithIngredients = {
      bun: null,
      ingredients: [
        {
          _id: '3',
          name: 'Ингредиент 3',
          type: 'main',
          proteins: 420,
          fat: 142,
          carbohydrates: 242,
          calories: 4242,
          price: 424,
          image: 'https://code.s3.yandex.net/react/code/meat-01.png',
          image_large:
            'https://code.s3.yandex.net/react/code/meat-01-large.png',
          image_mobile:
            'https://code.s3.yandex.net/react/code/meat-01-mobile.png',
          id: 'unique-id-3'
        },
        {
          _id: '4',
          name: 'Ингредиент 4',
          type: 'main',
          proteins: 433,
          fat: 244,
          carbohydrates: 33,
          calories: 420,
          price: 1337,
          image: 'https://code.s3.yandex.net/react/code/meat-02.png',
          image_large:
            'https://code.s3.yandex.net/react/code/meat-02-large.png',
          image_mobile:
            'https://code.s3.yandex.net/react/code/meat-02-mobile.png',
          id: 'unique-id-4'
        },
        {
          _id: '5',
          name: 'Ингредиент 5',
          type: 'main',
          proteins: 44,
          fat: 26,
          carbohydrates: 85,
          calories: 643,
          price: 988,
          image: 'https://code.s3.yandex.net/react/code/meat-03.png',
          image_large:
            'https://code.s3.yandex.net/react/code/meat-03-large.png',
          image_mobile:
            'https://code.s3.yandex.net/react/code/meat-03-mobile.png',
          id: 'unique-id-5'
        }
      ]
    };
  });

  it('Добавление булки в конструктор бургера', () => {
    const bun: TIngredient = {
      _id: '1',
      name: 'Ингредиент 1',
      type: 'bun',
      proteins: 44,
      fat: 26,
      carbohydrates: 85,
      calories: 643,
      price: 988,
      image: 'https://code.s3.yandex.net/react/code/bun-01.png',
      image_large: 'https://code.s3.yandex.net/react/code/bun-01-large.png',
      image_mobile: 'https://code.s3.yandex.net/react/code/bun-01-mobile.png'
    };

    const action = addToConstructor(bun);
    const state = BurgerConstructorSlice.reducer(initialState, action);

    expect(state.bun).toEqual({ ...bun, id: expect.any(String) });
    expect(state.ingredients).toHaveLength(0);
  });

  it('Добавление начинки в конструктор бургера', () => {
    const mainIngredient: TIngredient = {
      _id: '3',
      name: 'Ингредиент 3',
      type: 'main',
      proteins: 420,
      fat: 142,
      carbohydrates: 242,
      calories: 4242,
      price: 424,
      image: 'https://code.s3.yandex.net/react/code/meat-01.png',
      image_large: 'https://code.s3.yandex.net/react/code/meat-01-large.png',
      image_mobile: 'https://code.s3.yandex.net/react/code/meat-01-mobile.png'
    };

    const action = addToConstructor(mainIngredient);
    const state = BurgerConstructorSlice.reducer(initialState, action);

    expect(state.ingredients).toHaveLength(1);
    expect(state.ingredients[0]).toEqual({
      ...mainIngredient,
      id: expect.any(String)
    });
  });

  it('Удаление ингредиента в начинке конструктора бургера', () => {
    const action = removeIngredient(0);
    const state = BurgerConstructorSlice.reducer(
      initialStateWithIngredients,
      action
    );

    expect(state.ingredients).toHaveLength(2);
    expect(state.ingredients[0].name).toBe('Ингредиент 4');
    expect(state.ingredients[1].name).toBe('Ингредиент 5');
  });

  it('Изменение порядка ингредиентов в начинке конструктора бургера', () => {
    const action = moveIngredient({ up: 1, down: 0 });
    const state = BurgerConstructorSlice.reducer(
      initialStateWithIngredients,
      action
    );

    expect(state.ingredients[0].name).toBe('Ингредиент 4');
    expect(state.ingredients[1].name).toBe('Ингредиент 3');
  });
});
