import { Component, forwardRef, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgControl, Validators } from '@angular/forms';
import { ConfirmationService, MessageService } from 'primeng/api';
import { GymBranch } from 'src/app/core/models/GymBranch';
import { GymBranchService } from '../../services/gym-branch.service';

@Component({
  selector: 'app-gym-branch',
  templateUrl: './gym-branch.component.html',
  styleUrls: ['./gym-branch.component.scss'],
  providers: [MessageService,ConfirmationService,{ provide: NgControl, useExisting: forwardRef(() => GymBranchComponent) }]
})
export class GymBranchComponent implements OnInit {
  gymBranchDialog: boolean;

  gymBranches: GymBranch[];

  gymBrancheInput: GymBranch;

  selectedgymBranches: GymBranch[];

  submitted: boolean;
  gymbranchFrom: FormGroup;

  constructor(private formBuilder: FormBuilder,private gymBrancheservice: GymBranchService, private messageService: MessageService, private confirmationService: ConfirmationService) { }

  ngOnInit() {
    this.getAllGymBranches();
    this.gymbranchFrom = this.formBuilder.group({
      name: ['', Validators.required],
      adress: ['', [Validators.required]],
      email: ['',[Validators.required, Validators.pattern("^(?=.{1,254}$)(?=.{1,64}@)[-!#$%&'*+/0-9=?A-Z^_`a-z{|}~]+(\.[-!#$%&'*+/0-9=?A-Z^_`a-z{|}~]+)*@[A-Za-z0-9]([A-Za-z0-9-]{0,61}[A-Za-z0-9])?(\.[A-Za-z0-9]([A-Za-z0-9-]{0,61}[A-Za-z0-9])?)*$")]],
      appPasswordEmail:['',[Validators.required]],
      phoneNumber : ['',[Validators.required,Validators.pattern('^[0-9]*$')]],
      sessionDurationAllowed : ['',[Validators.required,Validators.pattern('^[0-9]*$')]],
      openingTime : ['',[Validators.required]],
      closingTime : ['']
    

    });
  }

  openNew() {
    let date:Date =new Date();
      this.gymBrancheInput = {id:undefined,name:'',longitude:0,latitude:0,adress:'',email:'',appPasswordEmail:'',phoneNumber:'',openingDate:date,closingDate:date,sessionDurationAllowed:30};
      this.remplirForm(this.gymBrancheInput);
      this.submitted = false;
      this.  gymBranchDialog = true;
  }

  deleteSelectedgymBranches() {
      this.confirmationService.confirm({
          message: 'Are you sure you want to delete the selected gymBranches?',
          header: 'Confirm',
          icon: 'pi pi-exclamation-triangle',
          accept: () => {
              this.gymBranches = this.gymBranches.filter(val => !this.selectedgymBranches.includes(val));
              this.selectedgymBranches = null;
              this.messageService.add({severity:'success', summary: 'Successful', detail: 'gymBranches Deleted', life: 3000});
          }
      });
  }

  editgymBrancheInput(gymBranche: GymBranch) {
    console.log(gymBranche)
      this.remplirForm(gymBranche);
      this.gymBranchDialog = true;
  }

  deletegymBrancheInput(gymBrancheInput: GymBranch) {
      this.confirmationService.confirm({
          message: 'Are you sure you want to delete ' + gymBrancheInput.name + '?',
          header: 'Confirm',
          icon: 'pi pi-exclamation-triangle',
          accept: () => {
             this.gymBrancheservice.deleteBranch(gymBrancheInput.id).subscribe((res:any) => {
                this.getAllGymBranches();
                this.messageService.add({severity:'success', summary: 'Successful', detail: 'gymBrancheInput Deleted', life: 3000});

             },(error:any) => {
             this.handleError(error);
          }
             );
             
          }
      });
  }

  hideDialog() {
      this.  gymBranchDialog = false;
      this.submitted = false;
  }

  savegymBrancheInput() {

    this.remplirGymBranch();

      this.submitted = true;
      if(this.gymBrancheInput.id === undefined){
        this.gymBrancheservice.addBranch(this.gymBrancheInput).subscribe((res:any) => {
        this.getAllGymBranches();
        this.messageService.add({severity:'success', summary: 'Successful', detail: 'gymBranche added successfuly', life: 3000});
      },
      (error:any) => {
        this.handleError(error);
      });
    }else{
      this.gymBrancheservice.updateBranch(this.gymBrancheInput.id,this.gymBrancheInput).subscribe((res:any) => {
        this.getAllGymBranches();
        this.messageService.add({severity:'success', summary: 'Successful', detail: 'gymBranche updated successfuly', life: 3000});
      },
      (error:any) => {
        this.handleError(error);
      });
    }
    this.hideDialog();
  }

  getAllGymBranches(){
    let date:Date =new Date();
    this.gymBrancheInput = {id:undefined,name:'',longitude:0,latitude:0,adress:'',email:'',appPasswordEmail:'',phoneNumber:'',openingDate:date,closingDate:date,sessionDurationAllowed:30};
    this.gymBrancheservice.getALlBranches().subscribe((res:any) => {
        this.gymBranches = res as GymBranch[];
    },(err:Error) => {
        console.log(err.message);
    })
  }

  remplirGymBranch():void{
    this.gymBrancheInput = {
      id: this.gymBrancheInput.id,
      name: this.gymbranchFrom.get('name').value,
      adress: this.gymbranchFrom.get('adress').value,
      email: this.gymbranchFrom.get('email').value,
      latitude: 0,
      longitude: 0,
      appPasswordEmail: this.gymbranchFrom.get('appPasswordEmail').value,
      phoneNumber: this.gymbranchFrom.get('phoneNumber').value,
      openingDate: this.gymbranchFrom.get('openingTime').value,
      closingDate: this.gymbranchFrom.get('closingTime').value,
      sessionDurationAllowed: this.gymbranchFrom.get('sessionDurationAllowed').value,
    };
  }

  remplirForm(gymBranch:GymBranch):void{
    this.gymBrancheInput = {id:gymBranch.id,name:'',longitude:0,latitude:0,adress:'',email:'',appPasswordEmail:'',phoneNumber:'',openingDate:undefined,closingDate:undefined,sessionDurationAllowed:30};

    let openDate : Date = new Date(gymBranch.openingDate);
    let closeDate : Date = new Date(gymBranch.closingDate);
    this.gymbranchFrom.patchValue({
      id: gymBranch.id,
      name: gymBranch.name,
      adress: gymBranch.adress,
      email: gymBranch.email,
      appPasswordEmail: gymBranch.appPasswordEmail,
      phoneNumber: gymBranch.phoneNumber,
      openingTime:openDate ,
      closingTime: closeDate,
      sessionDurationAllowed: gymBranch.sessionDurationAllowed
    });
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
