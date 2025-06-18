import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async login(username: string, pass: string): Promise<string> {
    const user = await this.userService.findOne(username);

    if (user.password !== pass) {
      throw new UnauthorizedException();
    }

    const payload = { sub: user.id, username: user.username };

    return this.jwtService.signAsync(payload);
  }

  async register(user: CreateUserDto): Promise<string> {
    await this.userService.create(user);
    return this.login(user.username, user.password);
  }
}
