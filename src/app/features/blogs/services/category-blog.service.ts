import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { CategoryBlog } from "src/app/core/models/CategoryBlog";

@Injectable({
    providedIn: "root",
})
export class CategoryBlogService {
    constructor(private http: HttpClient) {}

    getAllCategoryBlogs() {
        return this.http.get("http://localhost:8080/api/category-blogs");
    }

    addCategoryBlog(categoryBlog: CategoryBlog) {
        return this.http.post(
            "http://localhost:8080/api/category-blogs",
            categoryBlog
        );
    }
    deleteCategoryBlog(categoryBlog: CategoryBlog) {
        return this.http.delete(
            "http://localhost:8080/api/category-blogs/" + categoryBlog.id
        );
    }
    updateCategoryBlog(id: Number, categoryBlog: CategoryBlog) {
        return this.http.put(
            "http://localhost:8080/api/category-blogs/" + id,
            categoryBlog
        );
    }
}
