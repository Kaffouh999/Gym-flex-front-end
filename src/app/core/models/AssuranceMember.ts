import { Member } from "./Member";

export interface AssuranceMember{
    id:number | undefined;
    amountPayed : number;
    assurancAgency : String;
    startDate : Date;
    endDate : Date;
    member : Member;
} 