import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  findAll(filters: Partial<User>) {
    if (filters && Object.keys(filters).length > 0) {
      return this.userRepository.find({ where: filters });
    }

    return this.userRepository.find();
  }

  findOne(username: string): Promise<User | null> {
    return this.userRepository.findOne({ where: { username } });
  }

  create(user: CreateUserDto): Promise<User | null> {
    return this.userRepository.save(user);
  }

  update(id: number, user: UpdateUserDto) {
    return this.userRepository.update(id, user);
  }

  async remove(id: number) {
    const result = await this.userRepository.delete(id);
    if (result.affected == 0) {
      throw new Error(`User with id ${id} not found`);
    }
    return result;
  }
}
