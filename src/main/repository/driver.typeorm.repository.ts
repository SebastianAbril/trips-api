import { InjectEntityManager } from '@nestjs/typeorm';
import { Driver } from '../entity/driver.entity';
import { DriverRepository } from './driver.repository';
import { EntityManager } from 'typeorm';
import { NotFoundException } from '@nestjs/common';

export class DriverTypeORMRepository implements DriverRepository {
  private entityManager: EntityManager;

  constructor(
    @InjectEntityManager()
    entityManager: EntityManager,
  ) {
    this.entityManager = entityManager;
  }

  save(driver: Driver): Promise<Driver> {
    return this.entityManager.save<Driver>(driver);
  }

  async getNearestDriver(
    initialLatitude: number,
    initialLongitude: number,
  ): Promise<Driver> {
    const findNearestDriverQuery = `
    SELECT dr.*, sqrt((dr.latitude - $1) * (dr.latitude - $1) + (dr.longitude - $2) * (dr.longitude - $2)) AS distance
    FROM driver as dr
    ORDER BY distance ASC
    LIMIT 1
  `;
    const rawResults: any[] = await this.entityManager.query<any[]>(
      findNearestDriverQuery,
      [initialLatitude, initialLongitude],
    );

    if (rawResults === null || rawResults.length === 0) {
      throw new NotFoundException('The driver does not exist');
    }

    return rawResults.map((row) => {
      const driver = new Driver();
      driver.id = row.id;
      driver.name = row.name;
      driver.lastname = row.lastname;
      driver.email = row.email;
      driver.latitude = parseFloat(row.latitude);
      driver.longitude = parseFloat(row.longitude);

      return driver;
    })[0];
  }
}
