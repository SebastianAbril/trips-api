import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Rider } from './rider.entity';
import { Driver } from './driver.entity';

@Entity()
export class Ride {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Rider, { eager: true })
  @JoinColumn({ name: 'rider_id' })
  rider: Rider;

  @ManyToOne(() => Driver, { eager: true })
  @JoinColumn({ name: 'driver_id' })
  driver: Driver;

  @Column({ name: 'created_at' })
  createdAt: Date;

  @Column({ name: 'finalized_at' })
  finalizedAt: Date;

  @Column({ name: 'total_price' })
  totalPrice: number;

  @Column({
    name: 'initial_latitude',
    type: 'decimal',
    precision: 10,
    scale: 4,
  })
  initialLatitude: number;

  @Column({
    name: 'initial_longitude',
    type: 'decimal',
    precision: 10,
    scale: 4,
  })
  initialLongitude: number;

  @Column({ name: 'final_latitude', type: 'decimal', precision: 10, scale: 4 })
  finalLatitude: number;

  @Column({ name: 'final_longitude', type: 'decimal', precision: 10, scale: 4 })
  finalLongitude: number;
}
