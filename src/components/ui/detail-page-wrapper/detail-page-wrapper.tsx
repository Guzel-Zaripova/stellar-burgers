import { FC } from 'react';
import styles from './detail-page-wrapper.module.css';
import {
  IngredientDetailsWrapperUIProps,
  OrderInfoWrapperUIProps
} from './types';

export const OrderInfoWrapperUI: FC<OrderInfoWrapperUIProps> = ({
  orderNumber,
  children
}) => (
  <div className={styles.detailPageWrap}>
    <p className={`text text_type_digits-default ${styles.detailHeader}`}>
      #{orderNumber ? orderNumber.padStart(6, '0') : 'Детали заказа'}
    </p>
    {children}
  </div>
);

export const IngredientDetailsWrapperUI: FC<
  IngredientDetailsWrapperUIProps
> = ({ children }) => (
  <div className={styles.detailPageWrap}>
    <p className={`text text_type_main-large ${styles.detailHeader}`}>
      {'Детали ингредиента'}
    </p>
    {children}
  </div>
);
