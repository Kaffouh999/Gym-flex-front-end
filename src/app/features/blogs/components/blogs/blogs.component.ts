import { Component, OnInit, forwardRef } from "@angular/core";
import { FormBuilder, FormGroup, NgControl } from "@angular/forms";
import { ConfirmationService, MessageService } from "primeng/api";
import { Blog } from "src/app/core/models/Blog";
import { CategoryBlog } from "src/app/core/models/CategoryBlog";
import { Member } from "src/app/core/models/Member";
import { MemberService } from "src/app/features/membership/services/member.service";
import { BlogService } from "../../services/blog.service";
import { CategoryBlogService } from "../../services/category-blog.service";
import { Table } from "primeng/table";
import { GymBranchComponent } from "src/app/features/settings/components/gym-branch/gym-branch.component";

@Component({
    selector: "app-blogs",
    templateUrl: "./blogs.component.html",
    styleUrls: ["./blogs.component.scss"],
    providers: [
        MessageService,
        ConfirmationService,
        {
            provide: NgControl,
            useExisting: forwardRef(() => GymBranchComponent),
        },
    ],
})
export class BlogsComponent implements OnInit {
    blogDialog: boolean = false;
    blogForm: FormGroup;
    blogs: Blog[];
    categoryBlogs: CategoryBlog[];
    members: Member[];
    blogInput: Blog = {
        id: undefined,
        name: "",
        description: "",
        title: undefined,
        body: undefined,
        dateCreation: undefined,

        categoryBlog: undefined,
        headerImage: undefined,
    };
    constructor(
        private formBuilder: FormBuilder,
        private blogService: BlogService,
        private categoryBlogService: CategoryBlogService,
        private memberService: MemberService,
        private messageService: MessageService,
        private confirmationService: ConfirmationService
    ) {}
    ngOnInit(): void {
        this.getAllCategoryBlogs();

        this.getAllBlogs();
        this.blogForm = this.formBuilder.group({
            name: [""],
            description: [""],
            body: [""],
            title: [""],
            categoryBlog: [""],
            author: [""],
        });
    }
    openNew() {
        this.blogInput = {
            id: undefined,
            name: "",
            description: "",
            title: "",
            body: "",
            dateCreation: undefined,
            categoryBlog: this.categoryBlogs[0],
            headerImage: undefined,
        };
        this.fillForm(this.blogInput);
        this.blogDialog = true;
    }
    getAllCategoryBlogs() {
        this.categoryBlogService
            .getAllCategoryBlogs()
            .subscribe((data: any) => {
                this.categoryBlogs = data;
            });
    }

    getAllBlogs() {
        this.blogService.getAllBlogs().subscribe((data: any) => {
            this.blogs = data;
            this.blogs = this.blogs.map((blog) => {
                return {
                    ...blog, // copy all fields from the original object
                    dateCreation: new Date(blog.dateCreation),
                };
            });
        });
    }

    hideDialog() {
        this.blogDialog = false;
    }

    fillBlog(): void {
        this.blogInput = {
            id: this.blogInput.id,
            name: this.blogForm.get("name").value,
            description: this.blogForm.get("description").value,
            title: this.blogForm.get("title").value,
            categoryBlog: this.blogForm.get("categoryBlog").value,
            body: this.blogForm.get("body").value,
            dateCreation: new Date(),

            headerImage: "",
        };
    }
    fillForm(blog: Blog): void {
        this.blogInput = {
            id: blog.id,
            name: "",
            description: "",
            title: "",
            body: "",
            dateCreation: undefined,

            categoryBlog: undefined,
            headerImage: undefined,
        };
        this.blogForm.patchValue({
            categoryBlog: blog.categoryBlog,
            name: blog.name,
            body: blog.body,
            title: blog.title,
            description: blog.description,
        });
    }
    saveBlog() {
        this.fillBlog();
        if (this.blogInput.id === undefined) {
            console.log(this.blogInput);
            this.blogService.addBlog(this.blogInput).subscribe({
                next: (res: any) => {
                    this.getAllBlogs();
                    this.hideDialog();
                    this.messageService.add({
                        severity: "success",
                        summary: "Successful",
                        detail: "Blog added successfully",
                        life: 3000,
                    });
                },
                error: (error: any) => {
                    if (error.status === 409) {
                        this.messageService.add({
                            severity: "error",
                            summary: "Error",
                            detail: error.error,
                            life: 3000,
                        });
                    } else {
                        this.messageService.add({
                            severity: "error",
                            summary: "Error",
                            detail: "An unexpected error occurred.",
                            life: 3000,
                        });
                    }
                },
            });
        } else {
            this.blogService
                .updateBlog(this.blogInput.id, this.blogInput)
                .subscribe({
                    next: (res: any) => {
                        this.getAllBlogs();
                        this.hideDialog();
                        this.messageService.add({
                            severity: "success",
                            summary: "Successful",
                            detail: "Maintaining successfully updated",
                            life: 3000,
                        });
                    },
                    error: (error: any) => {
                        if (error.status === 409) {
                            this.messageService.add({
                                severity: "error",
                                summary: "Error",
                                detail: error.error,
                                life: 3000,
                            });
                        } else {
                            this.messageService.add({
                                severity: "error",
                                summary: "Error",
                                detail: "An unexpected error occurred.",
                                life: 3000,
                            });
                        }
                    },
                });
        }
    }
    editBlog(blog: Blog) {
        this.fillForm(blog);
        this.blogDialog = true;
    }
    deleteBlog(blog: Blog) {
        this.confirmationService.confirm({
            message: "Are you sure you want to delete " + blog.id + "?",
            header: "Confirm",
            icon: "pi pi-exclamation-triangle",
            reject: () => {},
            accept: () => {
                this.blogService.deleteBlog(blog).subscribe((respense: any) => {
                    this.getAllBlogs();
                });
                this.messageService.add({
                    severity: "success",
                    summary: "Successful",
                    detail: "maintaining Deleted",
                    life: 3000,
                });
            },
        });
    }
    clear(table: Table) {
        table.clear();
    }
}
