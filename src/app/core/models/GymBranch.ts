export interface GymBranch{
    id:number | undefined;
    name:string;
    latitude:number;
    longitude:number;
    adress:string;
    email:string;
    appPasswordEmail:string;
    phoneNumber:string;
    openingDate:Date | undefined;
    closingDate:Date | undefined;
    sessionDurationAllowed : number; 
}