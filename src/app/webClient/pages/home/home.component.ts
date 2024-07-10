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
            '<i><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAhklEQVR4nO2WOwqAMBAFBz8XEJKb6aktRFt7LfUEsQkiaCrJruAOvCLVQMK+DRjGXymAWlrqgQGYgVJK6oARCDGNhjRIiN2DNLvYJaRZxR6YEtK3WYFOWhpi9qfJ6DNLQ+q51MRe4Kq3VAnllC9A+7lxUi0Q1cpUXRKqa/H6EajOk2EY3DkANGS6e2z3DR0AAAAASUVORK5CYII=" /> </i>',
            '<i><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAg0lEQVR4nO2WMQqAQAwEB3yHos8R/66lqAiK/iM2ljkt9JImA1uGgZBcDoIgeKa4Y84ALEBlLZY7O9B4iMVaLl5yUbK9yTvgTBR/zfo0cEcm6atcDDJre24hnjSxRatLrdVtRvmakv5Fap3qnFK8pChS8ydzsz4SPTB6nEW8PgJB4M8FSIC6vKYZ4mAAAAAASUVORK5CYII="></i>',
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
