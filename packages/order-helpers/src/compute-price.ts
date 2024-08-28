import { OrderModel } from '@xeon/domains/models';

export const computeOrderTotals = (order: OrderModel): object => {
  const discountAmount = 0;
  const subTotal = order.orderItems.reduce((acc, item) => acc + item.totalPrice, 0);

  return {
    // taxes, discounts, tips, surcharge, etc.
    discountAmount,
    grandTotal: subTotal - discountAmount,
  };
};
