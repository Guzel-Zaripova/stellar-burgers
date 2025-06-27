import { RootState } from '../store/store';

export const orderInfoSelector = (number: string) => (state: RootState) => {
  if (state.profileOrders.order.length) {
    const data = state.profileOrders.order.find(
      (item) => item.number === +number
    );
    if (data) return data;
  }

  if (state.feed.orders.length) {
    const data = state.feed.orders.find((item) => item.number === +number);
    if (data) return data;
  }

  if (state.order.orderModalData?.number === +number) {
    return state.order.orderModalData;
  }

  return null;
};
