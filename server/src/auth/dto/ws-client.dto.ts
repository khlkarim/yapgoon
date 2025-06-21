import { Socket } from 'socket.io';
import { CurrentUser } from './current-user.dto';

export interface WsClient extends Socket {
  user: CurrentUser;
}
