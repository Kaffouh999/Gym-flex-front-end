import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { OnlineUser } from 'src/app/core/models/OnlineUser';

@Injectable({
  providedIn: 'root'
})
export class OnlineUserService {

  constructor(private http:HttpClient) { }

  public getAllUsers(){
    return this.http.get('http://localhost:8080/api/online-users');
  }

  public getUserById(id:number){
    return this.http.get('http://localhost:8080/api/online-users/'+id);
  }

  public addUser(onlineUser : OnlineUser){
    return this.http.post('http://localhost:8080/api/online-users',onlineUser);
  }

  public updateUser(id:number , onlineUser:OnlineUser){
    return this.http.put('http://localhost:8080/api/online-users/'+id , onlineUser);
  }

  public deleteUser(id:number){
    return this.http.delete('http://localhost:8080/api/online-users/'+id);
  }
  uploadImage(name : String,formData : FormData){
    return  this.http.post('http://localhost:8080/api/membersProfile/upload/'+name, formData);
}
updateImage(id : number,formData : FormData){
    return  this.http.put('http://localhost:8080/api/membersProfile/upload/'+id, formData);
}
}
