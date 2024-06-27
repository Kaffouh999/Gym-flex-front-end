import { Component, OnInit, forwardRef } from "@angular/core";
import { FormBuilder, FormGroup, NgControl, Validators } from "@angular/forms";
import { MessageService, ConfirmationService } from "primeng/api";
import { EquipemntItem } from "src/app/core/models/EquipmentItem";
import { Maintaining } from "src/app/core/models/Maintaining";
import { Member } from "src/app/core/models/Member";
import { MemberService } from "src/app/features/membership/services/member.service";
import { EquipmentItemService } from "../../services/equipment-item.service";
import { MaintainingService } from "../../services/maintaining.service";
import { GymBranchComponent } from "src/app/features/settings/components/gym-branch/gym-branch.component";
import { Table } from "primeng/table";
@Component({
    selector: "app-maintaining",
    templateUrl: "./maintaining.component.html",
    styleUrls: ["./maintaining.component.scss"],
    providers: [
        MessageService,
        ConfirmationService,
        {
            provide: NgControl,
            useExisting: forwardRef(() => GymBranchComponent),
        },
    ],
})
export class MaintainingComponent implements OnInit {
    maintainingDialog: boolean = false;
    maintainingForm: FormGroup;
    maintainings: Maintaining[];
    equipmentItems: EquipemntItem[];
    members: Member[];
    maintainingInput: Maintaining = {
        id: undefined,
        item: undefined,
        maintainerResponsible: undefined,
        startDate: undefined,
        endDate: undefined,
        cost: 0,
    };
    constructor(
        private formBuilder: FormBuilder,
        private maintainingService: MaintainingService,
        private equipmentItemService: EquipmentItemService,
        private memberService: MemberService,
        private messageService: MessageService,
        private confirmationService: ConfirmationService
    ) {}
    ngOnInit(): void {
        this.getAllEquipmentItems();
        this.getAllMembers();
        this.getAllMaintainings();
        this.maintainingForm = this.formBuilder.group({
            item: ["", Validators.required],
            maintainerResponsible: ["", Validators.required],
            startDate: ["", Validators.required],
            endDate: ["", Validators.required],
            cost: [""],
        });
    }
    openNew() {
        this.maintainingInput = {
            id: undefined,
            item: this.equipmentItems[0],
            maintainerResponsible: this.members[0],
            startDate: undefined,
            endDate: undefined,
            cost: 0,
        };
        this.fillForm(this.maintainingInput);
        this.maintainingDialog = true;
    }
    getAllEquipmentItems() {
        this.equipmentItemService
            .getAllEquipmentItems()
            .subscribe((data: any) => {
                this.equipmentItems = data;
            });
    }
    getAllMembers() {
        this.memberService.getAllMembers().subscribe((data: any) => {
            this.members = data;
        });
    }
    getAllMaintainings() {
        this.maintainingService.getAllMaintainings().subscribe((data: any) => {
            this.maintainings = data;
            this.maintainings = this.maintainings.map((maitain) => {
                return {
                    ...maitain, // copy all fields from the original object
                    startDate: new Date(maitain.startDate),
                    endDate: new Date(maitain.endDate),
                };
            });
        });
    }

    hideDialog() {
        this.maintainingDialog = false;
    }

    fillMaintaining(): void {
        this.maintainingInput = {
            id: this.maintainingInput.id,
            item: this.maintainingForm.get("item").value,
            maintainerResponsible: this.maintainingForm.get(
                "maintainerResponsible"
            ).value,
            startDate: this.maintainingForm.get("startDate").value,
            endDate: this.maintainingForm.get("endDate").value,
            cost: this.maintainingForm.get("cost").value,
        };
    }
    fillForm(maintaining: Maintaining): void {
        let useDateStart: Date;
        let useDateEnd: Date;
        if (maintaining.startDate !== undefined) {
            useDateStart = new Date(maintaining.startDate);
        }
        if (maintaining.endDate !== undefined) {
            useDateEnd = new Date(maintaining.endDate);
        }
        this.maintainingInput = {
            id: maintaining.id,
            item: undefined,
            maintainerResponsible: undefined,
            startDate: undefined,
            endDate: undefined,
            cost: 0,
        };
        this.maintainingForm.patchValue({
            item: maintaining.item,
            maintainerResponsible: maintaining.maintainerResponsible,
            startDate: useDateStart,
            endDate: useDateEnd,
            cost: maintaining.cost,
        });
    }
    saveMaintaining() {
        this.fillMaintaining();
        if (this.maintainingInput.id === undefined) {
            console.log(this.maintainingInput);
            this.maintainingService
                .addMaintaining(this.maintainingInput)
                .subscribe({
                    next: (data: any) => {
                        this.getAllMaintainings();
                        this.hideDialog();
                        this.messageService.add({
                            severity: "success",
                            summary: "Successful",
                            detail: "Maitining successfuly Aded",
                            life: 3000,
                        });
                    },
                    error: (error: any) => {
                        if (error.status == 409) {
                            this.messageService.add({
                                severity: "error",
                                summary: "error",
                                detail: error.error,
                                life: 3000,
                            });
                        }
                    },
                });
        } else {
            this.maintainingService
                .updateMaintaining(
                    this.maintainingInput.id,
                    this.maintainingInput
                )
                .subscribe({
                    next: (data: any) => {
                        this.getAllMaintainings();
                        this.hideDialog();
                        this.messageService.add({
                            severity: "success",
                            summary: "Successful",
                            detail: "Maitining successfuly updated",
                            life: 3000,
                        });
                    },
                    error: (error: any) => {
                        if (error.status == 409) {
                            this.messageService.add({
                                severity: "error",
                                summary: "error",
                                detail: error.error,
                                life: 3000,
                            });
                        }
                    },
                });
        }
    }
    editMaintaining(maintaining: Maintaining) {
        this.fillForm(maintaining);
        this.maintainingDialog = true;
    }
    deleteMaintaining(maintaining: Maintaining) {
        this.confirmationService.confirm({
            message: "Are you sure you want to delete " + maintaining.id + "?",
            header: "Confirm",
            icon: "pi pi-exclamation-triangle",
            reject: () => {},
            accept: () => {
                this.maintainingService
                    .deleteMaintaining(maintaining)
                    .subscribe((respense: any) => {
                        this.getAllMaintainings();
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
