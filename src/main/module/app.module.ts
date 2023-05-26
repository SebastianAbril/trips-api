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
import { PaymentService } from '../service/payment.service';
import { HttpModule } from '@nestjs/axios';
import { DriverTypeORMRepository } from '../repository/driver.typeorm.repository';
import { RiderTypeORMRepostiory } from '../repository/rider.typeorm.repository';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      ...(databaseProperties as any),
      entities: [Driver, Rider, Ride],
    }),
    TypeOrmModule.forFeature([Ride]),
    HttpModule,
  ],
  controllers: [RiderController, DriverController],
  providers: [
    RiderService,
    DriverService,
    PaymentService,
    {
      provide: 'DriverRepository',
      useClass: DriverTypeORMRepository,
    },
    {
      provide: 'RiderRepository',
      useClass: RiderTypeORMRepostiory,
    },
  ],
})
export class AppModule {}
