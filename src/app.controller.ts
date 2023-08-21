import {
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseFilters,
} from '@nestjs/common';
import { TestService } from './test.service';
import { HttpExceptionFilter } from './exception/http-exception.filter';

@Controller()
export class AppController {
  constructor(private readonly testService: TestService) {}

  @Get()
  getHello(): string {
    return this.testService.getHello();
  }

  @Get('/data/:id/:subid')
  @UseFilters(new HttpExceptionFilter())
  getTest(@Param() Params: string): string {
    return this.testService.getTest(Params);
  }

  @Get('/data')
  getData(): string {
    return this.testService.getData();
  }

  @Post('/add')
  addData(): string {
    return this.testService.addData();
  }

  @Put('/update/:id')
  updateData(@Param() Params: string): string {
    return this.testService.updateData(Params);
  }

  @Delete('/delete/:id')
  deleteData(@Param() Params: string): string {
    return this.testService.deleteData(Params);
  }
}
