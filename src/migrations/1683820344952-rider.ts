import { MigrationInterface, QueryRunner } from "typeorm"

export class Rider1683820344952 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `CREATE TABLE rider (
                id SERIAL PRIMARY KEY,
                name VARCHAR,
                lastname VARCHAR,
                email VARCHAR
              );`
        );

        await queryRunner.query(
            `CREATE INDEX idx_rider_email ON rider (email);`
        )

        await queryRunner.query(
            `INSERT INTO rider (name, lastname, email)
            VALUES ('Alice', 'Garcia', 'alice.garcia@example.com'),
                ('Bob', 'Lee', 'bob.lee@example.com'),
                ('Carla', 'Perez', 'carla.perez@example.com'),
                ('David', 'Kim', 'david.kim@example.com'),
                ('Emma', 'Wang', 'emma.wang@example.com'),
                ('Frank', 'Lopez', 'frank.lopez@example.com');
            `
            
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `DROP INDEX IF EXISTS idx_rider_email`
        );

        await queryRunner.query(
            `DROP TABLE IF EXISTS rider`
        );
    }

}
