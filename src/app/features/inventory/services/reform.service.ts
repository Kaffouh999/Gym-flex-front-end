import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Reform } from "src/app/core/models/Reform";

@Injectable({
    providedIn: "root",
})
export class ReformService {
    constructor(private http: HttpClient) {}

    getAllReforms() {
        return this.http.get("http://localhost:8080/api/reforms");
    }
    addReform(reform: Reform) {
        return this.http.post("http://localhost:8080/api/reforms", reform);
    }
    deleteReform(reform: Reform) {
        return this.http.delete(
            "http://localhost:8080/api/reforms/" + reform.id
        );
    }
    updateReform(id: Number, reform: Reform) {
        return this.http.put("http://localhost:8080/api/reforms/" + id, reform);
    }
}
