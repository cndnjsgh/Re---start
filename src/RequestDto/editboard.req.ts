import { ApiProperty } from "@nestjs/swagger";

export class EditBoardReqDto{
    //둘 중 하나만 바꾸는 경우도 있으니 
    @ApiProperty({
        example:'게시글 제목',
        description: '게시글의 제목 입니다',
    })
    board_title:string;

    @ApiProperty({
        example:'게시글의 내용',
        description: '게시글의 내용 입니다',
    })
    board_description: string;
}