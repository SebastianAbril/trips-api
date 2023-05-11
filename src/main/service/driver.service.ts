import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Driver } from '../entity/driver.entity';

@Injectable()
export class DriverService {
  private driverRepository: Repository<Driver>;

  constructor(@InjectRepository(Driver) driverRepository: Repository<Driver>) {
    this.driverRepository = driverRepository;
  }

  async findAll(): Promise<Driver[]> {
    const drivers = await this.driverRepository.find();
    return drivers;
  }
}
