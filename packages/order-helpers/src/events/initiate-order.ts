import { OrderEvent, OrderModel } from '@xeon/domains/models';

export const initiateOrder = <T extends OrderEvent>(
  event: T,
  prevState: OrderModel
): OrderModel => {
  const { payload } = event;
  return {
    ...prevState,
    orderId: event.domainId,
    orderNumber: payload.orderNumber,
    discountAmount: 0,
    subTotal: 0,
    grandTotal: 0,
  };
};
