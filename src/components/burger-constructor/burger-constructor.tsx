import { FC, useMemo } from 'react';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import { useDispatch, useSelector } from '@store';
import {
  BurgerConstructorSelectors,
  orderBurger,
  resetOrder,
  resetConstructor,
  selectOrderModalData,
  selectOrderRequest,
  selectUser
} from '@slices';
import { useNavigate } from 'react-router-dom';

export const BurgerConstructor: FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const constructorItems = {
    bun: useSelector(BurgerConstructorSelectors.selectBun),
    ingredients: useSelector(BurgerConstructorSelectors.selectIngredients)
  };
  const orderRequest = useSelector(selectOrderRequest);
  const orderModalData = useSelector(selectOrderModalData);
  const user = useSelector(selectUser);

  const onOrderClick = () => {
    if (!constructorItems.bun || orderRequest) return;

    const bunById = constructorItems.bun._id;
    const ingredientsById = constructorItems.ingredients.map(
      (item) => item._id
    );
    const order = [bunById, ...ingredientsById, bunById];

    if (!user) {
      navigate('/login');
    } else {
      dispatch(orderBurger(order)).then((result) => {
        if (orderBurger.fulfilled.match(result)) {
          dispatch(resetConstructor());
        }
      });
    }
  };

  const closeOrderModal = () => {
    dispatch(resetOrder());
  };

  const price = useMemo(
    () =>
      (constructorItems.bun ? constructorItems.bun.price * 2 : 0) +
      constructorItems.ingredients.reduce(
        (s: number, v: TConstructorIngredient) => s + v.price,
        0
      ),
    [constructorItems]
  );

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderRequest}
      constructorItems={constructorItems}
      orderModalData={orderModalData}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};
