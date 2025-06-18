import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { CurrentUser } from 'src/auth/dto/current-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  findAll(filters: Partial<User>): Promise<User[]> {
    if (filters && Object.keys(filters).length > 0) {
      return this.userRepository.find({ where: filters });
    }

    return this.userRepository.find();
  }

  async findOne(username: string): Promise<User> {
    const user = await this.userRepository.findOne({ where: { username } });

    if (!user) {
      throw new HttpException('User not found', 404);
    }

    return user;
  }

  async create(user: CreateUserDto): Promise<User> {
    const existingUser = await this.findAll({ username: user.username });
    if (existingUser.length) {
      throw new HttpException('Username already taken', 404);
    }

    return await this.userRepository.save({
      ...user,
      ownedChannels: [],
      joinedChannels: [],
      messages: [],
    });
  }

  async update(currentUser: CurrentUser, newUser: UpdateUserDto) {
    const user = await this.findOne(currentUser.username);

    return this.userRepository.update(user.id, newUser);
  }

  async remove(id: number) {
    const result = await this.userRepository.delete(id);

    if (result.affected == 0) {
      throw new Error(`User with id ${id} not found`);
    }

    return result;
  }
}
