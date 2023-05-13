import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTransaction1683940029195 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(`ALTER TABLE ride ADD COLUMN reference VARCHAR;`);
    queryRunner.query(`ALTER TABLE ride ADD COLUMN payment_id VARCHAR;`);
    queryRunner.query(`ALTER TABLE ride ADD COLUMN payment_status VARCHAR;`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(`ALTER TABLE ride DROP COLUMN reference;`);
    queryRunner.query(`ALTER TABLE ride DROP COLUMN payment_id;`);
    queryRunner.query(`ALTER TABLE ride DROP COLUMN payment_status;`);
  }
}

