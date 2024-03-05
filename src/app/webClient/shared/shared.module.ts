import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BannerComponent } from './banner/banner.component';
import { BreadcrumbComponent } from './breadcrumb/breadcrumb.component';
import { ChoseUsComponent } from './chose-us/chose-us.component';
import { FooterComponent } from './footer/footer.component';
import { GalleryComponent } from './gallery/gallery.component';
import { GetInTouchComponent } from './get-in-touch/get-in-touch.component';
import { HeaderComponent } from './header/header.component';
import { PricingComponent } from './pricing/pricing.component';
import { SocialMediaComponent } from './social-media/social-media.component';
import { TeamComponentSection } from './team/team.component';
import { TimeTableComponent } from './time-table/time-table.component';
import { BrowserModule } from '@angular/platform-browser';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { RatingModule } from 'primeng/rating';
import { FormsModule } from '@angular/forms';
import { OurEquipmentsComponent } from './our-equipments/our-equipments.component';
import { ImageModule } from 'primeng/image';
import { BadgeModule } from 'primeng/badge';



@NgModule({
  declarations: [
    BannerComponent,
    BreadcrumbComponent,
    ChoseUsComponent,
    FooterComponent,
    GalleryComponent,
    GetInTouchComponent,
    HeaderComponent,
    PricingComponent,
    SocialMediaComponent,
    TeamComponentSection,
    TimeTableComponent,
    OurEquipmentsComponent
    
  ],

  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    ButtonModule,
    InputTextModule,
    BrowserAnimationsModule,
    CarouselModule,
    RatingModule,
    FormsModule,
    ImageModule,
    BadgeModule
  ],
  exports:[  BannerComponent,
    BreadcrumbComponent,
    ChoseUsComponent,
    FooterComponent,
    GalleryComponent,
    GetInTouchComponent,
    HeaderComponent,
    PricingComponent,
    SocialMediaComponent,
    TeamComponentSection,
    TimeTableComponent,
  OurEquipmentsComponent]
})
export class SharedModule { }
