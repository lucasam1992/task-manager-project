import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string) {
    const user = await this.userService.findByEmail(email);
    if (user) {
      const validPassword = await this.comparePassword(password, user.password);
      if (validPassword) {
        const { id, email } = user;
        return { id: id, email };
      }
      return null;
    }
    return null;
  }

  async login(user: any) {
    const payload = { email: user.email, sub: user.id, type: user.type };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async comparePassword(password: string, storedPassword: string) {
    return await bcrypt.compare(password, storedPassword);
  }
}
