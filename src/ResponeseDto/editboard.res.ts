import { ApiProperty } from "@nestjs/swagger";

export class EditBoardResDto{
    @ApiProperty({
        example: '수정하였습니다!',
        description: '수정 성공 메세지입니다.'
    })
    success_text:string;
}