export interface Plan{
    id:number | undefined;
    name:string;
    description : string;
    duration : number;
    price : number;
    ratingPer5:number;
    imageAds : string;
}