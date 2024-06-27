import { DatePipe } from "@angular/common";
import { Component, forwardRef, Input } from "@angular/core";
import { FormBuilder, FormGroup, NgControl, Validators } from "@angular/forms";
import { ConfirmationService, MessageService } from "primeng/api";
import { Table } from "primeng/table";
import { AssuranceMember } from "src/app/core/models/AssuranceMember";
import { Member } from "src/app/core/models/Member";
import { ExporterService } from "src/app/shared/services/exporter.service";
import { AssuranceService } from "../../services/assurance.service";
import { MemberService } from "../../services/member.service";

@Component({
    selector: "app-assurance",
    templateUrl: "./assurance.component.html",
    styleUrls: ["./assurance.component.scss"],
    providers: [
        MessageService,
        ConfirmationService,
        {
            provide: NgControl,
            useExisting: forwardRef(() => AssuranceComponent),
        },
    ],
})
export class AssuranceComponent {
    assuranceInput: AssuranceMember = {
        id: undefined,
        amountPayed: 0,
        startDate: undefined,
        endDate: undefined,
        assurancAgency: "",
        member: undefined,
    };
    selectedsubCategory: Member;
    members: Member[] = [];
    assurances: AssuranceMember[] = [];
    filteredAssuranceAgencies: any[];
    assuranceDialog: boolean = false;
    assuranceImageDialog: boolean = false;
    assuranceForm: FormGroup;
    formData: FormData = new FormData();
    isAdd: boolean;
    timeStamp: number = 0;
    selectedAssurances: AssuranceMember[] = [];

    cols: any[];
    _selectedColumns: any[];

    constructor(
        private formBuilder: FormBuilder,
        private memberService: MemberService,
        private assuranceService: AssuranceService,
        private messageService: MessageService,
        private confirmationService: ConfirmationService,
        private exporterService: ExporterService,
        private datePipe: DatePipe
    ) {}

    @Input() get selectedColumns(): any[] {
        return this._selectedColumns;
    }

    set selectedColumns(val: any[]) {
        //restore original order
        this._selectedColumns = this.cols.filter((col) => val.includes(col));
    }

    ngOnInit(): void {
        this.getAllAssurances();
        this.getAllMembers();
        this.assuranceForm = this.formBuilder.group({
            amountPayed: ["", Validators.required],
            assurancAgency: [""],
            startDate: ["", Validators.required],
            endDate: ["", Validators.required],
            member: ["", Validators.required],
        });

        this.cols = [
            { dataKey: "assurancAgency", header: "AssurancAgency" },
            { dataKey: "member", header: "Member" },
            { dataKey: "startDate", header: "Start Date" },
            { dataKey: "endDate", header: "End Date" },
            { dataKey: "amountPayed", header: "Amount Payed" },
        ];
    }
    openNew() {
        this.assuranceInput = {
            id: undefined,
            amountPayed: 0,
            startDate: undefined,
            endDate: undefined,
            assurancAgency: "",
            member: this.members[0],
        };
        this.fillForm(this.assuranceInput);
        this.formData = new FormData();
        this.isAdd = true;
        this.assuranceDialog = true;
    }
    hideDialog() {
        this.assuranceDialog = false;
    }
    getAllMembers() {
        this.memberService.getAllMembers().subscribe((data: any) => {
            this.members = data;
        });
    }
    getAllAssurances() {
        this.assuranceService.getAllAssurances().subscribe((data: any) => {
            this.assurances = data;
            console.log(this.assurances);
            this.assurances = this.assurances.map((assuranceMember) => {
                return {
                    ...assuranceMember, // copy all fields from the original object
                    startDate: new Date(assuranceMember.startDate),
                    endDate: new Date(assuranceMember.endDate),
                };
            });
            console.log(this.assurances);
        });
    }
    saveAssurance() {
        this.fillassurance();

        if (this.assuranceInput.id === undefined) {
            this.assuranceService.addAssurance(this.assuranceInput).subscribe({
                next: (res: any) => {
                    this.getAllAssurances();
                    this.hideDialog();
                    this.messageService.add({
                        severity: "success",
                        summary: "Successful",
                        detail: "assurance added successfuly",
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
            this.assuranceService
                .updateAssurance(this.assuranceInput.id, this.assuranceInput)
                .subscribe({
                    next: (data: any) => {
                        this.getAllAssurances();
                        this.hideDialog();
                        this.messageService.add({
                            severity: "success",
                            summary: "Successful",
                            detail: "assurance updated successfuly",
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

    editAssurance(assurance: AssuranceMember) {
        this.fillForm(assurance);
        this.formData = new FormData();
        this.isAdd = false;
        this.assuranceDialog = true;
    }

    deleteAssurance(assurance: AssuranceMember) {
        this.confirmationService.confirm({
            message: "Are you sure you want to delete this assurance?",
            header: "Confirm",
            icon: "pi pi-exclamation-triangle",
            reject: () => {},
            accept: () => {
                this.assuranceService
                    .deleteAssurance(assurance.id)
                    .subscribe((respense: any) => {
                        this.getAllAssurances();
                    });
                this.messageService.add({
                    severity: "success",
                    summary: "Successful",
                    detail: "Assurance Deleted",
                    life: 3000,
                });
            },
        });
    }

    fillassurance(): void {
        this.assuranceInput = {
            id: this.assuranceInput.id,
            amountPayed: this.assuranceForm.get("amountPayed").value,
            assurancAgency: this.assuranceForm.get("assurancAgency").value,
            startDate: this.assuranceForm.get("startDate").value,
            endDate: this.assuranceForm.get("endDate").value,
            member: this.assuranceForm.get("member").value,
        };
    }

    fillForm(assurance: AssuranceMember): void {
        this.assuranceInput = {
            id: assurance.id,
            amountPayed: 0,
            startDate: undefined,
            endDate: undefined,
            assurancAgency: "",
            member: undefined,
        };
        this.assuranceForm.patchValue({
            amountPayed: assurance.amountPayed,
            assurancAgency: assurance.assurancAgency,
            startDate: assurance.startDate,
            endDate: assurance.endDate,
            member: assurance.member,
        });
    }

    exportExcel() {
        let selectedAssurances = this.selectedAssurances.map(
            (col: AssuranceMember) => ({
                amountPayed: col.amountPayed,
                startDate: this.datePipe.transform(col.startDate, "dd/MM/yyyy"),
                endDate: this.datePipe.transform(col.endDate, "dd/MM/yyyy"),
                assurancAgency: col.assurancAgency,
                member: col.member.onlineUser.firstName,
            })
        );
        this.exporterService.exportExcel(
            selectedAssurances,
            this._selectedColumns,
            "Assurances"
        );
    }

    exportPdf() {
        let selectedAssurances = this.selectedAssurances.map(
            (col: AssuranceMember) => ({
                amountPayed: col.amountPayed,
                startDate: this.datePipe.transform(col.startDate, "dd/MM/yyyy"),
                endDate: this.datePipe.transform(col.endDate, "dd/MM/yyyy"),
                assurancAgency: col.assurancAgency,
                member: col.member.onlineUser.firstName,
            })
        );

        this.exporterService.exportPdf(
            selectedAssurances,
            this._selectedColumns,
            "Assurances"
        );
    }
    clear(table: Table) {
        table.clear();
    }

    filterAssuranceAgency(event: any) {
        let filtered: any[] = [];
        let assurancAgencies = [
            "Wafa Assurance",
            "RMA Assurance",
            "Saham Assurance",
            "Atlanta Assurance",
            "Axa Assurance Maroc",
            "Allianz Maroc",
            "MCMA",
            "CAT Assurance et Réassurance",
            "Marocaine Vie",
            "Sanad Assurance",
        ];

        let query = event.query;

        for (const assuranceAgency of assurancAgencies) {
            if (assuranceAgency.toLowerCase().startsWith(query.toLowerCase())) {
                filtered.push(assuranceAgency);
            }
        }

        this.filteredAssuranceAgencies = filtered;
    }
}
