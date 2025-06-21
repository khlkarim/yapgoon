import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Message } from './entities/message.entity';
import { Repository } from 'typeorm';
import { ChannelService } from 'src/channel/channel.service';
import { UserService } from 'src/user/user.service';
import { CurrentUser } from 'src/auth/dto/current-user.dto';
import { WsException } from '@nestjs/websockets';
import { CreateMessageDto } from './dto/create-message.dto';

@Injectable()
export class ChatService {
  constructor(
    private userService: UserService,
    private channelService: ChannelService,
    @InjectRepository(Message)
    private messageRepository: Repository<Message>,
  ) {}

  async joinChannel(currentUser: CurrentUser, channelName: string) {
    const user = await this.userService.findOne(currentUser.username);
    const channels = await this.channelService.findAll({
      name: channelName,
      members: [user],
    });

    if (channels.length != 1) {
      throw new WsException("Channel doesn't exist or User is not a member");
    }

    const channel = channels[0];
    return channel.messages;
  }

  async sendMessage(currentUser: CurrentUser, message: CreateMessageDto) {
    const user = await this.userService.findOne(currentUser.username);
    const channels = await this.channelService.findAll({
      name: message.channel,
      members: [user],
    });

    if (channels.length != 1) {
      throw new WsException("Channel doesn't exist or User is not a member");
    }

    return this.messageRepository.save({
      content: message.content,
      channel: channels[0],
      owner: user,
    });
  }
}
