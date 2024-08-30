import { Resource } from 'sst';
import { bus } from 'sst/aws/bus';
import { createEvent } from '@xeon/domains/entities/event.entity';
import { XEvent } from '../domains/models/event.model';

export const handler = async (event: any) => {
  const { events } = JSON.parse(event.body);

  await Promise.all(events.map((e) => createEvent(e)));

  const res = await Promise.all(
    events
      .filter((e) => e.action)
      .sort((a, b) => a.timestamp - b.timestamp)
      .map((e) => bus.publish(Resource.XBus, XEvent, e))
  );

  const totalFailed = res.filter((r) => {
    return r.FailedEntryCount > 0;
  });

  return {
    statusCode: 200,
    body: JSON.stringify({
      totalEvents: events.length,
      totalFailed: totalFailed.length,
    }),
  };
};
