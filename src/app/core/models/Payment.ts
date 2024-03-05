import { Member } from "./Member";
import { Subscription } from "./Subscription";

export interface Payment{
    id:number|undefined;
    amountPayed:number;
    shouldPay:number;
    paymentDate:Date;
    subscriptionMember:Subscription;
    payedMember : Member;
}