import { EntityItem } from 'electrodb';
import { Event } from '../entities/event.entity';
import { OrderEvent } from '../models';
import { DomainEvent } from '../enums';

export const createEvent = async (input: EntityItem<typeof Event>) => {
  return Event.put(input).go();
};

export const getEventsByDomain = async (
  domainId: string,
  query: {
    prevEventId?: string;
  } = {}
): Promise<EntityItem<typeof Event>[]> => {
  const { prevEventId } = query;
  const queryBuilder = Event.query.byDomain({ domainId });

  if (prevEventId) {
    queryBuilder.gte({ eventId: prevEventId });
  }

  const { data } = await Event.query.byDomain({ domainId }).go();
  return data;
};

export const getEventsByStore = async (
  storeId: string,
  query: {
    timestamp: number;
  }
): Promise<EntityItem<typeof Event>[]> => {
  const { timestamp } = query;

  const { data } = await Event.query
    .eventByStore({ storeId, domainEvent: DomainEvent.ORDER })
    .gte({ timestamp })
    .go();

  return data.map((item) => ({ ...item }) as OrderEvent);
};