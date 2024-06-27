import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { CategoryBlog } from "src/app/core/models/CategoryBlog";
import { environment } from "src/environments/environment";

@Injectable({
    providedIn: "root",
})
export class CategoryBlogService {
    categoryBlogURL = environment.API_URL + "/category-blogs";
    constructor(private http: HttpClient) {}

    getAllCategoryBlogs() {
        return this.http.get(this.categoryBlogURL);
    }

    addCategoryBlog(categoryBlog: CategoryBlog) {
        return this.http.post(this.categoryBlogURL, categoryBlog);
    }
    deleteCategoryBlog(categoryBlog: CategoryBlog) {
        return this.http.delete(this.categoryBlogURL + "/" + categoryBlog.id);
    }
    updateCategoryBlog(id: number, categoryBlog: CategoryBlog) {
        return this.http.put(this.categoryBlogURL + "/" + id, categoryBlog);
    }
}
