import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AboutComponent } from './about/about.component';
import { BlogComponent } from './blog/blog.component';
import { BmiCalcComponent } from './bmi-calc/bmi-calc.component';
import { BolgDetailComponent } from './bolg-detail/bolg-detail.component';
import { ClassesComponent } from './classes/classes.component';
import { ContactComponent } from './contact/contact.component';
import { Error404Component } from './error404/error404.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { ServicesComponent } from './services/services.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { TeamComponent } from './team/team.component';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { MinutesDiffPipe } from '../../core/models/MinutesDiffPipe';
import {InplaceModule} from 'primeng/inplace';

import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { PasswordModule } from 'primeng/password';
import { SharedModule } from '../shared/shared.module';
import { FormsModule } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient } from '@angular/common/http';
import { ToastModule } from 'primeng/toast';
import { MySubsComponent } from './my-subs/my-subs.component';
import { MyPaymntsComponent } from './my-paymnts/my-paymnts.component';
import { MyAttendnsComponent } from './my-attendns/my-attendns.component';
import { TableModule } from 'primeng/table';
import { MultiSelectModule } from 'primeng/multiselect';
import { TreeTableModule } from 'primeng/treetable';
import {TimelineModule} from 'primeng/timeline';
import {ImageModule} from 'primeng/image';
import { MyAccountComponent } from './my-account/my-account.component';
import { AccountComponent } from 'src/app/features/membership/components/account/account.component';
import { DropdownModule } from 'primeng/dropdown';
import { FileUploadModule } from 'primeng/fileupload';
import { KeyFilterModule } from 'primeng/keyfilter';
import { CombineNginxUrlPipeModule } from "../../core/pipes/CombineNginxUrlPipe";





@NgModule({
    declarations: [
        AboutComponent,
        BlogComponent,
        BmiCalcComponent,
        BolgDetailComponent,
        ClassesComponent,
        ContactComponent,
        Error404Component,
        HomeComponent,
        LoginComponent,
        ServicesComponent,
        SignUpComponent,
        TeamComponent,
        MySubsComponent,
        MyPaymntsComponent,
        MyAttendnsComponent,
        MinutesDiffPipe,
        MyAccountComponent,
        AccountComponent
    ],
    exports: [
        AboutComponent,
        BlogComponent,
        BmiCalcComponent,
        BolgDetailComponent,
        ClassesComponent,
        ContactComponent,
        Error404Component,
        HomeComponent,
        LoginComponent,
        ServicesComponent,
        SignUpComponent,
        TeamComponent,
        MinutesDiffPipe,
        AccountComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        ButtonModule,
        InputTextModule,
        BrowserAnimationsModule,
        CarouselModule,
        PasswordModule,
        DialogModule,
        ToggleButtonModule,
        FormsModule,
        ReactiveFormsModule,
        SharedModule,
        TableModule,
        MultiSelectModule,
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: (http: HttpClient) => {
                    return new TranslateHttpLoader(http, './assets/i18n/', '.json');
                },
                deps: [HttpClient]
            }
        }),
        ToastModule,
        TreeTableModule,
        TimelineModule,
        ImageModule,
        InplaceModule,
        DropdownModule,
        FileUploadModule,
        KeyFilterModule,
        CombineNginxUrlPipeModule
    ]
})
export class PagesModule { }
