import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class RideRequest {
  @ApiProperty({
    description: "The rider's id",
    example: 2,
  })
  @IsNotEmpty()
  @IsNumber()
  riderId: number;

  @ApiProperty({
    description:
      "The initial latitude of the Rider, which is the position's latitude where the Rider request the ride",
    example: 3451.0313,
  })
  @IsNotEmpty()
  @IsNumber()
  initialLatitude: number;

  @ApiProperty({
    description:
      "The initial longitude of the Rider, which is the position's longitude where the Rider request the ride",
    example: 5214.3217,
  })
  @IsNotEmpty()
  @IsNumber()
  initialLongitude: number;
}
