import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Ride } from '../entity/ride.entity';
import { Repository } from 'typeorm';
import { PaymentService } from './payment.service';
import { v4 as uuidv4 } from 'uuid';

const BASE_FEE = 3500;
const DISTANCE_FEE = 1000;
const TIME_FEE = 200;

@Injectable()
export class DriverService {
  private rideRepository: Repository<Ride>;
  private paymentService: PaymentService;

  constructor(
    @InjectRepository(Ride) rideRepository: Repository<Ride>,
    paymentService: PaymentService,
  ) {
    this.rideRepository = rideRepository;
    this.paymentService = paymentService;
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

    if (ride.rider.paymentSourceId === null) {
      throw new NotFoundException('The rider does have a payment source');
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

    ride.totalPrice = Math.round(totalPrice);
    ride.reference = uuidv4();

    const response = await this.paymentService.createTransaction(
      ride.totalPrice,
      ride.rider.email,
      ride.reference,
      ride.rider.paymentSourceId,
    );

    ride.paymentId = response.data.id;
    ride.paymentStatus = response.data.status;

    return this.rideRepository.save(ride);
  }
}
