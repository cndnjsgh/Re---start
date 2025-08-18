import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class RegisterRequestDto{
    @ApiProperty({
        example: 'cndnjsgh',
        description: '가입할 아이디를 입력합니다',
    })
    @IsString()
    user_id: string;

    @ApiProperty({
        example: '1234',
        description: '가입할 비밀번호를 입력합니다',
    })
    @IsString()
    user_pw: string;

    @ApiProperty({
        example: '추원호',
        description: '가입할 이름을 입력합니다',
    })
    @IsString()
    user_name: string;
}