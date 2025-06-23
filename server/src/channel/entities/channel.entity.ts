import { Message } from 'src/chat/entities/message.entity';
import { User } from 'src/user/entities/user.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  ManyToMany,
  CreateDateColumn,
  JoinTable,
  OneToMany,
} from 'typeorm';
import {
  IsString,
  IsNotEmpty,
  IsBoolean,
  IsOptional,
  IsArray,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

@Entity()
export class Channel {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  @IsString()
  @IsNotEmpty()
  name: string;

  @Column()
  @IsString()
  @IsNotEmpty()
  description: string;

  @Column({ type: 'boolean' })
  @IsBoolean()
  public: boolean;

  @CreateDateColumn({ update: false })
  @IsOptional()
  createdAt: Date;

  @ManyToOne(() => User, (user) => user.ownedChannels)
  @ValidateNested()
  @Type(() => User)
  owner: User;

  @ManyToMany(() => User, (user) => user.joinedChannels)
  @JoinTable()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => User)
  members: User[];

  @OneToMany(() => Message, (message) => message.channel, { eager: true })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => Message)
  messages: Message[];
}
