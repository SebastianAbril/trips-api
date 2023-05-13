import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Ride } from '../entity/ride.entity';
import { Rider } from '../entity/rider.entity';
import { Driver } from '../entity/driver.entity';
import { Repository } from 'typeorm';
import { PaymentService } from './payment.service';

@Injectable()
export class RiderService {
  private rideRepository: Repository<Ride>;
  private riderRepository: Repository<Rider>;
  private driverRepository: Repository<Driver>;
  private paymentService: PaymentService;

  constructor(
    @InjectRepository(Ride) rideRepository: Repository<Ride>,
    @InjectRepository(Rider) riderRepository: Repository<Rider>,
    @InjectRepository(Driver) driverRepository: Repository<Driver>,
    paymentService: PaymentService,
  ) {
    this.rideRepository = rideRepository;
    this.riderRepository = riderRepository;
    this.driverRepository = driverRepository;
    this.paymentService = paymentService;
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

    const driver = await this.getNearestDriver(
      initialLatitude,
      initialLongitude,
    );

    const ride = new Ride();
    ride.rider = rider;
    ride.driver = driver;
    ride.createdAt = new Date();
    ride.initialLatitude = initialLatitude;
    ride.initialLongitude = initialLongitude;

    return this.rideRepository.save(ride);
  }

  private async getNearestDriver(
    initialLatitude: number,
    initialLongitude: number,
  ): Promise<Driver> {
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

    return drivers[0];
  }

  async createPaymentSource(
    riderId: number,
    tokenizedCard: string,
  ): Promise<Rider> {
    const rider = await this.riderRepository.findOneBy({ id: riderId });
    if (rider === null) {
      throw new NotFoundException('The rider does not exist');
    }

    const acceptanceToken = await this.paymentService.getAcceptanceToken();
    const paymentSourceId = await this.paymentService.createPaymentSource(
      tokenizedCard,
      rider.email,
      acceptanceToken,
    );

    rider.paymentSourceId = paymentSourceId;

    return this.riderRepository.save(rider);
  }
}
