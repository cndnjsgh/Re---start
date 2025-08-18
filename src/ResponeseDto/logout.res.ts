import { ApiProperty } from "@nestjs/swagger";

export class LogoutResDto{
    @ApiProperty({
        example:'로그아웃하였습니다!',
        description: '로그아웃 성공 메세지 입니다.',
    })
    success_text:string;
}