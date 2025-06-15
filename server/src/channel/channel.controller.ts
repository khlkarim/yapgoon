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
import { ChannelService } from './channel.service';
import { CreateChannelDto } from './dto/create-channel.dto';
import { UpdateChannelDto } from './dto/update-channel.dto';
import { Channel } from './entities/channel.entity';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('channels')
export class ChannelController {
  constructor(private readonly channelService: ChannelService) {}

  @Get()
  findAll(@Query() filters: Partial<Channel>) {
    return this.channelService.findAll(filters);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.channelService.findOne(+id);
  }

  @Post()
  @UseGuards(AuthGuard)
  create(@Req() request: Request, @Body() createChannelDto: CreateChannelDto) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const user = request['user'];

    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    return this.channelService.create(createChannelDto, user);
  }

  @Patch(':id')
  @UseGuards(AuthGuard)
  update(
    @Param('id') id: string,
    @Req() request: Request,
    @Body() updateChannelDto: UpdateChannelDto,
  ) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const user = request['user'];

    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    return this.channelService.update(+id, updateChannelDto, user);
  }

  @Patch('join/:id')
  @UseGuards(AuthGuard)
  join(@Param('id') id: string, @Req() request: Request) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const user = request['user'];

    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    return this.channelService.join(+id, user);
  }

  @Patch('leave/:id')
  @UseGuards(AuthGuard)
  leave(@Param('id') id: string, @Req() request: Request) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const user = request['user'];

    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    return this.channelService.leave(+id, user);
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  remove(@Param('id') id: string, @Req() request: Request) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const user = request['user'];

    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    return this.channelService.remove(+id, user);
  }
}
