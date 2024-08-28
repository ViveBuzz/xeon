export class OrderModel {
  orderId!: string;
  orderNumber!: string;
  status!: string;
  discountAmount!: number;
  subTotal!: number;
  grandTotal!: number;
  prevEventId!: string;
  updatedAt!: number;
  orderItems!: OrderItemModel[];
}

export class OrderItemModel {
  orderId!: string;
  orderItemId!: string;
  quantity!: number;
  unitPrice!: number;
  totalPrice!: number;
  product!: {
    productId: string;
    name: string;
  };
}
