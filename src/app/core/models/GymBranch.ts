export interface GymBranch{
    id:number | undefined;
    name:String;
    latitude:number;
    longitude:number;
    adress:String;
    email:String;
    appPasswordEmail:String;
    phoneNumber:String;
    openingDate:Date | undefined;
    closingDate:Date | undefined;
    sessionDurationAllowed : number; 
}