import { Controller, Post, Body, HttpCode } from '@nestjs/common';
import { DriverService } from '../service/driver.service';
import { Ride } from '../entity/ride.entity';
import { RideFinish } from './dto/rideFinish.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Driver')
@Controller('/driver')
export class DriverController {
  private driverService: DriverService;

  constructor(driverService: DriverService) {
    this.driverService = driverService;
  }

  @ApiOperation({ description: 'This endpoint finalizes a Ride' })
  @HttpCode(200)
  @ApiResponse({
    status: 200,
    description: 'The ride has finished sucessfully.',
  })
  @Post('/finish')
  async rideFinish(@Body() request: RideFinish): Promise<Ride> {
    return this.driverService.finishRide(
      request.rideId,
      request.finalLatitude,
      request.finalLongitude,
    );
  }
}
