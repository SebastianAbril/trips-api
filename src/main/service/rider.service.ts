import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Ride } from '../entity/ride.entity';
import { Rider } from '../entity/rider.entity';
import { Repository } from 'typeorm';
import { PaymentService } from './payment.service';
import { DriverRepository } from '../repository/driver.repository';
import { RiderRepository } from '../repository/rider.repository';

@Injectable()
export class RiderService {
  private rideRepository: Repository<Ride>;
  private riderRepository: RiderRepository;
  private driverRepository: DriverRepository;
  private paymentService: PaymentService;

  constructor(
    @InjectRepository(Ride) rideRepository: Repository<Ride>,
    @Inject('RiderRepository') riderRepository: RiderRepository,
    @Inject('DriverRepository') driverRepository: DriverRepository,
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
    const rider = await this.riderRepository.findOneBy(riderId);
    if (rider === null) {
      throw new NotFoundException('The rider does not exist');
    }

    const driver = await this.driverRepository.getNearestDriver(
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

  async createPaymentSource(
    riderId: number,
    tokenizedCard: string,
  ): Promise<Rider> {
    const rider = await this.riderRepository.findOneBy(riderId);
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

  async save(name: string, lastname: string, email: string): Promise<Rider> {
    const rider = new Rider(); //plainToClass()
    rider.name = name;
    rider.lastname = lastname;
    rider.email = email;
    rider.paymentSourceId = null;

    return await this.riderRepository.save(rider);
  }
}
