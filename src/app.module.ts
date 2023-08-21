import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TestService } from './test.service';
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './modules/auth/auth.module';
import { BookModule } from './modules/book/book.module';
// https://nest.nodejs.cn/techniques/configuration
//https://cloud.tencent.com/developer/article/1921535?from=15425
import * as dotenv from 'dotenv';
const env = dotenv.config({ path: '.env' });
let envConfig;
if (env.parsed.NODE_ENV !== 'production') {
  envConfig = dotenv.config({ path: '.env.dev' });
} else {
  envConfig = dotenv.config({ path: '.env.prod' });
}
console.log(envConfig);
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: envConfig.parsed.DB_HOST,
      port: Number(envConfig.parsed.DB_PORT),
      username: envConfig.parsed.DB_USER,
      password: envConfig.parsed.DB_PASS,
      database: envConfig.parsed.DB_NAME,
    }),
    UserModule,
    AuthModule,
    BookModule,
  ],
  controllers: [AppController],
  providers: [AppService, TestService],
})
export class AppModule {}
