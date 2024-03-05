import { Component, OnInit } from '@angular/core';
import { er } from '@fullcalendar/core/internal-common';
import { Plan } from 'src/app/core/models/Plan';
import { PlanService } from 'src/app/features/membership/services/plan.service';

@Component({
  selector: 'app-pricing',
  templateUrl: './pricing.component.html',
  styleUrls: ['./pricing.component.scss']
})
export class PricingComponent implements OnInit{
  plans:Plan[]=[];

  constructor(private planService:PlanService){}

  ngOnInit(): void {
    this.getAllPlans();
  }
  getAllPlans(){
    this.planService.getAllPlans().subscribe((res:any) => {
      this.plans = res as Plan[];
    },(error:any) => {
      console.log(error)
    })
  }

}
