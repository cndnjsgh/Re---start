import { Body, Controller, Delete, Headers, Patch, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterRequestDto } from 'src/RequestDto/register.request';
import { RegisterResponseDto } from 'src/ResponeseDto/register.respones';
import { LoginResponseDto } from 'src/ResponeseDto/login.respones';
import { LoginRequestDto } from 'src/RequestDto/login.request';
import { AuthGuard } from 'src/security/guard';
import { EditUserRequsetDto } from 'src/RequestDto/edituser.request';
import { EditUserResponseDto } from 'src/ResponeseDto/edituser.respones';
import { User } from 'src/user_entity/user.entity';
import { UnRegisterResponseDto } from 'src/ResponeseDto/unregister.respones';
import { LogoutResDto } from 'src/ResponeseDto/logout.res';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';
@Controller('auth')
export class AuthController {
    private readonly authService:AuthService;
    constructor(_authService:AuthService){
        this.authService = _authService;
    }

        //회원가입
        @Post('register')
        @ApiBody({
            description:"아이디, 비밀번호, 이름",
            type: RegisterRequestDto,
        })
        @ApiOperation({
            summary: '회원가입',
            description: '회원가입'
        })
        @ApiResponse({
            status:201,
            description: '회원가입 성공! && 회원이름',
        })
        async Register(@Body() user_data:RegisterRequestDto):Promise<RegisterResponseDto>{
            return this.authService.Register(user_data);
        }
        
        //로그인
        @Post('login')
        @ApiBody({
            description:"아이디, 비밀번호",
            type: LoginRequestDto,
        })
        @ApiResponse({
            status:200,
            type: LoginResponseDto,
        })
        @ApiOperation({
            summary: '로그인',
            description: '로그인'
        })
        async Login(@Body() user_data:LoginRequestDto):Promise<LoginResponseDto>{
            return this.authService.Login(user_data);
        }
    
        //로그아웃
        @UseGuards(AuthGuard)
        @Post('logout')
        @ApiResponse({
            status:200,
            type: LogoutResDto,
        })
        @ApiBearerAuth('access-token')
        @ApiOperation({
            summary: '로그아웃',
            description: '로그아웃'
        })
        async Logout(@Request() req):Promise<LogoutResDto>{
            const userpayload:User = req.user;
            return this.authService.Logout(userpayload);
        }
    
        //회원정보 수정
        @UseGuards(AuthGuard)
        @Patch('edituser')
        @ApiResponse({
            status:200,
            type: EditUserResponseDto,
        })
        @ApiBearerAuth('access-token')
        @ApiOperation({
            summary: '회원정보 수정',
            description: '이름 또는 비밀번호를 수정'
        })
        async EditUser(@Request() req,@Body()body:EditUserRequsetDto):Promise<EditUserResponseDto>{
            const userpayload:User = req.user;
            return this.authService.EditUser(userpayload,body);
        }
    
        //회원탈퇴
        @UseGuards(AuthGuard)
        @Delete('unregister')
        @ApiResponse({
            status:200,
            type: UnRegisterResponseDto,
        })
        @ApiBearerAuth('access-token')
        @ApiOperation({
            summary: '회원탈퇴',
            description: '회원이 작성한 게시글도 삭제하며 회원 탈퇴'
        })
        async UnRegister(@Request() req):Promise<UnRegisterResponseDto>{
            const userpayload:User = req.user;
            return this.authService.UnRegister(userpayload);
        }
}
