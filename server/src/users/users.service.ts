import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async create(user: CreateUserDto): Promise<User | null> {
    return this.userRepository.save(user);
  }

  async findOne(username: string): Promise<User | null> {
    return this.userRepository.findOne({ where: { username } });
  }
}
