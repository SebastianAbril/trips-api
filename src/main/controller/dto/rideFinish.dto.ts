import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class RideFinish {
  @ApiProperty({
    description: "The ride's id",
    example: 1,
  })
  @IsNotEmpty()
  @IsNumber()
  rideId: number;

  @ApiProperty({
    description:
      "The final latitude of the Rider, which is the position's latitude where the Ride is finished",
    example: 6254.0313,
  })
  @IsNotEmpty()
  @IsNumber()
  finalLatitude: number;

  @ApiProperty({
    description:
      "The final longitude of the Rider, which is the position's longitude where the Ride is finished",
    example: 6364.7421,
  })
  @IsNotEmpty()
  @IsNumber()
  finalLongitude: number;
}
