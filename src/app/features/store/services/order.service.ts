import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Order } from "src/app/core/models/Order";
import { environment } from "src/environments/environment";

@Injectable({
    providedIn: "root",
})
export class OrderService {
    orderURL = environment.API_URL + "/orders";
    constructor(private http: HttpClient) {}

    public getAllOrders() {
        return this.http.get(this.orderURL);
    }

    public getOrderById(id: number) {
        return this.http.get(this.orderURL + "/" + id);
    }

    public addOrder(order: Order) {
        return this.http.post(this.orderURL, order);
    }

    public updateOrder(id: number, order: Order) {
        return this.http.put(this.orderURL + "/" + id, order);
    }

    public deleteOrder(id: number) {
        return this.http.delete(this.orderURL + "/" + id);
    }
}
