import { IsBoolean, IsString } from 'class-validator';

export class CreateChannelDto {
  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsBoolean()
  public: boolean;
}
