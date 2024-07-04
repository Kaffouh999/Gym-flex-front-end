import { Component, NgZone, OnInit } from "@angular/core";
import { LangChangeEvent, TranslateService } from "@ngx-translate/core";
import { AuthService } from "./shared/services/auth.service";

@Component({
    selector: "app-menu",
    template: `
        <div class="menu">
            <ul class="layout-menu">
                <ng-container *ngFor="let item of model; let i = index">
                    <li
                        *ngIf="isAllowedTo(item.authority)"
                        app-menuitem
                        [item]="item"
                        [root]="true"
                        [index]="i"
                    ></li>
                </ng-container>
                <li app-menuitem [item]="staticItem" [root]="true"></li>
            </ul>
        </div>
    `,
})
export class AppMenuComponent implements OnInit {
    model: any[];
    staticItem: any;
    constructor(
        private translateService: TranslateService,
        private ngZone: NgZone,
        private authService: AuthService
    ) {}

    ngOnInit() {
        this.staticItem = {
            label: "Visit Web Site",
            key: "VisitWeb",
            icon: "pi pi-fw pi-globe",
            routerLink: ["/web/home"],
        };
        this.model = [
            {
                label: "Dashboard",
                key: "Dashboard",
                icon: "pi pi-chart-bar",
                routerLink: ["dashboard"],
                authority: "ANALYTICS",
            },
            {
                label: "Membership ",
                key: "Membership",
                icon: "pi pi-fw pi-star",
                routerLink: ["/uikit"],
                badge: 0,
                authority: "MEMBERSHIP",

                items: [
                    {
                        label: "Members ",
                        key: "Members",
                        icon: "pi pi-fw pi-id-card",
                        routerLink: "membership/member",
                        authority: "MEMBERSHIP",
                    },
                    {
                        label: "Assurance",
                        key: "Assurance",
                        icon: "pi pi-fw pi-shield",
                        routerLink: "membership/assurance",
                        authority: "MEMBERSHIP",
                    },
                    {
                        label: "Plans",
                        key: "Plans",
                        icon: "pi pi-fw pi-bookmark",
                        routerLink: "membership/plan",
                        authority: "MEMBERSHIP",
                    },
                    {
                        label: "Subscriptions",
                        key: "Subscriptions",
                        icon: "pi pi-calendar",
                        routerLink: "membership/subscription",
                        authority: "MEMBERSHIP",
                    },
                    {
                        label: "Payments",
                        key: "Payments",
                        icon: "pi pi-credit-card",
                        routerLink: "membership/payment",
                        authority: "PAYMENT",
                    },
                ],
            },
            {
                label: "inventory ",
                key: "inventory",
                icon: "pi pi-fw pi-box",
                routerLink: ["/blocks"],
                authority: "INVENTORY",
                items: [
                    {
                        label: "Category",
                        key: "Category",
                        icon: "pi pi-fw pi-sitemap",
                        routerLink: ["/inventory/category"],
                        authority: "INVENTORY",
                    },
                    {
                        label: "sub-category",
                        key: "sub-category",
                        icon: "pi pi-fw pi-sitemap",
                        routerLink: "/inventory/sub-category",
                        authority: "INVENTORY",
                    },
                    {
                        label: "Equipment",
                        key: "Equipment",
                        icon: "pi pi-fw pi-wrench",
                        routerLink: "/inventory/equipment",
                        authority: "INVENTORY",
                    },
                    {
                        label: "Equipment Item",
                        key: "EquipmentItem",
                        icon: "pi pi-fw pi-wrench",
                        routerLink: "/inventory/equipment-item",
                        authority: "INVENTORY",
                    },
                    {
                        label: "Maintaining",
                        key: "Maintaining",
                        icon: "pi pi-fw pi-sync",
                        routerLink: "inventory/maitaining",
                        authority: "INVENTORY",
                    },
                    {
                        label: "Reform",
                        key: "Reform",
                        icon: "pi pi-fw pi-trash",
                        routerLink: "inventory/reform",
                        authority: "INVENTORY",
                    },
                ],
            },
            {
                label: "Training Sessions",
                key: "TrainingSession",
                icon: "pi pi-fw pi-stopwatch",
                routerLink: "training/session",
                authority: "TRAINING",
            },
            {
                label: "Store",
                key: "Store",
                icon: "pi pi-fw pi-shopping-cart",
                routerLink: ["/pages"],
                badge: 0,
                authority: "INVENTORY",
                items: [
                    {
                        label: "Products ",
                        key: "Products",
                        icon: "pi pi-fw pi-tag",
                        routerLink: "store/product",
                        authority: "INVENTORY",
                    },
                    {
                        label: "Orders",
                        key: "Orders",
                        icon: "pi pi-fw pi-calendar-plus",
                        routerLink: ["/pages/calendar"],
                        authority: "INVENTORY",
                    },
                    {
                        label: "Sales",
                        key: "Sales",
                        icon: "pi pi-fw pi-dollar",
                        routerLink: ["/pages/timeline"],
                        authority: "INVENTORY",
                    },
                ],
            },
            {
                label: "Blogs",
                key: "blog",
                icon: "pi pi-fw pi-pencil",
                routerLink: ["/pages"],
                badge: 0,
                authority: "INVENTORY",
                items: [
                    {
                        label: "Category Blog",
                        key: "CategoryBlog",
                        icon: "pi pi-fw pi-sitemap",
                        routerLink: "blogs/CategoryBlogs",
                        authority: "INVENTORY",
                    },
                    {
                        label: "Blogs",
                        key: "Blogs",
                        icon: "pi pi-fw pi-align-justify",
                        routerLink: ["/blogs/blogs"],
                        authority: "INVENTORY",
                    },
                    {
                        label: "Comments",
                        key: "Comments",
                        icon: "pi pi-fw pi-comments",
                        routerLink: ["/blogs/comment"],
                        authority: "INVENTORY",
                    },
                ],
            },
            {
                label: "Settings",
                key: "Settings",
                icon: "pi pi-fw pi-cog",
                authority: "PREFERENCES",
                items: [
                    {
                        label: "Gym branches ",
                        key: "GymBranch",
                        icon: "pi pi-fw pi-building",
                        routerLink: "settings/gym-branch",
                        authority: "PREFERENCES",
                    },
                    {
                        label: "Roles ",
                        key: "Roles",
                        icon: "pi pi-fw pi-key",
                        routerLink: "settings/role",
                        authority: "PREFERENCES",
                    },
                    {
                        label: "Users",
                        key: "Users",
                        icon: "pi pi-fw pi-users",
                        routerLink: "settings/user",
                        authority: "PREFERENCES",
                    },
                ],
            },
        ];
        this.translateMenu();
    }
    translateMenu() {
        this.translateService.onLangChange.subscribe(
            (event: LangChangeEvent) => {
                this.model = this.loopTranslate(this.model);
            }
        );
    }

    loopTranslate(model: any[]) {
        model.forEach((item) => {
            item.label = this.translateService.instant(item.key);
            if (item.items != undefined) {
                item.items = this.loopTranslate(item.items);
            }
        });
        return model;
    }

    isAllowedTo(authority: string) {
        return this.authService.getRol().includes(authority);
    }
}
