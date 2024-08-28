import { table } from './database';
import { bus } from './bus';

export const api = new sst.aws.ApiGatewayV1('MyApi', {
  transform: {
    route: {
      handler: {
        link: [table, bus],
      },
    },
  },
});

api.route('POST /events', {
  handler: './apps/core-event-service/src/apis/publishEvent.handler',
});

api.deploy();

export const outputs = {
  api: api.url,
};
