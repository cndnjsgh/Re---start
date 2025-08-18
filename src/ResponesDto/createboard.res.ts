import { IsString } from "class-validator";

export class CreateBoardResDto{
    
    @IsString()
    user_name: string;

    @IsString()
    success_message: string
}