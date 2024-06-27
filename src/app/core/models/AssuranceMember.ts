import { Member } from "./Member";

export interface AssuranceMember{
    id:number | undefined;
    amountPayed : number;
    assurancAgency : string;
    startDate : Date;
    endDate : Date;
    member : Member;
} 