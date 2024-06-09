import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Category } from "src/app/core/models/Category";
import { environment } from "src/environments/environment";

@Injectable({
    providedIn: "root",
})
export class CategoryService {
    categoryUrl = environment.API_URL + "/categories";
    constructor(private http: HttpClient) {}

    getAllCategories() {
        return this.http.get(this.categoryUrl);
    }

    addCategory(category: Category) {
        return this.http.post(this.categoryUrl, category);
    }
    deleteCategory(category: Category) {
        return this.http.delete(this.categoryUrl + "/" + category.id);
    }
    updateCategory(id: Number, category: Category) {
        return this.http.put(this.categoryUrl + "/" + id, category);
    }
}
