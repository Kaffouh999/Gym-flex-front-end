import { Component, OnInit, forwardRef } from "@angular/core";
import { Category } from "src/app/core/models/Category";
import { CategoryService } from "../../services/category.service";
import { ConfirmationService, MessageService } from "primeng/api";
import { FormBuilder, FormGroup, NgControl, Validators } from "@angular/forms";
import { GymBranchComponent } from "src/app/features/settings/components/gym-branch/gym-branch.component";
import { Table } from "primeng/table";

@Component({
    selector: "app-category",
    templateUrl: "./category.component.html",
    styleUrls: ["./category.component.scss"],
    providers: [
        MessageService,
        ConfirmationService,
        {
            provide: NgControl,
            useExisting: forwardRef(() => GymBranchComponent),
        },
    ],
})
export class CategoryComponent implements OnInit {
    constructor(
        private formBuilder: FormBuilder,
        private categoryService: CategoryService,
        private messageService: MessageService,
        private confirmationService: ConfirmationService
    ) {
        this.categoryForm = this.formBuilder.group({
            name: ["", Validators.required],
            description: [""],
            isForClient: [""],
            isForInventory: [""],
        });
    }

    categories: Category[] = [];

    addDialog: boolean = false;
    categoryInserted: Category = {
        id: undefined,
        name: undefined,
        description: undefined,
        isForClient: false,
        isForInventory: false,
    };
    categoryForm: FormGroup;
    ngOnInit(): void {
        this.getAllCategories();
    }

    getAllCategories() {
        this.categoryService.getAllCategories().subscribe({
            next: (data: any) => {
                this.categories = data;
            },
            error: (error: any) => {
                this.handleError(error);
            },
        });
    }

    addCategory() {
        this.fillCategory();
        if (this.categoryInserted.id === undefined) {
            this.categoryService.addCategory(this.categoryInserted).subscribe({
                next: (data: any) => {
                    this.getAllCategories();
                },
                error: (error: any) => {
                    this.handleError(error);
                },
            });
        } else {
            this.categoryService
                .updateCategory(this.categoryInserted.id, this.categoryInserted)
                .subscribe({
                    next: (data: any) => {
                        this.getAllCategories();
                    },
                    error: (error: any) => {
                        this.handleError(error);
                    },
                });
        }

        this.addDialog = false;
    }

    editCategory(category: Category) {
        this.fillForm(category);
        this.categoryInserted = category;
        this.addDialog = true;
    }

    delete(category: Category) {
        this.categoryService.deleteCategory(category).subscribe({
            next: (data: any) => {
                this.getAllCategories();
                this.messageService.add({
                    severity: "success",
                    summary: "Successful",
                    detail: "category Deleted",
                    life: 3000,
                });
            },
            error: (error: any) => {
                this.handleError(error);
            },
        });
    }

    deleteCategory(category: Category) {
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
        this.categoryInserted = {
            id: undefined,
            name: undefined,
            description: undefined,
            isForClient: false,
            isForInventory: false,
        };
        this.fillForm(this.categoryInserted);
        this.addDialog = true;
    }
    hideDialog() {
        this.addDialog = false;
    }

    fillCategory(): void {
        this.categoryInserted = {
            id: this.categoryInserted.id,
            name: this.categoryForm.get("name").value,
            description: this.categoryForm.get("description").value,
            isForClient: this.categoryForm.get("isForClient").value,
            isForInventory: this.categoryForm.get("isForInventory").value,
        };
    }

    fillForm(category: Category): void {
        this.categoryInserted = {
            id: category.id,
            name: undefined,
            description: undefined,
            isForClient: false,
            isForInventory: false,
        };
        this.categoryForm.patchValue({
            name: category.name,
            description: category.description,
            isForClient: category.isForClient,
            isForInventory: category.isForInventory,
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
