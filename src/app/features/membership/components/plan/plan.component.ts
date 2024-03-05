import { Component, forwardRef, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, NgControl, Validators } from "@angular/forms";
import { ConfirmationService, MessageService } from "primeng/api";
import { Plan } from "src/app/core/models/Plan";
import { PlanService } from "../../services/plan.service";
import { GymBranch } from "src/app/core/models/GymBranch";
import { Table } from "primeng/table";

@Component({
    selector: "app-plan",
    templateUrl: "./plan.component.html",
    styleUrls: ["./plan.component.scss"],
    providers: [
        MessageService,
        ConfirmationService,
        { provide: NgControl, useExisting: forwardRef(() => PlanComponent) },
    ],
})
export class PlanComponent {
    gymBranch: GymBranch;
    deleteSelectedPlans() {
        throw new Error("Method not implemented.");
    }

    planDialog: boolean;
    planImageDialog : Boolean = false;


    plans: Plan[];

    planInput: Plan;

    selectedplans: Plan[];
    isAdd:Boolean;
    submitted: boolean;
    plansFrom: FormGroup;
    formData : FormData= new FormData();
    timeStamp :number=0;

    constructor(
        private formBuilder: FormBuilder,
        private planService: PlanService,
        private messageService: MessageService,
        private confirmationService: ConfirmationService
    ) {}

    ngOnInit() {
        this.getAllPlans();
        this.plansFrom = this.formBuilder.group({
            name: ["", Validators.required],
            description: [""],
            duration: ["", Validators.required],
            price: ["", Validators.required],
            imageAds:[""]
        });
    }

    openNew() {
        let date: Date = new Date();
        this.planInput = {
            id: undefined,
            name: "",
            description: "",
            duration: 0,
            price: 0,
            ratingPer5:0,
            imageAds:""
        };
        this.remplirForm(this.planInput);
        this.submitted = false;
        this.planDialog = true;
        this.isAdd = true;
    }

    editplanInput(plan: Plan) {
        this.remplirForm(plan);
        this.isAdd = false;
        this.planDialog = true;
    }

    deleteplan(plan: Plan) {
        this.confirmationService.confirm({
            message: "Are you sure you want to delete " + plan.name + "?",
            header: "Confirm",
            icon: "pi pi-exclamation-triangle",
            accept: () => {
                this.planService.deletePlan(plan.id).subscribe((res: any) => {
                    this.getAllPlans();
                    this.messageService.add({
                        severity: "success",
                        summary: "Successful",
                        detail: "plan Deleted",
                        life: 3000,
                    });
                    },(error : any) => {
                       
                            this.handleError(error);
                 
                });
             
            },
        });
    }

    hideDialog() {
        this.planDialog = false;
        this.submitted = false;
    }

    saveplan() {
        this.remplirplan();

        this.submitted = true;
        if (this.planInput.id === undefined) {
     
                this.planInput.imageAds =this.planInput.name;
                console.log(this.planInput.imageAds)
            this.planService.addPlan(this.planInput).subscribe((res: any) => {
                this.getAllPlans();
                this.messageService.add({
                    severity: "success",
                    summary: "Successful",
                    detail: "plan added successfuly",
                    life: 3000,
                });
            },(error:any) => {
                this.handleError(error);
            })
       
        } else {
            this.planService
                .updatePlan(this.planInput.id, this.planInput)
                .subscribe((res: any) => {
                    this.getAllPlans();
                    
                    this.messageService.add({
                        severity: "success",
                        summary: "Successful",
                        detail: "plan updated successfuly",
                        life: 3000,
                    });
                },(error:any) => {
                    this.handleError(error);
                });
        }
        this.hideDialog();
        }

    getAllPlans() {
        this.planService.getAllPlans().subscribe(
            (res: any) => {
                this.getTimeStamp();
                this.plans = res as Plan[];
               
            },
            (err: Error) => {
                console.log(err.message);
            }
        );
    }

    remplirplan(): void {
        this.planInput = {
            id: this.planInput.id,
            name: this.plansFrom.get("name").value,
            description: this.plansFrom.get("description").value,
            duration: this.plansFrom.get("duration").value,
            price: this.plansFrom.get("price").value,
            ratingPer5:this.planInput.ratingPer5,
            imageAds:this.plansFrom.get("imageAds").value,
        };
    }

    remplirForm(plan: Plan): void {
        this.planInput = {
            id: plan.id,
            name: "",
            description: "",
            duration: 0,
            price: 0,
            ratingPer5:0,
            imageAds:""
        };

        this.plansFrom.patchValue({
            name: plan.name,
            description: plan.description,
            duration: plan.duration,
            price: plan.price,
            imageAds:plan.imageAds
        });
    }
    clear(table: Table) {
        table.clear();
    }

    onUpload(event : any) {

        for(let file of event.files) {
          console.log(file)
          this.formData = new FormData();
          this.formData.append('file', file);
      }
      
      }

      updateImage(){
        let id:number = this.planInput.id;
        this.planService.updateImage(id,this.formData).subscribe((response) => {
            console.log('File uploaded successfully:', response);
            this.getAllPlans();
            this.planImageDialog = false;
          },
          (err) => {
            console.log(err);
          }); }
          editImage(plan : Plan){
            this.planInput = {...plan};
            this.formData = new FormData();
            this.planImageDialog = true;
        }
          getTimeStamp(){
            this.timeStamp = new Date().getTime();
          }


    handleError(error:any){
        if (error.status === 409) {
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
            this.messageService.add({
                severity: "error",
                summary: "Error",
                detail: "there is an error in our server , please report here",
                life: 3000,
            });
          }
    }
}
