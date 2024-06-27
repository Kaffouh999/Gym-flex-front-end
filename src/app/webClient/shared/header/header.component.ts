import { Component } from "@angular/core";
import { Member } from "src/app/core/models/Member";
import { OnlineUser } from "src/app/core/models/OnlineUser";
import { AuthService } from "src/app/shared/services/auth.service";

@Component({
    selector: "app-header",
    templateUrl: "./header.component.html",
    styleUrls: ["./header.component.scss"],
})
export class HeaderComponent {
    authMember: Member = {
        id: 0,
        cin: undefined,
        age: 0,
        adress: undefined,
        gender: undefined,
        gymBranch: undefined,
        onlineUser: undefined,
    };
    authUser: OnlineUser;
    timeStamp: number = 0;

    constructor(private authService: AuthService) {
        this.getTimeStamp();
        this.authUser = this.authService.getAuthUser();
    }
    isLoggedIn() {
        return this.authService.isLoggedIn();
    }
    logout() {
        this.authService.logout();
    }
    hasWriteToDasboard() {
        if (
            this.authService.getRol() != undefined &&
            this.authService.getRol() != null &&
            this.authService.getRol().length > 0
        ) {
            return true;
        }
        return false;
    }
    getTimeStamp() {
        this.timeStamp = new Date().getTime();
    }
}
