import { AddOrderItemEvent, OrderModel } from '@xeon/domains/models';
import { computeOrderTotals } from '../compute-price';

export const addOrderItem = (
  event: AddOrderItemEvent,
  prevState: OrderModel = {} as OrderModel
): OrderModel => {
  const order = { ...prevState };
  const { payload } = event;

  order.orderItems = order.orderItems || [];

  order.orderItems.push({
    orderId: order.orderId,
    orderItemId: payload.orderItemId,
    quantity: payload.quantity,
    unitPrice: payload.unitPrice,
    totalPrice: payload.quantity * payload.unitPrice,
    product: payload.product,
  });

  return {
    ...order,
    ...computeOrderTotals(order),
  };
};
