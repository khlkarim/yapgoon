import { IsString } from 'class-validator';

export class CreateMessageDto {
  @IsString()
  channel: string;

  @IsString()
  content: string;
}
