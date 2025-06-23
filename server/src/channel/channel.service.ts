import {
  HttpException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateChannelDto } from './dto/create-channel.dto';
import { UpdateChannelDto } from './dto/update-channel.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Channel } from './entities/channel.entity';
import { FindOptionsWhere, Like, Repository } from 'typeorm';
import { UserService } from 'src/user/user.service';
import { CurrentUser } from 'src/auth/dto/current-user.dto';

@Injectable()
export class ChannelService {
  constructor(
    @InjectRepository(Channel)
    private channelsRepository: Repository<Channel>,
    private userService: UserService,
  ) {}

  findAll(
    filters?: Partial<Channel>,
    relations: string[] = [],
  ): Promise<Channel[]> {
    if (filters && Object.keys(filters).length > 0) {
      return this.channelsRepository.find({
        where: this.whereFromFilters(filters),
        relations,
      });
    }

    return this.channelsRepository.find({ relations });
  }

  async findOne(id: number, relations: string[] = []): Promise<Channel> {
    const channel = await this.channelsRepository.findOne({
      where: { id },
      relations,
    });

    if (!channel) {
      throw new HttpException(`Channel with id ${id} not found`, 404);
    }

    return channel;
  }

  async findJoined(currentUser: CurrentUser, filters?: Partial<Channel>) {
    const user = await this.userService.findOne(currentUser.username);

    return this.channelsRepository.find({
      where: { ...this.whereFromFilters(filters), members: [user] },
    });
  }

  async findOwned(currentUser: CurrentUser, filters?: Partial<Channel>) {
    const user = await this.userService.findOne(currentUser.username);

    return this.channelsRepository.find({
      where: { ...this.whereFromFilters(filters), owner: user },
    });
  }

  async create(createChannelDto: CreateChannelDto, currentUser: CurrentUser) {
    const user = await this.userService.findOne(currentUser.username);
    const channel = { ...createChannelDto, members: [user], owner: user };

    if (await this.channelExists({ name: channel.name })) {
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
    const channel = await this.findOne(id, ['owner']);

    if (channel.owner.username !== user.username) {
      throw new UnauthorizedException("User doesn't own the channel");
    }

    if (
      updateChannelDto.name &&
      (await this.channelExists({ name: updateChannelDto.name }))
    ) {
      throw new HttpException('Channel name already exists', 400);
    }

    return this.channelsRepository.update(id, updateChannelDto);
  }

  async join(id: number, currentUser: CurrentUser) {
    const user = await this.userService.findOne(currentUser.username);
    const channel = await this.findOne(id, ['members']);

    if (!channel.members.find((member) => member.id === user.id)) {
      channel.members.push(user);
      await this.channelsRepository.save(channel);
    }

    return channel;
  }

  async leave(id: number, currentUser: CurrentUser) {
    const user = await this.userService.findOne(currentUser.username);
    const channel = await this.findOne(id, ['members']);

    console.log(user.id);
    console.log(channel.id);

    channel.members = channel.members.filter((member) => member.id !== user.id);
    await this.channelsRepository.save(channel);

    return channel;
  }

  async remove(id: number, currentUser: CurrentUser) {
    const user = await this.userService.findOne(currentUser.username);
    const channel = await this.findOne(id, ['owner']);

    if (channel.owner.username !== user.username) {
      throw new UnauthorizedException("User doesn't own the channel");
    }

    const result = await this.channelsRepository.delete(id);
    return result;
  }

  async channelExists(filters: Partial<Channel>) {
    const channels = await this.findAll(filters);
    return channels.length > 0;
  }

  whereFromFilters(filters?: Partial<Channel>) {
    if (!filters) return {};

    const where: FindOptionsWhere<Channel> = {};

    if (filters.name) {
      where.name = Like(`%${filters.name}%`);
    }

    if (filters.description) {
      where.description = Like(`%${filters.description}%`);
    }

    if (filters.public !== undefined) {
      where.public = filters.public;
    }

    return where;
  }
}
