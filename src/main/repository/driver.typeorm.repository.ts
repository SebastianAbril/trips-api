import { InjectRepository } from '@nestjs/typeorm';
import { Driver } from '../entity/driver.entity';
import { DriverRepository } from './driver.repository';
import { Repository } from 'typeorm';
import { NotFoundException } from '@nestjs/common';

export class DriverTypeORMRepository implements DriverRepository {
  private driverRepository: Repository<Driver>;

  constructor(@InjectRepository(Driver) driverRepository: Repository<Driver>) {
    this.driverRepository = driverRepository;
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
    const drivers: Driver[] = await this.driverRepository.query(
      findNearestDriverQuery,
      [initialLatitude, initialLongitude],
    );

    if (drivers === null || drivers.length === 0) {
      throw new NotFoundException('The driver does not exist');
    }

    return drivers[0];
  }
}
