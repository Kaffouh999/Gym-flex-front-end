import { Component, OnInit } from "@angular/core";
import { Blog } from "src/app/core/models/Blog";
import { BlogService } from "src/app/features/blogs/services/blog.service";

@Component({
    selector: "app-blog",
    templateUrl: "./blog.component.html",
    styleUrls: ["./blog.component.scss"],
})
export class BlogComponent implements OnInit {
    listBlogs: Blog[] = [];

    constructor(private blogService: BlogService) {}

    ngOnInit(): void {
        this.blogService.getAllBlogs().subscribe((res: any) => {
            this.listBlogs = res as Blog[];
        });
    }
}
