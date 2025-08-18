import { Board } from "src/board_entity/board.entity";
import { RegisterRequestDto } from "src/RequestDto/register.request";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User{
    @PrimaryGeneratedColumn()
    PK: number;

    @Column()
    user_id:string;

    @Column()
    user_pw:string;

    @Column()
    user_name:string;

    @Column({type:'varchar' , nullable:true})
    refreshtoken:string|null;

    @OneToMany(()=> Board,(board)=>board.user,{onDelete: 'CASCADE'})
    board:Board[]

    setter(user_data:RegisterRequestDto){
        this.user_id = user_data.user_id;
        this.user_pw = user_data.user_pw;
        this.user_name = user_data.user_name;
    }
}