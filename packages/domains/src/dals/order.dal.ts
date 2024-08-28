import { Order, OrderItem, OrderItemSnapshot, OrderSnapshot } from '../entities/order.entity';
import { OrderItemModel, OrderModel } from '../models';

export const getOrderSnapshot = async (orderId: string): Promise<OrderModel | undefined> => {
  const { data } = await OrderSnapshot.query.byOrderId({ orderId }).go();

  if (data.length === 0) {
    return undefined;
  }

  return {
    ...data[0],
  } as OrderModel;
};

export const createOrderSnapshot = async (order: OrderModel): Promise<any> => {
  return OrderSnapshot.create(order).go();
};

export const createOrderItemSnapshot = async (orderItem: OrderItemModel): Promise<any> => {
  return OrderItemSnapshot.create(orderItem).go();
};

export const upsertOrder = async (order: OrderModel): Promise<any> => {
  return Order.upsert(order).go();
};

export const upsertOrderItem = async (orderItem: OrderItemModel): Promise<any> => {
  return OrderItem.upsert(orderItem).go();
};
