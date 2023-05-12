import { Controller, Post, Body } from '@nestjs/common';
import { RideService } from '../service/ride.service';
import { RideRequest } from './dto/rideRequest.dto';
import { Ride } from '../entity/ride.entity';
import { RideFinish } from './dto/rideFinish.dto';

@Controller('/ride')
export class RideController {
  private rideService: RideService;

  constructor(rideService: RideService) {
    this.rideService = rideService;
  }

  @Post('/request')
  async rideRequest(@Body() request: RideRequest): Promise<Ride> {
    return this.rideService.requestRide(
      request.riderId,
      request.initialLatitude,
      request.initialLongitude,
    );
  }

  @Post('/finish')
  async rideFinish(@Body() request: RideFinish): Promise<Ride> {
    return this.rideService.finishRide(
      request.rideId,
      request.finalLatitude,
      request.finalLongitude,
    );
  }
}
