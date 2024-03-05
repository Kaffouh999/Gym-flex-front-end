import { Component, forwardRef, Input } from "@angular/core";
import { FormBuilder, FormGroup, NgControl, Validators } from "@angular/forms";
import { ConfirmationService, MessageService } from "primeng/api";
import { GymBranch } from "src/app/core/models/GymBranch";
import { Member } from "src/app/core/models/Member";
import { OnlineUser } from "src/app/core/models/OnlineUser";
import { GymBranchService } from "src/app/features/settings/services/gym-branch.service";
import { MemberService } from "../../services/member.service";
import { OnlineUserService } from "../../services/online-user.service";
import { saveAs } from 'file-saver';
import { ExporterService } from "src/app/shared/services/exporter.service";
import { Table } from "primeng/table";
import { Role } from "src/app/core/models/Role";
import { RoleService } from "src/app/features/settings/services/role.service";


@Component({
    selector: "app-member",
    templateUrl: "./member.component.html",
    styleUrls: ["./member.component.scss"],
    providers: [
        MessageService,
        ConfirmationService,
        { provide: NgControl, useExisting: forwardRef(() => MemberComponent) },
    ],
})
export class MemberComponent {
  

    memberDialog: boolean;

    members: Member[];
    gymBranches: GymBranch[];
    roles:Role[];
    users:OnlineUser[];

    memberInput: Member;
    onlineuserInput: OnlineUser;
    selectedMember: Member;
    submitted: boolean;
    membersForm: FormGroup;

    formData: FormData = new FormData();
    isAdd: Boolean;
    userImageDialog: Boolean = false;
    timeStamp: number = 0;
    items:any[]=[];
    selectedMembers: any[];
    cols: any[];
    _selectedColumns: any[];

    constructor(
        private formBuilder: FormBuilder,
        private onlineUserService: OnlineUserService,
        private memberService: MemberService,
        private gymbranchService: GymBranchService,
        private roleService:RoleService,
        private messageService: MessageService,
        private confirmationService: ConfirmationService,
        private exporterService:ExporterService
    ) {}

    @Input() get selectedColumns(): any[] {
        return this._selectedColumns;
    }

    set selectedColumns(val: any[]) {
        //restore original order
        this._selectedColumns = this.cols.filter((col) => val.includes(col));
    } 

    ngOnInit() {
        this.getAllMembers();
        this.getAllGymBranches();
        this.getAllUsers();
        this.getAllRoles();
        this.membersForm = this.formBuilder.group({
            firstName: ["", Validators.required],
            lastName: ["", Validators.required],
            login: ["", Validators.required],
            email: [
                "",
                Validators.pattern(
                    "^(?=.{1,254}$)(?=.{1,64}@)[-!#$%&'*+/0-9=?A-Z^_`a-z{|}~]+(.[-!#$%&'*+/0-9=?A-Z^_`a-z{|}~]+)*@[A-Za-z0-9]([A-Za-z0-9-]{0,61}[A-Za-z0-9])?(.[A-Za-z0-9]([A-Za-z0-9-]{0,61}[A-Za-z0-9])?)*$"
                ),
            ],
            password: ["", Validators.required],
            profilePicture: [""],
            cin: ["", Validators.required],
            role:[""],
            age: [""],
            adress: [""],
            gender: [""],
            gymBranch: ["", Validators.required],
            onlineuserInput:[""]
        });

        this.cols = [
            { dataKey: 'firstName', header: 'FirstName' },
            { dataKey: 'lastName', header: 'LastName' },
            { dataKey: 'email', header: 'Email' },
            { dataKey: 'cin', header: 'Cin' },
            { dataKey: 'age', header: 'Age' },
            { dataKey: 'adress', header: 'Adress' },
            { dataKey: 'login', header: 'Login' },
            { dataKey: 'gymbranch', header: 'Gymbranch' },
        ];

        this.items=[
            {
                label: 'Open New',
                icon: 'pi pi-fw pi-file',
                command:() => this.openNew()
            }, {
                label: 'from Registered User',
                icon: 'pi pi-qrcode',
                command:() => this.openNew()
            }];
    }

    openNew() {
        let date: Date = new Date();
        this.onlineuserInput = {
            id: undefined,
            firstName: "",
            lastName: "",
            login: "",
            email: "",
            password: "",
            profilePicture: "",
            role:this.roles[0]
        };
        this.memberInput = {
            id: undefined,
            cin: "",
            age: 0,
            adress: "",
            gender: true,
            onlineUser: this.onlineuserInput,
            gymBranch: this.gymBranches[0],
        };
        this.remplirForm(this.memberInput);
        this.submitted = false;
        this.formData = new FormData();
        this.isAdd = true;
        this.memberDialog = true;
    }

    editMemberInput(member: Member) {
        this.remplirForm(member);
        this.formData = new FormData();
        this.isAdd = false;
        this.memberDialog = true;
    }

    editImage(member: Member) {
        this.memberInput = { ...member };
        this.formData = new FormData();
        this.userImageDialog = true;
    }

    deleteMember(member: Member) {
        this.confirmationService.confirm({
            message:
                "Are you sure you want to delete " +
                member.onlineUser.firstName +
                "?",
            header: "Confirm",
            icon: "pi pi-exclamation-triangle",
            accept: () => {
                this.memberService
                    .deleteMember(member.id)
                    .subscribe((res: any) => {
                        this.getAllMembers();
                        this.messageService.add({
                            severity: "success",
                            summary: "Successful",
                            detail: "member Deleted",
                            life: 3000,
                        });
                    },(error : any) => {

                        if (error.status === 409) {
                            // Display error message from the response body to the user
                            const errorMessage = error.error;
                            this.messageService.add({
                                severity: "error",
                                summary: "Error",
                                detail: errorMessage,
                                life: 10000,
                            });
                            // Display error message to the user using appropriate UI components
                          } else {
                            this.messageService.add({
                                severity: "error",
                                summary: "Error",
                                detail: "there is an error in our server , please report here",
                               
                            });
                          }

                    });
          
            },
        });
    }
    deleteSelectedMembers() {
        throw new Error("Method not implemented.");
    }

    hideDialog() {
        this.memberDialog = false;
        this.submitted = false;
    }

    saveMember() {
        this.fillMember();
        if (this.memberInput.id === undefined) {
            let fullName =this.memberInput.onlineUser.email;
                        this.memberInput.onlineUser.profilePicture =this.memberInput.onlineUser.email+ ".jpg";
                        this.memberService
                            .addMember(this.memberInput)
                            .subscribe((res: any) => {
                                this.getAllMembers();
                                this.hideDialog();
                                this.messageService.add({
                                    severity: "success",
                                    summary: "Successful",
                                    detail: "member added successfuly",
                                    life: 3000,
                                });
                            },(error:any) => {
                                console.log(error)
                                if (error.status === 400) {
                                    // Display error message from the response body to the user
                                    
                                    const errorMessage = error.error;
                                    this.messageService.add({
                                        severity: "error",
                                        summary: "Error",
                                        detail: errorMessage,
                                        life: 3000,
                                    });
                                    // Display error message to the user using appropriate UI components
                                  } else {
                                    const errorMessage = error.error;

                                    this.messageService.add({
                                        severity: "error",
                                        summary: "Error",
                                        detail: errorMessage,
                                       life:3000
                                    });
                                  }
                            });
             
        } else {
            this.memberService
                .updateMember(this.memberInput.id, this.memberInput)
                .subscribe((res: any) => {
                    this.getAllMembers();
                    this.hideDialog();
                    this.messageService.add({
                        severity: "success",
                        summary: "Successful",
                        detail: "member updated successfuly",
                        life: 3000,
                    });
                },(error:any) => {
                     if (error.status === 409) {
                            // Display error message from the response body to the user
                            const errorMessage = error.error;
                            this.messageService.add({
                                severity: "error",
                                summary: "Error",
                                detail: errorMessage,
                                life: 10000,
                            });
                            // Display error message to the user using appropriate UI components
                          } else {
                            this.messageService.add({
                                severity: "error",
                                summary: "Error",
                                detail: "there is an error in our server , please report here",
                               
                            });
                          }
                });
        }

        this.hideDialog();
    }

    getAllMembers() {
        this.memberService.getAllMembers().subscribe(
            (res: any) => {
                this.members = res as Member[];
                console.log(this.members);
                this.getTimeStamp();
            },
            (err: Error) => {
                console.log(err.message);
            }
        );
    }
    getAllUsers() {
        this.onlineUserService.getAllUsers().subscribe(
            (res: any) => {
                this.users = res as OnlineUser[];
                this.users.unshift(null);
            },
            (err: Error) => {
                console.log(err.message);
            }
        );
    }

    getAllGymBranches() {
        this.gymbranchService.getALlBranches().subscribe(
            (res: any) => {
                this.gymBranches = res as GymBranch[];
            },
            (err: Error) => {
                console.log(err.message);
            }
        );
    }

    getAllRoles() {
        this.roleService.getAllRoles().subscribe(
            (res: any) => {
                this.roles = res as Role[];
            },
            (err: Error) => {
                console.log(err.message);
            }
        );
    }

    fillMember(): void {
        this.onlineuserInput = {
            id: this.onlineuserInput.id,
            firstName: this.membersForm.get("firstName").value,
            lastName: this.membersForm.get("lastName").value,
            login: this.membersForm.get("login").value,
            email: this.membersForm.get("email").value,
            password: this.membersForm.get("password").value,
            profilePicture: this.memberInput.onlineUser.profilePicture,
            role:this.membersForm.get("role").value
        };

        this.memberInput = {
            id: this.memberInput.id,
            cin: this.membersForm.get("cin").value,
            age: this.membersForm.get("age").value,
            gender: this.membersForm.get("gender").value,
            adress: this.membersForm.get("adress").value,
            gymBranch: this.membersForm.get("gymBranch").value,
            onlineUser: { ...this.onlineuserInput },
        };
    }

    remplirForm(member: Member): void {
        this.onlineuserInput = { ...member.onlineUser };
        this.memberInput = {
            id: member.id,
            cin: "",
            age: 0,
            adress: "",
            gender: true,
            onlineUser: member.onlineUser,
            gymBranch: member.gymBranch,
        };

        this.membersForm.patchValue({
            firstName: member.onlineUser.firstName,
            lastName: member.onlineUser.lastName,
            login: member.onlineUser.login,
            email: member.onlineUser.email,
            password: member.onlineUser.password,
            profilePicture: member.onlineUser.profilePicture,
            role:member.onlineUser.role,
            cin: member.cin,
            age: member.age,
            gender: member.gender,
            adress: member.adress,
            gymBranch: member.gymBranch,
            onlineuserInput:member.onlineUser
        });
    }

    fillUserFields(){
        
        this.onlineuserInput = this.membersForm.get("onlineuserInput").value;
        if(this.onlineuserInput != null){
            this.membersForm.get("firstName")?.disable();
            this.membersForm.get("lastName")?.disable();
            this.membersForm.get("login")?.disable();
            this.membersForm.get("email")?.disable();
            this.membersForm.get("password")?.disable();
        }else{
            this.onlineuserInput={id:undefined,email:"",firstName:"",lastName:"",login:"",password:"",profilePicture:"",role:undefined};
        }
        this.membersForm.patchValue({
            firstName: this.onlineuserInput.firstName,
            lastName: this.onlineuserInput.lastName,
            login: this.onlineuserInput.login,
            email: this.onlineuserInput.email,
            password: this.onlineuserInput.password,
            profilePicture: this.onlineuserInput.profilePicture,
         
        });
     
    }

    onUpload(event: any) {
        for (let file of event.files) {
            console.log(file);
            this.formData = new FormData();
            this.formData.append("file", file);
        }
    }

    updateImage() {
        let id: number = this.memberInput.onlineUser.id;
        this.onlineUserService.updateImage(id, this.formData).subscribe(
            (response) => {
                console.log("File uploaded successfully:", response);
                this.getAllMembers();

                this.userImageDialog = false;
            },
            (err) => {
                console.log(err);
            }
        );
    }

    getTimeStamp() {
        this.timeStamp = new Date().getTime();
    }

    exportExcel() {
   
        let selectedMembers = this.selectedMembers.map((col:Member) => ( {
            cin:col.cin ,
            age: col.age,
            adress: col.adress,
            firstName: col.onlineUser.firstName,
            lastName: col.onlineUser.lastName,
            email: col.onlineUser.email,
            login: col.onlineUser.login,
            gymbranch: col.gymBranch.name,
        }));
   this.exporterService.exportExcel(selectedMembers , this._selectedColumns,"Members");
    }
 

    exportPdf() {

        let selectedMembers = this.selectedMembers.map((col:Member) => ( {
        cin:col.cin ,
        age: col.age,
        adress: col.adress,
        firstName: col.onlineUser.firstName,
        lastName: col.onlineUser.lastName,
        email: col.onlineUser.email,
        login: col.onlineUser.login,
        gymbranch: col.gymBranch.name,
    }));

    this.exporterService.exportPdf(selectedMembers,this._selectedColumns,"Members");

    }
    clear(table: Table) {
        table.clear();
    }
}
