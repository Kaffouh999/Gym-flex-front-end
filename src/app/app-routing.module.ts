import { RouterModule } from "@angular/router";
import { NgModule } from "@angular/core";
import { AppMainComponent } from "./app.main.component";
import { CategoryComponent } from "./features/inventory/components/category/category.component";
import { SubCategoryComponent } from "./features/inventory/components/sub-category/sub-category.component";
import { GymBranchComponent } from "./features/settings/components/gym-branch/gym-branch.component";
import { PlanComponent } from "./features/membership/components/plan/plan.component";
import { EquipmentComponent } from "./features/inventory/components/equipment/equipment.component";
import { MemberComponent } from "./features/membership/components/member/member.component";
import { AssuranceComponent } from "./features/membership/components/assurance/assurance.component";
import { SubscriptionComponent } from "./features/membership/components/subscription/subscription.component";
import { EquipmentItemComponent } from "./features/inventory/components/equipment-item/equipment-item.component";
import { PaymentComponent } from "./features/membership/components/payment/payment.component";
import { SessionComponent } from "./features/training/components/session/session.component";
import { MaintainingComponent } from "./features/inventory/components/maintaining/maintaining.component";
import { ReformComponent } from "./features/inventory/components/reform/reform.component";
import { ProductComponent } from "./features/store/components/product/product.component";
import { LoginFirstComponent } from "./features/auth/login/login.component";
import { AuthGuard } from "./shared/guards/auth.guard";
import { WebComponent } from "./webClient/web/web.component";
import { HomeComponent } from "./webClient/pages/home/home.component";
import { AboutComponent } from "./webClient/pages/about/about.component";
import { ServicesComponent } from "./webClient/pages/services/services.component";
import { ClassesComponent } from "./webClient/pages/classes/classes.component";
import { TeamComponent } from "./webClient/pages/team/team.component";
import { ContactComponent } from "./webClient/pages/contact/contact.component";
import { BlogComponent } from "./webClient/pages/blog/blog.component";
import { BolgDetailComponent } from "./webClient/pages/bolg-detail/bolg-detail.component";
import { BmiCalcComponent } from "./webClient/pages/bmi-calc/bmi-calc.component";
import { SignUpComponent } from "./webClient/pages/sign-up/sign-up.component";
import { Error404Component } from "./webClient/pages/error404/error404.component";
import { LoginComponent } from "./webClient/pages/login/login.component";
import { AdminGuard } from "./shared/admin.guard";
import { RoleComponent } from "./features/settings/components/role/role.component";
import { AccountComponent } from "./features/membership/components/account/account.component";
import { MySubsComponent } from "./webClient/pages/my-subs/my-subs.component";
import { MyPaymntsComponent } from "./webClient/pages/my-paymnts/my-paymnts.component";
import { MyAttendnsComponent } from "./webClient/pages/my-attendns/my-attendns.component";
import { MyAccountComponent } from "./webClient/pages/my-account/my-account.component";
import { DashboardComponent } from "./features/dashboard/dashboard.component";
import { BlogsComponent } from "./features/blogs/components/blogs/blogs.component";
import { CategoryBlogComponent } from "./features/blogs/components/category-blog/category-blog.component";

@NgModule({
    imports: [
        RouterModule.forRoot([
            { path: "login", component: LoginFirstComponent },
            {
                path: "web",
                component: WebComponent,
                children: [
                    { path: "home", component: HomeComponent },
                    { path: "about", component: AboutComponent },
                    { path: "services", component: ServicesComponent },
                    { path: "classes", component: ClassesComponent },
                    { path: "team", component: TeamComponent },
                    { path: "contact", component: ContactComponent },
                    { path: "blog", component: BlogComponent },
                    { path: "blog/detailBlog", component: BolgDetailComponent },
                    { path: "subs", component: MySubsComponent },
                    { path: "paymnts", component: MyPaymntsComponent },
                    { path: "attndns", component: MyAttendnsComponent },
                    { path: "bmiCalc", component: BmiCalcComponent },
                    { path: "login", component: LoginComponent },
                    { path: "signup", component: SignUpComponent },
                    { path: "my-account", component: MyAccountComponent },
                    { path: "**", component: Error404Component },
                ],
            },
            {
                path: "",
                component: AppMainComponent,
                children: [
                    { path: "dashboard", component: DashboardComponent },
                    {
                        path: "inventory/category",
                        component: CategoryComponent,
                    },
                    {
                        path: "inventory/sub-category",
                        component: SubCategoryComponent,
                    },
                    {
                        path: "inventory/equipment",
                        component: EquipmentComponent,
                    },
                    {
                        path: "inventory/equipment-item",
                        component: EquipmentItemComponent,
                    },
                    {
                        path: "inventory/maitaining",
                        component: MaintainingComponent,
                    },
                    {
                        path: "inventory/reform",
                        component: ReformComponent,
                    },
                    {
                        path: "settings/gym-branch",
                        component: GymBranchComponent,
                    },
                    { path: "settings/role", component: RoleComponent },
                    { path: "membership/member", component: MemberComponent },
                    { path: "membership/plan", component: PlanComponent },
                    {
                        path: "membership/assurance",
                        component: AssuranceComponent,
                    },
                    {
                        path: "membership/subscription",
                        component: SubscriptionComponent,
                    },
                    { path: "membership/payment", component: PaymentComponent },
                    { path: "membership/account", component: AccountComponent },
                    { path: "training/session", component: SessionComponent },
                    { path: "store/product", component: ProductComponent },
                    {
                        path: "blogs/CategoryBlogs",
                        component: CategoryBlogComponent,
                    },
                    { path: "blogs/blogs", component: BlogsComponent },
                ],
                canActivate: [AuthGuard, AdminGuard],
            },

            { path: "**", redirectTo: "/notfound" },
        ]),
    ],
    exports: [RouterModule],
})
export class AppRoutingModule {}
