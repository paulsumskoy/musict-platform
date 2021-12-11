import * as Joi from 'joi';

export const validationSchema = Joi.object({
  dev: Joi.boolean(),
  server: {
    port: Joi.number(),
  },
  database: {
    uri: Joi.string().required(),
  },
  folders: {
    forUserFiles: Joi.string().default('static-users').required(),
  },
});
