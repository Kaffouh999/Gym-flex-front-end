import { Plan } from "./Plan";

export interface PaymentStatistics {
    plan:Plan;
    numberOfPayments:number;
    numberOfSubscriptions:number;
    totalAmountPayed:number;

}