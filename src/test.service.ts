import {
  Injectable,
  Delete,
  Get,
  Post,
  Put,
  Param,
  HttpStatus,
  HttpException,
} from '@nestjs/common';

@Injectable()
export class TestService {
  getHello(): string {
    return 'Hello World!!!!';
  }

  getTest(@Param() Params): string {
    if (!Params.id) {
      throw new HttpException('id is required', HttpStatus.BAD_REQUEST);
    }
    return 'data:' + Params.id + ' ' + Params.subid;
  }

  getData(): string {
    return ' get all data';
  }

  addData(): string {
    return 'add data';
  }

  updateData(@Param() Params): string {
    return 'update data:' + ' ' + Params.id;
  }

  deleteData(@Param() Params): string {
    return 'delete data:' + ' ' + Params.id;
  }
}
