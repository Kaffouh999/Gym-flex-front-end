import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GymBranch } from 'src/app/core/models/GymBranch';

@Injectable({
  providedIn: 'root'
})
export class GymBranchService {

  constructor(private http:HttpClient) { }

  public getALlBranches(){
    return this.http.get('http://localhost:8080/api/gym-branches');
  }

  public getBranchById(id:number){
    return this.http.get('http://localhost:8080/api/gym-branches/'+id);
  }

  public addBranch(gymBranch : GymBranch){
    return this.http.post('http://localhost:8080/api/gym-branches',gymBranch);
  }

  public updateBranch(id:number , gymBranch:GymBranch){
    return this.http.put('http://localhost:8080/api/gym-branches/'+id , gymBranch);
  }

  public deleteBranch(id:number){
    return this.http.delete('http://localhost:8080/api/gym-branches/'+id);
  }
}
