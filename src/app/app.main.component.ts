import {
    Component,
    AfterViewInit,
    OnDestroy,
    Renderer2,
    OnInit,
} from "@angular/core";
import {
    trigger,
    state,
    style,
    transition,
    animate,
} from "@angular/animations";
import { PrimeNGConfig } from "primeng/api";
import { AppComponent } from "./app.component";
import { AuthService } from "./shared/services/auth.service";
import { OnlineUser } from "./core/models/OnlineUser";

@Component({
    selector: "app-main",
    templateUrl: "./app.main.component.html",
    animations: [
        trigger("submenu", [
            state(
                "hidden",
                style({
                    height: "0px",
                })
            ),
            state(
                "visible",
                style({
                    height: "*",
                })
            ),
            transition(
                "visible => hidden",
                animate("400ms cubic-bezier(0.86, 0, 0.07, 1)")
            ),
            transition(
                "hidden => visible",
                animate("400ms cubic-bezier(0.86, 0, 0.07, 1)")
            ),
        ]),
    ],
})
export class AppMainComponent implements AfterViewInit, OnDestroy, OnInit {
    public menuInactiveDesktop: boolean;

    public menuActiveMobile: boolean;

    public profileActive: boolean;

    public topMenuActive: boolean;

    public topMenuLeaving: boolean;
    authUser: OnlineUser;
    timeStamp: number = 0;

    documentClickListener: () => void;

    menuClick: boolean;

    topMenuButtonClick: boolean;

    configActive: boolean;

    configClick: boolean;

    constructor(
        public renderer: Renderer2,
        private primengConfig: PrimeNGConfig,
        public app: AppComponent,
        private authService: AuthService
    ) {
        this.getTimeStamp();
        this.authUser = this.authService.getAuthUser();
    }

    ngOnInit() {
        this.primengConfig.ripple = true;
    }

    ngAfterViewInit() {
        // hides the overlay menu and top menu if outside is clicked
        this.documentClickListener = this.renderer.listen(
            "body",
            "click",
            (event) => {
                if (!this.isDesktop()) {
                    if (!this.menuClick) {
                        this.menuActiveMobile = false;
                    }

                    if (!this.topMenuButtonClick) {
                        this.hideTopMenu();
                    }
                } else if (!this.menuClick && this.isOVerlay()) {
                    this.menuInactiveDesktop = true;
                }

                if (this.configActive && !this.configClick) {
                    this.configActive = false;
                }

                this.configClick = false;
                this.menuClick = false;
                this.topMenuButtonClick = false;
            }
        );
    }

    toggleMenu(event: Event) {
        this.menuClick = true;
        if (this.isDesktop()) {
            this.menuInactiveDesktop = !this.menuInactiveDesktop;
            if (this.menuInactiveDesktop) {
                this.menuActiveMobile = false;
            }
        } else {
            this.menuActiveMobile = !this.menuActiveMobile;
            if (this.menuActiveMobile) {
                this.menuInactiveDesktop = false;
            }
        }

        if (this.topMenuActive) {
            this.hideTopMenu();
        }

        event.preventDefault();
    }

    toggleProfile(event: Event) {
        this.profileActive = !this.profileActive;
        event.preventDefault();
    }

    toggleTopMenu(event: Event) {
        this.topMenuButtonClick = true;
        this.menuActiveMobile = false;

        if (this.topMenuActive) {
            this.hideTopMenu();
        } else {
            this.topMenuActive = true;
        }

        event.preventDefault();
    }

    hideTopMenu() {
        this.topMenuLeaving = true;
        setTimeout(() => {
            this.topMenuActive = false;
            this.topMenuLeaving = false;
        }, 500);
    }

    onMenuClick() {
        this.menuClick = true;
    }

    onRippleChange(event) {
        this.app.ripple = event.checked;
        this.primengConfig.ripple = event.checked;
    }

    onConfigClick(event) {
        this.configClick = true;
    }

    isStatic() {
        return this.app.menuMode === "static";
    }

    isOVerlay() {
        return this.app.menuMode === "overlay";
    }

    isDesktop() {
        return window.innerWidth > 1024;
    }

    ngOnDestroy() {
        if (this.documentClickListener) {
            this.documentClickListener();
        }
    }

    logout() {
        this.authService.logout();
    }
    getTimeStamp() {
        this.timeStamp = new Date().getTime();
    }
}
