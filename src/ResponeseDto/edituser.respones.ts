import { ApiProperty } from "@nestjs/swagger";

export class EditUserResponseDto{
    @ApiProperty({
        example:'수정하였습니다!',
        description:'수정 성공 메세지 입니다.',
    })
    text:string;
}