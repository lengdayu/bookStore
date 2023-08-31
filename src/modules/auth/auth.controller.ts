import { Body, Controller, Get, Post } from '@nestjs/common';
import { Public } from './public.decorator';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Public()
  @Post('login')
  async login(@Body() params) {
    console.log(params);
    await this.authService.login(params.username, params.password);
    return {
      message: 'get auth',
    };
  }
}
