export default () => ({
  type: 'mysql',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  logging: process.env.DB_LOGGING, //生产模式关闭
  sync: process.env.DB_SYNC, //生产模式必须关闭
});
