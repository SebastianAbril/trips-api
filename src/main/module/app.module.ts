import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Driver } from '../entity/driver.entity';
import { Rider } from '../entity/rider.entity';
import { Ride } from '../entity/ride.entity';
import { RiderController } from '../controller/rider.controller';
import { RiderService } from '../service/rider.service';
import { DriverController } from '../controller/driver.controller';
import { DriverService } from '../service/driver.service';
import { databaseProperties } from './database';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      ...(databaseProperties as any),
      entities: [Driver, Rider, Ride],
    }),
    TypeOrmModule.forFeature([Driver, Rider, Ride]),
  ],
  controllers: [RiderController, DriverController],
  providers: [RiderService, DriverService],
})
export class AppModule {}
