import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Ride } from '../entity/ride.entity';
import { Rider } from '../entity/rider.entity';
import { Driver } from '../entity/driver.entity';
import { Repository } from 'typeorm';

@Injectable()
export class RideService {
  private rideRepository: Repository<Ride>;
  private riderRepository: Repository<Rider>;
  private driverRepository: Repository<Driver>;

  constructor(
    @InjectRepository(Ride) rideRepository: Repository<Ride>,
    @InjectRepository(Rider) riderRepository: Repository<Rider>,
    @InjectRepository(Driver) driverRepository: Repository<Driver>,
  ) {
    this.rideRepository = rideRepository;
    this.riderRepository = riderRepository;
    this.driverRepository = driverRepository;
  }

  async requestRide(
    riderId: number,
    fromLatitude: number,
    fromLongitude: number,
    toLatitude: number,
    toLongitude: number,
  ): Promise<Ride> {
    const rider = await this.riderRepository.findOneBy({ id: riderId });

    if (rider === null) {
      throw new NotFoundException('The rider does not exist');
    }

    // queda pendiente encontrar el driver mas cercano.
    const driver = await this.driverRepository.findOneBy({ id: 1 });
    if (driver === null) {
      throw new NotFoundException('The driver does not exist');
    }

    const ride = new Ride();
    ride.rider = rider;
    ride.driver = driver;
    ride.createdAt = new Date();
    ride.fromLatitude = fromLatitude;
    ride.fromLongitude = fromLongitude;
    ride.toLatitude = toLatitude;
    ride.toLongitude = toLongitude;

    return this.rideRepository.save(ride);
  }
}
