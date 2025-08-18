export class RefreshTokenPayload{
    user_id:string;


    refreshsetter(_user_id:string){
        this.user_id = _user_id;
    }
}