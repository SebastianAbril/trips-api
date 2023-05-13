import { MigrationInterface, QueryRunner } from "typeorm"

export class RiderPaymentSource1683934088686 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        queryRunner.query(
            `ALTER TABLE rider ADD COLUMN payment_source_id integer;`
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        queryRunner.query(
            `ALTER TABLE rider DROP COLUMN payment_source_id;;`
        );
    }

}
