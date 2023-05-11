import { Controller, Get } from '@nestjs/common';
import { Driver } from '../entity/driver.entity';
import { DriverService } from '../service/driver.service';

@Controller('/driver')
export class DriverController {
  private driverService: DriverService;

  constructor(driverService: DriverService) {
    this.driverService = driverService;
  }

  @Get()
  async findAll(): Promise<Driver[]> {
    const drivers = await this.driverService.findAll();
    return drivers;
  }
}
