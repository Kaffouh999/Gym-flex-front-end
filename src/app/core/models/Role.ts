export interface Role{
    id:number|undefined;
    name:string;
    description:string;
    analytics:Boolean;

  membership:Boolean;

  payments:Boolean; // only if he has membership

  inventory:Boolean;

  training:Boolean;

  settings:Boolean;

  preferences:Boolean;

  manageWebSite:Boolean;

  coach:Boolean;
}