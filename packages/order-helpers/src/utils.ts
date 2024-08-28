import { OrderEvent } from '@xeon/domains/models/order-event.model';

export const dedupOrderEvents = (
  events: OrderEvent[],
  by: keyof OrderEvent = 'eventId'
): OrderEvent[] => {
  const processedEvents: Record<string, boolean> = {};
  const result = [];

  for (let index = 0; index < events.length; index++) {
    const event = events[index] as OrderEvent;
    // Already added to results. skip this event object
    if (processedEvents[event[by]]) {
      continue;
    }
    processedEvents[event[by]] = true;
    result.push(event);
  }

  return result;
};
