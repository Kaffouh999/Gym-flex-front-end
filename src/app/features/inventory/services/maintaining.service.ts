import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Maintaining } from "src/app/core/models/Maintaining";

@Injectable({
    providedIn: "root",
})
export class MaintainingService {
    constructor(private http: HttpClient) {}
    getAllMaintainings() {
        return this.http.get("http://localhost:8080/api/maintinings");
    }
    addMaintaining(maintaining: Maintaining) {
        return this.http.post(
            "http://localhost:8080/api/maintinings",
            maintaining
        );
    }
    deleteMaintaining(maintaining: Maintaining) {
        return this.http.delete(
            "http://localhost:8080/api/maintinings/" + maintaining.id
        );
    }
    updateMaintaining(id: Number, maintaining: Maintaining) {
        return this.http.put(
            "http://localhost:8080/api/maintinings/" + id,
            maintaining
        );
    }
}
