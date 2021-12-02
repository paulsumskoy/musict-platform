import * as Joi from 'joi';

export const validationSchema = Joi.object({
  dev: Joi.boolean().default(true),
  server: {
    port: Joi.number().default(5000),
  },
  database: {
    uri: Joi.string().required(),
  },
  folders: {
    forUserFiles: Joi.string().default('static-users').required(),
  },
});
