import { IsString } from 'class-validator';

export class CurrentUser {
  @IsString()
  username: string;
}
