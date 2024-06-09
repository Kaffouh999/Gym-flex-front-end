import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { AssuranceMember } from "src/app/core/models/AssuranceMember";
import { environment } from "src/environments/environment";

@Injectable({
    providedIn: "root",
})
export class AssuranceService {
    assuranceURL = environment.API_URL + "/assurance-members";
    constructor(private http: HttpClient) {}

    public getAllAssurances() {
        return this.http.get(this.assuranceURL);
    }

    public getAssuranceById(id: number) {
        return this.http.get(this.assuranceURL + "/" + id);
    }

    public addAssurance(assurance: AssuranceMember) {
        return this.http.post(this.assuranceURL, assurance);
    }

    public updateAssurance(id: number, assurance: AssuranceMember) {
        return this.http.put(this.assuranceURL + "/" + id, assurance);
    }

    public deleteAssurance(id: number) {
        return this.http.delete(this.assuranceURL + "/" + id);
    }
}
