import { OrderStatus } from '@xeon/domains/enums/order-status.enum';
import { SubmitOrderEvent, OrderModel } from '@xeon/domains/models';

export const submitOrder = (
  event: SubmitOrderEvent,
  prevState: OrderModel = {} as OrderModel
): OrderModel => {
  if (prevState.status === OrderStatus.COMPLETED) {
    return prevState;
  }
  return {
    ...prevState,
    status: OrderStatus.SUBMITTED,
  };
};
