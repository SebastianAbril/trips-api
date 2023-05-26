import { EntityManager } from 'typeorm';
import { Rider } from '../entity/rider.entity';
import { RiderRepository } from './rider.repository';
import { InjectEntityManager } from '@nestjs/typeorm';

export class RiderTypeORMRepostiory implements RiderRepository {
  private entityManager: EntityManager;

  constructor(
    @InjectEntityManager()
    entityManager: EntityManager,
  ) {
    this.entityManager = entityManager;
  }

  save(rider: Rider): Promise<Rider> {
    return this.entityManager.save<Rider>(rider);
  }

  findOneBy(id: number): Promise<Rider> {
    return this.entityManager.findOneBy(Rider, { id: id });
  }
}
