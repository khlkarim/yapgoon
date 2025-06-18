import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseGuards,
  Req,
} from '@nestjs/common';
import { Request } from 'express';
import { ChannelService } from './channel.service';
import { CreateChannelDto } from './dto/create-channel.dto';
import { UpdateChannelDto } from './dto/update-channel.dto';
import { Channel } from './entities/channel.entity';
import { AuthGuard } from 'src/auth/auth.guard';
import { CurrentUser } from 'src/auth/dto/current-user.dto';

@UseGuards(AuthGuard)
@Controller('channels')
export class ChannelController {
  constructor(private readonly channelService: ChannelService) {}

  @Get()
  findAll(@Query() filters: Partial<Channel>) {
    return this.channelService.findAll(filters);
  }

  @Get('joined')
  findJoined(@Req() request: Request) {
    const user = request['user'] as CurrentUser;

    return this.channelService.findJoined(user);
  }

  @Get('owned')
  findOwned(@Req() request: Request) {
    const user = request['user'] as CurrentUser;

    return this.channelService.findOwned(user);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.channelService.findOne(+id);
  }

  @Post()
  create(@Req() request: Request, @Body() createChannelDto: CreateChannelDto) {
    const user = request['user'] as CurrentUser;

    return this.channelService.create(createChannelDto, user);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Req() request: Request,
    @Body() updateChannelDto: UpdateChannelDto,
  ) {
    const user = request['user'] as CurrentUser;

    return this.channelService.update(+id, updateChannelDto, user);
  }

  @Patch('join/:id')
  join(@Param('id') id: string, @Req() request: Request) {
    const user = request['user'] as CurrentUser;

    return this.channelService.join(+id, user);
  }

  @Patch('leave/:id')
  leave(@Param('id') id: string, @Req() request: Request) {
    const user = request['user'] as CurrentUser;

    return this.channelService.leave(+id, user);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Req() request: Request) {
    const user = request['user'] as CurrentUser;

    return this.channelService.remove(+id, user);
  }
}
