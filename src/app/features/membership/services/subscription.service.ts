import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subscription } from 'src/app/core/models/Subscription';


@Injectable({
  providedIn: 'root'
})
export class SubscriptionService {

  constructor(private http:HttpClient) { }

  public getAllSubscriptions(){
    return this.http.get('http://localhost:8080/api/subscription-members');
  }

  public getSubscriptionById(id:number){
    return this.http.get('http://localhost:8080/api/subscription-members/'+id);
  }
  public getSubscriptionByQrCode(qrCode:String){
    return this.http.get('http://localhost:8080/api/subscription-members/qrcode/'+qrCode);
  }

  public addSubscription(subscription : Subscription){
    return this.http.post('http://localhost:8080/api/subscription-members',subscription);
  }

  public updateSubscription(id:number , subscription:Subscription){
    return this.http.put('http://localhost:8080/api/subscription-members/'+id , subscription);
  }

  public deleteSubscription(id:number){
    return this.http.delete('http://localhost:8080/api/subscription-members/'+id);
  }
  public searchSubscriptions(subscription : Subscription){
    return this.http.post('http://localhost:8080/api/subscription-members/search',subscription);
  }
}
