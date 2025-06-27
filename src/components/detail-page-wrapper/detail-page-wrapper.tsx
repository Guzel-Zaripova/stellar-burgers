import { FC } from 'react';
import { useMatch } from 'react-router-dom';
import { IngredientDetailsWrapperUI, OrderInfoWrapperUI } from '@ui';
import { IngredientDetails, OrderInfo } from '@components';

export const OrderInfoWrapper: FC = () => {
  const profileMatch = useMatch('/profile/orders/:number')?.params.number;
  const feedMatch = useMatch('/feed/:number')?.params.number;
  const orderNumber = profileMatch || feedMatch;

  return (
    <OrderInfoWrapperUI orderNumber={orderNumber}>
      <OrderInfo />
    </OrderInfoWrapperUI>
  );
};

export const IngredientDetailsWrapper: FC = () => (
  <IngredientDetailsWrapperUI>
    <IngredientDetails />
  </IngredientDetailsWrapperUI>
);
