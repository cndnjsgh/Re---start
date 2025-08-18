import { ApiProperty } from "@nestjs/swagger";

export class RegisterResponseDto{
    @ApiProperty({
        example:'추원호',
        description: '가입한 유저의 이름입니다.',
    })
    user_name: string;

    @ApiProperty({
        example:'가입하였습니다!',
        description: '가입 성공 메세지입니다.',
    })
    success_text: string;
}