import { Module } from '@nestjs/common';
import { BoardService } from './board.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Board } from 'src/board_entity/board.entity';
import { User } from 'src/user_entity/user.entity';
import { BoardController } from './board.controller';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports:[TypeOrmModule.forFeature([Board,User]),JwtModule],
  controllers:[BoardController],
  providers: [BoardService]
})
export class BoardModule {}
