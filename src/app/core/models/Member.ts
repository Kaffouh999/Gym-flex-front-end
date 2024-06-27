import { GymBranch } from "./GymBranch";
import { OnlineUser } from "./OnlineUser";

export interface Member{
    id:number | undefined;
    cin:string;
    age:number;
    adress:string;
    gender:boolean;
    gymBranch:GymBranch;
    onlineUser:OnlineUser;
}