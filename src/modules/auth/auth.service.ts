import { Injectable } from '@nestjs/common/decorators/core';
import { UserService } from '../user/User.service';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}
  async login(username: string, password: string) {
    const user = await this.userService.findByName(username);
    console.log('username');
    console.log(username);
    console.log(user);
  }
}
