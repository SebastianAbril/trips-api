import { IsNotEmpty, IsNumber } from 'class-validator';

export class RideRequest {
  @IsNotEmpty()
  @IsNumber()
  riderId: number;
  @IsNotEmpty()
  @IsNumber()
  initialLatitude: number;
  @IsNotEmpty()
  @IsNumber()
  initialLongitude: number;
}
