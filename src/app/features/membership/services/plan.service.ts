import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Plan } from 'src/app/core/models/Plan';

@Injectable({
  providedIn: 'root'
})
export class PlanService {

  constructor(private http:HttpClient) { }

  public getAllPlans(){
    return this.http.get('http://localhost:8080/api/plans');
  }

  public getPlanById(id:number){
    return this.http.get('http://localhost:8080/api/plans/'+id);
  }

  public addPlan(plan : Plan){
    return this.http.post('http://localhost:8080/api/plans',plan);
  }

  public updatePlan(id:number , plan:Plan){
    return this.http.put('http://localhost:8080/api/plans/'+id , plan);
  }

  public deletePlan(id:number){
    return this.http.delete('http://localhost:8080/api/plans/'+id);
  }
  uploadImage(name : String,formData : FormData){
    return  this.http.post('http://localhost:8080/api/plans/upload/'+name, formData);
}
updateImage(id : number,formData : FormData){
    return  this.http.put('http://localhost:8080/api/plans/upload/'+id, formData);
}
}
