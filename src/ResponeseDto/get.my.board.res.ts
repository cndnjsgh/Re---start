import { ApiProperty } from "@nestjs/swagger";
import { Board } from "src/board_entity/board.entity";

export class GetMyBoardResDto{
    @ApiProperty({
        example: 'board_pk: 1, board_title: 노인과 바다, board_description: 소설입니다',
        description: '회원이 게시한 모든 '
    })
    board: Board[];
}