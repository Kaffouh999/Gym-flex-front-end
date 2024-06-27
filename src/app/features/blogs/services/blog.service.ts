import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Blog } from "src/app/core/models/Blog";
import { environment } from "src/environments/environment";

@Injectable({
    providedIn: "root",
})
export class BlogService {
    apiURL = environment.API_URL + "/blogs";
    constructor(private http: HttpClient) {}
    getAllBlogs() {
        return this.http.get(this.apiURL);
    }
    addBlog(blog: Blog) {
        return this.http.post(this.apiURL, blog);
    }
    deleteBlog(blog: Blog) {
        return this.http.delete(this.apiURL + "/" + blog.id);
    }
    updateBlog(id: number, blog: Blog) {
        return this.http.put(this.apiURL + id, blog);
    }
}
