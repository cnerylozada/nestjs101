import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('coffees')
export class Coffee {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  @Column()
  description: string;

  @Column({ type: 'numeric' })
  price: number;

  @Column({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @OneToMany(() => Flavor, (flavor) => flavor.coffee, { cascade: true })
  flavors: Flavor[];
}

@Entity('flavors')
export class Flavor {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  flavor: string;

  @ManyToOne(() => Coffee, (coffee) => coffee.flavors)
  coffee: Coffee;
}
