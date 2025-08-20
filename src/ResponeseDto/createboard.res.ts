import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class CreateBoardResDto{
    @ApiProperty({
        example: '추원호',
        description: '게시글 작성자 이름입니다',
    })
    @IsString()
    user_name: string;

    @ApiProperty({
        example: '게시글을 작성 했습니다!',
        description: '게시글 작성 성공 메세지 입니다.',
    })
    @IsString()
    success_message: string

    constructor(_user_name:string,_success_message:string){
        this.user_name = _user_name;
        this.success_message = _success_message;
    }
}