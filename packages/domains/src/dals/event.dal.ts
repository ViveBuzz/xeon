import { EntityItem } from 'electrodb';
import { Event } from '../entities/event.entity';

export const createEvent = async (input: EntityItem<typeof Event>) => {
  return Event.put(input).go();
};

export const getEventsByDomain = async (domainId: string): Promise<EntityItem<typeof Event>[]> => {
  const { data } = await Event.query.byDomain({ domainId }).go();
  return data;
};
