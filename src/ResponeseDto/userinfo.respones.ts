import { ApiProperty } from "@nestjs/swagger";

export class UserInfoResDto{
    @ApiProperty({
        example: '1',
        description: '회원의 PK입니다.'
    })
    PK:number;

    @ApiProperty({
        example: 'cndnjsgh',
        description: '회원의 id입니다.'
    })
    user_id:string;

    @ApiProperty({
        example: 'cndnjsgh1234',
        description: '회원의 비밀번호입니다.'
    })
    user_pw:string;
    
    @ApiProperty({
        example: '추원호',
        description: '회원의 이름입니다.'
    })
    user_name:string;
    
    @ApiProperty({
        example: '4',
        description: '회원의 게시물 작성 개수 입니다.'
    })
    board_count:number;
}