import { Ride } from '../entity/ride.entity';
import { Rider } from '../entity/rider.entity';
import { DriverService } from './driver.service';
import { CreateTransactionResponse } from './payment.dto';

describe('DriverService', () => {
  let driverService: DriverService;

  const rideRepository = {
    save: jest.fn(),
    findOneBy: jest.fn(),
  };

  const paymentService = {
    createTransaction: jest.fn(),
  };

  beforeEach(() => {
    driverService = new DriverService(
      rideRepository as any,
      paymentService as any,
    );
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  describe('finishRide', () => {
    test('throw an error when ride doesnt exits', async () => {
      const rideId = 1;
      const finalLatitude = 20.3;
      const finalLongitude = 40.23;

      rideRepository.findOneBy.mockResolvedValueOnce(null);

      await expect(async () => {
        await driverService.finishRide(rideId, finalLatitude, finalLongitude);
      }).rejects.toThrow('The ride does not exist');
    });

    test('throw an error when the rider doesnt have paymentSourceId', async () => {
      const rideId = 1;
      const finalLatitude = 20.3;
      const finalLongitude = 40.23;
      const ride = new Ride();
      ride.rider = new Rider();
      ride.rider.paymentSourceId = null;

      rideRepository.findOneBy.mockResolvedValueOnce(ride);

      await expect(async () => {
        await driverService.finishRide(rideId, finalLatitude, finalLongitude);
      }).rejects.toThrow('The rider does have a payment source');
    });

    test('should save a finish ride', async () => {
      const rideId = 1;
      const finalLatitude = 20.3;
      const finalLongitude = 40.23;
      const ride = new Ride();
      ride.initialLatitude = 30.44;
      ride.initialLongitude = 45.2;
      ride.createdAt = new Date();
      ride.rider = new Rider();
      ride.rider.paymentSourceId = 9876;

      const createTransactionResponse: CreateTransactionResponse = {
        data: {
          id: 'any_id',
          status: 'PENDING',
        },
      };

      rideRepository.findOneBy.mockResolvedValueOnce(ride);
      paymentService.createTransaction.mockResolvedValueOnce(
        createTransactionResponse,
      );

      await driverService.finishRide(rideId, finalLatitude, finalLongitude);

      expect(rideRepository.save).toHaveBeenCalledTimes(1);
      expect(rideRepository.save).toHaveBeenCalledWith(
        expect.objectContaining({
          rider: ride.rider,
          initialLatitude: ride.initialLatitude,
          initialLongitude: ride.initialLongitude,
          paymentId: createTransactionResponse.data.id,
          paymentStatus: createTransactionResponse.data.status,
        }),
      );
    });
  });
});
