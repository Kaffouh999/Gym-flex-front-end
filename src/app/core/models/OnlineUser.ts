import { Role } from "./Role";

export interface OnlineUser{
    id:number | undefined;
    firstName:string;
    lastName:string;
    login:string;
    email:string;
    password:string;
    profilePicture:string | undefined;
    role:Role|undefined;
}