import { CreateBoardReqDto } from "src/RequestDto/createboard.req";
import { User } from "src/user_entity/user.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Board{
    @PrimaryGeneratedColumn()
    board_pk:number;

    @Column({unique: true})
    board_title: string;

    @Column()
    board_description: string;

    @ManyToOne(()=> User,{cascade:true})
    user: User;

    boardSetter(user:User,board:CreateBoardReqDto){ //(앞에 소문자)
        this.board_title = board.board_title;
        this.board_description = board.board_description;
        this.user = user;
    }
}