import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import configuration from '../config/configuration';
import { TestService } from './test.service';
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './modules/auth/auth.module';
import { BookModule } from './modules/book/book.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath:
        process.env.NODE_ENV === 'development'
          ? '.env.development'
          : '.env.production',
      load: [configuration],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (config: ConfigService) => {
        return {
          type: 'mysql',
          host: config.get('DB_HOST'),
          port: parseInt(config.get('DB_PORT')),
          database: config.get('DB_NAME'),
          username: config.get('DB_USER'),
          password: config.get('DB_PASSWORD'),
          autoLoadEntities: config.get('DB_AUTO'), //自动加载实体
          logging: config.get('DB_LOGGING'),
          synchronize: config.get('DB_SYNC'),
          entities: [__dirname + '/**/*.entity{.ts,.js}'], //这个实体是编译后的dist下
          timezone: '+08:00',
        };
      },
      inject: [ConfigService],
    }),
    UserModule,
    AuthModule,
    BookModule,
  ],
  controllers: [AppController],
  providers: [AppService, TestService],
})
export class AppModule {}
