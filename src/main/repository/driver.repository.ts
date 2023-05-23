import { Driver } from '../entity/driver.entity';

export interface DriverRepository {
  getNearestDriver(
    initialLatitude: number,
    initialLongitude: number,
  ): Promise<Driver>;
}
