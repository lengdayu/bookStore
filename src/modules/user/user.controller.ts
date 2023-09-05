import {
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Body,
} from '@nestjs/common';
import { UserService } from './User.service';
import { User } from './user.entity';
import { Public } from './public.decorator';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  //查询单个用户
  @Get('/:id')
  getUser(@Param('id', ParseIntPipe) id: number) {
    return this.userService.findOne(id);
  }

  //查询所有用户
  @Get('/')
  getUsers() {
    return this.userService.findAll();
  }

  //添加用户
  @Public()
  @Post('/add')
  addUser(@Body() user: User) {
    return this.userService.create(user);
  }

  //删除用户
  @Get('/delete/:id')
  deleteUser(@Param('id', ParseIntPipe) id: number) {
    return this.userService.delete(id);
  }

  //更新用户
  @Post('/update/:id')
  updateUser(@Param('id', ParseIntPipe) id: number, @Body() user: User) {
    return this.userService.update(id, user);
  }
}
