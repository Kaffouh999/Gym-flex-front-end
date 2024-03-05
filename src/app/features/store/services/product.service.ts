import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Product } from "src/app/core/models/Product";

@Injectable({
    providedIn: "root",
})
export class ProductService {
    constructor(private http: HttpClient) {}

    public getAllProducts() {
        return this.http.get("http://localhost:8080/api/products");
    }

    public getProductById(id: number) {
        return this.http.get("http://localhost:8080/api/products/" + id);
    }

    public addProduct(product: Product) {
        return this.http.post("http://localhost:8080/api/products", product);
    }

    public updateProduct(id: number, product: Product) {
        return this.http.put(
            "http://localhost:8080/api/products/" + id,
            product
        );
    }

    public deleteProduct(id: number) {
        return this.http.delete("http://localhost:8080/api/products/" + id);
    }
    uploadImage(name: String, formData: FormData) {
        return this.http.post(
            "http://localhost:8080/api/products/upload/" + name,
            formData
        );
    }
    updateImage(id: number, formData: FormData) {
        return this.http.put(
            "http://localhost:8080/api/products/upload/" + id,
            formData
        );
    }
}
