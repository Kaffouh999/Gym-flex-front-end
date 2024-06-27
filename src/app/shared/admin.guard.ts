import { Injectable } from "@angular/core";
import { CanActivate, Router } from "@angular/router";
import { AuthService } from "./services/auth.service";

@Injectable({
    providedIn: "root",
})
export class AdminGuard implements CanActivate {
    constructor(private authService: AuthService, private router: Router) {}

    canActivate(): boolean {
        let roles = this.authService.getRol();
        if (roles.includes("ANALYTICS")) {
            console.log(this.authService.getRol().includes("ANALYTICS"));
            return true;
        } else {
            this.router.navigate(["/web/home"]);
            console.log("noooooot authenticated");
            return false;
        }
    }
}
