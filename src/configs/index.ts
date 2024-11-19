import constants from './constants'

const { PROD_ENV, DEV_ENV, TEST_ENV } = constants

const env = process.env.APP_ENV || DEV_ENV

const config = {
  app: {
    env,
    port: process.env.APP_PORT || 8000,
  },
  db: {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    db_url: process.env.DATABASE_URL,
  },
  jwt: {
    secret: process.env.JWT_PASS || 'secret-key',
  },
  log: {
    dir: process.env.LOG_DIR || `./logs`,
  },
  isProd: () => env === PROD_ENV,
  isDev: () => env === DEV_ENV,
  isTest: () => env === TEST_ENV,
}

export default config
