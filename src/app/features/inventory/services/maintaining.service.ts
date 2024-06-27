import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Maintaining } from "src/app/core/models/Maintaining";
import { environment } from "src/environments/environment";

@Injectable({
    providedIn: "root",
})
export class MaintainingService {
    maintainingURL = environment.API_URL + "/maintinings";
    constructor(private http: HttpClient) {}
    getAllMaintainings() {
        return this.http.get(this.maintainingURL);
    }
    addMaintaining(maintaining: Maintaining) {
        return this.http.post(this.maintainingURL, maintaining);
    }
    deleteMaintaining(maintaining: Maintaining) {
        return this.http.delete(this.maintainingURL + "/" + maintaining.id);
    }
    updateMaintaining(id: number, maintaining: Maintaining) {
        return this.http.put(this.maintainingURL + "/" + id, maintaining);
    }
}
