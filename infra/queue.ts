import { table } from './database';

export const orderSnapshotQueueDLQ = new sst.aws.Queue('XOrderSnapshotQueueDLQ', {
  fifo: true,
});

export const orderSnapshotQueue = new sst.aws.Queue('XOrderSnapshotQueue', {
  fifo: true,
  dlq: orderSnapshotQueueDLQ.arn,
});

orderSnapshotQueue.subscribe({
  handler: './apps/order-mgmt-service/src/workers/order-snapshot.handler',
  link: [table],
});
