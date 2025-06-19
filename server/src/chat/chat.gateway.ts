import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'socket.io';
import { CreateMessageDto } from './dto/create-message.dto';
import { ChatService } from './chat.service';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';

@UseGuards(AuthGuard)
@WebSocketGateway({ cors: true })
export class ChatGateway {
  @WebSocketServer()
  socket!: Server;

  constructor(private chatService: ChatService) {}

  @SubscribeMessage('message')
  handleMessage(@MessageBody() message: CreateMessageDto) {
    const resp = this.chatService.handleMessage(message);
    this.socket.emit(resp.channelName, resp);
  }
}
