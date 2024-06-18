import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { OnlineUser } from "src/app/core/models/OnlineUser";
import { AuthService } from "src/app/shared/services/auth.service";

@Component({
    selector: "app-sign-up",
    templateUrl: "./sign-up.component.html",
    styleUrls: ["./sign-up.component.scss"],
})
export class SignUpComponent implements OnInit {
    registerForm: FormGroup;

    constructor(
        private authService: AuthService,
        private formBuilder: FormBuilder,
        private router: Router
    ) {}

    ngOnInit(): void {
        this.registerForm = this.formBuilder.group({
            firstName: ["", Validators.required],
            lastName: ["", Validators.required],
            login: ["", Validators.required],
            email: [
                "",
                [
                    Validators.required,
                    Validators.pattern(
                        "^(?=.{1,254}$)(?=.{1,64}@)[-!#$%&'*+/0-9=?A-Z^_`a-z{|}~]+(.[-!#$%&'*+/0-9=?A-Z^_`a-z{|}~]+)*@[A-Za-z0-9]([A-Za-z0-9-]{0,61}[A-Za-z0-9])?(.[A-Za-z0-9]([A-Za-z0-9-]{0,61}[A-Za-z0-9])?)*$"
                    ),
                ],
            ],
            password: ["", Validators.required],
        });
    }

    register() {
        console.log("registred");
        let onlineUser: OnlineUser = {
            id: undefined,
            firstName: this.registerForm.get("firstName").value,
            lastName: this.registerForm.get("lastName").value,
            login: this.registerForm.get("login").value,
            email: this.registerForm.get("email").value,
            password: this.registerForm.get("password").value,
            profilePicture: undefined,
            role: undefined,
        };
        this.authService.register(onlineUser).subscribe((res: any) => {
            this.router.navigate(["/web/home"]);
        });
    }
}
