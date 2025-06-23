import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'socket.io';
import { UseGuards } from '@nestjs/common';
import { ChatService } from './chat.service';
import { CreateMessageDto } from './dto/create-message.dto';
import { WsAuthGuard } from 'src/auth/ws.auth.guard';
import { WsClient } from 'src/auth/dto/ws-client.dto';

@UseGuards(WsAuthGuard)
@WebSocketGateway({
  cors: {
    origin: 'http://localhost:5173',
    credentials: true,
  },
})
export class ChatGateway {
  @WebSocketServer()
  private server!: Server;
  constructor(private readonly chatService: ChatService) {}

  @SubscribeMessage('join')
  async handleJoin(
    @MessageBody() channelName: string,
    @ConnectedSocket() client: WsClient,
  ): Promise<void> {
    try {
      const messages = await this.chatService.joinChannel(
        client.user,
        channelName,
      );
      await client.join(channelName);
      client.emit('accepted', messages);

      this.server
        .to(channelName)
        .emit('joined', `${client.user.username} joined the channel`);
    } catch (err) {
      client.emit('error', err instanceof Error ? err.message : err);
    }
  }

  @SubscribeMessage('leave')
  async handleLeave(
    @MessageBody() channelName: string,
    @ConnectedSocket() client: WsClient,
  ): Promise<void> {
    await client.leave(channelName);
    this.server
      .to(channelName)
      .emit('left', `${client.user.username} left the channel`);
  }

  @SubscribeMessage('message')
  async handleMessage(
    @MessageBody() createMessageDto: CreateMessageDto,
    @ConnectedSocket() client: WsClient,
  ): Promise<void> {
    try {
      const message = await this.chatService.sendMessage(
        client.user,
        createMessageDto,
      );

      this.server.to(message.channel.name).emit('message', message);
    } catch (err) {
      client.emit('error', err instanceof Error ? err.message : err);
    }
  }
}
