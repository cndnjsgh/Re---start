import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class LoginRequestDto{
    @ApiProperty({
        example: 'cndnjsgh',
        description: '아이디를 입력합니다',
    })
    @IsString()
    user_id: string;
    
    @ApiProperty({
        example: '1234',
        description: '비밀번호를 입력합니다',
    })
    @IsString()
    user_pw: string;
}