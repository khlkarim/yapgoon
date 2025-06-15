import { Injectable, UnauthorizedException } from '@nestjs/common';
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

  findAll(filters?: Partial<Channel>) {
    if (filters && Object.keys(filters).length > 0) {
      return this.channelsRepository.find({ where: filters });
    }
    return this.channelsRepository.find();
  }

  findOne(id: number) {
    return this.channelsRepository.findOne({ where: { id } });
  }

  async create(createChannelDto: CreateChannelDto, currentUser: CurrentUser) {
    const user = await this.userService.findOne(currentUser.username);
    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    const channelToSave = { ...createChannelDto, owner: user };
    return this.channelsRepository.save(channelToSave);
  }

  async update(
    id: number,
    updateChannelDto: UpdateChannelDto,
    user: CurrentUser,
  ) {
    const channel = await this.channelsRepository.findOne({ where: { id } });

    if (!channel) {
      throw new Error(`Channel with id ${id} not found`);
    }
    if (channel.owner.username !== user.username) {
      throw new UnauthorizedException("User doesn't own the channel");
    }

    return this.channelsRepository.update(id, updateChannelDto);
  }

  async join(id: number, currentUser: CurrentUser) {
    const channel = await this.channelsRepository.findOne({
      where: { id },
      relations: ['members'],
    });
    const user = await this.userService.findOne(currentUser.username);

    if (!user) {
      throw new UnauthorizedException('User not found');
    }
    if (!channel) {
      throw new Error(`Channel with id ${id} not found`);
    }

    if (!channel.members) {
      channel.members = [];
    }

    if (!channel.members.find((member) => member.id === user.id)) {
      channel.members.push(user);
      await this.channelsRepository.save(channel);
    }
    return channel;
  }

  async leave(id: number, currentUser: CurrentUser) {
    const channel = await this.channelsRepository.findOne({
      where: { id },
      relations: ['members'],
    });
    const user = await this.userService.findOne(currentUser.username);

    if (!user) {
      throw new UnauthorizedException('User not found');
    }
    if (!channel) {
      throw new Error(`Channel with id ${id} not found`);
    }

    if (channel.members) {
      channel.members = channel.members.filter(
        (member) => member.id !== user.id,
      );
      await this.channelsRepository.save(channel);
    }

    return channel;
  }

  async remove(id: number, user: CurrentUser) {
    const channel = await this.channelsRepository.findOne({ where: { id } });

    if (!channel) {
      throw new Error(`Channel with id ${id} not found`);
    }
    if (channel.owner?.username !== user.username) {
      throw new UnauthorizedException("User doesn't own the channel");
    }

    const result = await this.channelsRepository.delete(id);
    return result;
  }
}
