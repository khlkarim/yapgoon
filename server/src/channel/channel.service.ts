import {
  HttpException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateChannelDto } from './dto/create-channel.dto';
import { UpdateChannelDto } from './dto/update-channel.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Channel } from './entities/channel.entity';
import { Repository } from 'typeorm';
import { UserService } from 'src/user/user.service';
import { CurrentUser } from 'src/auth/dto/current-user.dto';

@Injectable()
export class ChannelService {
  constructor(
    @InjectRepository(Channel)
    private channelsRepository: Repository<Channel>,
    private userService: UserService,
  ) {}

  findAll(filters?: Partial<Channel>): Promise<Channel[]> {
    if (filters && Object.keys(filters).length > 0) {
      filters.public = true;
      return this.channelsRepository.find({ where: filters });
    }

    return this.channelsRepository.find();
  }

  async findOne(id: number): Promise<Channel> {
    const channel = await this.channelsRepository.findOne({ where: { id } });

    if (!channel) {
      throw new HttpException(`Channel with id ${id} not found`, 404);
    }

    return channel;
  }

  async findJoined(currentUser: CurrentUser) {
    const user = await this.userService.findOne(currentUser.username);

    return this.channelsRepository.find({
      where: {
        members: user,
      },
    });
  }

  async findOwned(currentUser: CurrentUser) {
    const user = await this.userService.findOne(currentUser.username);

    return this.channelsRepository.find({
      where: {
        owner: user,
      },
    });
  }

  async create(createChannelDto: CreateChannelDto, currentUser: CurrentUser) {
    const user = await this.userService.findOne(currentUser.username);
    const channel = { ...createChannelDto, members: [user], owner: user };

    const existingChannel = await this.findAll({ name: channel.name });
    if (existingChannel.length > 0) {
      throw new HttpException('Channel name already exists', 400);
    }

    return this.channelsRepository.save(channel);
  }

  async update(
    id: number,
    updateChannelDto: UpdateChannelDto,
    currentUser: CurrentUser,
  ) {
    const user = await this.userService.findOne(currentUser.username);
    const channel = await this.findOne(id);

    if (channel.owner.username !== user.username) {
      throw new UnauthorizedException("User doesn't own the channel");
    }

    if (updateChannelDto.name) {
      const existingChannel = await this.findAll({
        name: updateChannelDto.name,
      });
      if (existingChannel.length > 0) {
        throw new HttpException('Channel name already exists', 400);
      }
    }

    return this.channelsRepository.update(id, updateChannelDto);
  }

  async join(id: number, currentUser: CurrentUser) {
    const user = await this.userService.findOne(currentUser.username);
    const channel = await this.findOne(id);

    if (!channel.members.find((member) => member.id === user.id)) {
      channel.members.push(user);
      await this.channelsRepository.save(channel);
    }
    return channel;
  }

  async leave(id: number, currentUser: CurrentUser) {
    const user = await this.userService.findOne(currentUser.username);
    const channel = await this.findOne(id);

    channel.members = channel.members.filter((member) => member.id !== user.id);
    await this.channelsRepository.save(channel);

    return channel;
  }

  async remove(id: number, currentUser: CurrentUser) {
    const user = await this.userService.findOne(currentUser.username);
    const channel = await this.findOne(id);

    if (channel.owner.username !== user.username) {
      throw new UnauthorizedException("User doesn't own the channel");
    }

    const result = await this.channelsRepository.delete(id);
    return result;
  }
}
