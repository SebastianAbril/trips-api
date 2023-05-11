import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  CreateDateColumn,
  JoinColumn,
} from 'typeorm';
import { Rider } from './rider.entity';
import { Driver } from './driver.entity';

@Entity()
export class Ride {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Rider, { eager: false })
  @JoinColumn({ name: 'rider_id' })
  rider: Rider;

  @ManyToOne(() => Driver, { eager: false })
  @JoinColumn({ name: 'driver_id' })
  driver: Driver;

  @Column({ name: 'created_at' })
  createdAt: Date;

  @Column({ name: 'finalized_at' })
  finalizedAt: Date;

  @Column({ name: 'total_price' })
  totalPrice: number;

  @Column({ name: 'from_latitude', type: 'decimal', precision: 10, scale: 4 })
  fromLatitude: number;

  @Column({ name: 'from_longitude', type: 'decimal', precision: 10, scale: 4 })
  fromLongitude: number;

  @Column({ name: 'to_latitude', type: 'decimal', precision: 10, scale: 4 })
  toLatitude: number;

  @Column({ name: 'to_longitude', type: 'decimal', precision: 10, scale: 4 })
  toLongitude: number;
}
