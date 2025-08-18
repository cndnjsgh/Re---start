import { Body, Controller, Delete, Headers, Patch, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterRequestDto } from 'src/RequestDto/register.request';
import { RegisterResponesDto } from 'src/ResponesDto/register.respones';
import { LoginResponesDto } from 'src/ResponesDto/login.respones';
import { LoginRequestDto } from 'src/RequestDto/login.request';
import { AuthGuard } from 'src/security/guard';
import { EditUserRequsetDto } from 'src/RequestDto/edituser.request';
import { EditUserResponesDto } from 'src/ResponesDto/edituser.respones';
import { User } from 'src/user_entity/user.entity';
import { UnRegisterResponesDto } from 'src/ResponesDto/unregister.respones';
import { LogoutResDto } from 'src/ResponesDto/logout.res';
@Controller('auth')
export class AuthController {
    private readonly authService:AuthService;
    constructor(_authService:AuthService){
        this.authService = _authService;
    }

        //회원가입
        @Post('register')
        async Register(@Body() user_data:RegisterRequestDto):Promise<RegisterResponesDto>{
            return this.authService.Register(user_data);
        }
        
        //로그인
        @Post('login')
        async Login(@Body() user_data:LoginRequestDto):Promise<LoginResponesDto>{
            return this.authService.Login(user_data);
        }
    
        //로그아웃
        @UseGuards(AuthGuard)
        @Post('logout')
        async Logout(@Request() req):Promise<LogoutResDto>{
            const userpayload:User = req.user;
            return this.authService.Logout(userpayload);
        }
    
        //회원정보 수정
        @UseGuards(AuthGuard)
        @Patch('edituser')
        async EditUser(@Request() req,@Body()body:EditUserRequsetDto):Promise<EditUserResponesDto>{
            const userpayload:User = req.user;
            return this.authService.EditUser(userpayload,body);
        }
    
        //회원탈퇴
        @UseGuards(AuthGuard)
        @Delete('unregister')
        async UnRegister(@Request() req):Promise<UnRegisterResponesDto>{
            const userpayload:User = req.user;
            return this.authService.UnRegister(userpayload);
        }
}
