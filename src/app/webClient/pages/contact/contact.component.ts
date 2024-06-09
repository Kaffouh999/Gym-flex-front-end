import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MessageService } from "primeng/api";
import { AuthService } from "src/app/shared/services/auth.service";
import { environment } from "src/environments/environment";

@Component({
    selector: "app-contact",
    templateUrl: "./contact.component.html",
    styleUrls: ["./contact.component.scss"],
    providers: [MessageService],
})
export class ContactComponent implements OnInit {
    contactForm: FormGroup;
    constructor(
        private formBuilder: FormBuilder,
        private http: HttpClient,
        private messageService: MessageService,
        private authService: AuthService
    ) {}
    ngOnInit(): void {
        this.contactForm = this.formBuilder.group({
            fullName: ["", Validators.required],
            email: [
                "",
                [
                    Validators.required,
                    Validators.pattern(
                        "^(?=.{1,254}$)(?=.{1,64}@)[-!#$%&'*+/0-9=?A-Z^_`a-z{|}~]+(.[-!#$%&'*+/0-9=?A-Z^_`a-z{|}~]+)*@[A-Za-z0-9]([A-Za-z0-9-]{0,61}[A-Za-z0-9])?(.[A-Za-z0-9]([A-Za-z0-9-]{0,61}[A-Za-z0-9])?)*$"
                    ),
                ],
            ],
            subject: [""],
            message: ["", Validators.required],
        });
    }
    contact() {
        const contactObject = {
            fullName: this.contactForm.get("fullName").value,
            email: this.contactForm.get("email").value,
            subject: this.contactForm.get("subject").value,
            message: this.contactForm.get("message").value,
            idUser: this.authService.getAuthUser().id,
        };
        this.http
            .post(environment.API_URL+"/web/contact", contactObject)
            .subscribe((res: any) => {
                let isSent: Boolean = res as Boolean;
                if (isSent) {
                    this.messageService.add({
                        severity: "success",
                        summary: "Successful",
                        detail: "message sent successfuly",
                        life: 3000,
                    });
                } else {
                    this.messageService.add({
                        severity: "error",
                        summary: "Error",
                        detail: "message not sent ,error in our server , try later",
                        life: 3000,
                    });
                }
            });
    }
}
