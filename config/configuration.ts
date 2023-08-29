let envFilePath = '';
if (process.env.NODE_ENV === 'development') {
  envFilePath = '.env.dev';
} else if (process.env.NODE_ENV === 'production') {
  envFilePath = '.env.prod';
}
require('dotenv').config({ path: envFilePath });
export default () => ({
  type: 'mysql',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
});
