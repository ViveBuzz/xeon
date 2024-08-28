import { OrderEvent, OrderModel } from '@xeon/domains/models';
import { eventHandlerMapping } from './events';

export const computeOrderState = <T extends OrderEvent>(
  events: T[],
  prevState: OrderModel = {} as OrderModel
) => {
  return events.reduce<OrderModel>((state, event) => {
    const computeNextState = eventHandlerMapping[event.action];
    if (!computeNextState) {
      return state;
    }

    state.prevEventId = event.eventId;
    state.updatedAt = event.timestamp;

    return computeNextState(event, state);
  }, prevState);
};
