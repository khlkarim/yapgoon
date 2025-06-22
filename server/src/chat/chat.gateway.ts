import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'socket.io';
import { UseGuards, Logger } from '@nestjs/common';
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

  private readonly logger = new Logger(ChatGateway.name);

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

      this.server
        .to(channelName)
        .emit('joined', `${client.user.username} joined the channel`);

      client.emit('accepted', messages);

      this.logger.log(`${client.user.username} joined channel ${channelName}`);
    } catch (err) {
      client.emit('error', err instanceof Error ? err.message : err);
      this.logger.error(`Join error: ${err}`);
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

    this.logger.log(`${client.user.username} left channel ${channelName}`);
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

      this.logger.log(message.channel.name);
      this.logger.log(
        `Message sent to channel ${message.channel.name} by ${client.user.username}`,
      );
    } catch (err) {
      client.emit('error', err instanceof Error ? err.message : err);
      this.logger.error(`Message error: ${err}`);
    }
  }
}
