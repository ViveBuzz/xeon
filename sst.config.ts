/// <reference path="./.sst/platform/config.d.ts" />
import { readdirSync } from 'fs';

export default $config({
  app(input) {
    return {
      name: 'xeon',
      removal: input?.stage === 'production' ? 'retain' : 'remove',
      home: 'aws',
      providers: {
        aws: {
          region: 'ap-southeast-1',
        },
      },
    };
  },
  async run() {
    const outputs = {};
    for (const value of readdirSync('./infra/')) {
      const result = await import('./infra/' + value);
      if (result.outputs) Object.assign(outputs, result.outputs);
    }
    return outputs;
  },
});
