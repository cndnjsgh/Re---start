import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class CreateBoardReqDto{
    @ApiProperty({
        example: '첫 게시물!',
        description: '게시물의 제목'
    })
    @IsString()
    board_title: string;
    
    @ApiProperty({
        example: '이것은 첫 게시물 입니다.',
        description: '게시물의 내용',
    })
    @IsString()
    board_description: string;
}