import { z as t } from 'zod';

export const EventSchema = t.object({
  payload: t.record(t.any(), t.any()),
  possibleDestinations: t.record(t.boolean()).array().nonempty(),
  strategy: t.optional(t.string())
});
