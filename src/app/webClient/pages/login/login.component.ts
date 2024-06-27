import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { MessageService } from "primeng/api";
import { BehaviorSubject } from "rxjs";
import { LoginUser } from "src/app/core/models/LoginUser";
import { AuthService } from "src/app/shared/services/auth.service";

@Component({
    selector: "app-login",
    templateUrl: "./login.component.html",
    styleUrls: ["./login.component.scss"],
    providers: [MessageService],
})
export class LoginComponent implements OnInit {
    loginForm: FormGroup;
    private readonly accessTokenKey = "access_token";
    private readonly refreshTokenKey = "refresh_token";
    private accessToken$: BehaviorSubject<string> = new BehaviorSubject<string>(
        null
    );

    constructor(
        private authService: AuthService,
        private formBuilder: FormBuilder,
        private router: Router,
        private messageService: MessageService
    ) {}

    ngOnInit(): void {
        this.loginForm = this.formBuilder.group({
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

    login() {
        let email: string = this.loginForm.get("email").value;
        let password: string = this.loginForm.get("password").value;
        let loginUser: LoginUser = { email: email, password: password };
        this.authService.login(loginUser).subscribe({
            next: (response: any) => {
                localStorage.setItem(
                    this.accessTokenKey,
                    response.access_token
                );
                localStorage.setItem(
                    this.refreshTokenKey,
                    response.refresh_token
                );
                this.accessToken$.next(response.access_token);
                this.authService.getRoleFromToken();
                this.router.navigate(["/"]);
            },
            error: (error: any) => {
                this.messageService.add({
                    severity: "error",
                    summary: "Error",
                    detail: "Email or password is incorrect",
                    life: 3000,
                });
            },
        });
    }
}
