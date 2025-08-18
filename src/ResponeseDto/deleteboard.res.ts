import { ApiProperty } from "@nestjs/swagger";

export class DeleteBoardResDto{
    @ApiProperty({
        example:'삭제하였습니다!',
        description:'삭제 성공 메세지입니다.'
    })
    success_text:string;
}