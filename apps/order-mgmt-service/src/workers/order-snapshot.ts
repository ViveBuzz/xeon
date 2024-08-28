import { SQSEvent, SQSRecord } from 'aws-lambda';
import { dedupOrderEvents, computeOrderState } from '@xeon/order-helpers';
import { OrderEvent, OrderModel } from '@xeon/domains/models';
import { getEventsByDomain } from '@xeon/domains/entities';
import {
  createOrderItemSnapshot,
  createOrderSnapshot,
  getOrderSnapshot,
  upsertOrder,
  upsertOrderItem,
} from '@xeon/domains/dals';

export const handler = async (event: SQSEvent) => {
  // If the number of messages is small
  // There is a  possibility of multiple group messages can come to a single instance
  const orderEvents: Record<string, OrderEvent[]> = event.Records.reduce(
    (acc: Record<string, OrderEvent[]>, curr: SQSRecord) => {
      const data: OrderEvent = JSON.parse(curr.body);

      const messageGroupId = curr.attributes.MessageGroupId as string;
      acc[messageGroupId] = acc[messageGroupId] || [];
      acc[messageGroupId].push(data);

      return acc;
    },
    {}
  );
  const result = await Promise.all(
    Object.keys(orderEvents).map((groupId: string) =>
      processEvents(groupId, orderEvents[groupId] || [])
    )
  );

  return { result };
};

const processEvents = async (groupId: string, events: OrderEvent[]) => {
  let success = false;

  try {
    // Get the current events and concat with the new events
    const currentEvents = await getEventsByDomain(groupId);
    const sortedEvents = dedupOrderEvents([...currentEvents, ...events] as OrderEvent[]).sort(
      (a, b) => a.timestamp - b.timestamp
    );

    // Create snapshot
    const snapshot = await createSnapshot(groupId, sortedEvents as OrderEvent[]);

    if (snapshot) {
      success = true;
      console.log(groupId, 'Snapshot is created', JSON.stringify(snapshot));
    } else {
      console.log(groupId, 'Snapshot creation failed');
    }
  } catch (error) {
    console.error(groupId, 'Error storing event', error);
  }

  return { groupId, success };
};

const mapSnapshotToJobs = (snapshot: OrderModel): Array<Object> => {
  const order = { ...snapshot, createdAt: Date.now() };
  const orderItems = (order.orderItems || []).map((item) => {
    return {
      ...item,
      orderId: order.orderId,
    };
  });

  return [
    upsertOrder(order),
    orderItems.flatMap(upsertOrderItem),
    createOrderSnapshot(order),
    orderItems.flatMap(createOrderItemSnapshot),
  ];
};

const createSnapshot = async (orderId: string, events: OrderEvent[]): Promise<OrderModel> => {
  const existingOrder = await getOrderSnapshot(orderId);

  const newSnapshot = computeOrderState(events, existingOrder);

  const jobs = mapSnapshotToJobs(newSnapshot);
  await Promise.all(jobs);

  await publishSnapshot(newSnapshot);

  return newSnapshot;
};

const publishSnapshot = async (snapshot: OrderModel): Promise<void> => {};
