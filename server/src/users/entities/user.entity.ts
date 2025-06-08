import { Channel } from 'src/channel/entities/channel.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToMany,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  password: string;

  @Column()
  email: string;

  @OneToMany(() => Channel, (channel) => channel.owner)
  ownedChannels: Channel[];

  @ManyToMany(() => Channel, (channel) => channel.members)
  joinedChannels: Channel[];
}
