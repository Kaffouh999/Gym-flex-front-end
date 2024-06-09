import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Sale } from "src/app/core/models/Sale";
import { environment } from "src/environments/environment";

@Injectable({
    providedIn: "root",
})
export class SaleService {
    saleURL = environment.API_URL + "/sales";
    constructor(private http: HttpClient) {}

    public getAllSales() {
        return this.http.get(this.saleURL);
    }

    public getSaleById(id: number) {
        return this.http.get(this.saleURL + "/" + id);
    }

    public addSale(sale: Sale) {
        return this.http.post(this.saleURL, sale);
    }

    public updateSale(id: number, sale: Sale) {
        return this.http.put(this.saleURL + "/" + id, sale);
    }

    public deleteSale(id: number) {
        return this.http.delete(this.saleURL + "/" + id);
    }
}
