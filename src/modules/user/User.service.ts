import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { User } from './user.entity';
import * as md5 from 'md5';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}
  //查询单个用户
  findOne(id: number): Promise<User> {
    return this.userRepository.findOneBy({ id });
  }
  //查询所有用户
  findAll(): Promise<User[]> {
    return this.userRepository.find();
  }
  //添加用户
  async create(user: User): Promise<User> {
    console.log(user);
    user.password = md5(user.password).toUpperCase();
    let res = await this.userRepository.save(user);
    return res;
  }
  //删除用户
  async delete(id: number): Promise<DeleteResult> {
    let res = await this.userRepository.delete(id);
    return res;
  }
  //更新用户
  async update(id: number, user: User): Promise<UpdateResult> {
    let res = await this.userRepository.update(id, user);
    return res;
  }

  //用户名查找用户
  async findByName(username: string): Promise<User> {
    return await this.userRepository.findOneBy({ username });
  }
}
