import { Body, Controller, Delete, Get, Patch, Post, Request, UseGuards } from '@nestjs/common';
import { BoardService } from './board.service';
import { CreateBoardReqDto } from 'src/RequestDto/createboard.req';
import { CreateBoardResDto } from 'src/ResponesDto/createboard.res';
import { User } from 'src/user_entity/user.entity';
import { AuthGuard } from 'src/security/guard';
import { EditBoardReqDto } from 'src/RequestDto/editboard.req';
import { EditBoardResDto } from 'src/ResponesDto/editboard.res';
import { GetMyBoardResDto } from 'src/ResponesDto/get.my.board.res';
import { AllBoardResDto } from 'src/ResponesDto/allboard.res';
import { DeleteBoardReqDto } from 'src/RequestDto/deleteboard.req';
import { DeleteBoardResDto } from 'src/ResponesDto/deleteboard.res';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';


@Controller('board')
export class BoardController {
    private readonly boardService: BoardService;
    constructor(_boardService:BoardService){
        this.boardService = _boardService;
    }

    //게시글 작성
    @ApiResponse({
        status: 201,
        description: '가입됐습니다!',
    })
    @ApiResponse({
        status: 400,
        description: '잘못된 입력입니다!',
    })
    @UseGuards(AuthGuard)
    @Post('')
    @ApiOperation({
                summary: '게시글 작성',
                description: '게시글 작성'
            })
    async CreateBoard(@Request() req,@Body() body: CreateBoardReqDto):Promise<CreateBoardResDto>{
        const userpayload:User = req.user;
        return this.boardService.CreateBoard(userpayload,body);
    }
    
    //게시글 수정
    @ApiResponse({
        status: 200,
        description: '수정되었습니다!',
    })
    @UseGuards(AuthGuard)
    @Patch()
    @ApiOperation({
                summary: '게시글 수정',
                description: '내가 작성한 게시글 수정'
            })
    async EditBoard(@Request() req, @Body() body:EditBoardReqDto):Promise<EditBoardResDto>{
        const userpayload:User = req.user;
        return this.boardService.EditBoard(userpayload,body);
    }

    //자기 게시글 조회(로그인중)
    @ApiResponse({
        status: 200,
        description: '내 게시글을 조회 하였습니다!',
    })
    @UseGuards(AuthGuard)
    @Get('myboard')
    @ApiOperation({
                summary: '내 게시글 조회',
                description: '게시글 내가 작성한 게시글 조회'
            })
    async GetMyBoard(@Request() req):Promise<GetMyBoardResDto>{
        const userpayload:User = req.user;
        return this.boardService.GetMyBoard(userpayload);
    }   

    //모든 게시글 조회
    @ApiResponse({
        status: 200,
        description: '모든 게시글을 조회 하였습니다!',
    })
    @Get('allboard')
    @ApiOperation({
                summary: '모든 게시글 조회',
                description: '모든 게시글 조회'
            })
    async AllBoard():Promise<AllBoardResDto>{
        return this.boardService.AllBoard();
    }

    //게시글 삭제(로그인중)
    @ApiResponse({
        status: 200,
        description: '삭제되었습니다!',
    })
    @ApiResponse({
        status: 404,
        description: '찾을 수 없는 게시글입니다!',
    })
    @UseGuards(AuthGuard)
    @Delete()
    @ApiOperation({
                summary: '게시글 삭제',
                description: '내가 작성한 게시글 삭제'
            })
    async DeleteBoard(@Request() req, @Body() body: DeleteBoardReqDto):Promise<DeleteBoardResDto>{
        const userpayload:User = req.user;
        return this.boardService.DeleteBoard(userpayload,body);
    }

}
