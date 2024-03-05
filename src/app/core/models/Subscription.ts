import { Member } from "./Member";
import { Plan } from "./Plan";

export interface Subscription{
    id : number | undefined;
    startDate : Date;
    endDate : Date;
    plan : Plan;
    member : Member;
    codeSubscription : string;
    discountPercentage : number;
}