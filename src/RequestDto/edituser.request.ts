import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class EditUserRequsetDto{
    //일부러 비워둠 둘 중 하나만 바꾸는 경우도 있으니
    @ApiProperty({
        example: '1234',
        description: '변경할 비밀번호를 입력합니다',
    })
    user_pw:string;
   
    @ApiProperty({
        example: '추원호',
        description: '변경할 이름을 입력합니다',
    })
    user_name:string;
}