import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { SubCategory } from "src/app/core/models/SubCategory";

@Injectable({
    providedIn: "root",
})
export class SubCategoryService {
    constructor(private http: HttpClient) {}
    getAllSubCategories() {
        return this.http.get("http://localhost:8080/api/sub-categories");
    }

    addSubCategory(subcategory: SubCategory) {
        return this.http.post(
            "http://localhost:8080/api/sub-categories",
            subcategory
        );
    }
    deleteSubCategory(subcategory: SubCategory) {
        return this.http.delete(
            "http://localhost:8080/api/sub-categories/" + subcategory.id
        );
    }
    updateSubCategory(id: Number, subcategory: SubCategory) {
        return this.http.put(
            "http://localhost:8080/api/sub-categories/" + id,
            subcategory
        );
    }
}
