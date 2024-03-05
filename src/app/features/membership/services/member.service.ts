import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Member } from 'src/app/core/models/Member';

@Injectable({
  providedIn: 'root'
})
export class MemberService {

  constructor(private http:HttpClient) { }

  public getAllMembers(){
    return this.http.get('http://localhost:8080/api/members');
  }
  public getEquipmentStatisics(){
    return this.http.get('http://localhost:8080/api/members/statistics');
  }

  public getMemberById(id:number){
    return this.http.get('http://localhost:8080/api/members/'+id);
  }

  public addMember(member : Member){
    return this.http.post('http://localhost:8080/api/members',member);
  }

  public updateMember(id:number , member:Member){
    return this.http.put('http://localhost:8080/api/members/'+id , member);
  }

  public deleteMember(id:number){
    return this.http.delete('http://localhost:8080/api/members/'+id);
  }
  public getMemberByUser(id:number){
    return this.http.get('http://localhost:8080/api/members/user/'+id);
  }
}
