import { User } from "src/user_entity/user.entity";

export class PayLoad{
    user_id:string;
    user_pw:string;
    user_name:string;


    payloadsetter(user_data:User){
        this.user_id = user_data.user_id;
        this.user_pw = user_data.user_pw;
        this.user_name = user_data.user_name;
    }
}