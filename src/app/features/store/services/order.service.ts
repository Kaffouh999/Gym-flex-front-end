import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Order } from "src/app/core/models/Order";

@Injectable({
    providedIn: "root",
})
export class OrderService {
    constructor(private http: HttpClient) {}

    public getAllOrders() {
        return this.http.get("http://localhost:8080/api/orders");
    }

    public getOrderById(id: number) {
        return this.http.get("http://localhost:8080/api/orders/" + id);
    }

    public addOrder(order: Order) {
        return this.http.post("http://localhost:8080/api/orders", order);
    }

    public updateOrder(id: number, order: Order) {
        return this.http.put("http://localhost:8080/api/orders/" + id, order);
    }

    public deleteOrder(id: number) {
        return this.http.delete("http://localhost:8080/api/orders/" + id);
    }
}
