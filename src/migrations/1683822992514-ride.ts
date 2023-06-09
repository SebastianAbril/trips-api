import { MigrationInterface, QueryRunner } from "typeorm"

export class Ride1683822992514 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `CREATE TABLE "ride" (
                "id" SERIAL PRIMARY KEY,
                "rider_id" INTEGER REFERENCES "rider" ("id"),
                "driver_id" INTEGER REFERENCES "driver" ("id"),
                "created_at" TIMESTAMP,
                "finalized_at" TIMESTAMP,
                "total_price" DECIMAL,
                "initial_latitude" DECIMAL,
                "initial_longitude" DECIMAL,
                "final_latitude" DECIMAL,
                "final_longitude" DECIMAL
              );`
        );

        await queryRunner.query(
            `CREATE INDEX idx_ride_created_at ON ride (created_at);
            CREATE INDEX idx_ride_finalized_at ON ride (finalized_at);
            CREATE INDEX idx_ride_rider_id ON ride (rider_id);
            CREATE INDEX idx_ride_driver_id ON ride (driver_id);`
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `DROP TABLE IF EXISTS ride;`
        );

        await queryRunner.query(
            `DROP INDEX IF EXISTS idx_ride_created_at;
            DROP INDEX IF EXISTS idx_ride_finalized_at;
            DROP INDEX IF EXISTS idx_ride_rider_id;
            DROP INDEX IF EXISTS idx_ride_driver_id;`
        );
    }

}
