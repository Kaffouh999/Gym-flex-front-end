import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { GymBranch } from "src/app/core/models/GymBranch";
import { environment } from "src/environments/environment";

@Injectable({
    providedIn: "root",
})
export class GymBranchService {
    gymBranchURL = environment.API_URL + "/gym-branches";
    constructor(private http: HttpClient) {}

    public getALlBranches() {
        return this.http.get(this.gymBranchURL);
    }

    public getBranchById(id: number) {
        return this.http.get(this.gymBranchURL + "/" + id);
    }

    public addBranch(gymBranch: GymBranch) {
        return this.http.post(this.gymBranchURL, gymBranch);
    }

    public updateBranch(id: number, gymBranch: GymBranch) {
        return this.http.put(this.gymBranchURL + "/" + id, gymBranch);
    }

    public deleteBranch(id: number) {
        return this.http.delete(this.gymBranchURL + "/" + id);
    }
}
