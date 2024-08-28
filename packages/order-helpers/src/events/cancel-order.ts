import { OrderStatus } from '@xeon/domains/enums/order-status.enum';
import { CancelOrderEvent, OrderModel } from '@xeon/domains/models';

export const cancelOrder = (
  event: CancelOrderEvent,
  prevState: OrderModel = {} as OrderModel
): OrderModel => {
  if (prevState.status === OrderStatus.COMPLETED) {
    return prevState;
  }

  return {
    ...prevState,
    status: OrderStatus.CANCELLED,
  };
};
