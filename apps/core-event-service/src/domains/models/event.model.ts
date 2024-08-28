import { event } from 'sst/event';
import { z } from 'zod';

const defineEvent = event.builder({
  validator: (_) => (payload) => payload,
});

export const XEvent = defineEvent('XEvent', z.object({}));
