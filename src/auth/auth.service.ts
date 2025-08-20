import { BadRequestException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { access } from 'fs';
import { EditUserRequsetDto } from 'src/RequestDto/edituser.request';
import { LoginRequestDto } from 'src/RequestDto/login.request';
import { RegisterRequestDto } from 'src/RequestDto/register.request';
import { EditUserResponseDto } from 'src/ResponeseDto/edituser.respones';
import { LoginResponseDto } from 'src/ResponeseDto/login.respones';
import { LogoutResDto } from 'src/ResponeseDto/logout.res';
import { RegisterResponseDto } from 'src/ResponeseDto/register.respones';
import { UnRegisterResponseDto } from 'src/ResponeseDto/unregister.respones';
import { PayLoad } from 'src/security/payload';
import { RefreshTokenPayload } from 'src/security/refreshtoken.payload';
import { CreateAccessTokenResponesDto } from 'src/Token/create.accesstoken';
import { CreateRefreshTokenResDto } from 'src/Token/create.refreshtoken';
import { User } from 'src/user_entity/user.entity';
import { IsNull, Repository } from 'typeorm';

@Injectable()
export class AuthService {
    constructor(
            @InjectRepository(User)
            private readonly userRepository:Repository<User>,
            private readonly jwtService:JwtService
        ){}
    
        //회원가입
        async Register(user_data:RegisterRequestDto):Promise<RegisterResponseDto>{
            const finduser = await this.userRepository.findOne({where:{user_id:user_data.user_id}})
            if(finduser){
                throw new BadRequestException('중복된 계정이 있습니다!');
            }
            const user:User = new User();
            user.setter(user_data);
            if(!user||!user.user_name){
                throw new BadRequestException();
            }
            await this.userRepository.save(user);
            const res:RegisterResponseDto = new RegisterResponseDto();
            res.user_name = user.user_name;
            res.success_text = '회원가입에 성공하였습니다!';
            return  res;
        }
    
        //로그인
        async Login(user_data:LoginRequestDto):Promise<LoginResponseDto>{
            const finduser = await this.userRepository.findOne({where:{user_id:user_data.user_id,user_pw:user_data.user_pw}})
            if(!finduser||!finduser.user_id){
                throw new UnauthorizedException();
            }
            const accesstoken = await this.CreateAccessToken(finduser);
            const refreshtoken = await this.CreateRefreshToken(user_data.user_id);
            
            const token:LoginResponseDto = new LoginResponseDto();
            token.accesstoken = `Bearer ${accesstoken.accesstoken}`;
            token.refreshtoken = `Bearer ${refreshtoken.refreshtoken}`;
            this.userRepository.update(
                {user_id:finduser.user_id},
                {refreshtoken:token.refreshtoken}
            );
            return token;
        }

        //로그아웃
        async Logout(userpayload:User):Promise<LogoutResDto>{
            if(!userpayload.user_id){
                throw new BadRequestException();
            }
            const user_data = await this.userRepository.findOne({where:{user_id:userpayload.user_id}});
            if(!user_data){
                throw new NotFoundException();
            }
            await this.userRepository.update({PK:user_data.PK},{refreshtoken:null});
            const text:LogoutResDto = new LogoutResDto();
            text.success_text = '로그아웃 했습니다!';
            return text;
        }

        //accesstoken 생성
        async CreateAccessToken(user_data:User):Promise<CreateAccessTokenResponesDto>{
            const payload:PayLoad = new PayLoad()
            payload.payloadsetter(user_data);
            const token:CreateAccessTokenResponesDto = new CreateAccessTokenResponesDto();
            token.accesstoken = this.jwtService.sign({...payload},{
                secret: process.env.SECRET,
                expiresIn: '5m',
            });
            return token
        }

        //refreshtoken 생성
        async CreateRefreshToken(user_id:string):Promise<CreateRefreshTokenResDto>{
            const payload:RefreshTokenPayload = new RefreshTokenPayload();
            payload.refreshsetter(user_id);
            const token:CreateRefreshTokenResDto = new CreateRefreshTokenResDto();
            token.refreshtoken = this.jwtService.sign({...payload},{
                secret: process.env.SECRET,
                expiresIn: '10h',
            });
            return token;
        }

        //회원 정보 수정 
        async EditUser(user_data:User,body:EditUserRequsetDto):Promise<EditUserResponseDto>{
            if(!user_data.user_id){
                throw new BadRequestException();
            }
            const finduser = this.userRepository.findOne({where:{user_id:user_data.user_id}});
            await this.userRepository.update(
                {user_id:user_data.user_id},
                {
                 user_name:body.user_name,
                 user_pw:body.user_pw,
                },
            );
            const success_text:EditUserResponseDto = new EditUserResponseDto();
            success_text.text='수정에 성공하였습니다!';
            return success_text;
        }
        
        //회원 탈퇴 (삭제 X, 데이터 남기기)
        async UnRegister(userpayload:User):Promise<UnRegisterResponseDto>{
            if(!userpayload.user_id){
                throw new BadRequestException();
            }
            const userinfo = await this.userRepository.findOne({where:{user_id:userpayload.user_id}});
            if(!userinfo||!userinfo.user_id){
                throw new BadRequestException();
            }
            await this.userRepository.update(
                {user_id:userinfo.user_id},
                {user_id:null,user_name:null,user_pw:null,refreshtoken:null,isActive:false},
            );
            return new UnRegisterResponseDto();
        }

}
