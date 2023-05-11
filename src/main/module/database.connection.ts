import { DataSource } from 'typeorm';

export const appDataSource = new DataSource({
  type: 'postgres',
  host: '127.0.0.1',
  port: 5432,
  username: 'trips_user',
  password: '123456',
  database: 'trips_db',
  migrations: ['./src/migrations/**'],
});
