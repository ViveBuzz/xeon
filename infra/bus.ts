import { orderSnapshotQueue } from './queue';

export const bus = new sst.aws.Bus('XBus');
bus.subscribe({
  handler: './apps/core-event-service/src/workers/event.handler',
  link: [orderSnapshotQueue],
});
