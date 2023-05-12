import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Driver } from '../entity/driver.entity';
import { Rider } from '../entity/rider.entity';
import { Ride } from '../entity/ride.entity';
import { RideController } from '../controller/ride.controller';
import { RideService } from '../service/ride.service';
import { databaseProperties } from './database';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      ...(databaseProperties as any),
      entities: [Driver, Rider, Ride],
    }),
    TypeOrmModule.forFeature([Driver, Rider, Ride]),
  ],
  controllers: [RideController],
  providers: [RideService],
})
export class AppModule {}
