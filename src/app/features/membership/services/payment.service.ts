import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Payment } from 'src/app/core/models/Payment';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  constructor(private http:HttpClient) { }

  public getAllPayments(){
    return this.http.get('http://localhost:8080/api/payments');
  }
  public getAllPaymentsStatistics(){
    return this.http.get('http://localhost:8080/api/payments/statistics');
  }

  public getPaymentById(id:number){
    return this.http.get('http://localhost:8080/api/payments/'+id);
  }

  public addPayment(payment : Payment){
    return this.http.post('http://localhost:8080/api/payments',payment);
  }

  public updatePayment(id:number , Payment:Payment){
    return this.http.put('http://localhost:8080/api/payments/'+id , Payment);
  }

  public deletePayment(id:number){
    return this.http.delete('http://localhost:8080/api/payments/'+id);
  }
}
