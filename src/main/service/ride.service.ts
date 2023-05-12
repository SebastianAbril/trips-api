import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Ride } from '../entity/ride.entity';
import { Rider } from '../entity/rider.entity';
import { Driver } from '../entity/driver.entity';
import { Repository } from 'typeorm';

const BASE_FEE = 3500;
const DISTANCE_FEE = 1000;
const TIME_FEE = 200;

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
    initialLatitude: number,
    initialLongitude: number,
  ): Promise<Ride> {
    const rider = await this.riderRepository.findOneBy({ id: riderId });

    if (rider === null) {
      throw new NotFoundException('The rider does not exist');
    }

    const findNearestDriverQuery = `
      SELECT dr.*, sqrt((dr.latitude - $1) * (dr.latitude - $1) + (dr.longitude - $2) * (dr.longitude - $2)) AS distance
      FROM driver as dr
      ORDER BY distance ASC
      LIMIT 1
    `;
    const drivers: Driver[] = await this.driverRepository.query(
      findNearestDriverQuery,
      [initialLatitude, initialLongitude],
    );

    if (drivers === null || drivers.length === 0) {
      throw new NotFoundException('The driver does not exist');
    }

    const driver = drivers[0];

    const ride = new Ride();
    ride.rider = rider;
    ride.driver = driver;
    ride.createdAt = new Date();
    ride.initialLatitude = initialLatitude;
    ride.initialLongitude = initialLongitude;

    return this.rideRepository.save(ride);
  }

  async finishRide(
    rideId: number,
    finalLatitude: number,
    finalLongitude: number,
  ): Promise<Ride> {
    const ride = await this.rideRepository.findOneBy({ id: rideId });
    if (ride === null) {
      throw new NotFoundException('The ride does not exist');
    }

    ride.finalLatitude = finalLatitude;
    ride.finalLongitude = finalLongitude;
    ride.finalizedAt = new Date();

    const distance = Math.sqrt(
      Math.pow(ride.finalLatitude - ride.initialLatitude, 2) +
        Math.pow(ride.finalLongitude - ride.initialLongitude, 2),
    );
    const minutesTraveled = Math.round(
      (ride.finalizedAt.getTime() - ride.createdAt.getTime()) / 60000,
    );

    let totalPrice = BASE_FEE;
    totalPrice += minutesTraveled * TIME_FEE;
    totalPrice += distance * DISTANCE_FEE;

    ride.totalPrice = totalPrice;

    return this.rideRepository.save(ride);
  }
}
