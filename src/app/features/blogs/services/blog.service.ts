import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Blog } from "src/app/core/models/Blog";

@Injectable({
    providedIn: "root",
})
export class BlogService {
    constructor(private http: HttpClient) {}
    getAllBlogs() {
        return this.http.get("http://localhost:8080/api/blogs");
    }
    addBlog(blog: Blog) {
        return this.http.post("http://localhost:8080/api/blogs", blog);
    }
    deleteBlog(blog: Blog) {
        return this.http.delete("http://localhost:8080/api/blogs/" + blog.id);
    }
    updateBlog(id: Number, blog: Blog) {
        return this.http.put("http://localhost:8080/api/blogs/" + id, blog);
    }
}
