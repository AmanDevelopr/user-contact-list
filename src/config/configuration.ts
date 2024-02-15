import { config } from 'dotenv';
import * as Joi from '@hapi/joi';
import { IConfig } from './IConfig';
config();
import * as version_ from '../../package.json';
const version = version_.version;

export const SWAGGER_URL = '/api-docs'; // swagger URL on browser
export const ABOUT = {
  description: 'USER API',
  in: 'Headers',
  name: 'Authorization',
  serviceConfig: 'Serviceconfig',
  title: 'User Contacts List',
};
const envVarsSchema = Joi.object({
  // using Joi for validation
  PORT: Joi.number().default(9000),
  NODE_ENV: Joi.string().default('dev'),
  TOKEN_SECRET: Joi.string().default('jkhlkncunyvcni52o3utq4mdr'),
  MONGO_URL: Joi.string().default('mongodb://localhost:27017/users_contact_list'),
  PASSWORD: Joi.string().default('Training@123'),
})
  .unknown()
  .required();

const { value: envVars } = envVarsSchema.validate(process.env);
config();
const Configure: IConfig = Object.freeze({
  env: envVars.NODE_ENV,
  port: envVars.PORT,
  secret: envVars.TOKEN_SECRET,
  mongoURI: envVars.MONGO_URL,
  password: envVars.PASSWORD,

  swaggerDefinition: {
    basePath: '/api',
    info: {
      ...ABOUT,
      version,
    },
  },
  swaggerUrl: SWAGGER_URL,
});
export default Configure;