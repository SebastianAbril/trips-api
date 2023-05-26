import { Injectable } from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager } from 'typeorm';

@Injectable()
export class TestDBHelper {
  constructor(
    @InjectEntityManager()
    private entityManager: EntityManager,
  ) {}

  public async cleanTable(tableName): Promise<void> {
    try {
      await this.entityManager.query(`TRUNCATE ${tableName} CASCADE;`);
    } catch (error) {
      throw new Error(`ERROR: Cleaning test database: ${error}`);
    }
  }
}
