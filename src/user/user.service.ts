import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Board } from 'src/board_entity/board.entity';
import { UserInfoResDto } from 'src/ResponeseDto/userinfo.respones';
import { UserListResDto } from 'src/ResponeseDto/userlist.respones';
import { UserListInfoResDto } from 'src/ResponeseDto/userlistinfo.respones';
import { User } from 'src/user_entity/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
     constructor(
                @InjectRepository(User)
                private readonly userRepository:Repository<User>,
                @InjectRepository(Board)
                private readonly boardRepository:Repository<Board>,
                private readonly jwtService:JwtService
            ){}
    
    //자신 정보 조회
    async UserInfo(userpayload:User):Promise<UserInfoResDto>{
        if(!userpayload.user_id){
            throw new BadRequestException();
        }
        const finduser = await this.userRepository.findOne({where:{user_id:userpayload.user_id}});
        if(!finduser||!finduser.user_id||!finduser.user_name||!finduser.user_pw){
            throw new NotFoundException();
        }
        const board_count = await this.boardRepository.count({where:{user:finduser}});
        const user_data:UserInfoResDto = new UserInfoResDto();
        user_data.PK = finduser.PK;
        user_data.user_id = finduser.user_id;
        user_data.user_pw = finduser.user_pw;
        user_data.user_name = finduser.user_name;
        user_data.board_count = board_count;
        
        return user_data;
    }

    //전제 회원 조회
    async UserList():Promise<UserListInfoResDto>{
        const list:User[] = await this.userRepository.find({select:['user_name']});
        if(list.length===0){
            throw new NotFoundException();
        }
        const user_count:number = await this.userRepository.count();
        const user_list:UserListInfoResDto = new UserListInfoResDto()
        for(let i=0;i<user_count;i++){
            const user:UserListResDto = new UserListResDto(); 
            if(!list[i].user_name){
                throw new BadRequestException();
            }
            user.user_name = list[i].user_name;
            user.board_count = await this.boardRepository.count({where:{user:list[i]}});
            user_list.user_list[i] = user;
        }
        return user_list;
    }
}
