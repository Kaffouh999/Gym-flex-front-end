import { Component, OnInit, forwardRef } from "@angular/core";
import { FormBuilder, FormGroup, NgControl, Validators } from "@angular/forms";
import { ConfirmationService, MessageService } from "primeng/api";
import { EquipemntItem } from "src/app/core/models/EquipmentItem";
import { Member } from "src/app/core/models/Member";
import { Reform } from "src/app/core/models/Reform";
import { GymBranchComponent } from "src/app/features/settings/components/gym-branch/gym-branch.component";
import { ReformService } from "../../services/reform.service";
import { EquipmentItemService } from "../../services/equipment-item.service";
import { MemberService } from "src/app/features/membership/services/member.service";
import { Table } from "primeng/table";

@Component({
    selector: "app-reform",
    templateUrl: "./reform.component.html",
    styleUrls: ["./reform.component.scss"],
    providers: [
        MessageService,
        ConfirmationService,
        {
            provide: NgControl,
            useExisting: forwardRef(() => GymBranchComponent),
        },
    ],
})
export class ReformComponent implements OnInit {
    reformDialog: boolean = false;
    reformForm: FormGroup;
    reforms: Reform[];
    equipmentItems: EquipemntItem[];
    members: Member[];
    reformInput: Reform = {
        id: undefined,
        item: undefined,
        decider: undefined,
        comment: "",
        decisionDate: undefined,
    };

    ngOnInit(): void {
        this.getAllEquipmentItems();
        this.getAllMembers();
        this.getAllReforms();
        this.reformForm = this.formBuilder.group({
            item: ["", Validators.required],
            decider: ["", Validators.required],
            decisionDate: [""],
            comment: [""],
        });
    }

    constructor(
        private formBuilder: FormBuilder,
        private reformService: ReformService,
        private equipmentItemService: EquipmentItemService,
        private memberService: MemberService,
        private messageService: MessageService,
        private confirmationService: ConfirmationService
    ) {}
    openNew() {
        this.reformInput = {
            id: undefined,
            item: this.equipmentItems[0],
            decider: this.members[0],
            decisionDate: undefined,
            comment: "",
        };
        this.fillForm(this.reformInput);
        this.reformDialog = true;
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
    getAllReforms() {
        this.reformService.getAllReforms().subscribe((data: any) => {
            this.reforms = data;
        });
    }
    fillForm(reform: Reform): void {
        let useDateDecision: Date;
        if (reform.decisionDate !== undefined) {
            useDateDecision = new Date(reform.decisionDate);
        }

        this.reformInput = {
            id: reform.id,
            item: undefined,
            decider: undefined,
            decisionDate: undefined,
            comment: "",
        };
        this.reformForm.patchValue({
            item: reform.item,
            decider: reform.decider,
            decisionDate: useDateDecision,
            comment: reform.comment,
        });
    }
    hideDialog() {
        this.reformDialog = false;
    }

    fillReform(): void {
        this.reformInput = {
            id: this.reformInput.id,
            item: this.reformForm.get("item").value,
            decider: this.reformForm.get("decider").value,
            decisionDate: this.reformForm.get("decisionDate").value,
            comment: this.reformForm.get("comment").value,
        };
    }
    saveReform() {
        this.fillReform();
        if (this.reformInput.id === undefined) {
            console.log(this.reformInput);
            this.reformService.addReform(this.reformInput).subscribe({
                next: (res: any) => {
                    this.getAllReforms();
                    this.messageService.add({
                        severity: "success",
                        summary: "successful reform",
                        detail: "equipment reformed successfully",
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
            this.reformService
                .updateReform(this.reformInput.id, this.reformInput)
                .subscribe({
                    next: (res: any) => {
                        this.getAllReforms();
                        this.messageService.add({
                            severity: "success",
                            summary: "successful reform",
                            detail: "equipment reformed successfully",
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

        this.hideDialog();
    }
    editReform(reform: Reform) {
        this.fillForm(reform);
        this.reformDialog = true;
    }
    deleteReform(reform: Reform) {
        this.confirmationService.confirm({
            message: "Are you sure you want to delete " + reform.id + "?",
            header: "Confirm",
            icon: "pi pi-exclamation-triangle",
            reject: () => {},
            accept: () => {
                this.reformService
                    .deleteReform(reform)
                    .subscribe((respense: any) => {
                        this.getAllReforms();
                    });
                this.messageService.add({
                    severity: "success",
                    summary: "Successful",
                    detail: "reform Deleted",
                    life: 3000,
                });
            },
        });
    }
    clear(table: Table) {
        table.clear();
    }
}
