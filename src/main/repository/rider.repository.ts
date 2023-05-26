import { Rider } from '../entity/rider.entity';

export interface RiderRepository {
  save(rider: Rider): Promise<Rider>;

  findOneBy(id: number): Promise<Rider>;
}
