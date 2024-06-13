import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import {
    HttpClient,
    HttpClientModule,
    HTTP_INTERCEPTORS,
} from "@angular/common/http";
import { BrowserModule } from "@angular/platform-browser";
import {
    LocationStrategy,
    HashLocationStrategy,
    DatePipe,
} from "@angular/common";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { AppRoutingModule } from "./app-routing.module";

import { AccordionModule } from "primeng/accordion";
import { AutoCompleteModule } from "primeng/autocomplete";
import { AvatarModule } from "primeng/avatar";
import { AvatarGroupModule } from "primeng/avatargroup";
import { BadgeModule } from "primeng/badge";
import { BreadcrumbModule } from "primeng/breadcrumb";
import { ButtonModule } from "primeng/button";
import { CalendarModule } from "primeng/calendar";
import { CardModule } from "primeng/card";
import { CarouselModule } from "primeng/carousel";
import { CascadeSelectModule } from "primeng/cascadeselect";
import { ChartModule } from "primeng/chart";
import { CheckboxModule } from "primeng/checkbox";
import { ChipModule } from "primeng/chip";
import { ChipsModule } from "primeng/chips";
import { CodeHighlighterModule } from "primeng/codehighlighter";
import { ConfirmDialogModule } from "primeng/confirmdialog";
import { ConfirmPopupModule } from "primeng/confirmpopup";
import { ColorPickerModule } from "primeng/colorpicker";
import { ContextMenuModule } from "primeng/contextmenu";
import { DataViewModule } from "primeng/dataview";
import { DialogModule } from "primeng/dialog";
import { DividerModule } from "primeng/divider";
import { DropdownModule } from "primeng/dropdown";
import { FieldsetModule } from "primeng/fieldset";
import { FileUploadModule } from "primeng/fileupload";
import { FullCalendarModule } from "@fullcalendar/angular";
import { GalleriaModule } from "primeng/galleria";
import { ImageModule } from "primeng/image";
import { InplaceModule } from "primeng/inplace";
import { InputNumberModule } from "primeng/inputnumber";
import { InputMaskModule } from "primeng/inputmask";
import { InputSwitchModule } from "primeng/inputswitch";
import { InputTextModule } from "primeng/inputtext";
import { InputTextareaModule } from "primeng/inputtextarea";
import { KnobModule } from "primeng/knob";
import { LightboxModule } from "primeng/lightbox";
import { ListboxModule } from "primeng/listbox";
import { MegaMenuModule } from "primeng/megamenu";
import { MenuModule } from "primeng/menu";
import { MenubarModule } from "primeng/menubar";
import { MessagesModule } from "primeng/messages";
import { MessageModule } from "primeng/message";
import { MultiSelectModule } from "primeng/multiselect";
import { OrderListModule } from "primeng/orderlist";
import { OrganizationChartModule } from "primeng/organizationchart";
import { OverlayPanelModule } from "primeng/overlaypanel";
import { PaginatorModule } from "primeng/paginator";
import { PanelModule } from "primeng/panel";
import { PanelMenuModule } from "primeng/panelmenu";
import { PasswordModule } from "primeng/password";
import { PickListModule } from "primeng/picklist";
import { ProgressBarModule } from "primeng/progressbar";
import { RadioButtonModule } from "primeng/radiobutton";
import { RatingModule } from "primeng/rating";
import { RippleModule } from "primeng/ripple";
import { ScrollPanelModule } from "primeng/scrollpanel";
import { ScrollTopModule } from "primeng/scrolltop";
import { SelectButtonModule } from "primeng/selectbutton";
import { SidebarModule } from "primeng/sidebar";
import { SkeletonModule } from "primeng/skeleton";
import { SlideMenuModule } from "primeng/slidemenu";
import { SliderModule } from "primeng/slider";
import { SplitButtonModule } from "primeng/splitbutton";
import { SplitterModule } from "primeng/splitter";
import { StepsModule } from "primeng/steps";
import { TabMenuModule } from "primeng/tabmenu";
import { TableModule } from "primeng/table";
import { TabViewModule } from "primeng/tabview";
import { TagModule } from "primeng/tag";
import { TerminalModule } from "primeng/terminal";
import { TieredMenuModule } from "primeng/tieredmenu";
import { TimelineModule } from "primeng/timeline";
import { ToastModule } from "primeng/toast";
import { ToggleButtonModule } from "primeng/togglebutton";
import { ToolbarModule } from "primeng/toolbar";
import { TooltipModule } from "primeng/tooltip";
import { TreeModule } from "primeng/tree";
import { TreeTableModule } from "primeng/treetable";
import { VirtualScrollerModule } from "primeng/virtualscroller";

import { AppComponent } from "./app.component";
import { AppMainComponent } from "./app.main.component";
import { AppTopBarComponent } from "./app.topbar.component";
import { AppConfigComponent } from "./app.config.component";
import { AppMenuComponent } from "./app.menu.component";
import { AppMenuitemComponent } from "./app.menuitem.component";

import { KeyFilterModule } from "primeng/keyfilter";
import { GMapModule } from "primeng/gmap";
import { BreadcrumbService } from "./app.breadcrumb.service";
import { MenuService } from "./app.menu.service";
import { CategoryComponent } from "./features/inventory/components/category/category.component";
import { SubCategoryComponent } from "./features/inventory/components/sub-category/sub-category.component";
import { GymBranchComponent } from "./features/settings/components/gym-branch/gym-branch.component";
import { ReactiveFormsModule } from "@angular/forms";
import { PlanComponent } from "./features/membership/components/plan/plan.component";
import { EquipmentComponent } from "./features/inventory/components/equipment/equipment.component";
import { MemberComponent } from "./features/membership/components/member/member.component";
import { EquipmentItemComponent } from "./features/inventory/components/equipment-item/equipment-item.component";
import { AssuranceComponent } from "./features/membership/components/assurance/assurance.component";
import { SubscriptionComponent } from "./features/membership/components/subscription/subscription.component";
import { QRCodeModule } from "angular2-qrcode";
import { NgxPrintModule } from "ngx-print";
import { TranslateModule, TranslateLoader } from "@ngx-translate/core";
import { TranslateHttpLoader } from "@ngx-translate/http-loader";
import { PaymentComponent } from "./features/membership/components/payment/payment.component";
import { SessionComponent } from "./features/training/components/session/session.component";
import { MinutesDiffPipe } from "./core/models/MinutesDiffPipe";
import { ZXingScannerModule } from "@zxing/ngx-scanner";
import { DialogService } from "primeng/dynamicdialog";
import { RxStompService } from "./core/config/webSocket/rx-stomp.service";
import { rxStompServiceFactory } from "./core/config/webSocket/rx-stomp-service-factory";
import { MaintainingComponent } from "./features/inventory/components/maintaining/maintaining.component";
import { ReformComponent } from "./features/inventory/components/reform/reform.component";
import { ProductComponent } from "./features/store/components/product/product.component";
import { LoginFirstComponent } from "./features/auth/login/login.component";
import { GuardsModule } from "./shared/guards/guards.module";
import { AuthInterceptor } from "./shared/services/auth-interceptor.service";
import { SharedModule } from "./webClient/shared/shared.module";
import { PagesModule } from "./webClient/pages/pages.module";
import { WebComponent } from "./webClient/web/web.component";
import { RoleComponent } from "./features/settings/components/role/role.component";
import { AccountComponent } from "./features/membership/components/account/account.component";
import { DashboardComponent } from "./features/dashboard/dashboard.component";
import { BlogsComponent } from "./features/blogs/components/blogs/blogs.component";
import { EditorModule } from "primeng/editor";
import { CategoryBlogComponent } from "./features/blogs/components/category-blog/category-blog.component";
import { CombineNginxUrlPipe, CombineNginxUrlPipeModule } from "./core/pipes/CombineNginxUrlPipe";

@NgModule({
    declarations: [
        AppComponent,
        AppMainComponent,
        AppTopBarComponent,
        AppConfigComponent,
        AppMenuComponent,
        AppMenuitemComponent,
        CategoryComponent,
        SubCategoryComponent,
        GymBranchComponent,
        PlanComponent,
        EquipmentComponent,
        MemberComponent,
        EquipmentItemComponent,
        AssuranceComponent,
        SubscriptionComponent,
        PaymentComponent,
        SessionComponent,
        MaintainingComponent,
        ReformComponent,
        ProductComponent,
        LoginFirstComponent,
        WebComponent,
        RoleComponent,
        DashboardComponent,
        BlogsComponent,
        CategoryBlogComponent,
    ],
    providers: [
        { provide: LocationStrategy, useClass: HashLocationStrategy },
        { provide: RxStompService, useFactory: rxStompServiceFactory },
        MenuService,
        BreadcrumbService,
        DialogService,
        DatePipe,
        { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    ],
    bootstrap: [AppComponent],
    imports: [
        BrowserModule,
        FormsModule,
        AppRoutingModule,
        HttpClientModule,
        BrowserAnimationsModule,
        AccordionModule,
        AutoCompleteModule,
        AvatarModule,
        AvatarGroupModule,
        BadgeModule,
        BreadcrumbModule,
        ButtonModule,
        CalendarModule,
        CardModule,
        CarouselModule,
        CascadeSelectModule,
        ChartModule,
        CheckboxModule,
        ChipsModule,
        ChipModule,
        CodeHighlighterModule,
        ConfirmDialogModule,
        ConfirmPopupModule,
        ColorPickerModule,
        ContextMenuModule,
        DataViewModule,
        DialogModule,
        DividerModule,
        DropdownModule,
        FieldsetModule,
        FileUploadModule,
        FullCalendarModule,
        GalleriaModule,
        ImageModule,
        InplaceModule,
        InputNumberModule,
        InputMaskModule,
        InputSwitchModule,
        InputTextModule,
        InputTextareaModule,
        KnobModule,
        KeyFilterModule,
        LightboxModule,
        ListboxModule,
        MegaMenuModule,
        MenuModule,
        MenubarModule,
        MessageModule,
        MessagesModule,
        MultiSelectModule,
        OrderListModule,
        OrganizationChartModule,
        OverlayPanelModule,
        PaginatorModule,
        PanelModule,
        PanelMenuModule,
        PasswordModule,
        PickListModule,
        ProgressBarModule,
        RadioButtonModule,
        RatingModule,
        RippleModule,
        ScrollPanelModule,
        ScrollTopModule,
        SelectButtonModule,
        SidebarModule,
        SkeletonModule,
        SlideMenuModule,
        SliderModule,
        SplitButtonModule,
        SplitterModule,
        StepsModule,
        TagModule,
        TableModule,
        TabMenuModule,
        TabViewModule,
        TerminalModule,
        TieredMenuModule,
        TimelineModule,
        ToastModule,
        ToggleButtonModule,
        ToolbarModule,
        TooltipModule,
        TreeModule,
        TreeTableModule,
        VirtualScrollerModule,
        GMapModule,
        GuardsModule,
        ReactiveFormsModule,
        QRCodeModule,
        ZXingScannerModule,
        NgxPrintModule,
        EditorModule,
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: (http: HttpClient) => {
                    return new TranslateHttpLoader(http, "./assets/i18n/", ".json");
                },
                deps: [HttpClient],
            },
        }),
        SharedModule,
        PagesModule,
        CombineNginxUrlPipeModule
    ]
})
export class AppModule {}
