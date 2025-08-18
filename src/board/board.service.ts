import { All, BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Board } from 'src/board_entity/board.entity';
import { CreateBoardReqDto } from 'src/RequestDto/createboard.req';
import { DeleteBoardReqDto } from 'src/RequestDto/deleteboard.req';
import { EditBoardReqDto } from 'src/RequestDto/editboard.req';
import { AllBoardBoardResDto } from 'src/ResponesDto/allboard.board.res';
import { AllBoardResDto } from 'src/ResponesDto/allboard.res';
import { AllBoardUserResDto } from 'src/ResponesDto/allboard.user.res';
import { CreateBoardResDto } from 'src/ResponesDto/createboard.res';
import { DeleteBoardResDto } from 'src/ResponesDto/deleteboard.res';
import { EditBoardResDto } from 'src/ResponesDto/editboard.res';
import { GetMyBoardResDto } from 'src/ResponesDto/get.my.board.res';
import { User } from 'src/user_entity/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class BoardService {
    constructor(
        @InjectRepository(Board)
        private readonly boardRepository:Repository<Board>,
        @InjectRepository(User)
        private readonly userRepository:Repository<User>

    ){}

    //게시글 작성
    async CreateBoard(userpayload:User, body:CreateBoardReqDto):Promise<CreateBoardResDto>{
        const user = await this.GetUserByPayload(userpayload);
        const board:Board = new Board();
        board.BoardSetter(user,body);
        await this.boardRepository.save(board);
        const text:CreateBoardResDto = new CreateBoardResDto();
        text.success_message='게시물을 작성하였습니다!';
        text.user_name = user.user_name;
        return text;
    }

    //게시글 수정
    async EditBoard(userpayload:User, body:EditBoardReqDto):Promise<EditBoardResDto>{
        const user_data = await this.GetUserByPayload(userpayload);
        await this.boardRepository.update(
            {user:user_data},
            {
                board_title:body.board_title,
                board_description:body.board_description,
            },
        );
        const text:EditBoardResDto = new EditBoardResDto();
        text.success_text = '수정하였습니다!';
        return text;
    }

    //내 게시글 조회
    async GetMyBoard(userpayload:User):Promise<GetMyBoardResDto>{
        const user_data = await this.GetUserByPayload(userpayload);
        const my_board: GetMyBoardResDto = new GetMyBoardResDto();
        my_board.board = await this.boardRepository.find({where:{user:user_data}});
        return my_board;
    }

    //모든 게시글 조회
    async AllBoard():Promise<AllBoardResDto>{
        const board:AllBoardBoardResDto = new AllBoardBoardResDto();
        board.board = await this.boardRepository.find({select:['board_title','board_description']});
        const board_count = await this.boardRepository.count();
        const board_list:AllBoardResDto = new AllBoardResDto();
        for(let i=0;i<board_count;i++){
            const user:AllBoardUserResDto = new AllBoardUserResDto();
            const finduser = await this.boardRepository.findOne({
                where:{board_title:board.board[i].board_title},
                relations: ['user'],
            });
            if(!finduser || !finduser.user || !finduser.user.user_name){
                throw new NotFoundException();
            }
            user.user = finduser.user;
            board_list.user_name[i] = user.user.user_name;
            board_list.board_title[i] = board.board[i].board_title;
            board_list.board_description[i] = board.board[i].board_description;
        }
        return board_list;
    }

    //게시글 삭제
    async DeleteBoard(userpayload:User, body:DeleteBoardReqDto):Promise<DeleteBoardResDto>{
        const usere_data = await this.GetUserByPayload(userpayload);
        const findboard = await this.boardRepository.findOne({where: {user:usere_data,board_pk:body.board_pk}});
        if(!findboard){
            throw new BadRequestException('');
        }
        await this.boardRepository.remove(findboard);
        const text:DeleteBoardResDto = new DeleteBoardResDto();
        text.success_text = '삭제하였습니다!';
        return text;
    }

    //payload에서 가져온 정보로 유저를 정보 전체를 가져오는 함수
    async GetUserByPayload(userpayload:User):Promise<User>{
        const user_data = await this.userRepository.findOne({where:{user_id:userpayload.user_id}});
        if(!user_data){
            throw new BadRequestException();
        }
        return user_data;
    }
}
