import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Product } from "src/app/core/models/Product";
import { environment } from "src/environments/environment";

@Injectable({
    providedIn: "root",
})
export class ProductService {
    productURL = environment.API_URL + "/products";
    constructor(private http: HttpClient) {}

    public getAllProducts() {
        return this.http.get(this.productURL);
    }

    public getProductById(id: number) {
        return this.http.get(this.productURL + "/" + id);
    }

    public addProduct(product: Product) {
        return this.http.post(this.productURL, product);
    }

    public updateProduct(id: number, product: Product) {
        return this.http.put(this.productURL + "/" + id, product);
    }

    public deleteProduct(id: number) {
        return this.http.delete(this.productURL + "/" + id);
    }
    uploadImage(name: String, formData: FormData) {
        return this.http.post(this.productURL + "/upload/" + name, formData);
    }
    updateImage(id: number, formData: FormData) {
        return this.http.put(this.productURL + "/upload/" + id, formData);
    }
}
