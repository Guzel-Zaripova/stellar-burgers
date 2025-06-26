import { getProfileOrders, selectProfileOrders } from '@slices';
import { ProfileOrdersUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from 'src/services/store';

export const ProfileOrders: FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    dispatch(getProfileOrders());
  }, [dispatch]);

  const orders: TOrder[] = useSelector(selectProfileOrders);

  return <ProfileOrdersUI orders={orders} />;
};
