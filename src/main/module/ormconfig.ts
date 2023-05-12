import { DataSource } from 'typeorm';
import { databaseProperties } from './database';

export const appDataSource = new DataSource({
  ...(databaseProperties as any),
  migrations: ['./src/migrations/**'],
});
