import { Component, OnInit, forwardRef } from "@angular/core";
import { FormBuilder, FormGroup, NgControl, Validators } from "@angular/forms";
import { CategoryBlogService } from "../../services/category-blog.service";
import { ConfirmationService, MessageService } from "primeng/api";
import { CategoryBlog } from "src/app/core/models/CategoryBlog";
import { Table } from "primeng/table";
import { GymBranchComponent } from "src/app/features/settings/components/gym-branch/gym-branch.component";

@Component({
    selector: "app-category-blog",
    templateUrl: "./category-blog.component.html",
    styleUrls: ["./category-blog.component.scss"],
    providers: [
        MessageService,
        ConfirmationService,
        {
            provide: NgControl,
            useExisting: forwardRef(() => GymBranchComponent),
        },
    ],
})
export class CategoryBlogComponent implements OnInit {
    constructor(
        private formBuilder: FormBuilder,
        private categoryBlogService: CategoryBlogService,
        private messageService: MessageService,
        private confirmationService: ConfirmationService
    ) {
        this.categoryBlogForm = this.formBuilder.group({
            name: ["", Validators.required],
            description: [""],
        });
    }

    categoryBlogs: CategoryBlog[] = [];

    addDialog: boolean = false;
    categoryBlogInserted: CategoryBlog = {
        id: undefined,
        name: undefined,
        description: undefined,
    };

    categoryBlogForm: FormGroup;

    ngOnInit(): void {
        this.getAllCategoryBlogs();
    }

    getAllCategoryBlogs() {
        this.categoryBlogService.getAllCategoryBlogs().subscribe(
            (data: any) => {
                this.categoryBlogs = data;
            },
            (error: any) => {
                console.error(error);
            }
        );
    }

    addCategoryBlog() {
        this.fillCategoryBlog();
        if (this.categoryBlogInserted.id === undefined) {
            this.categoryBlogService
                .addCategoryBlog(this.categoryBlogInserted)
                .subscribe(
                    (res: any) => {
                        this.getAllCategoryBlogs();
                    },
                    (err: any) => {
                        this.handleError(err);
                    }
                );
        } else {
            this.categoryBlogService
                .updateCategoryBlog(
                    this.categoryBlogInserted.id,
                    this.categoryBlogInserted
                )
                .subscribe(
                    (res: any) => {
                        this.getAllCategoryBlogs();
                    },
                    (err: any) => {
                        this.handleError(err);
                    }
                );
        }

        this.addDialog = false;
    }

    editCategoryBlog(category: CategoryBlog) {
        this.fillForm(category);
        this.categoryBlogInserted = category;
        this.addDialog = true;
    }

    delete(category: CategoryBlog) {
        this.categoryBlogService.deleteCategoryBlog(category).subscribe(
            (respense: any) => {
                this.getAllCategoryBlogs();
                this.messageService.add({
                    severity: "success",
                    summary: "Successful",
                    detail: "category Deleted",
                    life: 3000,
                });
            },
            (error: any) => {
                this.handleError(error);
            }
        );
    }

    deleteCategoryBlog(category: CategoryBlog) {
        this.confirmationService.confirm({
            message: "Are you sure you want to delete " + category.name + "?",
            header: "Confirm",
            icon: "pi pi-exclamation-triangle",
            reject: () => {},
            accept: () => {
                this.delete(category);
            },
        });
    }

    openNew() {
        this.categoryBlogInserted = {
            id: undefined,
            name: undefined,
            description: undefined,
        };
        this.fillForm(this.categoryBlogInserted);
        this.addDialog = true;
    }
    hideDialog() {
        this.addDialog = false;
    }

    fillCategoryBlog(): void {
        this.categoryBlogInserted = {
            id: this.categoryBlogInserted.id,
            name: this.categoryBlogForm.get("name").value,
            description: this.categoryBlogForm.get("description").value,
        };
    }

    fillForm(category: CategoryBlog): void {
        this.categoryBlogInserted = {
            id: category.id,
            name: undefined,
            description: undefined,
        };
        this.categoryBlogForm.patchValue({
            name: category.name,
            description: category.description,
        });
    }
    clear(table: Table) {
        table.clear();
    }

    handleError(error: any) {
        if (error.status === 409) {
            // Display error message from the response body to the user
            const errorMessage = error.error;
            this.messageService.add({
                severity: "error",
                summary: "Error",
                detail: errorMessage,
                life: 3000,
            });
            // Display error message to the user using appropriate UI components
        } else {
            this.messageService.add({
                severity: "error",
                summary: "Error",
                detail: "there is an error in our server , please report here",
                life: 3000,
            });
        }
    }
}
