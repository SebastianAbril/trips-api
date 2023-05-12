import { Driver } from '../entity/driver.entity';
import { Rider } from '../entity/rider.entity';
import { RiderService } from './rider.service';

describe('RiderService', () => {
  let riderService: RiderService;
  const riderRepository = {
    findOneBy: jest.fn(),
  };
  const driverRepository = {
    query: jest.fn(),
  };
  const rideRepository = {
    save: jest.fn(),
  };

  beforeEach(() => {
    riderService = new RiderService(
      rideRepository as any,
      riderRepository as any,
      driverRepository as any,
    );
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  describe('request ride', () => {
    test('throw an error when rider doesnt exits', async () => {
      const riderId = 1;
      const initialLatitude = 23.3045;
      const initialLongitude = 22.1675;

      riderRepository.findOneBy.mockResolvedValueOnce(null);

      await expect(async () => {
        await riderService.requestRide(
          riderId,
          initialLatitude,
          initialLongitude,
        );
      }).rejects.toThrow('The rider does not exist');
    });

    test('throw an error when driver doesnt exits', async () => {
      const riderId = 1;
      const initialLatitude = 23.3045;
      const initialLongitude = 22.1675;
      const rider = new Rider();

      riderRepository.findOneBy.mockResolvedValueOnce(rider);
      driverRepository.query.mockResolvedValueOnce(null);

      await expect(async () => {
        await riderService.requestRide(
          riderId,
          initialLatitude,
          initialLongitude,
        );
      }).rejects.toThrow('The driver does not exist');
    });

    test('should save a ride', async () => {
      const riderId = 1;
      const initialLatitude = 23.3045;
      const initialLongitude = 22.1675;
      const rider = new Rider();
      rider.id = 7;
      const driver = new Driver();
      driver.id = 9;

      riderRepository.findOneBy.mockResolvedValueOnce(rider);
      driverRepository.query.mockResolvedValueOnce([driver]);

      await riderService.requestRide(
        riderId,
        initialLatitude,
        initialLongitude,
      );

      expect(rideRepository.save).toHaveBeenCalledTimes(1);
      expect(rideRepository.save).toHaveBeenCalledWith(
        expect.objectContaining({
          rider: rider,
          driver: driver,
          initialLatitude: initialLatitude,
          initialLongitude: initialLongitude,
        }),
      );
    });
  });
});
