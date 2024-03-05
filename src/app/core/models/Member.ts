import { O } from "@fullcalendar/core/internal-common";
import { GymBranch } from "./GymBranch";
import { OnlineUser } from "./OnlineUser";

export interface Member{
    id:number | undefined;
    cin:String;
    age:number;
    adress:String;
    gender:Boolean;
    gymBranch:GymBranch;
    onlineUser:OnlineUser;
}