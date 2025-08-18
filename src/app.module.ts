import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserController } from './user/user.controller';
import { UserModule } from './user/user.module';
import { BoardController } from './board/board.controller';
import { BoardModule } from './board/board.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { User } from './user_entity/user.entity';
import { AuthModule } from './auth/auth.module';
import { Board } from './board_entity/board.entity';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [ConfigModule.forRoot({
    isGlobal: true,
  }),TypeOrmModule.forRoot({
    type: 'mariadb',
    host: process.env.DATABASE_HOST,
    port: Number(process.env.DATABASE_PORT),
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    entities: [User,Board],
    synchronize: true,
}),UserModule, BoardModule, AuthModule,JwtModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
