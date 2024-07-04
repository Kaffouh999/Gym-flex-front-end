import { Component, OnInit, forwardRef } from "@angular/core";

import { ConfirmationService, MessageService } from "primeng/api";
import { NgControl } from "@angular/forms";
import { GymBranchComponent } from "src/app/features/settings/components/gym-branch/gym-branch.component";
import { PaymentService } from "../membership/services/payment.service";
import { PaymentStatistics } from "src/app/core/models/PaymentStatistics";
import { MemberEquipmentStatistic } from "src/app/core/models/MemberEquipmentStatistic";
import { MemberService } from "../membership/services/member.service";
import { EquipmentService } from "../inventory/services/equipment.service";
import { EquipmentStatistics } from "src/app/core/models/EquipmentStatistics";

@Component({
    selector: "app-dashboard",
    templateUrl: "./dashboard.component.html",
    styleUrls: ["./dashboard.component.scss"],
    providers: [
        MessageService,
        ConfirmationService,
        {
            provide: NgControl,
            useExisting: forwardRef(() => GymBranchComponent),
        },
    ],
})
export class DashboardComponent implements OnInit {
    genderData:any;
    genderOptions:any;
    equipmentData:any;
    equipmentOPtions:any;
    paymentData:any;
    paymentOptions:any;
    attendanceData:any;
    attendanceOptions:any;
    liveClients:number=0;
    totalNumPayment:number=0;
    totalNumIncome:number=0;

    memberEquipmentStatistics:MemberEquipmentStatistic={
        numberOfMen: 0,
        numberOfWomen: 0,
        numberOfEquipmentItems: 0,
        numberOfEquipments: 0
    }

    constructor(private paymentService:PaymentService,private memberService:MemberService,private equipementService:EquipmentService){

    }


    ngOnInit(): void {
               const documentStyle = getComputedStyle(document.documentElement);
        const textColor = documentStyle.getPropertyValue('--text-color');

        this.getStatisticMemberStatistic(documentStyle,textColor);

        this.getEquippmentStatistics(documentStyle,textColor);

        const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
        const surfaceBorder = documentStyle.getPropertyValue('--surface-border');
        
        this.getPaymentStatis();

        this.paymentOptions = {
            maintainAspectRatio: false,
            aspectRatio: 0.8,
            plugins: {
                legend: {
                    labels: {
                        color: textColor
                    }
                }
            },
            scales: {
                x: {
                    ticks: {
                        color: textColorSecondary,
                        font: {
                            weight: 500
                        }
                    },
                    grid: {
                        color: surfaceBorder,
                        drawBorder: false
                    }
                },
                y: {
                    ticks: {
                        color: textColorSecondary
                    },
                    grid: {
                        color: surfaceBorder,
                        drawBorder: false
                    }
                }

            }
        };

        this.attendanceData = {
            labels: ['11-12', '12-13', '13-14', '14-15', '15-16', '16-17', '17-18'],
            datasets: [
                {
                    label: 'Men',
                    fill: false,
                    borderColor: documentStyle.getPropertyValue('--blue-500'),
                    yAxisID: 'y',
                    tension: 0.4,
                    data: [65, 59, 80, 81, 56, 55, 10]
                },
                {
                    label: 'Women',
                    fill: false,
                    borderColor: documentStyle.getPropertyValue('--pink-500'),
                    yAxisID: 'y1',
                    tension: 0.4,
                    data: [28, 48, 40, 19, 86, 27, 90]
                }
            ]
        };
        
        this.attendanceOptions = {
            stacked: false,
            maintainAspectRatio: false,
            aspectRatio: 0.6,
            plugins: {
                legend: {
                    labels: {
                        color: textColor
                    }
                }
            },
            scales: {
                x: {
                    ticks: {
                        color: textColorSecondary
                    },
                    grid: {
                        color: surfaceBorder
                    }
                },
                y: {
                    type: 'linear',
                    display: true,
                    position: 'left',
                    ticks: {
                        color: textColorSecondary
                    },
                    grid: {
                        color: surfaceBorder
                    }
                },
                y1: {
                    type: 'linear',
                    display: true,
                    position: 'right',
                    ticks: {
                        color: textColorSecondary
                    },
                    grid: {
                        drawOnChartArea: false,
                        color: surfaceBorder
                    }
                }
            }
        };
        
    }


    getPaymentStatis(){
        this.paymentService.getAllPaymentsStatistics().subscribe((res:any) => {
            const documentStyle = getComputedStyle(document.documentElement);
            let statistics=res as PaymentStatistics[] ;
            let labels:string[]=[];
            let data:number[]=[];
            let data1:number[]=[];
            let income:number[]=[];
            this.totalNumPayment=0;
            
            statistics.forEach((stat:PaymentStatistics) => {
                
                labels.push(stat.plan.name);
                data1.push(stat.numberOfSubscriptions);
                data.push(stat.numberOfPayments);
                income.push(stat.totalAmountPayed);
                this.totalNumPayment += stat.numberOfPayments;
                this.totalNumIncome += stat.totalAmountPayed;
            })

            let maxincome:number = Math.max(...income);
            let scale = Math.pow(10, Math.floor(Math.log10(maxincome))); 
            income = income.map(num => num /scale);

            this.paymentData = {
                labels: labels,
                datasets: [
                    {
                        label: 'Subscription',
                        backgroundColor: documentStyle.getPropertyValue('--blue-500'),
                        borderColor: documentStyle.getPropertyValue('--blue-500'),
                        data: data1
                    },
                    {
                        label: 'Payment',
                        backgroundColor: documentStyle.getPropertyValue('--pink-500'),
                        borderColor: documentStyle.getPropertyValue('--pink-500'),
                        data:data
                    },
                    {
                        label: 'Income/'+scale,
                        backgroundColor: documentStyle.getPropertyValue('--green-500'),
                        borderColor: documentStyle.getPropertyValue('--green-500'),
                        data:income
                    }
                ]
            };
        })
    }

     getStatisticMemberStatistic(documentStyle:any ,textColor:any ){
             this.memberService.getEquipmentStatisics().subscribe((res:any) => {
            this.memberEquipmentStatistics = res as MemberEquipmentStatistic;

            this.genderData = {
                labels: ['Men', 'Women'],
                datasets: [
                    {
                        data: [this.memberEquipmentStatistics.numberOfMen, this.memberEquipmentStatistics.numberOfWomen],
                        backgroundColor: [documentStyle.getPropertyValue('--blue-500'), documentStyle.getPropertyValue('--pink-500')],
                        hoverBackgroundColor: [documentStyle.getPropertyValue('--blue-400'), documentStyle.getPropertyValue('--pink-400')]
                    }
                ]
            };
            this.genderOptions = {
                plugins: {
                    legend: {
                        labels: {
                            usePointStyle: true,
                            color: textColor
                        }
                    }
                }
            };
        })
    }

    getEquippmentStatistics(documentStyle:any ,textColor:any){
        this.equipementService.getEquippmentStatistics().subscribe((res) => {
            let equipmentNames:string[]=[];
            let itemNums:number[]=[];
            let equiStats:EquipmentStatistics[] = res as EquipmentStatistics[];
            equiStats.forEach((stat:EquipmentStatistics) => {
                equipmentNames.push(stat.equipmentName);
                itemNums.push(stat.equipmentItemCount);
            })

            this.equipmentData = {
                labels: equipmentNames,
                datasets: [
                    {
                        data:itemNums,
                        backgroundColor: [documentStyle.getPropertyValue('--blue-500'), documentStyle.getPropertyValue('--yellow-500'), documentStyle.getPropertyValue('--green-500')],
                        hoverBackgroundColor: [documentStyle.getPropertyValue('--blue-400'), documentStyle.getPropertyValue('--yellow-400'), documentStyle.getPropertyValue('--green-400')]
                    }
                ]
            };
    
    
            this.equipmentOPtions = {
                cutout: '60%',
                plugins: {
                    legend: {
                        labels: {
                            color: textColor
                        }
                    }
                }
            };

        })
      
    }




    handleDataSelect(event:any){
    // Access the selected data item
    const selectedData = this.genderData.labels[event.element.index];
    // Perform actions based on the selected data
    console.log('Selected:',selectedData);
  }

}