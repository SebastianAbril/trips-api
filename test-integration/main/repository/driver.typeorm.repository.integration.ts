import { Test } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Driver } from '../../../src/main/entity/driver.entity';
import { databaseProperties } from '../../../src/main/module/database';
import { DriverTypeORMRepository } from '../../../src/main/repository/driver.typeorm.repository';
import { TestDBHelper } from './test.db.helper';

describe('DriverTypeORMRepository', () => {
  let driverTypeORMRepository: DriverTypeORMRepository;
  let testDBHelper: TestDBHelper;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot({
          ...(databaseProperties as any),
          entities: [Driver],
        }),
      ],
      providers: [TestDBHelper, DriverTypeORMRepository],
    }).compile();

    driverTypeORMRepository = moduleRef.get<DriverTypeORMRepository>(
      DriverTypeORMRepository,
    );

    testDBHelper = moduleRef.get<TestDBHelper>(TestDBHelper);
  });

  beforeEach(async () => {
    await testDBHelper.cleanTable('driver');
  });

  test('should save a driver', async () => {
    const driver = new Driver();
    driver.email = 'jhon@gmail.com';
    driver.name = 'Jhon';
    driver.lastname = 'Doe';
    driver.latitude = 45.699;
    driver.longitude = 23.5678;

    const driverBD = await driverTypeORMRepository.save(driver);

    expect(driverBD.id).not.toBeNull();
    expect(driverBD.name).toBe(driver.name);
    expect(driverBD.lastname).toBe(driver.lastname);
    expect(driverBD.longitude).toBe(driver.longitude);
    expect(driverBD.latitude).toBe(driver.latitude);
    expect(driverBD.email).toBe(driver.email);
  });

  test('should retutrn the nearest driver', async () => {
    let driver1 = new Driver();
    driver1.email = 'jhon@gmail.com';
    driver1.name = 'Jhon';
    driver1.lastname = 'Doe';
    driver1.latitude = 45;
    driver1.longitude = 23;

    driver1 = await driverTypeORMRepository.save(driver1);

    let driver2 = new Driver();
    driver2.email = 'jane@gmail.com';
    driver2.name = 'Jane';
    driver2.lastname = 'Doe';
    driver2.latitude = 50;
    driver2.longitude = 15;

    driver2 = await driverTypeORMRepository.save(driver2);

    const nearestDriver = await driverTypeORMRepository.getNearestDriver(
      49,
      16,
    );

    expect(nearestDriver.id).toBe(driver2.id);
    expect(nearestDriver.name).toBe(driver2.name);
    expect(nearestDriver.lastname).toBe(driver2.lastname);
    expect(nearestDriver.longitude).toBe(driver2.longitude);
    expect(nearestDriver.latitude).toBe(driver2.latitude);
    expect(nearestDriver.email).toBe(driver2.email);
  });
});
