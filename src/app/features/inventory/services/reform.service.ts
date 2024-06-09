import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Reform } from "src/app/core/models/Reform";
import { environment } from "src/environments/environment";

@Injectable({
    providedIn: "root",
})
export class ReformService {
    reformURL = environment.API_URL+"/reforms";
    constructor(private http: HttpClient) {}

    getAllReforms() {
        return this.http.get(this.reformURL);
    }
    addReform(reform: Reform) {
        return this.http.post(this.reformURL, reform);
    }
    deleteReform(reform: Reform) {
        return this.http.delete(
            this.reformURL+ "/" + reform.id
        );
    }
    updateReform(id: Number, reform: Reform) {
        return this.http.put(this.reformURL+ "/" + id, reform);
    }
}
