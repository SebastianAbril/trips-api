import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Ride } from '../entity/ride.entity';
import { Repository } from 'typeorm';

const BASE_FEE = 3500;
const DISTANCE_FEE = 1000;
const TIME_FEE = 200;

@Injectable()
export class DriverService {
  private rideRepository: Repository<Ride>;

  constructor(@InjectRepository(Ride) rideRepository: Repository<Ride>) {
    this.rideRepository = rideRepository;
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
