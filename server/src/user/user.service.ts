import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { CurrentUser } from 'src/auth/dto/current-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  findAll(filters: Partial<User>, relations: string[] = []): Promise<User[]> {
    if (filters && Object.keys(filters).length > 0) {
      return this.userRepository.find({ where: filters, relations });
    }

    return this.userRepository.find({ relations });
  }

  async findOne(username: string, relations: string[] = []): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { username },
      relations,
    });

    if (!user) {
      throw new HttpException('User not found', 404);
    }

    return user;
  }

  async create(user: CreateUserDto): Promise<User> {
    if (await this.userExists({ username: user.username })) {
      throw new HttpException('Username already taken', 404);
    }
    const saltOrRounds = 10;
    user.password = await bcrypt.hash(user.password, saltOrRounds);

    return await this.userRepository.save(user);
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

  async userExists(filters: Partial<User>) {
    const users = await this.findAll(filters);
    return users.length > 0;
  }
}
