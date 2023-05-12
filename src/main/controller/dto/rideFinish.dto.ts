import { IsNotEmpty, IsNumber } from 'class-validator';

export class RideFinish {
  @IsNotEmpty()
  @IsNumber()
  rideId: number;
  @IsNotEmpty()
  @IsNumber()
  finalLatitude: number;
  @IsNotEmpty()
  @IsNumber()
  finalLongitude: number;
}
