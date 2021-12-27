/* eslint-disable @typescript-eslint/no-var-requires */
require('dotenv').config();

const path = require('path');

const isDev = process.env.NODE_ENV === 'DEV';

module.exports = {
  type: process.env.DB_DIALECT || 'postgres',
  host: process.env.POSTGRES_HOST,
  port: +process.env.POSTGRES_PORT,
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DATABASE,
  entities: [path.join(__dirname, '**', '*.entity.{ts,js}')],
  migrations: [
    path.join(__dirname, '**', 'migration', isDev ? '*.ts' : '*.js'),
  ],
  cli: {
    migrationsDir: `./${isDev ? 'src' : 'dist'}/migration`,
  },
  synchronize: false,
  keepConnectionAlive: isDev,
};
