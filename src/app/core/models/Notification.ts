export interface Notification{
    id:number | undefined;
    message:string;
    attachUrl:string;
    redirectUrl:string;
    idEntityConcerned:number;
    readed:boolean;
}