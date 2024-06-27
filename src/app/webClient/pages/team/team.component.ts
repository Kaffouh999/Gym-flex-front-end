import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { Member } from "src/app/core/models/Member";
import { MemberService } from "src/app/features/membership/services/member.service";

@Component({
    selector: "app-team",
    templateUrl: "./team.component.html",
    styleUrls: ["./team.component.scss"],
})
export class TeamComponent implements OnInit {
    members: Member[] = [];
    timeStamp: number = 0;

    constructor(
        private memberService: MemberService,
        private http: HttpClient
    ) {}

    ngOnInit(): void {
        this.getTimeStamp();
        this.memberService.getAllMembers().subscribe((res: any) => {
            this.members = res as Member[];
        });
    }
    getTimeStamp() {
        this.timeStamp = new Date().getTime();
    }
}
