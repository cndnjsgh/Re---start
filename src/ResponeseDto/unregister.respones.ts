import { ApiProperty } from "@nestjs/swagger";

export class UnRegisterResponseDto{
    @ApiProperty({
        example:'탈퇴하였습니다!',
        description:'탈퇴 성공 메세지 입니다.'
    })
    success_text:string;

    constructor(){
        
    }
}