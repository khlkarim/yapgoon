import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { jwtConstants } from './contants';
import { CurrentUser } from './dto/current-user.dto';
import { WsClient } from './dto/ws-client.dto';

@Injectable()
export class WsAuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const client: WsClient = context.switchToWs().getClient();

    const token = client.handshake?.headers?.cookie
      ?.split('; ')
      .find((c: string) => c.startsWith('jwt='))
      ?.split('=')[1];

    if (!token) {
      client.emit('error', { message: 'Unauthorized' });
      return false;
    }

    try {
      const payload: CurrentUser = await this.jwtService.verifyAsync(token, {
        secret: jwtConstants.secret,
      });

      client.user = payload;
    } catch {
      client.emit('error', { message: 'Unauthorized' });
      return false;
    }
    return true;
  }
}
