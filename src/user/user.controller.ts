import { Body, Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { AuthGuard } from 'src/security/guard';
import { UserInfoResDto } from 'src/ResponesDto/userinfo.respones';
import { User } from 'src/user_entity/user.entity';
import { UserListInfoResDto } from 'src/ResponesDto/userlistinfo.respones';

@Controller('user')
export class UserController {
    private readonly userService:UserService;
    constructor(_userService:UserService){
        this.userService=_userService;
    }
    
    //자신 정보 조회
    @UseGuards(AuthGuard)
    @Get('userinfo')
    async UserInfo(@Request() req):Promise<UserInfoResDto>{
        const userpayload:User = req.user;
        return this.userService.UserInfo(userpayload);
    }

    //전체 회원 조회
    @Get('userlist')
    async UserList():Promise<UserListInfoResDto>{
        return this.userService.UserList()
    }
}
