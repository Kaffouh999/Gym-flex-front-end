import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Category } from "src/app/core/models/Category";

@Injectable({
    providedIn: "root",
})
export class CategoryService {
    constructor(private http: HttpClient) {}

    getAllCategories() {
     
        return this.http.get("http://localhost:8080/api/categories");
    }

    addCategory(category: Category) {
        return this.http.post("http://localhost:8080/api/categories", category);
    }
    deleteCategory(category: Category) {
        return this.http.delete(
            "http://localhost:8080/api/categories/" + category.id
        );
    }
    updateCategory(id: Number, category: Category) {
        return this.http.put(
            "http://localhost:8080/api/categories/" + id,
            category
        );
    }
}
