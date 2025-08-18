import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/user_entity/user.entity';
import { JwtModule } from '@nestjs/jwt';
import { Board } from 'src/board_entity/board.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User,Board]),JwtModule],
  exports: [TypeOrmModule,UserService],
  providers: [UserService]
})
export class UserModule {}
