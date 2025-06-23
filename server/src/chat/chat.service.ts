import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { WsException } from '@nestjs/websockets';

import { Message } from './entities/message.entity';
import { CreateMessageDto } from './dto/create-message.dto';
import { ChannelService } from 'src/channel/channel.service';
import { UserService } from 'src/user/user.service';
import { CurrentUser } from 'src/auth/dto/current-user.dto';

@Injectable()
export class ChatService {
  constructor(
    @InjectRepository(Message)
    private readonly messageRepository: Repository<Message>,
    private readonly userService: UserService,
    private readonly channelService: ChannelService,
  ) {}

  async joinChannel(currentUser: CurrentUser, channelName: string) {
    const user = await this.userService.findOne(currentUser.username);
    const channels = await this.channelService.findAll(
      {
        name: channelName,
        members: [user],
      },
      ['messages'],
    );

    if (channels.length !== 1) {
      throw new WsException("Channel doesn't exist or user is not a member");
    }

    return channels[0].messages;
  }

  async sendMessage(
    currentUser: CurrentUser,
    createMessageDto: CreateMessageDto,
  ) {
    const user = await this.userService.findOne(currentUser.username);
    const channels = await this.channelService.findAll(
      {
        name: createMessageDto.channel,
        members: [user],
      },
      ['messages'],
    );

    if (channels.length !== 1) {
      throw new WsException("Channel doesn't exist or user is not a member");
    }

    const message = this.messageRepository.create({
      content: createMessageDto.content,
      channel: channels[0],
      owner: user,
    });

    return await this.messageRepository.save(message);
  }
}
