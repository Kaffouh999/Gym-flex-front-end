import { Role } from "./Role";

export interface OnlineUser{
    id:number | undefined;
    firstName:String;
    lastName:String;
    login:String;
    email:String;
    password:String;
    profilePicture:String | undefined;
    role:Role|undefined;
}