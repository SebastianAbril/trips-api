import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Rider {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  lastname: string;

  @Column()
  email: string;

  @Column({ name: 'payment_source_id' })
  paymentSourceId: number;
}
