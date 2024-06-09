import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { TreeNode } from "primeng/api";
import { map, Observable } from "rxjs";
import { Payment } from "src/app/core/models/Payment";
import { Plan } from "src/app/core/models/Plan";
import { Subscription } from "src/app/core/models/Subscription";
import { SubscriptionWithPayments } from "src/app/core/models/SubscriptionWithPayments";
import { PaymentService } from "src/app/features/membership/services/payment.service";
import { PlanService } from "src/app/features/membership/services/plan.service";
import { AuthService } from "src/app/shared/services/auth.service";
import { environment } from "src/environments/environment";

@Component({
    selector: "app-my-paymnts",
    templateUrl: "./my-paymnts.component.html",
    styleUrls: ["./my-paymnts.component.scss"],
})
export class MyPaymntsComponent implements OnInit {
    payments: Payment[] = [];
    plans: Plan[] = [];
    subs: SubscriptionWithPayments[] = [];

    constructor(
        private http: HttpClient,
        private paymentService: PaymentService,
        private planService: PlanService,
        private authService: AuthService
    ) {}

    ngOnInit(): void {
        let idUserAuth: number = this.authService.getAuthUser().id;
        this.getAllPlans();
        this.getAuthUserPayments(idUserAuth);
        this.getSubscriptions(idUserAuth).subscribe((res: any) => {
            console.log(res);
        });
    }

    getAuthUserPayments(id: number) {
        this.http
            .get(environment.API_URL + "/web/payments/" + id)
            .subscribe((res: any) => {
                this.payments = res as Payment[];
            });
    }

    getAllPlans() {
        this.planService.getAllPlans().subscribe((res: any) => {
            this.plans = res as Plan[];
        });
    }

    getSubscriptions(id: number) {
        return this.http
            .get<SubscriptionWithPayments[]>(
                environment.API_URL + "/web/subscription-members/" + id
            )
            .pipe(
                map(
                    (subscriptions: SubscriptionWithPayments[]) =>
                        //subscriptions.map(subscription => this.buildTreeNode(subscription))
                        (this.subs = subscriptions)
                )
            );
    }

    /*private buildTreeNode(subscription: SubscriptionWithPayments): TreeNode {
    const treeNode: TreeNode = {
      data: subscription,
      children: []
    };
    if (subscription.paymentList) {
      treeNode.children = subscription.paymentList.map(payment => ({
        data: payment,
        children: []
      }));
    }
    return treeNode;
  }*/
}
