import { Member } from "./Member";
import { Payment } from "./Payment";
import { Plan } from "./Plan";

export interface SubscriptionWithPayments{
    id : number | undefined;
    startDate : Date;
    endDate : Date;
    plan : Plan;
    member : Member;
    codeSubscription : string;
    discountPercentage : number;
    paymentList:Payment[];
}