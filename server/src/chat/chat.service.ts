import { Injectable } from '@nestjs/common';
import { CreateMessageDto } from './dto/create-message.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Message } from './entities/message.entity';
import { Repository } from 'typeorm';
import { ChannelService } from 'src/channel/channel.service';
import { UserService } from 'src/user/user.service';

@Injectable()
export class ChatService {
  constructor(
    private userService: UserService,
    private channelService: ChannelService,
    @InjectRepository(Message)
    private messageRepository: Repository<Message>,
  ) {}

  handleMessage(message: CreateMessageDto) {
    return message;
  }
}
