import { Component, OnInit } from "@angular/core";
import { ConfirmationService, MessageService } from "primeng/api";
import { SubCategoryService } from "../../services/sub-category.service";
import { SubCategory } from "src/app/core/models/SubCategory";
import { CategoryService } from "../../services/category.service";
import { Category } from "src/app/core/models/Category";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Table } from "primeng/table";

@Component({
    selector: "app-sub-category",
    templateUrl: "./sub-category.component.html",
    styleUrls: ["./sub-category.component.scss"],
    providers: [MessageService, ConfirmationService],
})
export class SubCategoryComponent implements OnInit {
    subCategoryInput: SubCategory = {
        id: undefined,
        name: "",
        description: "",
        category: undefined,
    };
    selectedCategory: Category;
    categories: Category[] = [];
    subCategories: SubCategory[] = [];
    subCategoryDialog: boolean = false;
    subCategoryForm: FormGroup;
    constructor(
        private formBuilder: FormBuilder,
        private subCategoryService: SubCategoryService,
        private categoryService: CategoryService,
        private messageService: MessageService,
        private confirmationService: ConfirmationService
    ) {
        this.subCategoryForm = this.formBuilder.group({
            name: ["", Validators.required],
            description: [""],
            category: ["", Validators.required],
        });
    }
    ngOnInit(): void {
        this.getAllCategories();
        this.getAllSubCategories();
    }
    openNew() {
        this.subCategoryInput = {
            id: undefined,
            name: "",
            description: "",
            category: undefined,
        };
        this.fillForm(this.subCategoryInput);
        this.subCategoryDialog = true;
    }
    hideDialog() {
        this.subCategoryDialog = false;
    }
    getAllCategories() {
        this.categoryService.getAllCategories().subscribe((data: any) => {
            this.categories = data;
        });
    }
    getAllSubCategories() {
        this.subCategoryService.getAllSubCategories().subscribe((data: any) => {
            this.subCategories = data;
        });
    }
    saveSubCategoryInput() {
        this.fillSubCategory();
        if (this.subCategoryInput.id === undefined) {
            this.subCategoryService
                .addSubCategory(this.subCategoryInput)
                .subscribe({
                    next: (res: any) => {
                        this.getAllSubCategories();
                        this.messageService.add({
                            severity: "success",
                            summary: "Success",
                            detail: "SubCategory added successfully",
                            life: 3000,
                        });
                    },
                    error: (error: any) => this.handleError(error),
                });
        } else {
            this.subCategoryService
                .updateSubCategory(
                    this.subCategoryInput.id,
                    this.subCategoryInput
                )
                .subscribe({
                    next: (res: any) => {
                        this.getAllSubCategories();
                        this.messageService.add({
                            severity: "success",
                            summary: "Success",
                            detail: "SubCategory updated successfully",
                            life: 3000,
                        });
                    },
                    error: (error: any) => this.handleError(error),
                });
        }

        this.hideDialog();
    }

    editSubCategory(subCategory: SubCategory) {
        this.fillForm(subCategory);
        this.subCategoryDialog = true;
    }
    delete(subCategory: SubCategory) {
        this.subCategoryService.deleteSubCategory(subCategory).subscribe({
            next: (response: any) => {
                this.getAllSubCategories();
                this.messageService.add({
                    severity: "success",
                    summary: "Successful",
                    detail: "SubCategory Deleted",
                    life: 3000,
                });
            },
            error: (error: any) => this.handleError(error),
        });
    }

    deleteSubCategory(subCategory: SubCategory) {
        this.confirmationService.confirm({
            message:
                "Are you sure you want to delete " + subCategory.name + "?",
            header: "Confirm",
            icon: "pi pi-exclamation-triangle",
            reject: () => {},
            accept: () => {
                this.delete(subCategory);
            },
        });
    }

    fillSubCategory(): void {
        this.subCategoryInput = {
            id: this.subCategoryInput.id,
            name: this.subCategoryForm.get("name").value,
            description: this.subCategoryForm.get("description").value,
            category: this.subCategoryForm.get("category").value,
        };
    }

    fillForm(subCategory: SubCategory): void {
        this.subCategoryInput = {
            id: subCategory.id,
            name: undefined,
            description: undefined,
            category: undefined,
        };
        this.subCategoryForm.patchValue({
            name: subCategory.name,
            description: subCategory.description,
            category: subCategory.category,
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
