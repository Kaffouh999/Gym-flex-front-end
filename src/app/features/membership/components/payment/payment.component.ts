import { DatePipe } from '@angular/common';
import { Component, forwardRef, Input, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, NgControl, Validators } from '@angular/forms';
import { ZXingScannerComponent } from '@zxing/ngx-scanner';
import { ConfirmationService, MessageService } from 'primeng/api';
import { OverlayPanel } from 'primeng/overlaypanel';
import { Table } from 'primeng/table';
import { Member } from 'src/app/core/models/Member';
import { OnlineUser } from 'src/app/core/models/OnlineUser';
import { Payment } from 'src/app/core/models/Payment';
import { Plan } from 'src/app/core/models/Plan';
import { Subscription } from 'src/app/core/models/Subscription';
import { ExporterService } from 'src/app/shared/services/exporter.service';
import { MemberService } from '../../services/member.service';
import { PaymentService } from '../../services/payment.service';
import { PlanService } from '../../services/plan.service';
import { SubscriptionService } from '../../services/subscription.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss'],
  providers: [MessageService,ConfirmationService,{ provide: NgControl, useExisting: forwardRef(() => PaymentComponent) }]
})
export class PaymentComponent {

paymentInput: Payment;
members: Member[] = [];
plans:Plan[] = [];
subscriptions : Subscription[]=[];
payments: Payment[] = [];
paymentDialog: boolean = false;
showQrDialog:Boolean = false;
showPaymentToPrintDialog:Boolean=false;
PaymentForm: FormGroup;
isAdd:Boolean;
timeStamp :number=0;
items:any[]=[];
selectedPyaments:Payment[]=[];
cols: any[];
_selectedColumns: any[]

barcodeFormat: any=[];
@ViewChild('scanner') scanner: ZXingScannerComponent | undefined = undefined;
@ViewChild('op') overlayPanel: OverlayPanel;

constructor(
    private formBuilder: FormBuilder,
    private memberService: MemberService,
    private planService:PlanService,
    private subcriptionService:SubscriptionService,
    private paymentService: PaymentService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private exporterService:ExporterService,
    private datePipe: DatePipe
) {}


@Input() get selectedColumns(): any[] {
    return this._selectedColumns;
}

set selectedColumns(val: any[]) {
    //restore original order
    this._selectedColumns = this.cols.filter((col) => val.includes(col));
} 

ngOnInit(): void {
   
  this.initPayment();
    this.getAllPayments();
    this.getAllMembers();
    this.getAllPlans();
    this.getAllSubscriptions();
    this.PaymentForm = this.formBuilder.group({
      amountPayed: ["", Validators.required],
      paymentDate: ["", Validators.required],
      subscriptionMember:["", Validators.required],
    });

    this.items=[
        {
            label: 'Open New',
            icon: 'pi pi-fw pi-file',
            command:() => this.openNew()
        }, {
            label: 'Open from Qr code',
            icon: 'pi pi-qrcode',
            command:() => this.startScanner()
        }];
        this.cols = [
          
            { dataKey: 'member', header: 'Member' },
            { dataKey: 'plan', header: 'Plan' },
            { dataKey: 'paymentDate', header: 'Payment Date' },
            { dataKey: 'shouldPay', header: 'Should Pay' },
            { dataKey: 'amountPayed', header: 'Amount Payed' },
            { dataKey: 'payedMember', header: 'Payed Member' },
        ];
}

openNew() {
  this.paymentInput = {
    id: undefined,
    amountPayed: 0,
    shouldPay:0,
    paymentDate: undefined,
    subscriptionMember:this.subscriptions[0],
    payedMember:this.members[0]
  };
    this.fillForm(this.paymentInput);
   this.isAdd = true;
    this.paymentDialog = true;
}
openFromQrCode(subscription:Subscription){
    this.paymentInput = {
        id: undefined,
        amountPayed: 0,
        shouldPay:0,
        paymentDate: undefined,
        subscriptionMember:subscription,
        payedMember:this.members[0]
      };
        this.fillForm(this.paymentInput);
       this.isAdd = true;
        this.paymentDialog = true;
}
hideDialog() {
    this.paymentDialog = false;
}
hideprintDialog(){
    this.showPaymentToPrintDialog=false;
}

showQrCode(payment : Payment){
  this.paymentInput = {...payment};
  console.log(this.paymentInput)
  this.showQrDialog = true;
  }
hideqrDialog(){
  this.showQrDialog=false;
}
getAllMembers() {
    this.memberService.getAllMembers().subscribe((data: any) => {
        this.members = data;
    });
}
getAllSubscriptions() {
  this.subcriptionService.getAllSubscriptions().subscribe((data: any) => {
      this.subscriptions = data;
      console.log(this.subscriptions)
  });
}
getAllPayments() {
    this.paymentService.getAllPayments().subscribe((data: any) => {
        this.payments = data;
        this.payments = this.payments.map((payment) => {
            return {
                ...payment, // copy all fields from the original object
                paymentDate: new Date(payment.paymentDate)
                
            };
        });
    });
}

getAllPlans(){
    this.planService.getAllPlans().subscribe((data: any) => {
        this.plans = data;
    });
}

savePayment() {
  this.fillPayment();
  this.paymentInput.payedMember=this.members[0]//temporary untill i start session
console.log(this.paymentInput)
  if (this.paymentInput.id === undefined) {
      this.paymentService.addPayment(this.paymentInput).subscribe((res: any) => {
          this.getAllPayments();
          this.hideDialog();
          this.messageService.add({
              severity: "success",
              summary: "Successful",
              detail: "payment added successfuly",
              life: 3000,
          });
      });
  } else {
      this.paymentService
          .updatePayment(this.paymentInput.id, this.paymentInput)
          .subscribe((res: any) => {
              this.getAllPayments();
              this.hideDialog();
              this.messageService.add({
                  severity: "success",
                  summary: "Successful",
                  detail: "payment updated successfuly",
                  life: 3000,
              });
          });
  }
}

editPayment(payment: Payment) {
    this.fillForm(payment);
    this.isAdd = false;
    this.paymentDialog = true;
}



deletePayment(payment: Payment) {
    this.confirmationService.confirm({
        message:
            "Are you sure you want to delete this payment?",
        header: "Confirm",
        icon: "pi pi-exclamation-triangle",
        reject: () => {},
        accept: () => {
            this.paymentService
                .deletePayment(payment.id)
                .subscribe((respense: any) => {
                    this.getAllPayments();
                    this.messageService.add({
                        severity: "success",
                        summary: "Successful",
                        detail: "Assurance Deleted",
                        life: 3000,
                    });
                },(error:any) => {
                    if (error.status === 409) {
                        // Category deletion failed due to associated subcategories
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
                });
            
        },
    });
}

fillPayment(): void {

    let shouldPay:number = this.PaymentForm.get('subscriptionMember').value.plan.price - this.PaymentForm.get('subscriptionMember').value.plan.price*this.PaymentForm.get('subscriptionMember').value.discountPercentage/100;
    this.paymentInput = {
        id: this.paymentInput.id,
        amountPayed: this.PaymentForm.get("amountPayed").value,
        shouldPay:shouldPay,
        subscriptionMember: this.PaymentForm.get("subscriptionMember").value,
        paymentDate: this.PaymentForm.get("paymentDate").value,
        payedMember: undefined,
    };
}

fillForm(payment: Payment): void {
    let paymentDate : Date;

    if(payment.paymentDate != undefined ){
      paymentDate  = new Date(payment.paymentDate);
         
    }
    
    this.paymentInput={... payment};
    this.PaymentForm.patchValue({
      amountPayed: payment.amountPayed,
      subscriptionMember: payment.subscriptionMember,
      paymentDate: paymentDate,
    });
}

initPayment(){
  let user:OnlineUser={
      id: 0,
      firstName: "",
      lastName: "",
      login: "",
      email: "",
      password: "",
      profilePicture: "",
      role:undefined
  }

  let member : Member={
      id: 0,
      cin: undefined,
      age: 0,
      adress: undefined,
      gender: undefined,
      gymBranch: undefined,
      onlineUser: user
  }
  let plan:Plan={
      id: 0,
      name: "",
      description: "",
      duration: 0,
      price: 0,
      ratingPer5:0,
      imageAds:""
  }
  let subscription:Subscription= {
      id: undefined,
      plan: plan,
      member: member,
      startDate: undefined,
      endDate:undefined,
      discountPercentage: 0,
      codeSubscription:""
  };
  this.paymentInput={id:undefined , amountPayed:0,paymentDate:undefined,shouldPay:0,subscriptionMember:subscription,payedMember:undefined};
}

showPaymentToPrint(payment:Payment){
this.paymentInput={... payment};
this.showPaymentToPrintDialog=true;
}

startScanner() {
    // Start the scanner
    this.scanner!.scanStart();
    this.overlayPanel.toggle(event);
  }

  stopScanner() {
    // Stop the scanner
    this.scanner?.scanStop();
  }

  onScanSuccess(resultString: string) {
    this.stopScanner();
    console.log('QR code scanned:', resultString);
   
    this.subcriptionService.getSubscriptionByQrCode(resultString).subscribe((res:any) => {
        
        let subscriptionMember:Subscription = res as Subscription;
        this.openFromQrCode(subscriptionMember);
    })

  }

  exportExcel(){
    let selectedPayments = this.selectedPyaments.map((col:Payment) => ( {
        member:col.subscriptionMember.member.onlineUser.firstName +" "+ col.subscriptionMember.member.onlineUser.lastName,
        plan:col.subscriptionMember.plan.name,
        shouldPay: col.subscriptionMember.plan.price - col.subscriptionMember.plan.price*col.subscriptionMember.discountPercentage/100,
        amountPayed: col.amountPayed,
        paymentDate: this.datePipe.transform(col.paymentDate, 'dd/MM/yyyy'),
        payedMember:col.payedMember.onlineUser.firstName +" "+col.payedMember.onlineUser.lastName
    }));
    this.exporterService.exportExcel(selectedPayments,this._selectedColumns,"Assurances");

}

exportPdf(){
    let selectedPayments = this.selectedPyaments.map((col:Payment) => ( {
        member:col.subscriptionMember.member.onlineUser.firstName +" "+ col.subscriptionMember.member.onlineUser.lastName,
        plan:col.subscriptionMember.plan.name,
        shouldPay: col.subscriptionMember.plan.price - col.subscriptionMember.plan.price*col.subscriptionMember.discountPercentage/100,
        amountPayed: col.amountPayed,
        paymentDate: this.datePipe.transform(col.paymentDate, 'dd/MM/yyyy'),
        payedMember:col.payedMember.onlineUser.firstName +" "+col.payedMember.onlineUser.lastName
    }));

    this.exporterService.exportPdf(selectedPayments,this._selectedColumns,"Payments");
}

clear(table: Table) {
    table.clear();
}
}
