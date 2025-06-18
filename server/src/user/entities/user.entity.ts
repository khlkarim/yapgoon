import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToMany,
} from 'typeorm';
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';
import { Channel } from 'src/channel/entities/channel.entity';
import { Message } from 'src/chat/entities/message.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  @IsNotEmpty()
  @IsString()
  username: string;

  @Column()
  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  password: string;

  @Column()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @OneToMany(() => Channel, (channel) => channel.owner)
  ownedChannels: Channel[];

  @ManyToMany(() => Channel, (channel) => channel.members)
  joinedChannels: Channel[];

  @OneToMany(() => Message, (message) => message.owner)
  messages: Message[];
}
