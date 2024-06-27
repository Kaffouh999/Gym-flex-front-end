import { Component, OnInit } from "@angular/core";
import { OwlOptions } from "ngx-owl-carousel-o";
import { Equipemnt } from "src/app/core/models/Equipment";
import { EquipmentService } from "src/app/features/inventory/services/equipment.service";

@Component({
    selector: "app-our-equipments",
    templateUrl: "./our-equipments.component.html",
    styleUrls: ["./our-equipments.component.scss"],
})
export class OurEquipmentsComponent implements OnInit {
    carouselOptions: OwlOptions = {
        loop: true,
        margin: 0,
        nav: true,
        items: 3,
        dots: true,
        animateOut: "fadeOut",
        animateIn: "fadeIn",
        smartSpeed: 1000,
        autoHeight: false,
        autoplay: true,
    };

    equipments: Equipemnt[] = [];

    constructor(private equipmentService: EquipmentService) {}

    ngOnInit(): void {
        this.getAllEquipments();
        const language = localStorage.getItem("currentLang");
        if (language === "ar") {
            this.carouselOptions.rtl = true;
        }
    }

    getAllEquipments() {
        this.equipmentService.getAllEquipment().subscribe((res: any) => {
            this.equipments = res as Equipemnt[];
        });
    }
}
