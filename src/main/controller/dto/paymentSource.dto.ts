import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class PaymentSourceRequest {
  @ApiProperty({
    description: "The rider's id",
    example: 1,
  })
  @IsNotEmpty()
  @IsNumber()
  riderId: number;

  @ApiProperty({
    description: 'The tokenized Card of the rider.',
    example: 'tok_test_2345_dfn45i457h45994h9233ljnfo',
  })
  @IsNotEmpty()
  @IsString()
  tokenizedCard: string;
}
