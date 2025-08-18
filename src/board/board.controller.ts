import { Body, Controller, Delete, Get, Patch, Post, Request, UseGuards } from '@nestjs/common';
import { BoardService } from './board.service';
import { CreateBoardReqDto } from 'src/RequestDto/createboard.req';
import { CreateBoardResDto } from 'src/ResponeseDto/createboard.res';
import { User } from 'src/user_entity/user.entity';
import { AuthGuard } from 'src/security/guard';
import { EditBoardReqDto } from 'src/RequestDto/editboard.req';
import { EditBoardResDto } from 'src/ResponeseDto/editboard.res';
import { GetMyBoardResDto } from 'src/ResponeseDto/get.my.board.res';
import { AllBoardResDto } from 'src/ResponeseDto/allboard.res';
import { DeleteBoardReqDto } from 'src/RequestDto/deleteboard.req';
import { DeleteBoardResDto } from 'src/ResponeseDto/deleteboard.res';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';


@Controller('board')
export class BoardController {
    private readonly boardService: BoardService;
    constructor(_boardService:BoardService){
        this.boardService = _boardService;
    }

    //게시글 작성
    @UseGuards(AuthGuard)
    @Post('')
    @ApiResponse({
        status:201,
        type:CreateBoardResDto,
    })
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
        type:EditBoardResDto
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
        type:GetMyBoardResDto
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
        type: AllBoardResDto
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
    @UseGuards(AuthGuard)
    @Delete()
    @ApiResponse({
        status: 200,
        type: DeleteBoardResDto,
    })
    @ApiOperation({
                summary: '게시글 삭제',
                description: '내가 작성한 게시글 삭제'
            })
    async DeleteBoard(@Request() req, @Body() body: DeleteBoardReqDto):Promise<DeleteBoardResDto>{
        const userpayload:User = req.user;
        return this.boardService.DeleteBoard(userpayload,body);
    }

}
