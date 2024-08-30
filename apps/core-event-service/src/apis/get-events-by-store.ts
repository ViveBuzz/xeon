import { getEventsByStore } from '@xeon/domains/dals/event.dal';

export const handler = async (event: any) => {
  const storeId = event.headers['x-storeId'];
  const { timestamp } = event.queryStringParameters;

  const events = await getEventsByStore(storeId, { timestamp });

  return {
    statusCode: 200,
    body: JSON.stringify({
      events,
    }),
  };
};
