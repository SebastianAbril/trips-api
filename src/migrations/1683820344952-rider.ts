import { MigrationInterface, QueryRunner } from "typeorm"

export class Rider1683820344952 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `CREATE TABLE rider (
                id SERIAL PRIMARY KEY,
                name VARCHAR,
                lastname VARCHAR,
                email VARCHAR,
                latitude DECIMAL,
                longitude DECIMAL
              );`
        );

        await queryRunner.query(
            `CREATE INDEX email_index_rider ON rider (email);`
        )

        await queryRunner.query(
            `INSERT INTO rider (name, lastname, email, latitude, longitude)
            VALUES ('Alice', 'Garcia', 'alice.garcia@example.com', 37.7749, -122.4194),
                ('Bob', 'Lee', 'bob.lee@example.com', 40.7128, -74.0060),
                ('Carla', 'Perez', 'carla.perez@example.com', 51.5074, -0.1278),
                ('David', 'Kim', 'david.kim@example.com', 35.6895, 139.6917),
                ('Emma', 'Wang', 'emma.wang@example.com', 31.2304, 121.4737),
                ('Frank', 'Lopez', 'frank.lopez@example.com', 19.4326, -99.1332);
            `
            
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `DROP INDEX IF EXISTS email_index_ride`
        );

        await queryRunner.query(
            `DROP TABLE IF EXISTS rider`
        );
    }

}
