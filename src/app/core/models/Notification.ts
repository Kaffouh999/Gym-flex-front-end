export interface Notification{
    id:number | undefined;
    message:String;
    attachUrl:String;
    redirectUrl:String;
    idEntityConcerned:number;
    readed:Boolean;
}