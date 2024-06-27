import { Component, OnInit } from "@angular/core";
import { OwlOptions } from "ngx-owl-carousel-o";
import { Member } from "src/app/core/models/Member";
import { MemberService } from "src/app/features/membership/services/member.service";

@Component({
    selector: "app-team-section",
    templateUrl: "./team.component.html",
    styleUrls: ["./team.component.scss"],
})
export class TeamComponentSection implements OnInit {
    images: string[] = [
        "../../../assets/img/team/team-1.jpg",
        "../../../assets/img/team/team-2.jpg",
        "../../../assets/img/team/team-3.jpg",
        "../../../assets/img/team/team-4.jpg",
        "../../../assets/img/team/team-5.jpg",
        "../../../assets/img/team/team-6.jpg",
    ];

    teams: Member[] = [];

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

    constructor(private memberService: MemberService) {}

    ngOnInit(): void {
        this.getAllMembers();
        const language = localStorage.getItem("currentLang");
        if (language === "ar") {
            this.carouselOptions.rtl = true;
        }
    }

    getAllMembers() {
        this.memberService.getAllMembers().subscribe({
            next: (res: any) => {
                this.teams = res as Member[];
            },
            error: (error: any) => {
                console.log(error);
            },
        });
    }
}
