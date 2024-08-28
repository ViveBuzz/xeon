import { Entity, EntityItem } from 'electrodb';
import { nanoid } from 'nanoid';
import { client, table } from '../common/client';
import { OrderStatus } from '../enums';

export const Order = new Entity(
  {
    model: {
      entity: 'order',
      version: '1',
      service: 'order',
    },
    attributes: {
      orderId: {
        type: 'string',
        default: () => nanoid(),
      },
      orderNumber: {
        type: 'string',
      },
      status: {
        type: 'string',
        default: OrderStatus.DRAFT,
      },
      discountAmount: {
        type: 'number',
      },
      subTotal: {
        type: 'number',
      },
      grandTotal: {
        type: 'number',
      },
      createdAt: {
        type: 'number',
        default: () => Date.now(),
        readOnly: true,
      },
      updatedAt: {
        type: 'number',
        watch: '*',
        set: () => Date.now(),
        readOnly: true,
      },
    },
    indexes: {
      byOrderId: {
        pk: {
          field: 'pk',
          composite: ['orderId'],
        },
        sk: {
          field: 'sk',
          composite: ['orderId'],
        },
      },
    },
  },
  { client, table }
);

export const OrderItem = new Entity(
  {
    model: {
      entity: 'order_item',
      version: '1',
      service: 'order',
    },
    attributes: {
      orderId: {
        type: 'string',
      },
      orderItemId: {
        type: 'string',
        default: () => nanoid(),
      },
      quantity: {
        type: 'number',
      },
      unitPrice: {
        type: 'number',
      },
      totalPrice: {
        type: 'number',
      },
      product: {
        type: 'map',
        properties: {
          productId: {
            type: 'string',
          },
          name: {
            type: 'string',
          },
        },
      },
      createdAt: {
        type: 'number',
        default: () => Date.now(),
        readOnly: true,
      },
      updatedAt: {
        type: 'number',
        watch: '*',
        set: () => Date.now(),
        readOnly: true,
      },
    },
    indexes: {
      byOrderId: {
        pk: {
          field: 'pk',
          composite: ['orderId'],
        },
        sk: {
          field: 'sk',
          composite: ['orderItemId'],
        },
      },
    },
  },
  { client, table }
);

export const OrderSnapshot = new Entity(
  {
    model: {
      entity: 'order_snapshot',
      version: '1',
      service: 'order',
    },
    attributes: {
      orderId: {
        type: 'string',
        default: () => nanoid(),
      },
      prevEventId: {
        type: 'string',
      },
      orderNumber: {
        type: 'string',
      },
      status: {
        type: 'string',
        default: OrderStatus.DRAFT,
      },
      discountAmount: {
        type: 'number',
      },
      subTotal: {
        type: 'number',
      },
      grandTotal: {
        type: 'number',
      },
      createdAt: {
        type: 'number',
        default: () => Date.now(),
        readOnly: true,
      },
      updatedAt: {
        type: 'number',
      },
    },
    indexes: {
      byOrderId: {
        pk: {
          field: 'pk',
          composite: ['orderId'],
        },
        sk: {
          field: 'sk',
          composite: ['createdAt'],
        },
      },
    },
  },
  { client, table }
);

export const OrderItemSnapshot = new Entity(
  {
    model: {
      entity: 'order_item_snapshot',
      version: '1',
      service: 'order',
    },
    attributes: {
      orderId: {
        type: 'string',
      },
      orderItemId: {
        type: 'string',
        default: () => nanoid(),
      },
      quantity: {
        type: 'number',
      },
      unitPrice: {
        type: 'number',
      },
      totalPrice: {
        type: 'number',
      },
      product: {
        type: 'map',
        properties: {
          productId: {
            type: 'string',
          },
          name: {
            type: 'string',
          },
        },
      },
      createdAt: {
        type: 'number',
        default: () => Date.now(),
        readOnly: true,
      },
      updatedAt: {
        type: 'number',
        watch: '*',
        set: () => Date.now(),
        readOnly: true,
      },
    },
    indexes: {
      byOrderId: {
        pk: {
          field: 'pk',
          composite: ['orderId'],
        },
        sk: {
          field: 'sk',
          composite: ['createdAt', 'orderItemId'],
        },
      },
    },
  },
  { client, table }
);

export type OrderSnapshotType = EntityItem<typeof OrderSnapshot>;
