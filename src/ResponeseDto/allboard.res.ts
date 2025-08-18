import { ApiProperty } from "@nestjs/swagger";
import { AllBoardBoardResDto } from "./allboard.board.res";
import { AllBoardUserResDto } from "./allboard.user.res";

export class AllBoardResDto{
    @ApiProperty({
        example: '추원호',
        description: '작성자의 이름입니다.',
    })
    user_name: string[]=[];

    @ApiProperty({
        example: '노인과 바다',
        description: '게시글의 제목입니다.',
    })
    board_title: string[]=[];

    @ApiProperty({
        example: '소설입니다.',
        description: '게시글의 내용입니다.',
    })
    board_description: string[]=[];
}