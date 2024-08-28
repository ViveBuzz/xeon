import { Entity, EntityItem } from 'electrodb';
import { nanoid } from 'nanoid';
import { client, table } from '../common/client';

export const Event = new Entity(
  {
    model: {
      entity: 'event',
      version: '1',
      service: 'x',
    },
    attributes: {
      domainId: {
        type: 'string',
      },
      eventId: {
        type: 'string',
        default: () => nanoid(),
      },
      action: {
        type: 'string',
      },
      triggerBy: {
        type: 'string',
      },
      domainEvent: {
        type: 'string',
      },
      timestamp: {
        type: 'number',
        default: () => Date.now(),
        readOnly: true,
      },
      payload: {
        type: 'any',
        required: false,
      },
      previous: {
        type: 'string',
        required: false,
      },
      storeId: {
        type: 'string',
      },
      deviceId: {
        type: 'string',
      },
      organisationId: {
        type: 'string',
      },
    },
    indexes: {
      byDomain: {
        pk: {
          field: 'pk',
          composite: ['domainId'],
        },
        sk: {
          field: 'sk',
          composite: ['timestamp', 'eventId'],
        },
      },
      eventByStore: {
        index: 'gsi1',
        pk: {
          field: 'gsi1pk',
          composite: ['storeId', 'domainEvent'],
        },
        sk: {
          field: 'gsi1sk',
          composite: ['timestamp', 'eventId'],
        },
      },
    },
  },
  {
    client,
    table,
  }
);

export const createEvent = async (input: EntityItem<typeof Event>) => {
  return Event.put(input).go();
};

export const getEventsByDomain = async (domainId: string): Promise<EntityItem<typeof Event>[]> => {
  const { data } = await Event.query.byDomain({ domainId }).go();
  return data;
};
