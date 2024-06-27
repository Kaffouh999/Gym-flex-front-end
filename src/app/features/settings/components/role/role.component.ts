import { Component, forwardRef } from "@angular/core";
import { FormBuilder, FormGroup, NgControl, Validators } from "@angular/forms";
import { ConfirmationService, MessageService } from "primeng/api";
import { Table } from "primeng/table";
import { Role } from "src/app/core/models/Role";
import { RoleService } from "../../services/role.service";

@Component({
    selector: "app-role",
    templateUrl: "./role.component.html",
    styleUrls: ["./role.component.scss"],
    providers: [
        MessageService,
        ConfirmationService,
        {
            provide: NgControl,
            useExisting: forwardRef(() => RoleComponent),
        },
    ],
})
export class RoleComponent {
    constructor(
        private formBuilder: FormBuilder,
        private roleService: RoleService,
        private messageService: MessageService,
        private confirmationService: ConfirmationService
    ) {}

    roles: Role[] = [];

    addDialog: boolean = false;
    roleInserted: Role = {
        id: undefined,
        name: "",
        description: "",
        analytics: false,
        membership: false,
        payments: false,
        inventory: false,
        training: false,
        settings: false,
        preferences: false,
        manageWebSite: false,
        coach: false,
    };
    roleForm: FormGroup;
    ngOnInit(): void {
        this.getAllRoles();
        this.roleForm = this.formBuilder.group({
            name: ["", Validators.required],
            description: [""],
            analytics: [""],
            membership: [""],
            payments: [""],
            inventory: [""],
            training: [""],
            settings: [""],
            preferences: [""],
            manageWebSite: [""],
            coach: [""],
        });
    }

    getAllRoles() {
        this.roleService.getAllRoles().subscribe({
            next: (data: any) => {
                this.roles = data;
            },
            error: (error: any) => {
                this.handleError(error);
            },
        });
    }

    addRole() {
        this.fillRole();
        if (this.roleInserted.id === undefined) {
            this.roleService.addRole(this.roleInserted).subscribe({
                next: (res: any) => {
                    this.getAllRoles();
                    this.messageService.add({
                        severity: "success",
                        summary: "Successful",
                        detail: "role Added",
                        life: 3000,
                    });
                },
                error: (error: any) => {
                    this.handleError(error);
                },
            });
        } else {
            this.roleService
                .updateRole(this.roleInserted.id, this.roleInserted)
                .subscribe({
                    next: (res: any) => {
                        this.getAllRoles();
                        this.messageService.add({
                            severity: "success",
                            summary: "Successful",
                            detail: "role Updated",
                            life: 3000,
                        });
                    },
                    error: (error: any) => {
                        this.handleError(error);
                    },
                });
        }

        this.addDialog = false;
    }

    editRole(role: Role) {
        this.fillForm(role);
        this.roleInserted = role;
        this.addDialog = true;
    }

    deleteRole(role: Role) {
        this.confirmationService.confirm({
            message: "Are you sure you want to delete " + role.name + "?",
            header: "Confirm",
            icon: "pi pi-exclamation-triangle",
            reject: () => {},
            accept: () => {
                this.roleService.deleteRole(role.id).subscribe({
                    next: (res: any) => {
                        this.getAllRoles();
                        this.messageService.add({
                            severity: "success",
                            summary: "Successful",
                            detail: "role Deleted",
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

    openNew() {
        this.roleInserted = {
            id: undefined,
            name: "",
            description: "",
            analytics: false,
            membership: false,
            payments: false,
            inventory: false,
            training: false,
            settings: false,
            preferences: false,
            manageWebSite: false,
            coach: false,
        };
        this.fillForm(this.roleInserted);
        this.addDialog = true;
    }
    hideDialog() {
        this.addDialog = false;
    }

    fillRole(): void {
        this.roleInserted = {
            id: this.roleInserted.id,
            name: this.roleForm.get("name").value,
            description: this.roleForm.get("description").value,
            analytics: this.roleForm.get("analytics").value,
            membership: this.roleForm.get("membership").value,
            payments: this.roleForm.get("payments").value,
            inventory: this.roleForm.get("inventory").value,
            training: this.roleForm.get("training").value,
            settings: this.roleForm.get("settings").value,
            preferences: this.roleForm.get("preferences").value,
            manageWebSite: this.roleForm.get("manageWebSite").value,
            coach: this.roleForm.get("coach").value,
        };
    }

    fillForm(role: Role): void {
        this.roleInserted = {
            id: undefined,
            name: "",
            description: "",
            analytics: false,
            membership: false,
            payments: false,
            inventory: false,
            training: false,
            settings: false,
            preferences: false,
            manageWebSite: false,
            coach: false,
        };
        this.roleForm.patchValue({
            name: role.name,
            description: role.description,
            analytics: role.analytics,
            membership: role.membership,
            payments: role.payments,
            inventory: role.inventory,
            training: role.training,
            settings: role.settings,
            preferences: role.preferences,
            manageWebSite: role.manageWebSite,
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
