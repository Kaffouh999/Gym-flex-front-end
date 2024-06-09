import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Payment } from "src/app/core/models/Payment";
import { environment } from "src/environments/environment";

@Injectable({
    providedIn: "root",
})
export class PaymentService {
    paymentURL = environment.API_URL + "/payments";
    constructor(private http: HttpClient) {}

    public getAllPayments() {
        return this.http.get(this.paymentURL);
    }
    public getAllPaymentsStatistics() {
        return this.http.get(this.paymentURL + "/statistics");
    }

    public getPaymentById(id: number) {
        return this.http.get(this.paymentURL + "/" + id);
    }

    public addPayment(payment: Payment) {
        return this.http.post(this.paymentURL, payment);
    }

    public updatePayment(id: number, Payment: Payment) {
        return this.http.put(this.paymentURL + "/" + id, Payment);
    }

    public deletePayment(id: number) {
        return this.http.delete(this.paymentURL + "/" + id);
    }
}
