import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Driver {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  lastname: string;

  @Column()
  email: string;

  @Column({ type: 'decimal', precision: 10, scale: 4 })
  latitude: number;

  @Column({ type: 'decimal', precision: 10, scale: 4 })
  longitude: number;
}
