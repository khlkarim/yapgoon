import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'socket.io';
import { ChatService } from './chat.service';
import { CreateMessageDto } from './dto/create-message.dto';
import { UseGuards } from '@nestjs/common';
import { WsAuthGuard } from 'src/auth/ws.auth.guard';
import { WsClient } from 'src/auth/dto/ws-client.dto';

@UseGuards(WsAuthGuard)
@WebSocketGateway({
  cors: {
    origin: 'http://127.0.0.1:5500',
    credentials: true,
  },
})
export class ChatGateway {
  @WebSocketServer()
  socket!: Server;

  constructor(private chatService: ChatService) {}

  @SubscribeMessage('join')
  async handleJoin(
    @MessageBody() channelName: string,
    @ConnectedSocket() client: WsClient,
  ) {
    try {
      const messages = await this.chatService.joinChannel(
        client.user,
        channelName,
      );
      await client.join(channelName);
      this.socket
        .to(channelName)
        .emit('joined', `${client.user.username} joind the channel`);
      client.emit('messages', messages);
    } catch (err) {
      client.emit('error', err);
    }
  }

  @SubscribeMessage('leave')
  async handleLeave(
    @MessageBody() channelName: string,
    @ConnectedSocket() client: WsClient,
  ) {
    this.socket
      .to(channelName)
      .emit('left', `${client.user.username} left the channel`);
    await client.leave(channelName);
    console.log(`${client.user.username} left the channel`);
  }

  @SubscribeMessage('message')
  async handleMessage(
    @MessageBody() createMessageDto: CreateMessageDto,
    @ConnectedSocket() client: WsClient,
  ) {
    try {
      console.log(createMessageDto);
      const message = await this.chatService.sendMessage(
        client.user,
        createMessageDto,
      );
      this.socket.to(message.channel.name).emit('message', message);
    } catch (err) {
      client.emit('error', err);
    }
  }
}
