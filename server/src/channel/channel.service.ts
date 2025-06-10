import { Injectable } from '@nestjs/common';
import { CreateChannelDto } from './dto/create-channel.dto';
import { UpdateChannelDto } from './dto/update-channel.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Channel } from './entities/channel.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ChannelService {
  constructor(
    @InjectRepository(Channel)
    private channelsRepository: Repository<Channel>,
  ) {}

  create(createChannelDto: CreateChannelDto) {
    return this.channelsRepository.save(createChannelDto);
  }

  findAll() {
    return this.channelsRepository.find();
  }

  findOne(id: number) {
    return this.channelsRepository.findOne({ where: { id } });
  }

  update(id: number, updateChannelDto: UpdateChannelDto) {
    return this.channelsRepository.update(id, updateChannelDto);
  }

  async remove(id: number) {
    const channel = await this.channelsRepository.findOne({ where: { id } });
    if (!channel) {
      throw new Error(`Channel with id ${id} not found`);
    }
    return this.channelsRepository.remove(channel);
  }
}
