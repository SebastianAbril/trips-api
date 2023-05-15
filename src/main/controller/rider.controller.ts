import { Controller, Post, Body, HttpCode } from '@nestjs/common';
import { RiderService } from '../service/rider.service';
import { RideRequest } from './dto/rideRequest.dto';
import { Ride } from '../entity/ride.entity';
import { PaymentSourceRequest } from './dto/paymentSource.dto';
import { Rider } from '../entity/rider.entity';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Rider')
@Controller('/rider')
export class RiderController {
  private riderService: RiderService;

  constructor(riderService: RiderService) {
    this.riderService = riderService;
  }

  @ApiOperation({ description: 'This endpoint request a Ride' })
  @HttpCode(201)
  @ApiResponse({
    status: 201,
    description: 'The Ride has been requested and created sucessfully.',
  })
  @ApiResponse({
    status: 404,
    description: 'Not Found. The rider was not found',
  })
  @ApiResponse({
    status: 400,
    description: 'Bad Request.Check the Request parameters',
  })
  @Post('/request')
  async rideRequest(@Body() request: RideRequest): Promise<Ride> {
    return this.riderService.requestRide(
      request.riderId,
      request.initialLatitude,
      request.initialLongitude,
    );
  }

  @ApiOperation({
    description: 'This endpoint creates a Payment Source for the Rider',
  })
  @HttpCode(201)
  @ApiResponse({
    status: 201,
    description: 'The Payment Source was created sucessfully',
  })
  @ApiResponse({
    status: 404,
    description: 'Not Found. The rider id does not exist',
  })
  @ApiResponse({
    status: 400,
    description:
      'Bad Request.Check the Request parameters or the Token is invalid',
  })
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
