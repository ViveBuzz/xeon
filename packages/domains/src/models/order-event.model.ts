import { BaseEventModel } from './base-event.model';

export interface OrderEvent extends BaseEventModel {
  action: string;
  domainEvent: string;
}

export interface InitiateOrderEvent extends OrderEvent {
  payload: {
    orderId: string;
    orderNumber: string;
  };
}

export interface SubmitOrderEvent extends OrderEvent {}

export interface CancelOrderEvent extends OrderEvent {}

export interface RefundOrderEvent extends OrderEvent {}

export interface AddOrderItemEvent extends OrderEvent {
  payload: {
    orderItemId: string;
    product: {
      productId: string;
      name: string;
    };
    quantity: number;
    unitPrice: number;
  };
}
