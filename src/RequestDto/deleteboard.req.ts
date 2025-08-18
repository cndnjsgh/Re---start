import { ApiProperty } from "@nestjs/swagger";
import { IsNumber } from "class-validator";

export class DeleteBoardReqDto{
    @ApiProperty({
        example: '1',
        description: '내 게시글 조회를 하면 나오는 pk입니다',
    })
    @IsNumber()
    board_pk:number;
}