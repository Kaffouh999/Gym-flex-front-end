import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Sale } from "src/app/core/models/Sale";

@Injectable({
    providedIn: "root",
})
export class SaleService {
    constructor(private http: HttpClient) {}

    public getAllSales() {
        return this.http.get("http://localhost:8080/api/sales");
    }

    public getSaleById(id: number) {
        return this.http.get("http://localhost:8080/api/sales/" + id);
    }

    public addSale(sale: Sale) {
        return this.http.post("http://localhost:8080/api/sales", sale);
    }

    public updateSale(id: number, sale: Sale) {
        return this.http.put("http://localhost:8080/api/sales/" + id, sale);
    }

    public deleteSale(id: number) {
        return this.http.delete("http://localhost:8080/api/sales/" + id);
    }
}
