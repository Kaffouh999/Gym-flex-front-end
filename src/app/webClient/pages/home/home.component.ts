import {
    Component,
    OnInit,
} from "@angular/core";
import { OwlOptions } from "ngx-owl-carousel-o";

@Component({
    selector: "app-home",
    templateUrl: "./home.component.html",
    styleUrls: ["./home.component.scss"],
})
export class HomeComponent implements OnInit {
    images: string[] = [
        "../assets/img/hero/hero-1.jpg",
        "../assets/img/hero/hero-1.jpg",
        "../assets/img/hero/hero-1.jpg",
    ];

    carouselOptions: OwlOptions = {
        loop: true,
        margin: 0,
        nav: true,
        items: 1,
        dots: false,
        animateOut: "fadeOut",
        animateIn: "fadeIn",
        navText: [
            '<i class="fa fa-angle-left"></i>',
            '<i class="fa fa-angle-right"></i>',
        ],
        smartSpeed: 2000,
        autoHeight: false,
        autoplay: true,
    };

    ngOnInit(): void {
        const language = localStorage.getItem("currentLang");
        if (language === "ar") {
            this.carouselOptions.rtl = true;
        }
    }
}
