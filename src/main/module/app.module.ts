import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Driver } from '../entity/driver.entity';
import { Rider } from '../entity/rider.entity';
import { Ride } from '../entity/ride.entity';
import { RideController } from '../controller/ride.controller';
import { RideService } from '../service/ride.service';
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: '127.0.0.1',
      port: 5432,
      username: 'trips_user',
      password: '123456',
      database: 'trips_db',
      entities: [Driver, Rider, Ride],
    }),
    TypeOrmModule.forFeature([Driver, Rider, Ride]),
  ],
  controllers: [RideController],
  providers: [RideService],
})
export class AppModule {}
