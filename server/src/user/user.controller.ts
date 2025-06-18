import {
  Body,
  Controller,
  Get,
  Patch,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './entities/user.entity';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { CurrentUser } from 'src/auth/dto/current-user.dto';

@UseGuards(AuthGuard)
@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  findAll(@Query() filters: Partial<User>) {
    return this.userService.findAll(filters);
  }

  @Patch()
  update(@Req() request: Request, @Body() newUser: UpdateUserDto) {
    const user = request['user'] as CurrentUser;
    return this.userService.update(user, newUser);
  }
}
