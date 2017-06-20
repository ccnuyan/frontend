export default {
  mode: 'development',
  port: 18000,
  cdnScripts: {
  },
  title: 'DEV',
  auth: {
    jwt: {
      secret: '12345678',
    },
  },
  pg: {
    user: 'postgres',
    database: 'backend-boilerplate',
    password: 'admin',
    host: 'localhost',
    port: 5432,
    max: 10,
    idleTimeoutMillis: 30000,
  },
};
