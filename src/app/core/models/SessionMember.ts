import { GymBranch } from "./GymBranch";
import { Member } from "./Member";
import { Subscription } from "./Subscription";

export interface SessionMember{
    id:number | undefined;
    enteringTime:Date;
    leavingTime:Date;
    subscriptionMember : Subscription;
    gymBranch: GymBranch;
    managerAtTheTime:Member;
}