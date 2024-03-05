import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Role } from 'src/app/core/models/Role';

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  constructor(private http:HttpClient) { }

  public getAllRoles(){
    return this.http.get('http://localhost:8080/api/roles');
  }

  public getRoleById(id:number){
    return this.http.get('http://localhost:8080/api/roles/'+id);
  }

  public addRole(role : Role){
    return this.http.post('http://localhost:8080/api/roles',role);
  }

  public updateRole(id:number , role:Role){
    return this.http.put('http://localhost:8080/api/roles/'+id , role);
  }

  public deleteRole(id:number){
    return this.http.delete('http://localhost:8080/api/roles/'+id);
  }
}