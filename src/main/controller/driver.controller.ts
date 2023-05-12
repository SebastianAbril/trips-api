import { Controller, Post, Body } from '@nestjs/common';
import { DriverService } from '../service/driver.service';
import { Ride } from '../entity/ride.entity';
import { RideFinish } from './dto/rideFinish.dto';

@Controller('/driver')
export class DriverController {
  private driverService: DriverService;

  constructor(driverService: DriverService) {
    this.driverService = driverService;
  }

  @Post('/finish')
  async rideFinish(@Body() request: RideFinish): Promise<Ride> {
    return this.driverService.finishRide(
      request.rideId,
      request.finalLatitude,
      request.finalLongitude,
    );
  }
}
