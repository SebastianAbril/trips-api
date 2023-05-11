import { Controller, Post, Body } from '@nestjs/common';
import { RideService } from '../service/ride.service';
import { RideRequest } from './dto/rideRequest.dto';
import { Ride } from '../entity/ride.entity';

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
      request.fromLatitude,
      request.fromLongitude,
      request.toLatitude,
      request.toLongitude,
    );
  }
}
