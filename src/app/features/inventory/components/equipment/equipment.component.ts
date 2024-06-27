import { Component, forwardRef } from "@angular/core";
import { FormBuilder, FormGroup, NgControl, Validators } from "@angular/forms";
import { ConfirmationService, MessageService } from "primeng/api";
import { Table } from "primeng/table";
import { Equipemnt } from "src/app/core/models/Equipment";
import { SubCategory } from "src/app/core/models/SubCategory";
import { GymBranchComponent } from "src/app/features/settings/components/gym-branch/gym-branch.component";
import { EquipmentService } from "../../services/equipment.service";
import { SubCategoryService } from "../../services/sub-category.service";

@Component({
    selector: "app-equipment",
    templateUrl: "./equipment.component.html",
    styleUrls: ["./equipment.component.scss"],
    providers: [
        MessageService,
        ConfirmationService,
        {
            provide: NgControl,
            useExisting: forwardRef(() => GymBranchComponent),
        },
    ],
})
export class EquipmentComponent {
    equipmentInput: Equipemnt = {
        id: undefined,
        name: "",
        description: "",
        subCategory: undefined,
        imageUrl: "",
    };
    selectedsubCategory: SubCategory;
    subCategories: SubCategory[] = [];
    equipments: Equipemnt[] = [];
    equipmentDialog: boolean = false;
    equipmentImageDialog: boolean = false;
    equipmentForm: FormGroup;
    formData: FormData = new FormData();
    isAdd: boolean;
    timeStamp: number = 0;

    constructor(
        private formBuilder: FormBuilder,
        private subCategoryService: SubCategoryService,
        private equipmentService: EquipmentService,
        private messageService: MessageService,
        private confirmationService: ConfirmationService
    ) {}
    ngOnInit(): void {
        this.getAllEquipment();
        this.getAllSubCategories();
        this.equipmentForm = this.formBuilder.group({
            name: ["", Validators.required],
            description: [""],
            subCategory: ["", Validators.required],
            imageUrl: [""],
        });
    }
    openNew() {
        this.equipmentInput = {
            id: undefined,
            name: "",
            description: "",
            subCategory: undefined,
            imageUrl: "",
        };
        this.fillForm(this.equipmentInput);
        this.formData = new FormData();
        this.isAdd = true;
        this.equipmentDialog = true;
    }
    hideDialog() {
        this.equipmentDialog = false;
    }
    getAllSubCategories() {
        this.subCategoryService.getAllSubCategories().subscribe((data: any) => {
            this.subCategories = data;
        });
    }
    getAllEquipment() {
        this.equipmentService.getAllEquipment().subscribe((data: any) => {
            this.getTimeStamp();
            this.equipments = data;
        });
    }
    saveEquipmentInput() {
        this.fillequipment();
        if (this.equipmentInput.id === undefined) {
            this.equipmentInput.imageUrl = this.equipmentInput.name;
            this.equipmentService.addEquipment(this.equipmentInput).subscribe({
                next: (data: any) => {
                    this.getAllEquipment();
                },
                error: (error: any) => {
                    this.handleError(error);
                },
            });
        } else {
            this.equipmentService
                .updateEquipment(this.equipmentInput.id, this.equipmentInput)
                .subscribe({
                    next: (data: any) => {
                        this.getAllEquipment();
                    },
                    error: (error: any) => {
                        this.handleError(error);
                    },
                });
        }

        this.hideDialog();
    }

    editEquipment(equipment: Equipemnt) {
        this.fillForm(equipment);
        this.formData = new FormData();
        this.isAdd = false;
        this.equipmentDialog = true;
    }

    editImage(equipment: Equipemnt) {
        this.equipmentInput = { ...equipment };
        this.formData = new FormData();
        this.equipmentImageDialog = true;
    }

    deleteEquipment(equipment: Equipemnt) {
        this.confirmationService.confirm({
            message: "Are you sure you want to delete " + equipment.name + "?",
            header: "Confirm",
            icon: "pi pi-exclamation-triangle",
            reject: () => {},
            accept: () => {
                this.equipmentService.deleteEquipment(equipment).subscribe({
                    next: (data: any) => {
                        this.getAllEquipment();
                        this.messageService.add({
                            severity: "success",
                            summary: "Successful",
                            detail: "Equipemnt Deleted",
                            life: 3000,
                        });
                    },
                    error: (error: any) => {
                        this.handleError(error);
                    },
                });
            },
        });
    }

    fillequipment(): void {
        this.equipmentInput = {
            id: this.equipmentInput.id,
            name: this.equipmentForm.get("name").value,
            description: this.equipmentForm.get("description").value,
            subCategory: this.equipmentForm.get("subCategory").value,
            imageUrl: this.equipmentForm.get("imageUrl").value,
        };
    }

    fillForm(equipment: Equipemnt): void {
        this.equipmentInput = {
            id: equipment.id,
            name: "",
            description: "",
            subCategory: undefined,
            imageUrl: "",
        };
        this.equipmentForm.patchValue({
            name: equipment.name,
            description: equipment.description,
            subCategory: equipment.subCategory,
            imageUrl: equipment.imageUrl,
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
        let id: number = this.equipmentInput.id;
        this.equipmentService.updateImage(id, this.formData).subscribe({
            next: (data: any) => {
                this.getAllEquipment();
                this.equipmentImageDialog = false;
            },
            error: (error: any) => {
                this.handleError(error);
            },
        });
    }

    getTimeStamp() {
        this.timeStamp = new Date().getTime();
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
