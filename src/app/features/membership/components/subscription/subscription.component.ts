import { Component, forwardRef } from "@angular/core";
import { FormBuilder, FormGroup, NgControl, Validators } from "@angular/forms";
import { ConfirmationService, MessageService } from "primeng/api";
import { Member } from "src/app/core/models/Member";
import { OnlineUser } from "src/app/core/models/OnlineUser";
import { Plan } from "src/app/core/models/Plan";
import { Subscription } from "src/app/core/models/Subscription";
import { GymBranchComponent } from "src/app/features/settings/components/gym-branch/gym-branch.component";
import { MemberService } from "../../services/member.service";
import { PlanService } from "../../services/plan.service";
import { SubscriptionService } from "../../services/subscription.service";

@Component({
    selector: "app-subscription",
    templateUrl: "./subscription.component.html",
    styleUrls: ["./subscription.component.scss"],
    providers: [
        MessageService,
        ConfirmationService,
        {
            provide: NgControl,
            useExisting: forwardRef(() => GymBranchComponent),
        },
    ],
})
export class SubscriptionComponent {
    subscriptionInput: Subscription;
    members: Member[] = [];
    plans: Plan[] = [];
    subscriptions: Subscription[] = [];
    subscriptionDialog: boolean = false;
    subscriptionImageDialog: boolean = false;
    showQrDialog: boolean = false;
    subscriptionForm: FormGroup;
    formData: FormData = new FormData();
    isAdd: boolean;
    timeStamp: number = 0;
    layout: string = "list";
    selectedMember: Member;
    selectedPlan: Plan;
    rangeDates: Date[] = [];
    discount: number;

    constructor(
        private formBuilder: FormBuilder,
        private memberService: MemberService,
        private planService: PlanService,
        private subscriptionService: SubscriptionService,
        private messageService: MessageService,
        private confirmationService: ConfirmationService
    ) {}
    ngOnInit(): void {
        this.initSubscription();
        this.getAllSubscriptions();
        this.getAllMembers();
        this.getAllPlans();

        this.subscriptionForm = this.formBuilder.group({
            plan: ["", Validators.required],
            member: ["", Validators.required],
            startDate: ["", Validators.required],
            discountPercentage: ["", Validators.required],
        });
    }
    openNew() {
        this.subscriptionInput = {
            id: undefined,
            plan: this.plans[0],
            member: this.members[0],
            startDate: undefined,
            endDate: undefined,
            discountPercentage: 0,
            codeSubscription: "",
        };
        this.fillForm(this.subscriptionInput);
        this.formData = new FormData();
        this.isAdd = true;
        this.subscriptionDialog = true;
    }
    hideDialog() {
        this.subscriptionDialog = false;
    }
    hideqrDialog() {
        this.showQrDialog = false;
    }
    getAllMembers() {
        this.memberService.getAllMembers().subscribe((data: any) => {
            this.members = data;
        });
    }
    getAllPlans() {
        this.planService.getAllPlans().subscribe((data: any) => {
            this.plans = data;
        });
    }
    getAllSubscriptions() {
        this.subscriptionService
            .getAllSubscriptions()
            .subscribe((data: any) => {
                this.subscriptions = data;
            });
    }
    saveSubscription() {
        this.fillSubscription();

        if (this.subscriptionInput.id === undefined) {
            this.subscriptionService
                .addSubscription(this.subscriptionInput)
                .subscribe((res: any) => {
                    this.getAllSubscriptions();
                    this.hideDialog();
                    this.messageService.add({
                        severity: "success",
                        summary: "Successful",
                        detail: "subscription added successfuly",
                        life: 3000,
                    });
                });
        } else {
            this.subscriptionService
                .updateSubscription(
                    this.subscriptionInput.id,
                    this.subscriptionInput
                )
                .subscribe((res: any) => {
                    this.getAllSubscriptions();
                    this.hideDialog();
                    this.messageService.add({
                        severity: "success",
                        summary: "Successful",
                        detail: "subscription updated successfuly",
                        life: 3000,
                    });
                });
        }
    }

    editSubscription(subscription: Subscription) {
        this.subscriptionInput = { ...subscription };
        this.fillForm(subscription);
        this.formData = new FormData();
        this.isAdd = false;
        this.subscriptionDialog = true;
    }

    deleteSubscription(assurance: Subscription) {
        this.confirmationService.confirm({
            message: "Are you sure you want to delete this assurance?",
            header: "Confirm",
            icon: "pi pi-exclamation-triangle",
            reject: () => {},
            accept: () => {
                this.subscriptionService
                    .deleteSubscription(assurance.id)
                    .subscribe({
                        next: (response: any) => {
                            this.getAllSubscriptions();
                            this.messageService.add({
                                severity: "success",
                                summary: "Successful",
                                detail: "Subscription Deleted",
                                life: 3000,
                            });
                        },
                        error: (error: any) => {
                            if (error.status === 409) {
                                const errorMessage = error.error;
                                this.messageService.add({
                                    severity: "error",
                                    summary: "Error",
                                    detail: errorMessage,
                                    life: 3000,
                                });
                            } else {
                                this.messageService.add({
                                    severity: "error",
                                    summary: "Error",
                                    detail: "There is an error in our server, please report here",
                                    life: 3000,
                                });
                            }
                        },
                    });
            },
        });
    }

    searchSubs() {
        let subForSearch: Subscription = {
            id: 0,
            startDate: undefined,
            endDate: undefined,
            plan: undefined,
            member: undefined,
            codeSubscription: "",
            discountPercentage: 0,
        };
        subForSearch.member = this.selectedMember;
        subForSearch.plan = this.selectedPlan;
        subForSearch.startDate = this.rangeDates[0];
        subForSearch.endDate = this.rangeDates[1];
        this.subscriptionService
            .searchSubscriptions(subForSearch)
            .subscribe((res: any) => {
                this.subscriptions = res as Subscription[];
            });
    }

    fillSubscription(): void {
        this.subscriptionInput = {
            id: this.subscriptionInput.id,
            plan: this.subscriptionForm.get("plan").value,
            member: this.subscriptionForm.get("member").value,
            startDate: this.subscriptionForm.get("startDate").value,
            endDate: this.subscriptionInput.endDate,
            discountPercentage:
                this.subscriptionForm.get("discountPercentage").value,
            codeSubscription: this.subscriptionInput.codeSubscription, //still not sure about it
        };
    }

    fillForm(subscription: Subscription): void {
        let stardate: Date;

        if (subscription.startDate != undefined) {
            stardate = new Date(subscription.startDate);
        }

        this.subscriptionForm.patchValue({
            plan: subscription.plan,
            startDate: stardate,
            discountPercentage: subscription.discountPercentage,
            member: subscription.member,
        });
    }

    showQrCode(subscription: Subscription) {
        this.subscriptionInput = { ...subscription };
        this.showQrDialog = true;
    }
    initSubscription() {
        let user: OnlineUser = {
            id: 0,
            firstName: "",
            lastName: "",
            login: "",
            email: "",
            password: "",
            profilePicture: "",
            role: undefined,
        };

        let member: Member = {
            id: 0,
            cin: undefined,
            age: 0,
            adress: undefined,
            gender: undefined,
            gymBranch: undefined,
            onlineUser: user,
        };
        let plan: Plan = {
            id: 0,
            name: "",
            description: "",
            duration: 0,
            price: 0,
            ratingPer5: 0,
            imageAds: "",
        };
        this.subscriptionInput = {
            id: undefined,
            plan: plan,
            member: member,
            startDate: undefined,
            endDate: undefined,
            discountPercentage: 0,
            codeSubscription: "",
        };
    }
    printMemberCard() {
        this.subscriptionService
            .getMemberCard(this.subscriptionInput.member.id)
            .subscribe((res: any) => {
                let file = new Blob([res], { type: "application/pdf" });
                let fileURL = URL.createObjectURL(file);
                window.open(fileURL);
            });
    }

    calculateEndDate(startDateString: string, numberOfDays: number): string {
        // Parse the start date string
        const startDate = new Date(startDateString);
        
        // Add the number of days
        const endDate = new Date(startDate.getTime() + numberOfDays * 24 * 60 * 60 * 1000);
        
        // Format the end date as an ISO string
        return endDate.toISOString();
      }
}
