import { Controller, Post, Body } from '@nestjs/common';
import { RiderService } from '../service/rider.service';
import { RideRequest } from './dto/rideRequest.dto';
import { Ride } from '../entity/ride.entity';
import { PaymentSourceRequest } from './dto/paymentSource.dto';
import { Rider } from '../entity/rider.entity';

@Controller('/rider')
export class RiderController {
  private riderService: RiderService;

  constructor(riderService: RiderService) {
    this.riderService = riderService;
  }

  @Post('/request')
  async rideRequest(@Body() request: RideRequest): Promise<Ride> {
    return this.riderService.requestRide(
      request.riderId,
      request.initialLatitude,
      request.initialLongitude,
    );
  }

  @Post('/create-payment-source')
  async createPaymentSource(
    @Body() request: PaymentSourceRequest,
  ): Promise<Rider> {
    return this.riderService.createPaymentSource(
      request.riderId,
      request.tokenizedCard,
    );
  }
}
