import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MessageService } from "primeng/api";
import { GymBranch } from "src/app/core/models/GymBranch";
import { Member } from "src/app/core/models/Member";
import { OnlineUser } from "src/app/core/models/OnlineUser";
import { GymBranchService } from "src/app/features/settings/services/gym-branch.service";
import { AuthService } from "src/app/shared/services/auth.service";
import { MemberService } from "../../services/member.service";
import { OnlineUserService } from "../../services/online-user.service";

@Component({
    selector: "app-account",
    templateUrl: "./account.component.html",
    styleUrls: ["./account.component.scss"],
    providers: [MessageService],
})
export class AccountComponent implements OnInit {
    authMember: Member = {
        id: 0,
        cin: "",
        age: 0,
        adress: "",
        gender: true,
        gymBranch: {
            id: 0,
            name: "",
            latitude: 0,
            longitude: 0,
            adress: undefined,
            email: undefined,
            appPasswordEmail: undefined,
            phoneNumber: undefined,
            openingDate: undefined,
            closingDate: undefined,
            sessionDurationAllowed: 0,
        },
        onlineUser: {
            id: 0,
            firstName: "",
            lastName: "",
            login: "",
            email: "",
            password: "",
            profilePicture: "",
            role: undefined,
        },
    };
    gym: GymBranch = {
        id: 0,
        name: undefined,
        latitude: 0,
        longitude: 0,
        adress: undefined,
        email: undefined,
        appPasswordEmail: undefined,
        phoneNumber: undefined,
        openingDate: undefined,
        closingDate: undefined,
        sessionDurationAllowed: 0,
    };
    authenticatedUser: OnlineUser = {
        id: 0,
        firstName: "",
        lastName: "",
        login: "",
        email: "",
        password: "",
        profilePicture: "",
        role: undefined,
    };
    timeStamp: number = 0;
    gymBranches: GymBranch[] = [];
    myAccountForm: FormGroup;
    formData: FormData = new FormData();

    constructor(
        private authuservice: AuthService,
        private onlineUserService: OnlineUserService,
        private formBuilder: FormBuilder,
        private messageService: MessageService,
        private memberService: MemberService,
        private gymbranchService: GymBranchService
    ) {}

    ngOnInit(): void {
        this.myAccountForm = this.formBuilder.group({
            firstName: ["", Validators.required],
            lastName: ["", Validators.required],
            email: ["", Validators.required],
            cin: ["", Validators.required],
            adress: [""],
            age: ["", Validators.required],
            gender: ["", Validators.required],
            gymBranch: ["", Validators.required],
        });
        this.getALllGymBranches();
        this.getUserAuthenticated();
        this.getTimeStamp();
    }

    getUserAuthenticated() {
        let idUser: number = this.authuservice.getAuthUser().id;
        this.memberService.getMemberByUser(idUser).subscribe({
            next: (res: any) => {
                this.authMember = res as Member;
                this.authenticatedUser = this.authMember.onlineUser;
                this.fillForm();
            },
            error: (err: any) => {
                throw err;
            },
        });
    }
    getTimeStamp() {
        this.timeStamp = new Date().getTime();
    }
    getALllGymBranches() {
        this.gymbranchService.getALlBranches().subscribe((res: any) => {
            this.gymBranches = res as GymBranch[];
        });
    }

    saveMyAccount() {
        this.fillAccountMember();
        this.memberService
            .updateMember(this.authMember.id, this.authMember)
            .subscribe({
                next: (res: any) => {
                    if (this.formData.has("file")) {
                        this.updateImage().subscribe((res: any) => {
                            this.messageService.add({
                                severity: "success",
                                summary: "Successful",
                                detail: "Account Updated Successfuly",
                                life: 3000,
                            });
                            this.getTimeStamp();
                        });
                    }
                    this.getUserAuthenticated();
                },
                error: (err: any) => {
                    this.messageService.add({
                        severity: "error",
                        summary: "Error",
                        detail: "Account Didn't update there is an error , please contact us to reoprt it ",
                        life: 3000,
                    });
                },
            });
    }

    fillForm(): void {
        this.myAccountForm.patchValue({
            firstName: this.authMember.onlineUser.firstName,
            lastName: this.authMember.onlineUser.lastName,
            email: this.authMember.onlineUser.email,
            cin: this.authMember.cin,
            adress: this.authMember.adress,
            age: this.authMember.age,
            gender: this.authMember.gender,
            gymBranch: this.authMember.gymBranch,
        });
    }

    fillAccountMember(): void {
        this.fillAccountUser();
        this.authMember = {
            id: this.authMember.id,
            cin: this.myAccountForm.get("cin").value,
            age: this.myAccountForm.get("age").value,
            adress: this.myAccountForm.get("adress").value,
            gender: this.myAccountForm.get("gender").value,
            gymBranch: this.myAccountForm.get("gymBranch").value,
            onlineUser: this.authenticatedUser,
        };
    }

    fillAccountUser(): void {
        this.authenticatedUser = {
            id: this.authenticatedUser.id,
            firstName: this.myAccountForm.get("firstName").value,
            lastName: this.myAccountForm.get("lastName").value,
            email: this.myAccountForm.get("email").value,
            password: this.authenticatedUser.password,
            role: this.authenticatedUser.role,
            profilePicture: this.authenticatedUser.profilePicture,
            login: this.authenticatedUser.login,
        };
    }

    onUpload(event: any) {
        for (let file of event.files) {
            console.log(file);
            this.formData = new FormData();
            this.formData.append("file", file);
        }
    }

    updateImage() {
        let id: number = this.authenticatedUser.id;
        return this.onlineUserService.updateImage(id, this.formData);
    }
}
