import { ApiProperty } from "@nestjs/swagger";
import { UserListResDto } from "./userlist.respones";

export class UserListInfoResDto{
    @ApiProperty({
        example: 'user_name: 추원호, board_count: 4',
        description: '회원의 이름, 게시물 작성 개수 입니다',
    })
    user_list:UserListResDto[]=[];
}