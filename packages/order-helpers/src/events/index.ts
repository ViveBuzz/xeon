import { OrderAction } from '@xeon/domains/enums/order-action.enum';
import { OrderModel } from '@xeon/domains/models/order.model';
import { OrderEvent } from '@xeon/domains/models/order-event.model';
import { initiateOrder } from './initiate-order';
import { addOrderItem } from './add-order-item';
import { submitOrder } from './submit-order';
import { cancelOrder } from './cancel-order';

export type ComputeNextOrderState = {
  [K in OrderAction]?: (event: Extract<OrderEvent, { action: K }>, state: OrderModel) => OrderModel;
};

export const eventHandlerMapping: Record<string, any> = {
  [OrderAction.ORDER_INITIATE]: initiateOrder,
  [OrderAction.ORDER_ADD_ITEM as string]: addOrderItem,
  [OrderAction.ORDER_SUBMIT as string]: submitOrder,
  [OrderAction.ORDER_CANCEL as string]: cancelOrder,
};
