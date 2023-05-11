import { MigrationInterface, QueryRunner } from "typeorm"

export class Driver1683757828110 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `CREATE TABLE driver (
                id SERIAL PRIMARY KEY,
                name VARCHAR,
                lastname VARCHAR,
                email VARCHAR,
                latitude DECIMAL,
                longitude DECIMAL
            );`
        );

        await queryRunner.query(
            `CREATE INDEX idx_driver_email ON driver (email);`
        );

        await queryRunner.query(
            `INSERT INTO driver (name, lastname, email, latitude, longitude)
            VALUES
                ('John', 'Doe', 'john.doe@example.com', 40.7128, -74.0060),
                ('Jane', 'Doe', 'jane.doe@example.com', 37.7749, -122.4194),
                ('Alice', 'Smith', 'alice.smith@example.com', 51.5074, -0.1278),
                ('Bob', 'Johnson', 'bob.johnson@example.com', 34.0522, -118.2437),
                ('Eve', 'Williams', 'eve.williams@example.com', 35.6895, 139.6917);
            `
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {

        await queryRunner.query(
            `DROP INDEX IF EXISTS email_index`
        );

        await queryRunner.query(
            `DROP TABLE IF EXISTS driver`
        );
    }

    

}

