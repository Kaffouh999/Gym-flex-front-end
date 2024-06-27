import { Component, Input, OnInit, forwardRef } from "@angular/core";
import { FormBuilder, FormGroup, NgControl, Validators } from "@angular/forms";
import { ConfirmationService, MessageService } from "primeng/api";
import { Product } from "src/app/core/models/Product";
import { GymBranchComponent } from "src/app/features/settings/components/gym-branch/gym-branch.component";
import { ProductService } from "../../services/product.service";
import { SubCategory } from "src/app/core/models/SubCategory";
import { SubCategoryService } from "src/app/features/inventory/services/sub-category.service";
import { Table } from "primeng/table";

@Component({
    selector: "app-product",
    templateUrl: "./product.component.html",
    styleUrls: ["./product.component.scss"],
    providers: [
        MessageService,
        ConfirmationService,
        {
            provide: NgControl,
            useExisting: forwardRef(() => GymBranchComponent),
        },
    ],
})
export class ProductComponent implements OnInit {
    productDialog: boolean;

    userImageDialog: boolean = false;

    products: Product[];

    productInput: Product;

    subCategories: SubCategory[];

    selectedProducts: Product[];

    selectedProduct: Product;

    submitted: boolean;

    isAdd: boolean;

    productForm: FormGroup;

    formData: FormData = new FormData();

    timeStamp: number = 0;

    cols: any[];

    _selectedColumns: any[];

    ngOnInit(): void {
        this.getAllSubCategories();
        this.getAllProducts();
        this.productForm = this.formBuilder.group({
            name: ["", Validators.required],
            description: [""],
            price: ["", Validators.required],
            imageUrl: [""],
            rating: [""],
            qteinSTock: ["", Validators.required],
            discount: ["", Validators.required],
            subCategory: ["", Validators.required],
        });
        this.cols = [
            { field: "name", header: "Name" },
            { field: "description", header: "Description" },
            { field: "price", header: "Price" },
            { field: "rating", header: "Rating" },
            { field: "qteinSTock", header: "qteinSTock" },
            { field: "discount", header: "discount" },
            { field: "subCategory", header: "subCategory" },
        ];
        this._selectedColumns = this.cols;
    }

    constructor(
        private formBuilder: FormBuilder,
        private productservice: ProductService,
        private subCategoryService: SubCategoryService,
        private messageService: MessageService,
        private confirmationService: ConfirmationService
    ) {}
    openNew() {
        this.productInput = {
            id: undefined,
            name: "",
            description: "",
            price: undefined,
            imageUrl: "",
            rating: undefined,
            qteinSTock: undefined,
            discount: undefined,
            subCategory: this.subCategories[0],
        };
        this.fillForm(this.productInput);
        this.submitted = false;
        this.productDialog = true;
        this.isAdd = true;
    }
    editProductInput(product: Product) {
        this.fillForm(product);
        this.formData = new FormData();
        this.productDialog = true;
        this.isAdd = false;
    }
    editImage(product: Product) {
        this.productInput = { ...product };
        this.formData = new FormData();
        this.userImageDialog = true;
    }
    deleteProduct(product: Product) {
        this.confirmationService.confirm({
            message: "Are you sure you want to delete " + product.name + "?",
            header: "Confirm",
            icon: "pi pi-exclamation-triangle",
            accept: () => {
                this.productservice
                    .deleteProduct(product.id)
                    .subscribe((res: any) => {
                        this.getAllProducts();
                    });
                this.messageService.add({
                    severity: "success",
                    summary: "Successful",
                    detail: "product Deleted",
                    life: 3000,
                });
            },
        });
    }
    deleteSelectedProducts() {
        this.confirmationService.confirm({
            message: "Are you sure you want to delete the selected products?",
            header: "Confirm",
            icon: "pi pi-exclamation-triangle",
            accept: () => {
                this.products = this.products.filter(
                    (val) => !this.selectedProducts.includes(val)
                );
                this.selectedProducts = null;
                this.messageService.add({
                    severity: "info",
                    summary: "Warning",
                    detail: "Products Deleted just from the view !!!",
                    life: 3000,
                });
            },
        });
    }
    hideDialog() {
        this.productDialog = false;
        this.submitted = false;
    }

    saveProduct() {
        this.fillProduct();
        if (this.productInput.id === undefined) {
            let fullName =
                this.productInput.name +
                "_" +
                this.productInput.subCategory.name;
            this.productservice.uploadImage(fullName, this.formData).subscribe({
                next: (res: any) => {
                    this.productInput.imageUrl = res.message;
                    this.productservice
                        .addProduct(this.productInput)
                        .subscribe((res: any) => {
                            this.getAllProducts();
                            this.hideDialog();
                            this.messageService.add({
                                severity: "success",
                                summary: "Successful",
                                detail: "member added successfuly",
                                life: 3000,
                            });
                        });
                },
                error: (error: any) => {
                    this.messageService.add({
                        severity: "error",
                        summary: "Error",
                        detail: error.error.message,
                        life: 3000,
                    });
                },
            });
        } else {
            this.productservice
                .updateProduct(this.productInput.id, this.productInput)
                .subscribe((res: any) => {
                    this.getAllProducts();
                    this.hideDialog();
                    this.messageService.add({
                        severity: "success",
                        summary: "Successful",
                        detail: "member updated successfuly",
                        life: 3000,
                    });
                });
        }

        this.hideDialog();
    }
    getAllProducts() {
        this.productservice.getAllProducts().subscribe({
            next: (data: any) => {
                this.products = data;
            },
            error: (error: any) => {
                console.log(error);
            },
        });
    }

    getAllSubCategories() {
        this.subCategoryService.getAllSubCategories().subscribe({
            next: (data: any) => {
                this.subCategories = data;
            },
            error: (error: any) => {
                console.log(error);
            },
        });
    }
    fillProduct(): void {
        this.productInput = {
            id: this.productInput.id,
            name: this.productForm.get("name").value,
            description: this.productForm.get("description").value,
            price: this.productForm.get("price").value,
            discount: this.productForm.get("discount").value,
            rating: this.productForm.get("rating").value,
            qteinSTock: this.productForm.get("qteinSTock").value,
            subCategory: this.productForm.get("subCategory").value,
            imageUrl: this.productInput.imageUrl,
        };
    }
    fillForm(product: Product): void {
        this.productInput = {
            id: product.id,
            name: "",
            description: "",
            price: 0,
            discount: 0,
            qteinSTock: 0,
            rating: 0,
            imageUrl: "",
            subCategory: undefined,
        };
        this.productForm.patchValue({
            name: product.name,
            description: product.description,
            price: product.price,
            discount: product.discount,
            qteinSTock: product.qteinSTock,
            rating: product.rating,
            imageUrl: product.imageUrl,
            subCategory: product.subCategory,
        });
    }
    onUpload(event: any) {
        for (let file of event.files) {
            console.log(file);
            this.formData = new FormData();
            this.formData.append("file", file);
        }
    }

    updateImage() {
        this.productservice
            .updateImage(this.productInput.id, this.formData)
            .subscribe({
                next: (res: any) => {
                    this.getAllProducts();
                    this.userImageDialog = false;
                },
                error: (error: any) => {
                    this.messageService.add({
                        severity: "error",
                        summary: "Error",
                        detail: error.error.message,
                        life: 3000,
                    });
                },
            });
    }

    getTimeStamp() {
        this.timeStamp = new Date().getTime();
    }
    clear(table: Table) {
        table.clear();
    }
    @Input() get selectedColumns(): any[] {
        return this._selectedColumns;
    }

    set selectedColumns(val: any[]) {
        //restore original order
        this._selectedColumns = this.cols.filter((col) => val.includes(col));
    }
}
