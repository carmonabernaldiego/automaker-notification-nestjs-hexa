import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { comparePassword } from '@helpers';

import { User } from '@entities';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.usersService.findByEmail(email);

    const validPassword = await comparePassword(password, user.password);

    if (user && validPassword) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }
}
