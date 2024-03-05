import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AssuranceMember } from 'src/app/core/models/AssuranceMember';

@Injectable({
  providedIn: 'root'
})
export class AssuranceService {

  constructor(private http:HttpClient) { }

  public getAllAssurances(){
    return this.http.get('http://localhost:8080/api/assurance-members');
  }

  public getAssuranceById(id:number){
    return this.http.get('http://localhost:8080/api/assurance-members/'+id);
  }

  public addAssurance(assurance : AssuranceMember){
    return this.http.post('http://localhost:8080/api/assurance-members',assurance);
  }

  public updateAssurance(id:number , assurance:AssuranceMember){
    return this.http.put('http://localhost:8080/api/assurance-members/'+id , assurance);
  }

  public deleteAssurance(id:number){
    return this.http.delete('http://localhost:8080/api/assurance-members/'+id);
  }
}