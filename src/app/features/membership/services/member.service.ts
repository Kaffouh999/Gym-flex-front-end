import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Member } from "src/app/core/models/Member";
import { environment } from "src/environments/environment";

@Injectable({
    providedIn: "root",
})
export class MemberService {
    memberURL = environment.API_URL + "/members";
    constructor(private http: HttpClient) {}

    public getAllMembers() {
        return this.http.get(this.memberURL);
    }
    public getEquipmentStatisics() {
        return this.http.get(this.memberURL + "/statistics");
    }

    public getMemberById(id: number) {
        return this.http.get(this.memberURL + "/" + id);
    }

    public addMember(member: Member) {
        return this.http.post(this.memberURL, member);
    }

    public updateMember(id: number, member: Member) {
        return this.http.put(this.memberURL + "/" + id, member);
    }

    public deleteMember(id: number) {
        return this.http.delete(this.memberURL + "/" + id);
    }
    public getMemberByUser(id: number) {
        return this.http.get(this.memberURL + "/user/" + id);
    }
}
