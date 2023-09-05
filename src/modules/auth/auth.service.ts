import { Injectable } from '@nestjs/common/decorators/core';
import { UserService } from '../user/User.service';
import * as md5 from 'md5';
import { UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { HTTPerror, HTTPsuccess } from 'src/utils';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  //登录鉴权
  async login(username: string, password: string) {
    const user = await this.userService.findByName(username);
    const md5Password = md5(password).toUpperCase();
    if (!user || user.password !== md5Password) {
      return HTTPerror(new UnauthorizedException(), '用户不存在或密码错误！');
    }

    //生成token
    const payLoad = { username: user.username, userid: user.id };
    let token = await this.jwtService.signAsync(payLoad);
    if (token) {
      return HTTPsuccess({ token }, '登录成功!');
    } else {
      return HTTPerror({}, 'token生成失败,登录失败!');
    }
  }
}
