import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { SubCategory } from "src/app/core/models/SubCategory";
import { environment } from "src/environments/environment";

@Injectable({
    providedIn: "root",
})
export class SubCategoryService {
    subCategoryURL = environment.API_URL + "/sub-categories";
    constructor(private http: HttpClient) {}
    getAllSubCategories() {
        return this.http.get(this.subCategoryURL);
    }

    addSubCategory(subcategory: SubCategory) {
        return this.http.post(this.subCategoryURL, subcategory);
    }

    deleteSubCategory(subcategory: SubCategory) {
        return this.http.delete(this.subCategoryURL + "/" + subcategory.id);
    }

    updateSubCategory(id: number, subcategory: SubCategory) {
        return this.http.put(this.subCategoryURL + "/" + id, subcategory);
    }
}
