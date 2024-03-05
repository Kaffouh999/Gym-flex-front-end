import { Component, OnInit, forwardRef, AfterViewInit, ViewChild } from "@angular/core";
import { FormBuilder, FormGroup, NgControl, Validators } from "@angular/forms";
import { SubCategoryService } from "../../services/sub-category.service";
import { ConfirmationService, MessageService } from "primeng/api";
import { EquipmentService } from "../../services/equipment.service";
import { GymBranchComponent } from "src/app/features/settings/components/gym-branch/gym-branch.component";
import { EquipemntItem } from "src/app/core/models/EquipmentItem";
import { Equipemnt } from "src/app/core/models/Equipment";
import { EquipmentItemService } from "../../services/equipment-item.service";
import { GymBranch } from "src/app/core/models/GymBranch";
import { GymBranchService } from "src/app/features/settings/services/gym-branch.service";
import { Table } from "primeng/table";
import { ZXingScannerComponent } from "@zxing/ngx-scanner";
import { OverlayPanel } from "primeng/overlaypanel";

@Component({
    selector: "app-equipment-item",
    templateUrl: "./equipment-item.component.html",
    styleUrls: ["./equipment-item.component.scss"],
    providers: [
        MessageService,
        ConfirmationService,
        {
            provide: NgControl,
            useExisting: forwardRef(() => GymBranchComponent),
        },
    ],
})
export class EquipmentItemComponent implements OnInit {
    equipmentItemDialog: boolean = false;
    showQrDialog:boolean=false;
    equipmentItemForm: FormGroup;
    equipmentItems: EquipemntItem[];
    equipments: Equipemnt[];
    gymBranchs: GymBranch[];
    barcodeFormat: any=[];
    @ViewChild('scanner') scanner: ZXingScannerComponent | undefined = undefined;
    @ViewChild('op') overlayPanel: OverlayPanel;


    equipmentItemInput: EquipemntItem;
    constructor(
        private formBuilder: FormBuilder,
        private equipmentItemService: EquipmentItemService,
        private equipmentService: EquipmentService,
        private gymBranchService: GymBranchService,
        private messageService: MessageService,
        private confirmationService: ConfirmationService
    ) {}
   
    ngOnInit(): void {

        this.initEquiItem();

        this.getAllEquipmentItems();
        this.getAllEquipments();
        this.getAllGymBranches();
       
        this.equipmentItemForm = this.formBuilder.group({
            firstUseDate: ["", Validators.required],
            price: [""],
            amortization: ["", Validators.required],
            bareCode: [""],
            safeMinValue: [""],
            equipment: ["", Validators.required],
            gymBranch: ["", Validators.required],
        });
    }
    openNew() {
        this.equipmentItemInput = {
            id: undefined,
            firstUseDate: undefined,
            price: 0,
            amortization: 0,
            bareCode: "",
            safeMinValue: 0,
            equipment: this.equipments[0],
            gymBranch: this.gymBranchs[0],
        };
        this.fillForm(this.equipmentItemInput);
        this.equipmentItemDialog = true;
    }

    getAllEquipmentItems() {
        this.equipmentItemService
            .getAllEquipmentItems()
            .subscribe((data: any) => {
                this.equipmentItems = data;
                this.equipmentItems = this.equipmentItems.map((item) => {
                    return {
                        ...item, // copy all fields from the original object
                        firstUseDate: new Date(item.firstUseDate)
                        
                    };
                });
            });
    }
    getAllEquipments() {
        this.equipmentService.getAllEquipment().subscribe((data: any) => {
            this.equipments = data;
        });
    }
    getAllGymBranches() {
        this.gymBranchService.getALlBranches().subscribe((data: any) => {
            this.gymBranchs = data;
        });
    }

    fillEquipmentItem(): void {
        this.equipmentItemInput = {
            id: this.equipmentItemInput.id,
            firstUseDate: this.equipmentItemForm.get("firstUseDate").value,
            price: this.equipmentItemForm.get("price").value,
            bareCode: this.equipmentItemForm.get("bareCode").value,
            amortization: this.equipmentItemForm.get("amortization").value,
            safeMinValue: this.equipmentItemForm.get("safeMinValue").value,
            equipment: this.equipmentItemForm.get("equipment").value,
            gymBranch: this.equipmentItemForm.get("gymBranch").value,
        };
    }
    fillForm(equipemntItem: EquipemntItem): void {
        let useDate: Date;
        if (equipemntItem.firstUseDate !== undefined) {
            useDate = new Date(equipemntItem.firstUseDate);
        }
        this.equipmentItemInput = {
            id: equipemntItem.id,
            firstUseDate: undefined,
            price: 0,
            amortization: 0,
            bareCode: "",
            safeMinValue: 0,
            equipment: undefined,
            gymBranch: undefined,
        };
        this.equipmentItemForm.patchValue({
            firstUseDate: useDate,
            price: equipemntItem.price,
            amortization: equipemntItem.amortization,
            bareCode: equipemntItem.bareCode,
            safeMinValue: equipemntItem.safeMinValue,
            equipment: equipemntItem.equipment,
            gymBranch: equipemntItem.gymBranch,
        });
    }
    saveEquipmentItemInput() {
        this.fillEquipmentItem();
        if (this.equipmentItemInput.id === undefined) {
            this.equipmentItemService
                .addEquipmentItem(this.equipmentItemInput)
                .subscribe((res: any) => {
                    this.getAllEquipmentItems();
                });
        } else {
            this.equipmentItemService
                .updateEquipmentItem(
                    this.equipmentItemInput.id,
                    this.equipmentItemInput
                )
                .subscribe((res: any) => {
                    this.getAllEquipmentItems();
                });
        }

        this.hideDialog();
    }
    hideDialog() {
        this.equipmentItemDialog = false;
    }

    editEquipmentItem(equipemntItem: EquipemntItem) {
        this.fillForm(equipemntItem);
        this.equipmentItemDialog = true;
    }
    deleteEquipmentItem(equipemntItem: EquipemntItem) {
        this.confirmationService.confirm({
            message:
                "Are you sure you want to delete " +
                equipemntItem.equipment.name +
                "?",
            header: "Confirm",
            icon: "pi pi-exclamation-triangle",
            reject: () => {},
            accept: () => {
                this.equipmentItemService
                    .deleteEquipmentItem(equipemntItem)
                    .subscribe((respense: any) => {
                        this.getAllEquipmentItems();
                    });
                this.messageService.add({
                    severity: "success",
                    summary: "Successful",
                    detail: "equipemntItem Deleted",
                    life: 3000,
                });
            },
        });
    }
    clear(table: Table) {
        table.clear();
    }
    showQrCode(equipemntItem : EquipemntItem){
        this.equipmentItemInput = {...equipemntItem};
        this.showQrDialog = true;
        }

        startScanner() {
            // Start the scanner
            this.scanner!.scanStart();
            this.overlayPanel.toggle(event);
          }
        
          stopScanner() {
            // Stop the scanner
            this.scanner?.scanStop();
          }
        
          onScanSuccess(resultString: string) {
            this.stopScanner();
            console.log('QR code scanned:', resultString);
           
            this.equipmentItemService.getByQrCode(resultString).subscribe((res:any) => {
                
                let equipemntItem:EquipemntItem = res as EquipemntItem;
                this.equipmentItems=[];
                this.equipmentItems.push(equipemntItem);
            })
        
          }

        hideqrDialog(){
            this.showQrDialog = false;
        }

        initEquiItem(){
            let gym:GymBranch={
                id: undefined,
                name: "",
                latitude: 0,
                longitude: 0,
                adress: undefined,
                email: undefined,
                appPasswordEmail: undefined,
                phoneNumber: undefined,
                openingDate: undefined,
                closingDate: undefined,
                sessionDurationAllowed: 0
            }
            let equipment:Equipemnt={
                id: undefined,
                name: "",
                description: "",
                imageUrl: "",
                subCategory: undefined
            }
            this.equipmentItemInput = {
                id: undefined,
                firstUseDate: undefined,
                price: 0,
                amortization: 0,
                bareCode: "",
                safeMinValue: 0,
                equipment: equipment,
                gymBranch: gym,
            };
        }
}
